import { Password, User } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export async function getUserById(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
    email: User["email"],
    password: string,
    name: string
) {
    const hashedPassword = await bcrypt.hash(password, 10);

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

export async function checkLogin(
    email: User["email"],
    password: Password["hash"]
) {
    const hasPassword = await prisma.user.findUnique({
        where: { email },
        include: {
            password: true,
        },
    });

    if (!hasPassword || !hasPassword.password) {
        return null;
    }

    const validPassword = bcrypt.compare(password, hasPassword.password.hash);

    if (!validPassword) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...hasNoPassword } = hasPassword;

    return hasNoPassword;
}
