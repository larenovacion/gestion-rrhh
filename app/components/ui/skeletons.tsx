import { HTMLAttributes } from "react";

/* UI Primitives */

export function NavlinkSkeleton() {
    return (
        <div className="p-3 bg-zinc-700 rounded-md animate-pulse">
            <p className="h-3"></p>
        </div>
    );
}

export function NavlinksSkeleton() {
    return (
        <div className="flex flex-col gap-1 p-2">
            <NavlinkSkeleton />
            <NavlinkSkeleton />
            <NavlinkSkeleton />
            <NavlinkSkeleton />
        </div>
    );
}

export function ButtonSkeleton(props: HTMLAttributes<HTMLButtonElement>) {
    return (
        <>
            <button {...props}></button>
        </>
    );
}

export function HeroLogoSkeleton() {
    return (
        <div className="w-7/12 md:w-96 flex flex-col gap-4 items-center justify-center h-full">
            <div className="w-1/2 h-1/4 bg-zinc-300 rounded-lg animate-pulse" />
        </div>
    );
}

export function Heading2Skeleton() {
    return (
        <div className="w-full pb-4">
            <div className="h-10 w-64 bg-zinc-600 rounded-lg drop-shadow-sm animate-pulse"></div>
        </div>
    );
}

export function ParagraphSkeleton() {
    return (
        <div className=" w-full">
            <div className="h-5 w-1/3 bg-zinc-500 rounded-lg drop-shadow-sm animate-pulse"></div>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div className="w-full bg-zinc-400 h-[77vh] rounded-lg animate-pulse"></div>
    );
}

/* UI Components */

export function NavbarSkeleton() {
    return (
        <aside className="hidden lg:flex flex-col items-left justify-start bg-zinc-800">
            <div className="flex flex-col gap-1 p-">
                <NavlinksSkeleton />
            </div>
        </aside>
    );
}

export function HeaderSkeleton() {
    return (
        <header className="w-full h-14 flex items-center justify-between lg:justify-end px-2">
            <ButtonSkeleton className="bg-zinc-300 py-2 px-4 h-10 w-32 rounded-lg drop-shadow-lg animate-pulse" />
        </header>
    );
}

export function HeroIndexSkeleton() {
    return (
        <div className="h-[calc(100%_-_3.5rem)] flex flex-col items-center px-4">
            <Heading2Skeleton />
            <ParagraphSkeleton />
            <HeroLogoSkeleton />
        </div>
    );
}

export function NominaSkeleton() {
    return (
        <div className="h-[calc(100%_-_3.5rem)] flex flex-col items-center px-4">
            <Heading2Skeleton />
            <div className="w-full pb-6">
                <ButtonSkeleton className="bg-zinc-700 p-y p-x h-10 w-48 rounded-lg drop-shadow-sm animate-pulse" />
            </div>
            <TableSkeleton />
        </div>
    );
}
