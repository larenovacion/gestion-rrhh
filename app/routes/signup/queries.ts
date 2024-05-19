import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.APP_PASS;
console.log(PASS);

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

export const createTransporter = async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASS,
        },
    });

    return transporter;
};
