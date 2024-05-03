import { HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
    type?: "email" | "text" | "password" | "checkbox";
    id: string;
    name: string;
    value?: string;
    autoComplete?: string;
    checked?: boolean;
};

export function TextInput({ id, name, autoComplete, ...props }: InputProps) {
    return (
        <>
            <input
                type="text"
                id={id}
                name={name}
                autoComplete={autoComplete}
                required
                {...props}
                className="bg-zinc-100 py-3 border-b-2 border-b-zinc-300 focus:outline-none focus:border-b-blue-500"
            />
        </>
    );
}

export function EmailInput({ id, name, autoComplete, ...props }: InputProps) {
    return (
        <>
            <input
                type="email"
                id={id}
                name={name}
                required
                autoComplete={autoComplete}
                {...props}
                className="bg-zinc-100 py-3 border-b-2 border-b-zinc-300 focus:outline-none focus:border-b-blue-500"
            />
        </>
    );
}

export function PasswordInput({
    type,
    id,
    name,
    value,
    autoComplete,
    ...props
}: InputProps) {
    return (
        <>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                autoComplete={autoComplete}
                required
                {...props}
                className="bg-zinc-100 py-3 border-b-2 border-b-zinc-300 focus:outline-none focus:border-b-blue-500 w-full"
            />
        </>
    );
}

export function CheckBoxInput({ name, id, checked, ...props }: InputProps) {
    return (
        <>
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={checked}
                {...props}
            />
        </>
    );
}
