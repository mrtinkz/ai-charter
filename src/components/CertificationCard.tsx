import { Link } from 'react-router-dom'
import HazmatIcon from './HazmatIcon'
import {
  BOT_CATEGORY_DEFINITIONS,
  HAZARD_CATEGORY_DEFINITIONS,
  OWNER_TYPE_LABELS,
  RISK_TIER_DEFINITIONS,
  SUBJECT_TYPE_LABELS,
  type Certification,
  type CertificationStatus,
} from '../types/certification'

const STATUS_STYLES: Record<CertificationStatus, string> = {
  active: 'bg-blue-600 text-white border border-blue-600',
  planned: 'bg-blue-50 text-blue-700 border border-blue-300',
  deactivated: 'bg-slate-100 text-black/60 border border-slate-200',
}

const RISK_TIER_STYLES: Record<string, string> = {
  unacceptable: 'bg-rose-50 text-rose-700 border border-rose-200',
  high: 'bg-orange-50 text-orange-700 border border-orange-200',
  limited: 'bg-amber-50 text-amber-700 border border-amber-200',
  minimal: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

export default function CertificationCard({ cert, isSample }: { cert: Certification; isSample?: boolean }) {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold m-0">{cert.modelName}</h3>
            <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border border-slate-300 text-black/50">
              {SUBJECT_TYPE_LABELS[cert.subjectType] ?? cert.subjectType}
            </span>
            {cert.riskTier && (
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${RISK_TIER_STYLES[cert.riskTier]}`}
              >
                {RISK_TIER_DEFINITIONS.find((tier) => tier.value === cert.riskTier)?.label ?? cert.riskTier}
              </span>
            )}
            {isSample && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border border-slate-300 text-black/50">
                Sample data
              </span>
            )}
          </div>
          <p className="text-black/70 m-0">
            {cert.company} ({OWNER_TYPE_LABELS[cert.ownerType]}) &middot; {cert.originCountry || 'Undisclosed origin'}{' '}
            &middot; v{cert.version}
          </p>
          {cert.subjectType === 'agent' && cert.agentSpecialization && (
            <p className="text-black/70 m-0 text-sm">Specializes in: {cert.agentSpecialization}</p>
          )}
          {cert.subjectType === 'autonomous-bot' && cert.botCategory && (
            <p className="text-black/70 m-0 text-sm">
              Operating domain:{' '}
              {BOT_CATEGORY_DEFINITIONS.find((category) => category.value === cert.botCategory)?.label ??
                cert.botCategory}
            </p>
          )}
        </div>
        <span
          className={
            'text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded ' + STATUS_STYLES[cert.status]
          }
        >
          {cert.status}
        </span>
      </div>

      {cert.modalities.length > 0 && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cert.modalities.map((modality) => (
              <li key={modality} className="text-sm bg-slate-100 text-black/70 rounded-full px-3 py-1">
                {modality}
              </li>
            ))}
          </ul>
        </div>
      )}

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

      {cert.complianceStandards && cert.complianceStandards.length > 0 && (
        <div className="mt-5">
          <p className="text-sm text-black/60 m-0 mb-2">Data-handling &amp; compliance</p>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cert.complianceStandards.map((standard) => (
              <li key={standard} className="text-sm bg-slate-100 text-black/70 rounded-full px-3 py-1">
                {standard}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cert.operatingRegions && cert.operatingRegions.length > 0 && (
        <div className="mt-5">
          <p className="text-sm text-black/60 m-0 mb-2">Approved operating regions</p>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cert.operatingRegions.map((region) => (
              <li key={region} className="text-sm bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
                {region}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cert.nistFunctions && cert.nistFunctions.length > 0 && (
        <div className="mt-5">
          <p className="text-sm text-black/60 m-0 mb-2">NIST AI RMF functions</p>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cert.nistFunctions.map((fn) => (
              <li key={fn} className="text-sm bg-slate-100 text-black/70 rounded-full px-3 py-1">
                {fn}
              </li>
            ))}
          </ul>
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
          <dt className="text-black/60">Training parameter scale</dt>
          <dd className="m-0 font-medium">{cert.parameterScale || 'Undisclosed'}</dd>
        </div>
        <div>
          <dt className="text-black/60">Fingerprinted output</dt>
          <dd className="m-0 font-medium">
            {cert.fingerprint.present ? cert.fingerprint.method || 'Yes' : 'No'}
          </dd>
        </div>
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
        {cert.energyProfile && (
          <div>
            <dt className="text-black/60">Energy / compute</dt>
            <dd className="m-0 font-medium">{cert.energyProfile}</dd>
          </div>
        )}
        {cert.nextDisclosureDate && (
          <div>
            <dt className="text-black/60">Next disclosure due</dt>
            <dd className={`m-0 font-medium ${cert.nextDisclosureDate < today ? 'text-rose-700' : ''}`}>
              {cert.nextDisclosureDate}
              {cert.nextDisclosureDate < today && ' (overdue)'}
            </dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="text-black/60">Training sources</dt>
          <dd className="m-0">{cert.trainingSources}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-black/60">Unintended consequences on record</dt>
          <dd className="m-0">
            {cert.unintendedConsequences || 'None reported.'}
            {cert.incidentReferences && cert.incidentReferences.length > 0 && (
              <ul className="flex flex-col gap-1 list-none p-0 m-0 mt-2">
                {cert.incidentReferences.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 break-words text-sm"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>

      {cert.signature && (
        <p className="mt-4 text-xs text-black/50 break-words">
          Signed with {cert.signature.algorithm || 'an unspecified algorithm'}.{' '}
          {cert.signature.publicKeyUrl && (
            <a
              href={cert.signature.publicKeyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Public key
            </a>
          )}{' '}
          Issuer-provided, verify independently.
        </p>
      )}
    </div>
  )
}
