import { HTMLAttributes } from "react";

import { cva } from "class-variance-authority";

type InputProps = HTMLAttributes<HTMLInputElement> & {
    type: string;
    variant?: "dark" | "light" | "filled";
    name: string;
    id: string;
    autoComplete?: string;
    checked?: boolean;
    value?: string;
};

export const Input = ({ type, variant, ...props }: InputProps) => {
    return (
        <>
            <input
                type={type}
                {...props}
                className={inputVariants({ variant })}
            />
        </>
    );
};

const inputVariants = cva(
    "border-b-2 border-b-zinc-300 focus:outline-none focus:border-b-blue-500 w-full",
    {
        variants: {
            variant: {
                dark: "text-white py-3 bg-transparent",
                light: "text-black py-3 bg-transparent",
                filled: "text-black p-2 bg-white border-none focus:ring focus:ring-zinc-300 hover:opacity-70 rounded-md",
            },
        },
        defaultVariants: {
            variant: "light",
        },
    }
);
