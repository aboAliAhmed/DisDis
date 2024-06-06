import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversations";
import { ChatHeader } from "@/components/chat/chat-header";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/sign-in');
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        }
    });

    if (!currentMember) {
        return redirect("/");
    }

    // MemberOne is currentMember & memberTwo is the member got from params
    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if (!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const { memberOne, memberTwo } = conversation;

    // if the current member is memberOne then set the other member as memberTwo
    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
              imageUrl={otherMember.profile.imageUrl}
              name={otherMember.profile.name}
              serverId={params.serverId}
              type="conversation"
            />
        </div>
     );
}
 
export default MemberIdPage;