import { Link } from 'react-router-dom'
import HazmatIcon from './HazmatIcon'
import { HAZARD_CATEGORY_DEFINITIONS, type Certification, type CertificationStatus } from '../types/certification'

const STATUS_STYLES: Record<CertificationStatus, string> = {
  active: 'bg-blue-600 text-white border border-blue-600',
  planned: 'bg-blue-50 text-blue-700 border border-blue-300',
  deactivated: 'bg-slate-100 text-black/60 border border-slate-200',
}

export default function CertificationCard({ cert, isSample }: { cert: Certification; isSample?: boolean }) {
  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold m-0">{cert.modelName}</h3>
            {isSample && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border border-slate-300 text-black/50">
                Sample data
              </span>
            )}
          </div>
          <p className="text-black/70 m-0">
            {cert.company} &middot; v{cert.version}
          </p>
        </div>
        <span
          className={
            'text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded ' + STATUS_STYLES[cert.status]
          }
        >
          {cert.status}
        </span>
      </div>

      {cert.hazardCategories.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {cert.hazardCategories.map((category) => {
              const definition = HAZARD_CATEGORY_DEFINITIONS.find((d) => d.label === category)
              return (
                <div key={category} className="flex flex-col items-center gap-2 text-center w-24">
                  <HazmatIcon
                    label={definition?.abbreviation ?? category.split(' ')[0]}
                    severity={definition?.severity}
                    size={52}
                  />
                  <span className="text-[11px] text-black/70 leading-tight">{category}</span>
                </div>
              )
            })}
          </div>
          <Link to="/placards" className="text-xs text-blue-600 font-medium">
            What do these placards mean?
          </Link>
        </div>
      )}

      {cert.decisionCategorization.length > 0 && (
        <div className="mt-5">
          <p className="text-sm text-black/60 m-0 mb-2">Decision categorization (yearly disclosure)</p>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cert.decisionCategorization.map((entry) => (
              <li
                key={`${entry.category}-${entry.subcategory}`}
                className="text-sm bg-blue-50 text-blue-700 rounded-full px-3 py-1"
              >
                {entry.category} &rsaquo; {entry.subcategory}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-black/60">Agentic decision-making</dt>
          <dd className="m-0 font-medium">{cert.agenticDecisionMaking ? 'Yes' : 'No'}</dd>
        </div>
        <div>
          <dt className="text-black/60">Issued</dt>
          <dd className="m-0 font-medium">{cert.issuedDate}</dd>
        </div>
        <div>
          <dt className="text-black/60">Effective date</dt>
          <dd className="m-0 font-medium">{cert.effectiveDate}</dd>
        </div>
        <div>
          <dt className="text-black/60">End date</dt>
          <dd className="m-0 font-medium">{cert.endDate || 'Open-ended'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-black/60">Training sources</dt>
          <dd className="m-0">{cert.trainingSources}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-black/60">Unintended consequences on record</dt>
          <dd className="m-0">{cert.unintendedConsequences || 'None reported.'}</dd>
        </div>
      </dl>
    </div>
  )
}
