import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import { getAdminAuth } from "~/auth";
import { deleteUser, getUser, getUsers, updatePermits } from "./queries";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { User } from "@prisma/client";
import { Button } from "~/components/ui/buttons";
import { Trash } from "~/components/ui/svgs";
import { sendSignupEmail } from "../signup/queries";

export const meta: MetaFunction = () => {
    return [{ title: "Admin Panel" }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const id = String(formData.get("user_id"));
    const email = String(formData.get("user_email"));
    const user = await getUser(id);
    const permits = Boolean(!user?.permits);

    if (!user) {
        throw new Error("User doesn't exists");
    }

    if (action === "delete") {
        await deleteUser(id);

        return redirect("/adminpanel");
    } else if (action === "permits") {
        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sistema de Gestión de Recursos Humanos ",
            text: "Su usuario ha sido dado de alta exitosamente. Recargue la aplicación.",
        };
        sendSignupEmail(emailOptions).catch(console.error);
        return await updatePermits({ id, permits });
    }
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
    const { users } = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    return (
        <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
            <div className="flex flex-col w-full pt-14 px-4">
                <h1 className="text-3xl w-full font-bold pb-4 drop-shadow-sm">
                    Admin Panel
                </h1>
                <section className="w-full">
                    <div className="flex justify-center w-full max-h-5/6">
                        <div className="text-gray-700 pb-4 w-max overflow-auto md:overflow-x-hidden scrollbar-thin">
                            <table className="text-md text-nowrap">
                                <thead>
                                    <tr className="bg-white text-zinc-900">
                                        <th className="border-solid border-2 border-zinc-100 p-3">
                                            Nombre de Usuario
                                        </th>
                                        <th className="border-solid border-2 border-zinc-100 p-3">
                                            Email
                                        </th>
                                        <th className="border-solid border-2 border-zinc-100 p-3">
                                            Permisos
                                        </th>
                                        <th className="border-solid border-2 border-zinc-100 p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: User) => (
                                        <tr
                                            key={user.id}
                                            className="text-zinc-100"
                                        >
                                            <td className="border-solid border-2 border-zinc-900 p-3">
                                                {user.name}
                                            </td>
                                            <td className="border-solid border-2 border-zinc-900 p-3">
                                                {user.email}
                                            </td>
                                            <td className="border-solid border-2 border-zinc-900 p-3">
                                                <Form method="post">
                                                    <input
                                                        type="hidden"
                                                        name="action"
                                                        value="permits"
                                                    />
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
                                                        <Button
                                                            variant="light"
                                                            disabled={
                                                                navigation.state ===
                                                                "submitting"
                                                            }
                                                        >
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
                                                <Form method="post">
                                                    <input
                                                        type="hidden"
                                                        name="action"
                                                        value="delete"
                                                    />
                                                    <input
                                                        type="text"
                                                        id="user_id"
                                                        name="user_id"
                                                        value={user.id}
                                                        hidden
                                                        readOnly
                                                    />
                                                    <Button variant="delete">
                                                        <Trash className=" h-5 transition-colors duration-200" />
                                                    </Button>
                                                </Form>
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
