export function LogoRounded({ src }: { src: string }) {
    return (
        <div className="w-48 h-48 rounded-full overflow-clip">
            <img src={src} alt="logo de La Renovación" loading="lazy" />
        </div>
    );
}
