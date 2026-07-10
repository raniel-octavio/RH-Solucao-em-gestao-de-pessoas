"use client";

import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/lib/actions";
import { currentUser } from "@/lib/seed";

export function CreatePostForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <form action={createPost} className="space-y-4">
        
        {/* Avatar + textarea */}
        <div className="flex gap-3 items-start">
          <Avatar user={currentUser} />

          <textarea
            name="content"
            required
            placeholder="Compartilhe uma notícia, dica ou atualização..."
            className="
              flex-1
              w-full
              p-3
              border
              border-gray-200
              rounded-lg
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-alvo-bronze/30
              text-sm
              min-h-[90px]
            "
          />
        </div>

        {/* Categoria + botão */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <select
            name="category"
            defaultValue="noticia"
            className="
              w-full
              sm:w-auto
              text-sm
              border
              border-gray-200
              rounded-lg
              px-3
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-alvo-bronze/30
            "
          >
            <option value="noticia">Notícia</option>
            <option value="artigo">Artigo</option>
            <option value="dica">Dica</option>
            <option value="evento">Evento</option>
          </select>

          <button
            type="submit"
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2
              text-sm
              font-medium
              text-white
              bg-alvo-navy
              hover:bg-alvo-navy-light
              rounded-lg
              transition-colors
            "
          >
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}