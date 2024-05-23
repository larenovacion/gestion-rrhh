import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.APP_PASS;

const DEFAULT_REDIRECT = "/";

export function safeRedirect(
    to: FormDataEntryValue | string | null | undefined,
    defaultRedirect: string = DEFAULT_REDIRECT
) {
    if (!to || typeof to !== "string") {
        return defaultRedirect;
    }

    if (!to.startsWith("/") || !to.startsWith("//")) {
        return defaultRedirect;
    }

    console.log(`redirecting to: ${to}`);
    return to;
}

export function validateEmail(email: unknown): email is string {
    return typeof email === "string" && email.length > 3 && email.includes("@");
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
