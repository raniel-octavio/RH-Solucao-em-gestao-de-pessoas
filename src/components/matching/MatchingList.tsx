import { getJobs, getUsers } from "@/lib/store";
import Link from "next/link";

export function MatchingList() {
  const jobs = getJobs();
  const users = getUsers();

  const rankings = jobs.map((job) => {
    const candidates = users
      .filter((u) => u.role === "candidato")
      .map((user) => {
        const matched = job.requirements.filter((req) =>
          user.skills?.some(
            (skill) =>
              req.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(req.toLowerCase())
          )
        );

        const score = Math.round(
          (matched.length / job.requirements.length) * 100
        );

        return {
          user,
          score,
          matched,
        };
      })
      // 🔑 só mantém candidatos com pelo menos 1 requisito compatível
      .filter((c) => c.matched.length > 0)
      .sort((a, b) => b.score - a.score);

    return {
      job,
      candidates,
    };
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-2">
      {rankings.map(({ job, candidates }) => (
        <div
          key={job.id}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
        >
          {/* Cabeçalho */}
          <div className="px-10 py-2 bg-gradient-to-r from-alvo-navy to-alvo-bronze text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-white/80 mt-1">{job.company}</p>
              </div>

              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-white/70">
                  Matches
                </div>
                <div className="text-3xl font-bold">{candidates.length}</div>
              </div>
            </div>
          </div>

          {/* Lista */}
          <div className="p-5 space-y-3">
            {candidates.slice(0, 10).map((candidate, index) => (
              <Link
                key={candidate.user.id}
                href={`/curriculo/${candidate.user.id}`}
                className="group block"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-alvo-bronze hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    {/* Esquerda */}
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-sm font-bold text-slate-400">
                        #{index + 1}
                      </div>

                      <div className="w-12 h-12 rounded-full bg-alvo-navy text-white flex items-center justify-center font-semibold">
                        {getInitials(candidate.user.name)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {candidate.user.name}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {candidate.matched.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right min-w-[90px]">
                      <div
                        className={`text-2xl font-bold ${
                          candidate.score >= 80
                            ? "text-emerald-500"
                            : candidate.score >= 60
                            ? "text-amber-500"
                            : "text-rose-500"
                        }`}
                      >
                        {candidate.score}%
                      </div>
                      <div className="text-xs text-slate-500">
                        Compatibilidade
                      </div>
                    </div>
                  </div>

                  {/* Barra */}
                  <div className="mt-4">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          candidate.score >= 80
                            ? "bg-emerald-500"
                            : candidate.score >= 60
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
