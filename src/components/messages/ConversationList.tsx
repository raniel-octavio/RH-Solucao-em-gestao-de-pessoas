import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { getConversations } from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import { getUserById, formatTime } from "@/lib/utils";
import type { Conversation } from "@/types";

function getOtherParticipant(conv: Conversation) {
  const otherId = conv.participantIds.find(
    (id) => id !== CURRENT_USER_ID
  );

  return otherId
    ? getUserById(otherId)
    : undefined;
}

function getLastMessage(conv: Conversation) {
  return conv.messages[
    conv.messages.length - 1
  ];
}

function getUnread(conv: Conversation) {
  return conv.messages.filter(
    (m) =>
      m.senderId !== CURRENT_USER_ID &&
      !m.read
  ).length;
}

export function ConversationList({
  activeId,
}: {
  activeId?: string;
}) {
  const conversations = getConversations();

  return (
    <div
      className="
        w-full
        md:w-[380px]
        lg:w-[420px]
        xl:w-[450px]
        bg-white
        border-r
        border-gray-100
        flex
        flex-col
        min-h-0
      "
    >
      {/* Cabeçalho */}
      <div className="bg-alvo-navy p-4 sm:p-5 shrink-0">
        <h2 className="text-white font-semibold text-lg sm:text-xl">
          Mensagens
        </h2>

        <p className="text-alvo-silver text-xs sm:text-sm mt-1">
          Canal de comunicação ALVO RH
        </p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other =
            getOtherParticipant(conv);

          if (!other) return null;

          const lastMsg =
            getLastMessage(conv);

          const unread =
            getUnread(conv);

          const isActive =
            conv.id === activeId;

          return (
            <Link
              key={conv.id}
              href={`/mensagens/${conv.id}`}
              className={`
                flex
                items-center
                gap-3
                px-3
                sm:px-4
                py-3
                border-b
                border-gray-50
                transition-colors
                hover:bg-gray-50
                ${
                  isActive
                    ? "bg-alvo-bronze/5 border-l-4 border-l-alvo-bronze"
                    : ""
                }
              `}
            >
              {/* Avatar */}
              <div className="shrink-0">
                <Avatar
                  user={other}
                />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="
                      font-medium
                      text-sm
                      text-alvo-navy
                      truncate
                    "
                  >
                    {other.name}
                  </span>

                  {lastMsg && (
                    <span
                      className="
                        text-[10px]
                        sm:text-xs
                        text-gray-400
                        shrink-0
                      "
                    >
                      {formatTime(
                        lastMsg.timestamp
                      )}
                    </span>
                  )}
                </div>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                    truncate
                    mt-0.5
                  "
                >
                  {lastMsg?.content ??
                    "Nova conversa"}
                </p>
              </div>

              {/* Não lidas */}
              {unread > 0 && (
                <span
                  className="
                    w-5 h-5
                    sm:w-6 sm:h-6
                    rounded-full
                    bg-alvo-bronze
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  {unread > 99
                    ? "99+"
                    : unread}
                </span>
              )}
            </Link>
          );
        })}

        {conversations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">
              Nenhuma conversa encontrada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}