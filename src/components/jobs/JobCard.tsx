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
    <article className="w-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-alvo-navy to-alvo-navy-light flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-alvo-bronze" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-alvo-navy text-base sm:text-lg break-words">
                {job.title}
              </h3>

              <p className="text-sm text-gray-600 break-words">
                {job.company}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {job.location}
                </span>

                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${modalityColors[job.modality]}`}
                >
                  {job.modality}
                </span>

                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          {job.salary && (
            <div className="shrink-0">
              <span className="text-sm sm:text-base font-semibold text-alvo-bronze">
                {job.salary}
              </span>
            </div>
          )}
        </div>

        {/* Descrição */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
          {job.description}
        </p>

        {/* Rodapé */}
        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              {formatShortDate(job.postedAt)}
            </span>

            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 shrink-0" />
              {job.applicants} candidatos
            </span>
          </div>

          <form
            action={applyToJob}
            className="w-full md:w-auto"
          >
            <input
              type="hidden"
              name="jobId"
              value={job.id}
            />

            <button
              type="submit"
              className="
                w-full md:w-auto
                px-5 py-3
                text-sm font-medium
                text-white
                bg-alvo-navy
                hover:bg-alvo-navy-light
                rounded-lg
                transition-colors
              "
            >
              Candidatar-se
            </button>
          </form>
        </div>

        {/* Requisitos e Benefícios */}
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-medium text-alvo-navy hover:text-alvo-bronze">
            Requisitos e benefícios
          </summary>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-alvo-navy mb-2">
                Requisitos
              </h4>

              <ul className="space-y-2">
                {job.requirements.map((req) => (
                  <li
                    key={req}
                    className="flex gap-2 text-sm text-gray-600"
                  >
                    <span className="text-alvo-bronze shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-alvo-navy mb-2">
                Benefícios
              </h4>

              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="text-xs px-3 py-1 rounded-full bg-alvo-bronze/10 text-alvo-copper font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

export function CreateJobForm() {
  return (
    <details className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <summary className="p-4 cursor-pointer text-alvo-bronze font-medium text-sm hover:bg-alvo-bronze/5">
        + Publicar Nova Vaga
      </summary>

      <form
        action={createJob}
        className="p-4 sm:p-5 pt-0 space-y-4 border-t border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          <Field label="Título" name="title" required />
          <Field label="Empresa" name="company" required />
          <Field label="Localização" name="location" />
          <Field
            label="Faixa Salarial"
            name="salary"
            placeholder="R$ 5.000 - R$ 8.000"
          />

          <SelectField
            label="Tipo"
            name="type"
            options={["CLT", "PJ", "Estágio", "Temporário"]}
          />

          <SelectField
            label="Modalidade"
            name="modality"
            options={["Presencial", "Remoto", "Híbrido"]}
          />
        </div>

        <TextField
          label="Descrição"
          name="description"
          required
        />

        <TextField
          label="Requisitos (um por linha)"
          name="requirements"
        />

        <TextField
          label="Benefícios (um por linha)"
          name="benefits"
        />

        <div className="flex justify-stretch md:justify-end">
          <button
            type="submit"
            className="
              w-full md:w-auto
              px-5 py-3
              text-sm font-medium
              text-white
              bg-alvo-navy
              hover:bg-alvo-navy-light
              rounded-lg
              transition-colors
            "
          >
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
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
      </label>

      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="
          w-full
          px-3
          py-3
          border
          border-gray-200
          rounded-lg
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-alvo-bronze/30
        "
      />
    </div>
  );
}

function TextField({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
      </label>

      <textarea
        name={name}
        required={required}
        rows={4}
        className="
          w-full
          px-3
          py-3
          border
          border-gray-200
          rounded-lg
          text-sm
          resize-y
          focus:outline-none
          focus:ring-2
          focus:ring-alvo-bronze/30
        "
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
      </label>

      <select
        name={name}
        defaultValue={options[0]}
        className="
          w-full
          px-3
          py-3
          border
          border-gray-200
          rounded-lg
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-alvo-bronze/30
        "
      >
        {options.map((o) => (
          <option
            key={o}
            value={o}
          >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}