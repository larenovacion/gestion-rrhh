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
