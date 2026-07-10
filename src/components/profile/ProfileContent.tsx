import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

import {
  MapPin,
  Users,
  MessageCircle,
  Briefcase,
  Award,
  GraduationCap,
  Building2,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { openConversation } from "@/lib/actions";
import type { User } from "@/types";

const roleLabels: Record<User["role"], string> = {
  candidato: "Candidato",
  recrutador: "Recrutador",
  empresa: "Empresa",
};

export function ProfileContent({
  user,
  isOwnProfile,
}: {
  user: User;
  isOwnProfile?: boolean;
}) {
  return (
    <div className="space-y-4">

      {/* CABEÇALHO */}
      <div className="h-45 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-15 bg-gradient-to-r from-alvo-navy via-alvo-navy-light to-alvo-navy" />

        <div className="px-6 pb-6">
          <div className="-mt-8">
              <Avatar user={user} size="lg" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-7">

            <div className="flex-1 sm:pb-1 pt-8">

              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-alvo-navy">
                  {user.name}
                </h1>

                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-alvo-bronze/10 text-alvo-copper">
                  {roleLabels[user.role]}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-0.5">
                {user.headline}
              </p>

              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {user.location}
                </span>

                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {user.connections} conexões
                </span>
              </div>

            </div>

            <div className="flex gap-2">

              {!isOwnProfile && (
                <>
                  <form action={openConversation}>
                    <input
                      type="hidden"
                      name="participantId"
                      value={user.id}
                    />

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-alvo-navy hover:bg-alvo-navy-light rounded-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Mensagem
                    </button>
                  </form>
                </>
              )}

              {isOwnProfile && (
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-alvo-bronze border border-alvo-bronze/30 rounded-lg"
                >
                  Editar Perfil
                </button>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* SOBRE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-alvo-navy mb-3">Sobre</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{user.about}</p>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-alvo-navy mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-alvo-bronze" />
          Competências
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1.5 rounded-full bg-alvo-navy/5 text-alvo-navy font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {isOwnProfile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Link
            href="/vagas"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md group"
          >
            <Briefcase className="w-6 h-6 text-alvo-bronze mb-2" />

            <h3 className="font-semibold text-alvo-navy group-hover:text-alvo-bronze">
              Minhas Vagas
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Gerencie vagas publicadas
            </p>
          </Link>

          <Link
            href="/mensagens"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md group"
          >
            <MessageCircle className="w-6 h-6 text-alvo-bronze mb-2" />

            <h3 className="font-semibold text-alvo-navy group-hover:text-alvo-bronze">
              Mensagens
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Converse com candidatos e recrutadores
            </p>
          </Link>

        </div>
      )}
    </div>
  );
}