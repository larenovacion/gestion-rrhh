import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: "dark" | "light" | "delete";
};

export function Button({ variant, ...props }: ButtonProps) {
    return <button {...props} className={buttonVariants({ variant })} />;
}

const buttonVariants = cva(
    "transition duration-0 hover:duration-200 active:bg-violet-400 active:duration-0 py-2 px-4 rounded-lg drop-shadow-lg",
    {
        variants: {
            variant: {
                dark: "bg-zinc-800 text-white hover:bg-violet-600",
                light: "bg-white text-zinc-800 hover:text-white hover:bg-violet-600",
                delete: "bg-white text-zinc-800 hover:text-white hover:bg-red-400",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);
