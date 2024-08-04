import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async  () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId:profile.id
                }
            }
        }
    })
    return (  
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-stone-900 bg-zinc-200 pt-2">
            <NavigationAction />
            <Separator 
              className="bg-zinc-700 rounded-md mx-auto h-[2px] w-10"
            />
            <ScrollArea className="flex w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem 
                          id={server.id}
                          name={server.name}
                          imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="fixed bottom-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                  }}
                />
            </div>
        </div>
    );
}
 