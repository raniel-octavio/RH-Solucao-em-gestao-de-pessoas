import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { likePost } from "@/lib/actions";
import { getUserById, formatRelativeDate } from "@/lib/utils";
import type { Post } from "@/types";

const categoryLabels: Record<
  Post["category"],
  { label: string; color: string }
> = {
  noticia: {
    label: "Notícia",
    color: "bg-blue-100 text-blue-700",
  },
  artigo: {
    label: "Artigo",
    color: "bg-purple-100 text-purple-700",
  },
  dica: {
    label: "Dica",
    color: "bg-green-100 text-green-700",
  },
  evento: {
    label: "Evento",
    color: "bg-orange-100 text-orange-700",
  },
};

export function PostCard({ post }: { post: Post }) {
  const author = getUserById(post.authorId);

  if (!author) return null;

  const cat = categoryLabels[post.category];

  return (
    <article className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Cabeçalho */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Link
            href={`/perfil/${author.id}`}
            className="shrink-0"
          >
            <Avatar user={author} />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/perfil/${author.id}`}
                className="font-semibold text-alvo-navy hover:text-alvo-bronze text-sm sm:text-base break-words"
              >
                {author.name}
              </Link>

              <span
                className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full ${cat.color}`}
              >
                {cat.label}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {author.headline}
            </p>

            <p className="text-xs text-gray-400 mt-0.5">
              {formatRelativeDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mt-4">
          <p className="text-sm sm:text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs sm:text-sm text-gray-500">
          <span>{post.likes} curtidas</span>

          <span className="break-words">
            {post.comments} comentários · {post.shares} compartilhamentos
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="border-t border-gray-100 p-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          <form action={likePost}>
            <input
              type="hidden"
              name="postId"
              value={post.id}
            />

            <button
              type="submit"
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                px-2
                rounded-lg
                text-xs
                sm:text-sm
                font-medium
                text-gray-600
                hover:bg-gray-50
                transition-colors
              "
            >
              <Heart className="w-4 h-4 shrink-0" />
              <span>Curtir</span>
            </button>
          </form>

          <button
            type="button"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-3
              px-2
              rounded-lg
              text-xs
              sm:text-sm
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition-colors
            "
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Comentar</span>
          </button>

          <button
            type="button"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-3
              px-2
              rounded-lg
              text-xs
              sm:text-sm
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition-colors
            "
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Compartilhar</span>
          </button>

          <button
            type="button"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-3
              px-2
              rounded-lg
              text-xs
              sm:text-sm
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition-colors
            "
          >
            <Bookmark className="w-4 h-4 shrink-0" />
            <span>Salvar</span>
          </button>
        </div>
      </div>
    </article>
  );
}