import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/buttons";
import { Input } from "~/components/ui/inputs";

export default function AdminRoute() {
    return (
        <main className="bg-zinc-200 h-screen flex items-center justify-center">
            <Form>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="sys_user"
                            className="text-sm text-zinc-500"
                        >
                            Ingresar Usuario de Administrador
                        </label>
                        <Input
                            variant="filled"
                            type="text"
                            id="sys_user"
                            name="sys_user"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="password"
                            className="text-sm text-zinc-500"
                        >
                            Ingresar Contraseña de Administrador
                        </label>
                        <Input
                            variant="filled"
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>

                    <Button>Acceder</Button>
                </div>
            </Form>
        </main>
    );
}
