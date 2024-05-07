import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import { Password, User } from "@prisma/client";

export async function login(email: User["email"], password: Password["hash"]) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: { password: true },
    });

    if (!user || !user.password) {
        return false;
    }

    const validPassword = await bcrypt.compare(password, user.password.hash);

    if (!validPassword) {
        return false;
    }

    return user.id;
}
