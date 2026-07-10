import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { sendMessage } from "@/lib/actions";
import { getConversationById, markConversationAsRead } from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import { getUserById, formatTime, formatChatDate } from "@/lib/utils";

interface ChatViewProps {
  conversationId: string;
}

export function ChatView({ conversationId }: ChatViewProps) {
  markConversationAsRead(conversationId, CURRENT_USER_ID);

  const conv = getConversationById(conversationId);
  if (!conv) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Conversa não encontrada.
      </div>
    );
  }

  const otherId = conv.participantIds.find((id) => id !== CURRENT_USER_ID);
  const otherUser = otherId ? getUserById(otherId) : undefined;
  if (!otherUser) return null;

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-alvo-navy px-4 py-3 flex items-center gap-3">
        <Link href="/mensagens" className="md:hidden text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Avatar user={otherUser} size="sm" />
        <div>
          <h3 className="text-white font-medium text-sm">{otherUser.name}</h3>
          <p className="text-alvo-silver text-xs">{otherUser.online ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]"
        style={{ backgroundColor: "#f0ebe3" }}
      >
        {conv.messages.map((msg, idx) => {
          const isMine = msg.senderId === CURRENT_USER_ID;
          const showDate =
            idx === 0 ||
            formatChatDate(msg.timestamp) !== formatChatDate(conv.messages[idx - 1].timestamp);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-3">
                  <span className="text-[10px] font-medium text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                    {formatChatDate(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-lg shadow-sm text-sm ${
                    isMine
                      ? "bg-alvo-navy text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMine ? "text-alvo-silver/70" : "text-gray-400"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form action={sendMessage} className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-t border-gray-100">
        <input type="hidden" name="conversationId" value={conversationId} />
        <input
          name="content"
          required
          placeholder="Digite uma mensagem..."
          className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30 bg-white"
        />
        <button type="submit" className="p-2.5 bg-alvo-navy text-white rounded-full hover:bg-alvo-navy-light">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
