import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.APP_PASS;

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

const createTransporter = async () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASS,
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 10,
    });

    return transporter;
};

export async function sendSignupEmail(emailOptions: {
    from: string | undefined;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}) {
    try {
        const emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
        console.log(`Signup email successfully sent to ${emailOptions.to}`);
    } catch (error) {
        console.error("Failed to send signup email:", error);
        throw new Error("Failed to send signup email");
    }
}
