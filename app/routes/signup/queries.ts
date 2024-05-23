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
        console.error(error);
    }
}

const time = new Date().toLocaleTimeString();
const date = new Date().toLocaleDateString();

export const emailOptions = {
    from: EMAIL,
    to: "lumontilla95@gmail.com",
    subject: `Nuevo registro de usuario | ${date} | ${time}`,
    // text: "Sistema de Registro de Usuarios | Nuevo Registro de usuario",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Responsive HTML Email Template</title>
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f6f9fc;
                }
                table {
                    border-spacing: 0;
                }
                td {
                    padding: 0;
                }
                img {
                    border: 0;
                }
                .wrapper {
                    width: 100%;
                    background-color: #f6f9fc;
                    table-layout: fixed;
                    padding-bottom: 40px;
                }
                .outer {
                    max-width: 600px;
                    background-color: #fff;
                    border-left: 1px solid #e5ecee;
                    border-right: 1px solid #e5ecee;
                }
                .main {
                    margin: 0 auto;
                    width: 100%;
                    max-width: 600px;
                    border-spacing: 0;
                    font-family: sans-serif;
                    color: #4a4a4a;
                }
            </style>
        </head>
        <body>
            <center class="wrapper">
                <div class="outer">
                    <table class="main" align="center">
                        <tr>
                            <td>
                                <table width="100%">
                                    <tr>
                                        <td
                                            style="
                                                padding: 20px;
                                                text-align: center;
                                            "
                                        >
                                            <a
                                                href="https://gestion-rrhh.vercel.app"
                                                target="_blank"
                                                ><img
                                                    src="https://utfs.io/f/cb1b9a82-48f4-43ab-9ca4-1b9ea5d3b5e7-bmsxgp.png"
                                                    width="180"
                                                    title="Logo"
                                            /></a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a
                                    href="https://gestion-rrhh.vercel.app/sysadmin"
                                    target="_blank"
                                    ><img
                                        src="https://utfs.io/f/ae0632d8-95eb-4c46-83c9-c41250713d91-l1eoaz.png"
                                        width="600"
                                        style="max-width: 100%"
                                        alt=""
                                /></a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="
                                    background-color: #aa4add;
                                    border-radius: 0 0 15px 15px;
                                "
                                height="20"
                            ></td>
                        </tr>
                    </table>
                </div>
            </center>
        </body>
    </html>
    `,
};
