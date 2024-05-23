import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
    Form,
    MetaFunction,
    useActionData,
    useNavigation,
} from "@remix-run/react";
import { validate } from "./validate";
import { login } from "./queries";
import { authCookie } from "~/auth";
import { Input } from "~/components/ui/inputs";
import { FormWrapper } from "~/components/ui/form-wrapper";
import { LogoRounded } from "~/components/ui/logo-rounded";
import { Button } from "~/components/ui/buttons";
import { useState } from "react";
import { ClosedEye, LoaderDots, OpenEye } from "~/components/ui/svgs";

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
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const actionData: ActionData = useActionData<typeof action>();
    const navigation = useNavigation();

    const emailError = actionData?.errors?.email;
    const passwordError = actionData?.errors?.password;

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return (
        <main className="lg:grid grid-cols-2 sm:bg-[url(https://utfs.io/f/6585b20e-8f10-4a6f-bfaf-da1053e6c829-if8nei.png)] bg-cover bg-no-repeat">
            <div className="h-screen flex items-center justify-center">
                <FormWrapper
                    formTitle="Inicio de sesión"
                    formFooter="¿No tiene una cuenta de usuario?"
                    formLinkText="Cree una."
                    toTarget="/signup"
                >
                    <Form
                        method="post"
                        className="overflow-auto scrollbar-thin"
                    >
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
                                    id="email"
                                    name="email"
                                    autoComplete="email"
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
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                    />
                                    {password && (
                                        <div className="flex gap-2 absolute top-3 right-0">
                                            <Input
                                                type="checkbox"
                                                id="show-password"
                                                name="show-password"
                                                checked={showPassword}
                                                onChange={
                                                    togglePasswordVisibility
                                                }
                                                hidden
                                            />
                                            <label
                                                htmlFor="show-password"
                                                className="text-sm text-zinc-500"
                                            >
                                                {showPassword ? (
                                                    <ClosedEye />
                                                ) : (
                                                    <OpenEye />
                                                )}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-start mt-4">
                                <Button
                                    disabled={navigation.state === "submitting"}
                                >
                                    {navigation.state === "submitting" ? (
                                        <>
                                            <LoaderDots /> Iniciando
                                        </>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </FormWrapper>
            </div>
            <div className="hidden h-screen lg:flex items-center justify-center">
                <LogoRounded src="https://utfs.io/f/a4fd2280-5fb9-4484-a139-5d17e140d2d8-jf8mii.jpg" />
            </div>
        </main>
    );
}
