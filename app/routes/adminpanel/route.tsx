import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    json,
    redirect,
} from "@remix-run/node";
import { getAdminAuth } from "~/auth";
import { getUser, getUsers, updatePermits } from "./queries";
import { Form, useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";
import { Button } from "~/components/ui/buttons";
import { Trash } from "~/components/ui/svgs";
import { createTransporter } from "../signup/queries";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = String(formData.get("user_id"));
    const email = String(formData.get("user_email"));

    const user = await getUser(id);
    const permits = Boolean(!user?.permits);

    if (!user) {
        throw new Error("User doesn't exists");
    }

    async function sendSignupEmail(emailOptions: object) {
        const emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    }

    sendSignupEmail({
        from: process.env.EMAIL,
        to: email,
        subject: "Sistema de Gestión de Recursos Humanos ",
        text: "Su usuario ha sido dado de alta exitosamente. Recargue la aplicación.",
    }).catch(console.error);

    return await updatePermits({ id, permits });
}

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export async function loader({ request }: LoaderFunctionArgs) {
    const auth = await getAdminAuth(request);
    const users = await getUsers();

    if (!auth) {
        throw redirect("/sysadmin");
    }

    return json({ users });
}

export default function AdminPanelPage() {
    const loaderData = useLoaderData<typeof loader>();
    const users = loaderData.users;

    return (
        <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
            <div className="flex flex-col w-full pt-14 px-4">
                <h1 className="text-3xl w-full font-bold pb-4 drop-shadow-sm">
                    Admin Panel
                </h1>
                <section className="w-full">
                    <div className="flex justify-center w-full h-5/6">
                        <div className="text-gray-700 pb-4 w-max overflow-auto md:overflow-x-hidden scrollbar-thin">
                            <table className="text-sm text-nowrap">
                                <thead>
                                    <tr>
                                        <th className="bg-white text-zinc-900 border-solid border-2 border-zinc-900 p-3">
                                            Nombre de Usuario
                                        </th>
                                        <th className="bg-white text-zinc-900 border-solid border-2 border-zinc-900 p-3">
                                            Email
                                        </th>
                                        <th className="bg-white text-zinc-900 border-solid border-2 border-zinc-900 p-3">
                                            Permisos
                                        </th>
                                        <th className="bg-white text-zinc-900 border-solid border-2 border-zinc-900 p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: User) => (
                                        <tr key={user.id}>
                                            <td className="text-zinc-100 border-solid border-2 border-zinc-900 p-3">
                                                {user.name}
                                            </td>
                                            <td className="text-zinc-100 border-solid border-2 border-zinc-900 p-3">
                                                {user.email}
                                            </td>
                                            <td className="text-zinc-100 border-solid border-2 border-zinc-900 p-3">
                                                <Form method="post">
                                                    <input
                                                        type="text"
                                                        id="user_id"
                                                        name="user_id"
                                                        value={user.id}
                                                        hidden
                                                        readOnly
                                                    />
                                                    <input
                                                        type="text"
                                                        id="user_email"
                                                        name="user_email"
                                                        value={user.email}
                                                        hidden
                                                        readOnly
                                                    />
                                                    {user.permits === false ? (
                                                        <Button variant="light">
                                                            Permitir
                                                        </Button>
                                                    ) : (
                                                        <Button variant="delete">
                                                            Revocar
                                                        </Button>
                                                    )}
                                                </Form>
                                            </td>
                                            <td className="text-zinc-100 border-solid border-2 border-zinc-900 p-3">
                                                <Button variant="icon">
                                                    <Trash className="text-zinc-500 h-8 hover:text-red-400 transition-colors duration-200" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
