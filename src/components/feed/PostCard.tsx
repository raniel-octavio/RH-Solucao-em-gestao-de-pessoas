import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { likePost } from "@/lib/actions";
import { getUserById, formatRelativeDate } from "@/lib/utils";
import type { Post } from "@/types";

const categoryLabels: Record<Post["category"], { label: string; color: string }> = {
  noticia: { label: "Notícia", color: "bg-blue-100 text-blue-700" },
  artigo: { label: "Artigo", color: "bg-purple-100 text-purple-700" },
  dica: { label: "Dica", color: "bg-green-100 text-green-700" },
  evento: { label: "Evento", color: "bg-orange-100 text-orange-700" },
};

export function PostCard({ post }: { post: Post }) {
  const author = getUserById(post.authorId);
  if (!author) return null;

  const cat = categoryLabels[post.category];

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Link href={`/perfil/${author.id}`}>
            <Avatar user={author} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/perfil/${author.id}`} className="font-semibold text-alvo-navy hover:text-alvo-bronze text-sm">
                {author.name}
              </Link>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cat.color}`}>
                {cat.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{author.headline}</p>
            <p className="text-xs text-gray-400">{formatRelativeDate(post.createdAt)}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</p>
      </div>

      <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
        <span>{post.likes} curtidas</span>
        <span>{post.comments} comentários · {post.shares} compartilhamentos</span>
      </div>

      <div className="px-2 py-1 border-t border-gray-100 flex items-center">
        <form action={likePost} className="flex-1">
          <input type="hidden" name="postId" value={post.id} />
          <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium">
            <Heart className="w-4 h-4" /> Curtir
          </button>
        </form>
        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium">
          <MessageCircle className="w-4 h-4" /> Comentar
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium">
          <Share2 className="w-4 h-4" /> Compartilhar
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium">
          <Bookmark className="w-4 h-4" /> Salvar
        </button>
      </div>
    </article>
  );
}
