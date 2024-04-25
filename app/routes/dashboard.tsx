import { Outlet } from "@remix-run/react";

export default function DashboardPage() {
    return (
        <main className="flex">
            <div className="h-screen w-96 flex flex-col items-center justify-center bg-slate-800">
                <h1 className="text-4xl text-white">Dashboard</h1>
                <p className="text-zinc-500">En construcción...</p>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </main>
    );
}
