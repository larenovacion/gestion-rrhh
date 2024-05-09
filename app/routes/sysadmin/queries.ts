import { Admin, AdminPassword } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export async function admin_login(
    admin_name: Admin["admin_name"],
    password: AdminPassword["hash"]
) {
    const admin = await prisma.admin.findUnique({
        where: { admin_name: admin_name },
        include: { password: true },
    });

    if (!admin || !admin.password) {
        return false;
    }

    const validPassword = await bcrypt.compare(password, admin.password.hash);

    if (!validPassword) {
        console.log("Invalid password");

        return false;
    }

    return admin.id;
}
