import { Form } from "@remix-run/react";
import { Button } from "./buttons";

export function Modal({
    showModal,
    targetId,
    toggleModal,
    name,
}: {
    showModal: boolean;
    targetId: string;
    toggleModal: () => void;
    name: string;
}) {
    return (
        <div
            className={
                showModal
                    ? "absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col gap-4 items-center bg-zinc-50 border-2 border-red-700 shadow-md p-4 rounded-lg z-20"
                    : "hidden"
            }
        >
            <div className="text-center">
                <p className="text-lg font-semibold text-red-900">
                    ¿Desea borrar este registro?
                </p>
                <p className="underline font-bold text-red-900">
                    Los cambios son irreversibles
                </p>
            </div>
            <div className="flex gap-4">
                <Button variant="light" onClick={toggleModal}>
                    Cancelar
                </Button>
                <Form method="post">
                    <input type="hidden" name="action" value="delete" />
                    <input
                        type="text"
                        value={targetId}
                        id={name}
                        name={name}
                        hidden
                        readOnly
                    />
                    <Button
                        variant="delete"
                        onClick={() => {
                            setTimeout(() => {
                                toggleModal();
                            }, 600);
                        }}
                    >
                        Borrar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
