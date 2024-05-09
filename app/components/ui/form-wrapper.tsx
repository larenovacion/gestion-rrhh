import { Link } from "@remix-run/react";

export function FormWrapper({
    children,
    formTitle,
    formFooter,
    formLinkText,
    toTarget,
}: {
    children: React.ReactNode;
    formTitle: string;
    formFooter: string;
    formLinkText: string;
    toTarget: string;
}) {
    return (
        <div className="bg-zinc-100 h-full w-full sm:h-5/6 sm:w-4/6 p-10 flex flex-col justify-between rounded-md">
            <h2 className="text-3xl font-semibold drop">{formTitle}</h2>
            {children}
            <div>
                <p>
                    {formFooter}{" "}
                    <Link to={toTarget} className="text-blue-600">
                        {formLinkText}
                    </Link>
                </p>
            </div>
        </div>
    );
}
