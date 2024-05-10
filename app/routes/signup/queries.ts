import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";

dotenv.config();
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRETS = process.env.GMAIL_CLIENT_SECRETS;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const EMAIL = process.env.EMAIL;

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

const OAuth2 = google.auth.OAuth2;

export const createTransporter = async () => {
    const OAuth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRETS,
        "https://developers.google.com/oauthplayground"
    );

    OAuth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
        OAuth2Client.getAccessToken((error, token) => {
            if (error) {
                reject("Failed to create access token");
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL,
            accessToken,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRETS,
            refreshToken: REFRESH_TOKEN,
        },
    });

    return transporter;
};
