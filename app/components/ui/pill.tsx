type PillProps = {
    value: string;
    label: string;
    onSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected?: string[];
};

export function Pill({ value, label, selected, onSelection }: PillProps) {
    const isChecked = selected?.includes(value);

    return (
        <>
            <label
                htmlFor={value}
                className={`text-xs font-medium text-white px-2 py-1 rounded-xl hover:ring-2 hover:ring-violet-400 text-nowrap ${
                    isChecked ? "bg-violet-500" : "bg-violet-300"
                }`}
            >
                {label}
            </label>
            <input
                type="checkbox"
                name={value}
                id={value}
                hidden
                onChange={onSelection}
            />
        </>
    );
}
