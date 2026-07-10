"use client"; // 🔑 adiciona isso no topo

import Link from "next/link";
import { Mail, MessageCircle, Phone, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { openConversation } from "@/lib/actions";
import { getContactsFiltered } from "@/lib/utils";
import type { User, UserRole } from "@/types";

const roleFilters: { value: UserRole | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "candidato", label: "Candidatos" },
  { value: "recrutador", label: "Recrutadores" },
  { value: "empresa", label: "Empresas" },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M17.472 14.382c..."/>
    </svg>
  );
}

function ContactCard({ contact }: { contact: User }) {
  const whatsapp = contact.whatsapp ?? contact.phone;

  return (
    <Link
      href={`/perfil/${contact.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <Avatar user={contact} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-alvo-navy">{contact.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{contact.headline}</p>
              {contact.company && (
                <p className="text-xs text-alvo-bronze mt-0.5">{contact.company}</p>
              )}
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-alvo-navy/5 text-alvo-navy capitalize shrink-0">
              {contact.role}
            </span>
          </div>

          <div className="mt-3 space-y-1.5">
            <a
              href={`mailto:${contact.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-alvo-bronze"
            >
              <Mail className="w-3.5 h-3.5" /> {contact.email}
            </a>
            <a
              href={`tel:${contact.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-alvo-bronze"
            >
              <Phone className="w-3.5 h-3.5" /> {contact.phone}
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <form action={openConversation} onClick={(e) => e.stopPropagation()}>
              <input type="hidden" name="participantId" value={contact.id} />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-alvo-navy hover:bg-alvo-navy-light rounded-lg"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Mensagem
              </button>
            </form>
            <a
              href={`https://wa.me/55${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href={`tel:${contact.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-alvo-bronze border border-alvo-bronze/30 rounded-lg hover:bg-alvo-bronze/5"
            >
              <Phone className="w-3.5 h-3.5" /> Ligar
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ContactsListProps {
  search?: string;
  role?: UserRole | "todos";
}

export function ContactsList({ search, role = "todos" }: ContactsListProps) {
  const contacts = getContactsFiltered(search, role);

  return (
    <>
      <form action="/contatos" method="GET" className="flex flex-wrap gap-2 mb-6">
        <input
          name="q"
          defaultValue={search}
          placeholder="Buscar contatos..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
        />
        <select
          name="role"
          defaultValue={role}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
        >
          {roleFilters.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-alvo-navy rounded-lg hover:bg-alvo-navy-light">
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>

      {contacts.length === 0 && (
        <p className="text-center py-12 text-gray-500">Nenhum contato encontrado.</p>
      )}
    </>
  );
}

export function ContactsHeader() {
  return (
    <div className="bg-gradient-to-r from-alvo-navy to-alvo-navy-light rounded-xl p-6 text-white mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-alvo-bronze/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-alvo-bronze" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Contatos</h1>
          <p className="text-alvo-silver text-sm">Sua rede de candidatos, recrutadores e empresas</p>
        </div>
      </div>
    </div>
  );
}
