import { User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUser(id: User["id"]) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export async function updatePermits({
    id,
    permits,
}: Pick<User, "id" | "permits">) {
    return await prisma.user.update({
        where: { id },
        data: {
            permits: permits,
        },
    });
}
