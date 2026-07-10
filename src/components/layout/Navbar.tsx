import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { NavLinks } from "@/components/layout/NavLinks";
import { getUnreadCount } from "@/lib/store";
import { CURRENT_USER_ID, currentUser } from "@/lib/seed";

export async function Navbar() {
  const unread = getUnreadCount(CURRENT_USER_ID);

  return (
    <header className="sticky top-0 z-50 bg-alvo-navy shadow-lg border-b border-alvo-navy-light">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Logo size="sm" />

        <form action="/vagas" method="GET" className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alvo-silver" />
            <input
              name="q"
              type="text"
              placeholder="Buscar vagas..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-alvo-navy-light/50 border border-alvo-navy-light text-white placeholder:text-alvo-silver/60 focus:outline-none focus:ring-2 focus:ring-alvo-bronze/50 text-sm"
            />
          </div>
        </form>

        <NavLinks unread={unread} />

        <div className="flex items-center gap-3">
          <button type="button" className="relative p-2 text-alvo-silver hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-alvo-bronze rounded-full" />
          </button>
          <Link href="/perfil">
            <Avatar user={currentUser} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
