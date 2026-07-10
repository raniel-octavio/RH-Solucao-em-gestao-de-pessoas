import Link from "next/link";
import { ConversationList } from "@/components/messages/ConversationList";
import { getConversations } from "@/lib/store";
import { Send } from "lucide-react";

export default function MensagensPage() {
  const conversations = getConversations();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-8rem)] flex">
        <ConversationList />
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-400 bg-gray-50">
          <div className="w-20 h-20 rounded-full bg-alvo-bronze/10 flex items-center justify-center mb-4">
            <Send className="w-8 h-8 text-alvo-bronze/50" />
          </div>
          <p className="text-lg font-medium text-gray-500">ALVO RH Mensagens</p>
          <p className="text-sm mt-1">Selecione uma conversa ou acesse via</p>
          <Link href="/contatos" className="text-sm text-alvo-bronze hover:underline mt-2">
            Contatos
          </Link>
          {conversations.length === 0 && (
            <p className="text-xs text-gray-400 mt-4">Nenhuma conversa iniciada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
