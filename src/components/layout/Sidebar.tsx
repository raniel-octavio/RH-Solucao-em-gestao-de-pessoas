import Link from "next/link";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getContacts } from "@/lib/utils";
import { CURRENT_USER_ID } from "@/lib/seed";

export function Sidebar() {
  const contacts = getContacts(CURRENT_USER_ID).slice(0, 3);

  return (
    <aside className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-sm font-semibold text-alvo-navy mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-alvo-bronze" />
          Tendências
        </h3>
        <div className="space-y-2">
          {["#GestãoDePessoas", "#VagasAbertas", "#EmployerBranding", "#ALVORH"].map(
            (tag) => (
              <span key={tag} className="block text-sm text-alvo-navy/70">
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-alvo-navy flex items-center gap-2">
            <Users className="w-4 h-4 text-alvo-bronze" />
            Contatos
          </h3>
          <Link href="/contatos" className="text-xs text-alvo-bronze hover:text-alvo-copper flex items-center gap-0.5">
            Ver todos
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {contacts.map((user) => (
            <Link key={user.id} href="/contatos" className="flex items-center gap-3 group">
              <Avatar user={user} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-alvo-navy group-hover:text-alvo-bronze transition-colors line-clamp-1">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">{user.headline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
