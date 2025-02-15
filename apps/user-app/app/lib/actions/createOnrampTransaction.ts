"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();
    if(!userId) {
        return {
            message: "User not found"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount,
            provider,
            startTime: new Date(),
            status: "Processing",
            token
        }
    })
}