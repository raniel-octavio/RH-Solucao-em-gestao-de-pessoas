"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Target,
  FileText,
  Users,
  MessageCircle,
  User,
} from "lucide-react";

interface NavLinksProps {
  unread: number;
}

const navItems = [
  {
    href: "/",
    label: "Início",
    icon: Home,
  },
  {
    href: "/vagas",
    label: "Vagas",
    icon: Briefcase,
  },
  {
    href: "/matching",
    label: "Matching",
    icon: Target,
  },
  {
    href: "/curriculo",
    label: "Currículo",
    icon: FileText,
  },
  {
    href: "/contatos",
    label: "Contatos",
    icon: Users,
  },
  {
    href: "/mensagens",
    label: "Mensagens",
    icon: MessageCircle,
  },
  {
    href: "/perfil",
    label: "Perfil",
    icon: User,
  },
];

export function NavLinks({ unread }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / Tablet */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          const showBadge =
            href === "/mensagens" && unread > 0;

          return (
            <Link
              key={href}
              href={href}
              className={`
                relative
                flex
                items-center
                gap-2
                px-3 lg:px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                ${
                  isActive
                    ? "bg-alvo-bronze/15 text-alvo-bronze"
                    : "text-alvo-silver hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-4 h-4" />

              <span className="hidden lg:block">
                {label}
              </span>

              {showBadge && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-[18px]
                    h-[18px]
                    px-1
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile */}
      <nav
        className="
          md:hidden
          flex
          items-center
          justify-between
          w-full
          py-2
          overflow-x-auto
          scrollbar-hide
        "
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          const showBadge =
            href === "/mensagens" && unread > 0;

          return (
            <Link
              key={href}
              href={href}
              className="
                relative
                flex
                flex-col
                items-center
                justify-center
                gap-1
                min-w-[58px]
                px-2
                py-2
                rounded-lg
                transition-all
              "
            >
              <div
                className={`
                  flex
                  items-center
                  justify-center
                  transition-colors
                  ${
                    isActive
                      ? "text-alvo-bronze"
                      : "text-alvo-silver"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`
                  text-[10px]
                  font-medium
                  leading-none
                  ${
                    isActive
                      ? "text-alvo-bronze"
                      : "text-alvo-silver"
                  }
                `}
              >
                {label}
              </span>

              {showBadge && (
                <span
                  className="
                    absolute
                    top-1
                    right-2
                    min-w-[16px]
                    h-[16px]
                    px-1
                    bg-red-500
                    text-white
                    text-[9px]
                    font-bold
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {unread > 99 ? "99+" : unread}
                </span>
              )}

              {isActive && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    w-7
                    h-0.5
                    rounded-full
                    bg-alvo-bronze
                  "
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}