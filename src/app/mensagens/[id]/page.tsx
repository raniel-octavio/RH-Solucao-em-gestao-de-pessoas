import { ConversationList } from "@/components/messages/ConversationList";
import { ChatView } from "@/components/messages/ChatView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ConversaPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-8rem)] flex">
        <div className="hidden md:flex">
          <ConversationList activeId={id} />
        </div>
        <ChatView conversationId={id} />
      </div>
    </div>
  );
}
