import { User } from "@prisma/client";
import { createCookieSessionStorage } from "@remix-run/node";
import { getUserById } from "./models/user.server";
import { redirect } from "react-router";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production",
    },
});

const USER_SESSION_COOKIE = "userId";

export async function getSession(request: Request) {
    const cookie = request.headers.get("cookie");
    return sessionStorage.getSession(cookie);
}

export async function getUserId(
    request: Request
): Promise<User["id"] | undefined> {
    const session = await getSession(request);
    const userId = session.get(USER_SESSION_COOKIE);
    return userId;
}

export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (userId === undefined) return null;

    const user = await getUserById(userId);
    if (user) return user;

    throw await logout(request);
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const userId = await getUserId(request);
    if (!userId) {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`/login${searchParams}`);
    }
    return userId;
}

export async function requireUser(request: Request) {
    const userId = await getUserId(request);
    const user = await getUserById(userId);
    if (user) return user;

    throw await logout(request);
}

export async function createSession({
    request,
    userId,
    redirectTo,
    remember,
}: {
    request: Request;
    userId: string;
    redirectTo: string;
    remember: boolean;
}) {
    const session = await getSession(request);
    session.set(USER_SESSION_COOKIE, userId);
    console.log("setting up a session cookie");
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session, {
                maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
            }),
        },
    });
}

export async function logout(request: Request) {
    const session = await getSession(request);
    console.log("you're logging out");

    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
}
