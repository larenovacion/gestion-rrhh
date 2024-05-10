import { Form } from "@remix-run/react";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { Button } from "~/components/ui/buttons";
import { ActionFunctionArgs } from "@remix-run/node";

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const OAuth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRETS,
        "https://developers.google.com/oauthplayground"
    );

    OAuth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
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
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECTRETS,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });

    return transporter;
};

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export async function action({ request }: ActionFunctionArgs) {
    async function sendSignupEmail(emailOptions: object) {
        const emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    }

    sendSignupEmail({
        subject: "test",
        text: "Sending email from nodemailer",
        to: "lumontilla95@gmail.com",
        from: process.env.EMAIL,
    }).catch(console.error);

    return null;
}

export default function Healtcheck() {
    return (
        <div className="bg-blue-200 h-screen flex items-center justify-center">
            <Form method="post">
                <Button>check</Button>
            </Form>
        </div>
    );
}
