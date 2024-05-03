export function Input(props: {
    type: string;
    name: string;
    id: string;
    autocomplete: string;
}) {
    return (
        <>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                autoComplete={props.autocomplete}
                required
                className="bg-zinc-100 py-3 border-b-2 border-b-zinc-300 focus:outline-none focus:border-b-blue-500"
            />
        </>
    );
}
