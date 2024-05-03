import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, MetaFunction, useActionData } from "@remix-run/react";
import { validate } from "./validate";
import { login } from "./queries";
import { authCookie } from "~/auth";
import { Input } from "~/components/ui/input";
import { FormWrapper } from "~/components/ui/form-wrapper";
import { LogoRounded } from "~/components/ui/logo-rounded";
import { Button } from "~/components/ui/buttons";

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
        <main className="grid grid-cols-2 bg-[url(https://utfs.io/f/c5f4acd3-803f-48e2-95a0-d0dccb8f3188-qqbpro.jpg)] bg-cover">
            <div className="h-screen flex items-center justify-center">
                <FormWrapper
                    formTitle="Inicio de sesión"
                    formFooter="¿No tiene una cuenta de usuario?"
                    formLinkText="Cree una."
                    toTarget="/signup"
                >
                    <Form method="post">
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm text-zinc-500"
                                >
                                    Ingresar email:{" "}
                                    {emailError && (
                                        <span className="text-red-600">
                                            {emailError}
                                        </span>
                                    )}
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autocomplete="email"
                                />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <label
                                    htmlFor="password"
                                    className="text-sm text-zinc-500"
                                >
                                    Ingresar contraseña:{" "}
                                    {passwordError && (
                                        <span className="text-red-600">
                                            {passwordError}
                                        </span>
                                    )}
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autocomplete="current-password"
                                />
                            </div>

                            <div className="flex justify-start mt-4">
                                <Button>Iniciar Sesión</Button>
                            </div>
                        </div>
                    </Form>
                </FormWrapper>
            </div>
            <div className="h-screen flex items-center justify-center">
                <LogoRounded src="https://utfs.io/f/a4fd2280-5fb9-4484-a139-5d17e140d2d8-jf8mii.jpg" />
            </div>
        </main>
    );
}
