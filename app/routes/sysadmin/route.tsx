import {
    ActionFunctionArgs,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/buttons";
import { Input } from "~/components/ui/inputs";
import { validate } from "./validate";
import { admin_login } from "./queries";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { ClosedEye, OpenEye } from "~/components/ui/svgs";
import { adminCookie } from "~/auth";

export const meta: MetaFunction = () => {
    return [{ title: "Admin | Login" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const sys_user = String(formData.get("sys_user"));
    const password = String(formData.get("password"));

    const errors = await validate(sys_user, password);

    if (errors) {
        return json({ ok: false, errors }, 400);
    }

    const adminId = await admin_login(sys_user, password);
    console.log(adminId);

    if (!adminId) {
        return json(
            {
                ok: false,
                errors: { password: "Credenciales inválidas" },
            },
            400
        );
    }

    return redirect("/adminpanel", {
        headers: {
            "Set-Cookie": await adminCookie.serialize(adminId),
        },
    });
}

export default function AdminRoute() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const actionData = useActionData<typeof action>();

    const nameError = actionData?.errors?.sys_admin;
    const passwordError = actionData?.errors?.password;

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return (
        <main className="bg-zinc-200 h-screen flex items-center justify-center">
            <Form method="post">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="sys_user" error={nameError}>
                            Usuario
                        </Label>
                        <Input
                            variant="filled"
                            type="text"
                            id="sys_user"
                            name="sys_user"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Label htmlFor="password" error={passwordError}>
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="filled"
                                id="password"
                                name="password"
                            />
                            {password && (
                                <div className="flex gap-2 absolute top-2 right-2">
                                    <Input
                                        type="checkbox"
                                        id="show-password"
                                        name="show-password"
                                        checked={showPassword}
                                        onChange={togglePasswordVisibility}
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

                    <Button>Acceder</Button>
                </div>
            </Form>
        </main>
    );
}
