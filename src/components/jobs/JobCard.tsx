import { MapPin, Clock, Users, Briefcase } from "lucide-react";
import { applyToJob, createJob } from "@/lib/actions";
import { formatShortDate } from "@/lib/utils";
import type { Job } from "@/types";

const modalityColors: Record<Job["modality"], string> = {
  Remoto: "bg-green-100 text-green-700",
  Presencial: "bg-blue-100 text-blue-700",
  Híbrido: "bg-purple-100 text-purple-700",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-alvo-navy to-alvo-navy-light flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-alvo-bronze" />
            </div>
            <div>
              <h3 className="font-semibold text-alvo-navy text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${modalityColors[job.modality]}`}>
                  {job.modality}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
          {job.salary && (
            <span className="text-sm font-semibold text-alvo-bronze whitespace-nowrap">{job.salary}</span>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-600">{job.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {formatShortDate(job.postedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {job.applicants} candidatos
            </span>
          </div>
          <form action={applyToJob}>
            <input type="hidden" name="jobId" value={job.id} />
            <button type="submit" className="px-4 py-1.5 text-sm font-medium text-white bg-alvo-navy hover:bg-alvo-navy-light rounded-lg transition-colors">
              Candidatar-se
            </button>
          </form>
        </div>

        <details className="mt-3">
          <summary className="text-sm text-alvo-navy hover:text-alvo-bronze font-medium cursor-pointer">
            Requisitos e benefícios
          </summary>
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-alvo-navy mb-1">Requisitos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {job.requirements.map((req) => (
                  <li key={req} className="flex gap-2">
                    <span className="text-alvo-bronze">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-alvo-navy mb-1">Benefícios</h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((b) => (
                  <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-alvo-bronze/10 text-alvo-copper font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export function CreateJobForm() {
  return (
    <details className="bg-white rounded-xl shadow-sm border border-gray-100">
      <summary className="p-4 cursor-pointer text-alvo-bronze font-medium text-sm hover:bg-alvo-bronze/5 rounded-xl">
        + Publicar Nova Vaga
      </summary>
      <form action={createJob} className="p-5 pt-0 space-y-3 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
          <Field label="Título" name="title" required />
          <Field label="Empresa" name="company" required />
          <Field label="Localização" name="location" />
          <Field label="Faixa Salarial" name="salary" placeholder="R$ 5.000 - R$ 8.000" />
          <SelectField label="Tipo" name="type" options={["CLT", "PJ", "Estágio", "Temporário"]} />
          <SelectField label="Modalidade" name="modality" options={["Presencial", "Remoto", "Híbrido"]} />
        </div>
        <TextField label="Descrição" name="description" required />
        <TextField label="Requisitos (um por linha)" name="requirements" />
        <TextField label="Benefícios (um por linha)" name="benefits" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-alvo-navy hover:bg-alvo-navy-light rounded-lg">
            Publicar Vaga
          </button>
        </div>
      </form>
    </details>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
      />
    </div>
  );
}

function TextField({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <textarea
        name={name}
        required={required}
        rows={3}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        name={name}
        defaultValue={options[0]}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-alvo-bronze/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
