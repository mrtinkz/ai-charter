import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CertificationCard from '../components/CertificationCard'
import { loadCertifications } from '../data/loadCertifications'
import { useSeo } from '../hooks/useSeo'
import type { CertificationStatus } from '../types/certification'

const ALL_CERTIFICATIONS = loadCertifications()

const STATUS_FILTERS: Array<{ value: CertificationStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'deactivated', label: 'Deactivated' },
]

export default function Registry() {
  useSeo({
    title: 'Certification Registry',
    description:
      'Search certified AI models and agents by owner, capability, country of origin, or status. A public, PR-driven registry of AI certifications backing the Universal AI Charter.',
    path: '/registry',
  })

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<CertificationStatus | 'all'>('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_CERTIFICATIONS.filter(({ cert }) => {
      if (status !== 'all' && cert.status !== status) return false
      if (!q) return true
      const haystack = [
        cert.company,
        cert.modelName,
        cert.version,
        cert.originCountry,
        cert.parameterScale,
        cert.agentSpecialization,
        ...cert.modalities,
        ...cert.hazardCategories,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, status])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold m-0">Certification registry</h1>
        <p className="mt-2 text-black/70 max-w-2xl">
          Every model certified against the charter, in one searchable list. The entries below are sample data for
          testing this registry, not real companies. Have a real certification?{' '}
          <Link to="/certify" className="text-blue-600 font-medium">
            Create one and open a pull request
          </Link>{' '}
          to add it.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by owner, model, agent specialty, country, or capability"
          className="flex-1 min-w-[240px] border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CertificationStatus | 'all')}
          className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {STATUS_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <p className="text-black/60">No certifications match that search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map(({ id, cert, isSample }) => (
            <CertificationCard key={id} cert={cert} isSample={isSample} />
          ))}
        </div>
      )}
    </div>
  )
}
