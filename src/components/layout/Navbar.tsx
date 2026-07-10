import Link from "next/link";
import { Bell, Search, Menu } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { NavLinks } from "@/components/layout/NavLinks";

import { getUnreadCount } from "@/lib/store";
import { CURRENT_USER_ID, currentUser } from "@/lib/seed";

export async function Navbar() {
  const unread = getUnreadCount(CURRENT_USER_ID);

  return (
    <header className="sticky top-0 z-50 bg-alvo-navy border-b border-alvo-navy-light shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Desktop / Tablet */}
        <div className="hidden md:flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
          {/* Logo */}
          <div className="shrink-0">
            <Logo size="sm" />
          </div>

          {/* Busca */}
          <form
            action="/vagas"
            method="GET"
            className="flex-1 max-w-lg"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alvo-silver" />

              <input
                name="q"
                type="text"
                placeholder="Buscar vagas..."
                className="
                  w-full
                  pl-10 pr-4 py-2
                  rounded-full
                  bg-alvo-navy-light/50
                  border border-alvo-navy-light
                  text-white
                  placeholder:text-alvo-silver/60
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-alvo-bronze/50
                "
              />
            </div>
          </form>

          {/* Navegação */}
          <div className="shrink-0">
            <NavLinks unread={unread} />
          </div>

          {/* Ações */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="
                relative
                p-2
                rounded-lg
                text-alvo-silver
                hover:text-white
                hover:bg-alvo-navy-light/30
                transition-all
              "
            >
              <Bell className="w-5 h-5" />

              <span
                className="
                  absolute
                  top-2
                  right-2
                  w-2 h-2
                  rounded-full
                  bg-alvo-bronze
                "
              />
            </button>

            <Link
              href="/perfil"
              className="shrink-0"
            >
              <Avatar user={currentUser} size="sm" />
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {/* Linha Superior */}
          <div className="h-16 px-4 flex items-center justify-between">
            <Logo size="sm" />

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="
                  relative
                  p-2
                  rounded-lg
                  text-alvo-silver
                  hover:text-white
                  transition-colors
                "
              >
                <Bell className="w-5 h-5" />

                <span
                  className="
                    absolute
                    top-2
                    right-2
                    w-2 h-2
                    rounded-full
                    bg-alvo-bronze
                  "
                />
              </button>

              <Link href="/perfil">
                <Avatar user={currentUser} size="sm" />
              </Link>
            </div>
          </div>

          {/* Busca Mobile */}
          <div className="px-4 pb-3">
            <form action="/vagas" method="GET">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alvo-silver" />

                <input
                  name="q"
                  type="text"
                  placeholder="Buscar vagas..."
                  className="
                    w-full
                    pl-10 pr-4 py-2.5
                    rounded-xl
                    bg-alvo-navy-light/50
                    border border-alvo-navy-light
                    text-white
                    placeholder:text-alvo-silver/60
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-alvo-bronze/50
                  "
                />
              </div>
            </form>
          </div>

          {/* Navegação Mobile */}
          <div className="border-t border-alvo-navy-light/50 px-2">
            <NavLinks unread={unread} />
          </div>
        </div>
      </div>
    </header>
  );
}