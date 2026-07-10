import Link from "next/link";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getContacts } from "@/lib/utils";
import { CURRENT_USER_ID } from "@/lib/seed";

export function Sidebar() {
  const contacts = getContacts(CURRENT_USER_ID).slice(0, 3);

  const trends = [
    "#GestãoDePessoas",
    "#VagasAbertas",
    "#EmployerBranding",
    "#ALVORH",
  ];

  return (
    <aside className="w-full space-y-4">
      {/* Tendências */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <h3 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-alvo-navy mb-4">
            <TrendingUp className="w-4 h-4 text-alvo-bronze shrink-0" />
            Tendências
          </h3>

          <div className="flex flex-wrap gap-2">
            {trends.map((tag) => (
              <span
                key={tag}
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-gray-50
                  border
                  border-gray-100
                  text-xs
                  sm:text-sm
                  text-alvo-navy
                  hover:bg-gray-100
                  transition-colors
                  cursor-pointer
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contatos */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-alvo-navy">
              <Users className="w-4 h-4 text-alvo-bronze shrink-0" />
              Contatos
            </h3>

            <Link
              href="/contatos"
              className="
                flex
                items-center
                gap-1
                text-xs
                sm:text-sm
                text-alvo-bronze
                hover:text-alvo-copper
                transition-colors
                whitespace-nowrap
              "
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {contacts.map((user) => (
              <Link
                key={user.id}
                href="/contatos"
                className="
                  flex
                  items-center
                  gap-3
                  p-2
                  rounded-lg
                  hover:bg-gray-50
                  transition-colors
                  group
                "
              >
                <div className="shrink-0">
                  <Avatar user={user} size="sm" />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-sm
                      font-medium
                      text-alvo-navy
                      group-hover:text-alvo-bronze
                      transition-colors
                      truncate
                    "
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      truncate
                    "
                  >
                    {user.headline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}