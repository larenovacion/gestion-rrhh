import { HTMLAttributes } from "react";

type TCellProps = HTMLAttributes<HTMLTableCellElement>;

export const Td = (props: TCellProps) => {
    return <td className="border-solid border-2 p-3" {...props} />;
};

export const Th = (props: TCellProps) => {
    return (
        <th
            className="border-solid border-2 border-zinc-800 bg-zinc-900 text-white p-3"
            {...props}
        />
    );
};
