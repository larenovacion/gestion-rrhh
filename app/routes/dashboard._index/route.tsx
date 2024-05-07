export default function DashboardIndexPage() {
    return (
        <div className="h-[calc(100%_-_3.5rem)] flex flex-col items-center px-4">
            <h2 className="text-3xl text-zinc-900 w-full font-bold pb-4 drop-shadow-sm">
                Dashboard
            </h2>
            <p className="text-zinc-500 w-full">
                Bienvenido al Sistema de Gestión de Recursos Humanos.
            </p>
            <div className="w-96 flex flex-col gap-4 items-center justify-center h-full">
                <img
                    src="https://utfs.io/f/f5c0a59c-1d5c-47f4-b389-ca5f4f3eac21-8xim16.svg"
                    alt="Recursos Humanos"
                />
            </div>
        </div>
    );
}
