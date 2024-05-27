import { createCookie } from "@remix-run/node";
import { prisma } from "./db.server";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
    console.warn("🚨 No COOKIE_SECRET set, the app is insecure.");
    secret = "default-secret";
}

export const authCookie = createCookie("auth", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [secret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 2, // 2 días
});

export async function getAuthFromRequest(
    request: Request
): Promise<string | null> {
    const userId = await authCookie.parse(request.headers.get("Cookie"));
    return userId ?? null;
}

const admin_secret = process.env.ADMIN_SECRET || "default";
if (admin_secret === "default") {
    console.warn("🚨 No ADMIN_SECRET set, the app is insecure.");
    secret = "default-secret";
}

export const adminCookie = createCookie("admin", {
    httpOnly: true,
    path: "/adminpanel",
    sameSite: "lax",
    secrets: [admin_secret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600, // 1 hora
});

export async function getAdminAuth(request: Request): Promise<string | null> {
    const admin = await adminCookie.parse(request.headers.get("Cookie"));
    return admin ?? null;
}

export async function getUserPermits(auth: string) {
    const userPermits = await prisma.user.findUnique({
        where: { id: auth },
        select: {
            permits: true,
        },
    });

    return userPermits ? userPermits : false;
}
