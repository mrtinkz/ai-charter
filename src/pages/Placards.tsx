import HazmatIcon from '../components/HazmatIcon'
import { useSeo } from '../hooks/useSeo'
import {
  COMPLIANCE_STANDARD_DEFINITIONS,
  HAZARD_CATEGORY_DEFINITIONS,
  NIST_RMF_FUNCTIONS,
  OPERATING_REGION_DEFINITIONS,
  RISK_TIER_DEFINITIONS,
  type HazardSeverity,
} from '../types/certification'

const SEVERITY_BADGE: Record<HazardSeverity, string> = {
  low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  moderate: 'bg-amber-50 text-amber-700 border border-amber-200',
  high: 'bg-orange-50 text-orange-700 border border-orange-200',
  critical: 'bg-rose-50 text-rose-700 border border-rose-200',
}

export default function Placards() {
  useSeo({
    title: 'Hazard Placards',
    description:
      'The hazard placards, data-handling and compliance standards (PII, SPII, HIPAA, GDPR, SECRET), and operating regions a certification can disclose, colour-coded by severity.',
    path: '/placards',
  })

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide m-0">Reference</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-1 mb-4">Hazard placards</h1>
        <p className="text-lg text-black/80 max-w-3xl leading-relaxed">
          A certification discloses hazard categories using placards, the same idea as a HAZMAT placard on a
          truck: a quick visual signal for the public and first responders. This list is open-ended. Propose a new
          placard by opening a pull request, the same way a certification gets added to the registry.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {HAZARD_CATEGORY_DEFINITIONS.map((definition) => (
          <div key={definition.label} className="flex gap-4 border border-slate-200 rounded-lg p-5">
            <HazmatIcon label={definition.abbreviation} severity={definition.severity} size={56} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold m-0">{definition.label}</h2>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${SEVERITY_BADGE[definition.severity]}`}
                >
                  {definition.severity}
                </span>
              </div>
              <p className="mt-1 mb-0 text-sm text-black/70 leading-relaxed">{definition.description}</p>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Data-handling &amp; compliance</h2>
        <p className="text-black/70 max-w-3xl mb-5">
          A certification can also disclose which sensitive data classes and regulations a model or agent is
          certified to handle safely. These signal competence with a data regime, the way a placard signals a
          category of risk. The list covers currently active standards and is open-ended.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMPLIANCE_STANDARD_DEFINITIONS.map((definition) => (
            <div key={definition.label} className="flex items-start gap-3 border border-slate-200 rounded-lg p-4">
              <span className="shrink-0 text-[11px] font-semibold bg-slate-100 text-black/70 rounded px-2 py-1">
                {definition.abbreviation}
              </span>
              <div>
                <h3 className="text-sm font-semibold m-0">{definition.label}</h3>
                <p className="mt-1 mb-0 text-sm text-black/70 leading-relaxed">{definition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Approved operating regions</h2>
        <p className="text-black/70 max-w-3xl mb-5">
          A certification can state where a model or agent is cleared to operate. Regions are coarse, not a full
          country list, and are open-ended.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OPERATING_REGION_DEFINITIONS.map((definition) => (
            <div key={definition.label} className="border border-slate-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold m-0">{definition.label}</h3>
              <p className="mt-1 mb-0 text-sm text-black/70 leading-relaxed">{definition.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">EU AI Act risk tier</h2>
        <p className="text-black/70 max-w-3xl mb-5">
          A certification can self-classify under the EU AI Act risk tiers, so a reader can place it against a
          framework many operators already use.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RISK_TIER_DEFINITIONS.map((tier) => (
            <div key={tier.value} className="border border-slate-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold m-0">{tier.label}</h3>
              <p className="mt-1 mb-0 text-sm text-black/70 leading-relaxed">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">NIST AI RMF functions</h2>
        <p className="text-black/70 max-w-3xl mb-5">
          A certification can map to the NIST AI Risk Management Framework core functions, so it crosswalks to that
          voluntary standard without extra work.
        </p>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {NIST_RMF_FUNCTIONS.map((fn) => (
            <li key={fn} className="text-sm bg-slate-100 text-black/70 rounded-full px-3 py-1">
              {fn}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
