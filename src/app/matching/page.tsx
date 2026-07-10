import { MatchingList } from "@/components/matching/MatchingList";

export default function MatchingPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-alvo-navy mb-2">
        Ranking de Compatibilidade
      </h1>

      <p className="text-gray-500 mb-6">
        Compare currículos com requisitos das vagas.
      </p>

      <MatchingList />
    </main>
  );
}