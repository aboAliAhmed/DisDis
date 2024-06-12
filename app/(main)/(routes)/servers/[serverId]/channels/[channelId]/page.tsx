import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect ('/api/sign-in')
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    })

    const member = await db.member.findFirst ({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    })

    if(!channel || !member) {
        redirect("/");
    }

    return ( 
        <div className="bg-white dark:bg-zinc-800/20 flex flex-col h-full">
            <ChatHeader 
              name={channel.name}
              serverId={channel.serverId}
              type="channel"
            />
            <ChatMessages 
              name={channel.name}
              type="channel"
              member={member}
              chatId={channel.id}
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
            <ChatInput 
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{
                channelId: channel.id,
                serverId: channel.serverId
              }}
            />
        </div>
    );
}
 
export default ChannelIdPage;