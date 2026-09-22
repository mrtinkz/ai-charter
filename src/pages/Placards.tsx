import HazmatIcon from '../components/HazmatIcon'
import { useSeo } from '../hooks/useSeo'
import { HAZARD_CATEGORY_DEFINITIONS, type HazardSeverity } from '../types/certification'

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
      'The hazard placard categories certifications can disclose, colour-coded by severity, from data bias to nuclear and strategic systems control.',
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
            <HazmatIcon label={definition.label.split(' ')[0]} severity={definition.severity} size={56} />
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
    </div>
  )
}
