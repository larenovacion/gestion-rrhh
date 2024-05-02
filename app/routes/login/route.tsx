import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, MetaFunction, useActionData } from "@remix-run/react";
import { validate } from "./validate";
import { login } from "./queries";
import { authCookie } from "~/auth";

export const meta: MetaFunction = () => {
    return [{ title: "Iniciar Sesion" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const errors = await validate(email, password);

    if (errors) {
        return json({ ok: false, errors }, 400);
    }

    const userId = await login(email, password);
    console.log(userId);

    if (!userId) {
        return json(
            { ok: false, errors: { email: "Email o contraseña invalidos" } },
            400
        );
    }

    return redirect("/dashboard", {
        headers: {
            "Set-Cookie": await authCookie.serialize(userId),
        },
    });
    // return setAuthOnResponse(response, userId);
}

interface ActionData {
    errors: {
        email?: string;
        password?: string;
    } | null;
}

export default function LoginPage() {
    const actionData: ActionData = useActionData<typeof action>();

    const emailError = actionData?.errors?.email;
    const passwordError = actionData?.errors?.password;
    // console.log("Email error: ", emailError);
    // console.log("Password error: ", passwordError);

    return (
        <div className="h-screen flex flex-col items-center justify-center text-black">
            <h2 className="text-2xl my-6">Iniciar Sesion</h2>
            <div className="bg-slate-100 py-6 px-10 rounded-lg font-normal">
                <Form method="post">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Ingresar email:{" "}
                            {emailError && (
                                <span className="text-red-600">
                                    {emailError}
                                </span>
                            )}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Ingresar contraseña:{" "}
                            {passwordError && (
                                <span className="text-red-600">
                                    {passwordError}
                                </span>
                            )}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-6 rounded-xl"
                        >
                            Iniciar Sesion
                        </button>
                    </div>
                </Form>
                <div>
                    <p>
                        ¿No tiene una cuenta de usuario?{" "}
                        <Link to={"/signup"} className="text-blue-600">
                            cree una.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
