"use client";

import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/lib/actions";
import { currentUser } from "@/lib/seed";

export function CreatePostForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <form action={createPost} className="space-y-3">
        {/* Linha do avatar + textarea */}
        <div className="flex gap-3 items-start">
          <Avatar user={currentUser} />
          <textarea
            name="content"
            required
            placeholder="Compartilhe uma notícia, dica ou atualização..."
            className="flex-1 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30 text-sm min-h-[80px]"
          />
        </div>

        {/* Linha do select + botão */}
        <div className="flex items-center justify-between ml-12">
          <select
            name="category"
            defaultValue="noticia"
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
          >
            <option value="noticia">Notícia</option>
            <option value="artigo">Artigo</option>
            <option value="dica">Dica</option>
            <option value="evento">Evento</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-alvo-navy hover:bg-alvo-navy-light rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
