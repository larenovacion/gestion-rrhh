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

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = String(formData.get("user_id"));

    const user = await getUser(id);
    const permits = Boolean(!user?.permits);

    if (!user) {
        throw new Error("User doesn't exists");
    }

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
    console.log(users);

    // async function handleUpdate(id: string) {
    //     const userId = await getUser(id);
    //     console.log(userId);
    // }

    return (
        <main className="h-screen bg-black text-white flex">
            <div className="flex flex-col w-full pt-14 items-center px-4">
                <h1 className="text-3xl w-full font-bold pb-4 drop-shadow-sm">
                    Admin Panel
                </h1>
                <div className="flex justify-center">
                    <div className="text-gray-700 pb-4 w-[100%] overflow-auto scrollbar-thin">
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
            </div>
        </main>
    );
}
