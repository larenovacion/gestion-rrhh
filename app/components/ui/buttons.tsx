import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?:
        | "dark"
        | "dark_nopad"
        | "light"
        | "light_nopad"
        | "delete"
        | "delete_nopad"
        | "icon";
    disabled?: boolean;
    className?: string;
};

export function Button({ variant, ...props }: ButtonProps) {
    return <button {...props} className={buttonVariants({ variant })} />;
}

const buttonVariants = cva(
    "transition duration-0 hover:duration-200 active:duration-0 rounded-lg drop-shadow-lg inline-flex items-center justify-center gap-2",
    {
        variants: {
            variant: {
                dark: "bg-zinc-800 text-white hover:bg-violet-600 active:bg-violet-400 py-2 px-4",
                dark_nopad:
                    "bg-zinc-800 text-white hover:bg-violet-600 active:bg-violet-400",
                light: "bg-white text-zinc-800 hover:text-white hover:bg-violet-600 active:bg-violet-400 py-2 px-4",
                light_nopad:
                    "bg-white text-zinc-800 hover:text-white hover:bg-violet-600 active:bg-violet-400",
                delete: "bg-white text-zinc-800 hover:text-white hover:bg-red-400 active:bg-violet-400 py-2 px-4",
                delete_nopad:
                    "bg-white text-zinc-800 hover:text-white hover:bg-red-400 active:bg-violet-400",
                icon: "bg-transparent text-zinc-800",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);
