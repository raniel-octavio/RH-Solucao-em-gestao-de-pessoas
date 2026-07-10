import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { img: 32, title: "text-sm", subtitle: "text-[8px]" },
    md: { img: 40, title: "text-lg", subtitle: "text-[9px]" },
    lg: { img: 56, title: "text-2xl", subtitle: "text-[10px]" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative shrink-0">
        <Image
          src="/logo-alvo-rh.png"
          alt="ALVO RH"
          width={s.img}
          height={s.img}
          className="rounded-lg object-cover"
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1 className={`${s.title} font-bold tracking-wider text-alvo-bronze leading-tight`}>
            ALVO RH
          </h1>
          <p className={`${s.subtitle} tracking-[0.2em] text-alvo-silver uppercase`}>
            Soluções em Gestão de Pessoas
          </p>
        </div>
      )}
    </Link>
  );
}
