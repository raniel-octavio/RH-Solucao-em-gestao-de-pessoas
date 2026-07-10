"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  unread: number;
}

const navItems = [
  { href: "/", label: "Início" },
  { href: "/vagas", label: "Vagas" },
  { href: "/matching", label: "Matching" },
  { href: "/curriculo", label: "Currículo"},
  { href: "/contatos", label: "Contatos" },
  { href: "/mensagens", label: "Mensagens" },
  { href: "/perfil", label: "Perfil" },
];

export function NavLinks({ unread }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        const showBadge = href === "/mensagens" && unread > 0;

        return (
          <Link
            key={href}
            href={href}
            className={`relative flex flex-col items-center px-3 py-1.5 rounded-lg transition-colors text-xs lg:text-[14px] ${
              isActive ? "text-alvo-bronze" : "text-alvo-silver hover:text-white"
            }`}
          >
            <span className="hidden lg:block font-medium">{label}</span>
            <span className="lg:hidden font-medium text-[10px]">{label.slice(0, 4)}</span>
            {showBadge && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-alvo-bronze rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
