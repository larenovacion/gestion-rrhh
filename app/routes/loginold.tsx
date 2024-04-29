import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { checkLogin } from "~/models/user.server";
import { createSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await getUserId(request);
    if (userId) {
        console.log(`user id: ${userId}`);
        return redirect("/dashboard");
        // El redirect debería ser a '/' y desde allí verificar la sesión y redirigir a '/dashboard'
    }
    return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const redirectTo = safeRedirect(formData.get("redirectTo"), "/login");
    const remember = formData.get("remember");

    if (!validateEmail(email)) {
        return json(
            {
                errors: {
                    email: "El email ingresado no es valido",
                    password: null,
                },
            },
            { status: 400 }
        );
    }

    if (typeof password !== "string" || password.length === 0) {
        return json(
            {
                errors: {
                    email: null,
                    password: "Por favor, ingrese una contraseña valida",
                },
            },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return json(
            {
                errors: {
                    email: null,
                    password: "La contraseña ingresada es demasiado corta",
                },
            },
            { status: 400 }
        );
    }

    const user = await checkLogin(email, password);

    if (!user) {
        return json({
            errors: { email: "Email o contraseña invalidos", password: null },
        });
    }

    return createSession({
        redirectTo,
        remember: remember === "on" ? true : false,
        request,
        userId: user.id,
    });
};

export const meta: MetaFunction = () => {
    return [{ title: "Login" }];
};

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/dashboard";
    const actionData = useActionData<typeof action>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.email) {
            emailRef.current?.focus();
        } else if (actionData?.errors?.password) {
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl text-black">Login</h1>
            <p className="text-zinc-500">En construcción...</p>
            <div className="h-96">
                <form method="post" className="h-full flex flex-col gap-4">
                    <label htmlFor="email">Ingresar Email</label>
                    <input
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="email"
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={true}
                        required
                        autoComplete="email"
                        className="bg-slate-900 font-normal"
                        aria-invalid={
                            actionData?.errors?.email ? true : undefined
                        }
                        aria-describedby="email-error"
                    />
                    {actionData?.errors?.email ? (
                        <div id="email-error">{actionData.errors.email}</div>
                    ) : null}

                    <label htmlFor="password">Ingresar Contraseña</label>
                    <input
                        ref={passwordRef}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="bg-slate-900 font-normal"
                        aria-invalid={
                            actionData?.errors?.password ? true : undefined
                        }
                        aria-describedby="password-error"
                    />
                    {actionData?.errors?.password ? (
                        <div id="password-error">
                            {actionData.errors.password}
                        </div>
                    ) : null}

                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <button type="submit" className="bg-black py-2 rounded-lg">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
