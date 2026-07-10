import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { sendMessage } from "@/lib/actions";
import {
  getConversationById,
  markConversationAsRead,
} from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import {
  getUserById,
  formatTime,
  formatChatDate,
} from "@/lib/utils";

interface ChatViewProps {
  conversationId: string;
}

export function ChatView({
  conversationId,
}: ChatViewProps) {
  markConversationAsRead(
    conversationId,
    CURRENT_USER_ID
  );

  const conv = getConversationById(
    conversationId
  );

  if (!conv) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500">
        Conversa não encontrada.
      </div>
    );
  }

  const otherId = conv.participantIds.find(
    (id) => id !== CURRENT_USER_ID
  );

  const otherUser = otherId
    ? getUserById(otherId)
    : undefined;

  if (!otherUser) return null;

  return (
    <div className="flex flex-col h-full min-h-0 bg-white">
      {/* Cabeçalho */}
      <div className="bg-alvo-navy border-b border-white/10">
        <div className="px-3 sm:px-4 py-3 flex items-center gap-3">
          <Link
            href="/mensagens"
            className="
              md:hidden
              text-white
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="shrink-0">
            <Avatar
              user={otherUser}
              size="sm"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-white font-medium text-sm sm:text-base truncate">
              {otherUser.name}
            </h3>

            <p className="text-alvo-silver text-xs truncate">
              {otherUser.online
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-2
          sm:px-4
          py-4
          space-y-3
          min-h-0
        "
        style={{
          backgroundColor: "#f0ebe3",
        }}
      >
        {conv.messages.map((msg, idx) => {
          const isMine =
            msg.senderId === CURRENT_USER_ID;

          const showDate =
            idx === 0 ||
            formatChatDate(msg.timestamp) !==
              formatChatDate(
                conv.messages[idx - 1].timestamp
              );

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-3">
                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-medium
                      text-gray-500
                      bg-white/80
                      backdrop-blur
                      px-3 py-1
                      rounded-full
                    "
                  >
                    {formatChatDate(
                      msg.timestamp
                    )}
                  </span>
                </div>
              )}

              <div
                className={`flex ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[90%]
                    sm:max-w-[80%]
                    lg:max-w-[70%]
                    px-3
                    sm:px-3.5
                    py-2
                    rounded-2xl
                    shadow-sm
                    break-words
                    ${
                      isMine
                        ? "bg-alvo-navy text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md"
                    }
                  `}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>

                  <p
                    className={`
                      text-[10px]
                      mt-1
                      text-right
                      ${
                        isMine
                          ? "text-alvo-silver/70"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {formatTime(
                      msg.timestamp
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        action={sendMessage}
        className="
          bg-gray-50
          border-t
          border-gray-100
          p-2
          sm:p-3
        "
      >
        <input
          type="hidden"
          name="conversationId"
          value={conversationId}
        />

        <div className="flex items-center gap-2">
          <input
            name="content"
            required
            placeholder="Digite uma mensagem..."
            className="
              flex-1
              min-w-0
              px-4
              py-2.5
              rounded-full
              border
              border-gray-200
              bg-white
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-alvo-bronze/30
            "
          />

          <button
            type="submit"
            className="
              shrink-0
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-full
              bg-alvo-navy
              text-white
              hover:bg-alvo-navy-light
              transition-colors
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}