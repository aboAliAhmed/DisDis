import { 
    Hash,
    Mic,
    ShieldAlert,
    ShieldCheck,
    Video
} from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole, channelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [channelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [channelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [channelType.VEDIO]: <Video className="mr-2 h-4 w-4" />
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === channelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === channelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === channelType.VEDIO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        redirect("/");
    }

    const role = server?.members.find((members) => members.profileId === profile.id)?.role

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#282D31] bg-[#f2f3f5]">
            <ServerHeader 
              server={server}
              role={role}
            />
            <ScrollArea className="flex px-3">
                <div className="mt-2">
                    <ServerSearch 
                      data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Vido Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role],
                            }))
                        },
                      ]}
                    />
                </div>
            </ScrollArea>
        </div>
    )
} 