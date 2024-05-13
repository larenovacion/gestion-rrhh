import {
    HeaderSkeleton,
    HeroIndexSkeleton,
    NavbarSkeleton,
    NominaSkeleton,
} from "~/components/ui/skeletons";

export default function Healtcheck() {
    return (
        <main className="flex lg:grid grid-cols-[15rem_minmax(0,_1fr)] h-screen text-white">
            <NavbarSkeleton />
            <section className="w-full">
                <HeaderSkeleton />
                <HeroIndexSkeleton />
                <NominaSkeleton />
            </section>
        </main>
    );
}
