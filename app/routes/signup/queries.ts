import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export async function userExists(email: User["email"]) {
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: { id: true },
    });

    return Boolean(user);
}

export async function createUser(
    name: string,
    email: User["email"],
    password: string
) {
    const hashedPassword = await bcrypt.hash(password, 8);

    return prisma.user.create({
        data: {
            name,
            email,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });
}
