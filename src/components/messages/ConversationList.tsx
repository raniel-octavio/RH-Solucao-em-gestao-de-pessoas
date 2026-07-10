import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { getConversations } from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import { getUserById, formatTime } from "@/lib/utils";
import type { Conversation } from "@/types";

function getOtherParticipant(conv: Conversation) {
  const otherId = conv.participantIds.find((id) => id !== CURRENT_USER_ID);
  return otherId ? getUserById(otherId) : undefined;
}

function getLastMessage(conv: Conversation) {
  return conv.messages[conv.messages.length - 1];
}

function getUnread(conv: Conversation) {
  return conv.messages.filter((m) => m.senderId !== CURRENT_USER_ID && !m.read).length;
}

export function ConversationList({ activeId }: { activeId?: string }) {
  const conversations = getConversations();

  return (
    <div className="w-full md:w-96 border-r border-gray-100 flex flex-col bg-white">
      <div className="bg-alvo-navy p-4">
        <h2 className="text-white font-semibold text-lg">Mensagens</h2>
        <p className="text-alvo-silver text-xs mt-1">Canal de comunicação ALVO RH</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other = getOtherParticipant(conv);
          if (!other) return null;
          const lastMsg = getLastMessage(conv);
          const unread = getUnread(conv);
          const isActive = conv.id === activeId;

          return (
            <Link
              key={conv.id}
              href={`/mensagens/${conv.id}`}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors ${
                isActive ? "bg-alvo-bronze/5" : ""
              }`}
            >
              <Avatar user={other} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-alvo-navy truncate">{other.name}</span>
                  {lastMsg && (
                    <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                      {formatTime(lastMsg.timestamp)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{lastMsg?.content ?? "Nova conversa"}</p>
              </div>
              {unread > 0 && (
                <span className="w-5 h-5 bg-alvo-bronze text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
