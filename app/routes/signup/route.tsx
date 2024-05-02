import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, MetaFunction, useActionData } from "@remix-run/react";
import { validate } from "./validate";
import { authCookie } from "~/auth";
import { createUser } from "./queries";

export const meta: MetaFunction = () => {
    return [{ title: "Crear Usuario" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const errors = await validate(name, email, password);

    if (errors) {
        return json({ errors }, 400);
    }

    const user = await createUser(name, email, password);
    return redirect("/", {
        headers: {
            "Set-Cookie": await authCookie.serialize(user.id),
        },
    });
}

interface ActionData {
    errors: {
        email?: string;
        name?: string;
        password?: string;
    } | null;
}

export default function SignUpPage() {
    const actionData: ActionData = useActionData<typeof action>();

    const nameError = actionData?.errors?.name;
    const emailError = actionData?.errors?.email;
    const passwordError = actionData?.errors?.password;

    return (
        <div className="h-screen flex flex-col items-center justify-center text-black">
            <h2 className="text-2xl my-6">Crear Nuevo Usuario</h2>
            <div className="bg-slate-100 py-6 px-10 rounded-lg font-normal">
                <Form method="post">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Nombre:{" "}
                            {nameError && (
                                <span className="text-red-600">
                                    {nameError}
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email:{" "}
                            {emailError && (
                                <span className="text-red-600">
                                    {emailError}
                                </span>
                            )}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Contraseña:{" "}
                            {passwordError && (
                                <span className="text-red-600">
                                    {passwordError}
                                </span>
                            )}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-6 rounded-xl"
                        >
                            Crear Usuario
                        </button>
                    </div>
                </Form>
                <div>
                    <p>
                        Si ya tiene una cuenta de usuario,{" "}
                        <Link to={"/login"} className="text-blue-600">
                            inicie sesión.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
