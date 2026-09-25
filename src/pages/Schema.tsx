import { CERTIFICATION_SCHEMA_FIELDS } from '../types/certification'
import { Seo } from '../components/Seo'

const SCHEMA_PATH = 'schema/certification.schema.json'

export default function Schema() {
  const schemaUrl = `${import.meta.env.BASE_URL}${SCHEMA_PATH}`

  return (
    <div className="flex flex-col gap-8">
      <Seo
        title="Certification Schema"
        description="The public JSON schema behind every AI Charter certification: a machine-readable contract covering origin, training, capability, and decision-making disclosure for a model or an agent."
        path="/schema"
      />
      <header>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide m-0">Standard</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-1 mb-4">Certification schema</h1>
        <p className="text-lg text-black/80 max-w-3xl leading-relaxed">
          Every certification on this site, whether for a model, an agent built on one, or a physical autonomous
          bot, is one JSON document that follows the same contract. That contract is public, versioned, and free to
          reuse: build a form against it, validate a certification with it, or feed it to another registry.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-4 border border-slate-200 rounded-lg p-5">
        <div className="flex-1 min-w-[220px]">
          <p className="m-0 font-mono text-sm text-black/70">ai-charter-certification-v1</p>
          <p className="mt-1 mb-0 text-sm text-black/60">JSON Schema, draft 2020-12.</p>
        </div>
        <a
          href={schemaUrl}
          download
          className="text-sm font-semibold px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Download schema
        </a>
        <a href={schemaUrl} className="text-sm font-medium text-blue-600 hover:underline">
          View raw JSON
        </a>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Fields</h2>
        <p className="text-black/70 max-w-2xl mb-5">
          <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">subjectType</code> is what makes
          the contract cover every case: set it to <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">"model"</code>{' '}
          for a base model, <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">"agent"</code>{' '}
          for a specialized agent built on one, or{' '}
          <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">"autonomous-bot"</code> for a
          physical autonomous bot, and disclose{' '}
          <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">agentSpecialization</code> or{' '}
          <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">botCategory</code> alongside it.
          Every other field applies to all three.
        </p>
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Type</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {CERTIFICATION_SCHEMA_FIELDS.map((row) => (
                <tr key={row.field} className="border-t border-slate-200 align-top">
                  <td className="px-4 py-2 font-mono text-xs whitespace-nowrap">{row.field}</td>
                  <td className="px-4 py-2 font-mono text-xs text-black/60 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-2 text-black/80">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-sm text-black/60 max-w-2xl">
        This is version 1 of the contract. A breaking change to a field gets a new{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">schema</code> value, such as{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">ai-charter-certification-v2</code>, so
        existing certifications keep validating against the version they were issued under.
      </p>
    </div>
  )
}
