import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params } : { params: { serverId: string}}
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!params.serverId) {
            return new NextResponse("Server ID Missing", {status: 500})
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                ProfileId: profile.id
            },
            data: {
                iniviteCode: uuidv4()
            }
        })
        
        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
