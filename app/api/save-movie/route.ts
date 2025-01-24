import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, favoriteMovie } = body;

        if (!userId || !favoriteMovie) {
            return NextResponse.json({ error: "Missing userId or favoriteMovie" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { favoriteMovie },
        });

        return NextResponse.json({ message: "Movie saved successfully", updatedUser });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
