import { HTMLAttributes } from "react";

type LabelProps = HTMLAttributes<HTMLLabelElement> & {
    error?: string;
    children: React.ReactNode | string;
    htmlFor: string;
};

export function Label({ htmlFor, children, error, ...props }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="text-sm text-zinc-500" {...props}>
            {children} {error && <span className="text-red-600">{error}</span>}
        </label>
    );
}
