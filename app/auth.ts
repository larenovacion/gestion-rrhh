import { createCookie } from "@remix-run/node";

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
    maxAge: 60 * 60 * 24 * 7, // 7 días
});

export async function getAuthFromRequest(
    request: Request
): Promise<string | null> {
    const userId = await authCookie.parse(request.headers.get("Cookie"));
    return userId ?? null;
}
