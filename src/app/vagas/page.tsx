import { CreateJobForm, JobCard } from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/store";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function VagasPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const jobs = getJobs(q);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <div className="bg-white from-alvo-navy to-alvo-navy-light rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold text-alvo-navy">Alvos de Carreira</h1>
        <p className="text-alvo-silver mt-1 text-sm">{jobs.length} vagas disponíveis</p>
        <form method="GET" className="mt-4">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por cargo, empresa ou cidade..."
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-alvo-navy text-alvo-navy placeholder:text-alvo-navy focus:outline-none focus:ring-2 focus:ring-alvo-bronze/50 text-sm"
          />
        </form>
      </div>

      <CreateJobForm />

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {jobs.length === 0 && (
        <p className="text-center py-12 text-gray-500">Nenhuma vaga encontrada.</p>
      )}
    </div>
  );
}
