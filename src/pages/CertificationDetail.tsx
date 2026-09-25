import { Link, Navigate, useParams } from 'react-router-dom'
import CertificationCard from '../components/CertificationCard'
import { Seo } from '../components/Seo'
import { getCertificationByUuid } from '../data/loadCertifications'

export default function CertificationDetail() {
  const { certId = '' } = useParams()
  const entry = getCertificationByUuid(certId)

  if (!entry) {
    return <Navigate to="/registry" replace />
  }

  const { cert, isSample } = entry

  function downloadJson() {
    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cert.modelName}-${cert.version}-certification.json`.replace(/\s+/g, '-')
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <Seo
        title={`${cert.modelName} certification`}
        description={`Immutable certification ${cert.certificationId} for ${cert.modelName} by ${cert.company}. Origin, capabilities, training sources, and decision-making disclosure under the Universal AI Charter.`}
        path={`/registry/${certId}`}
      />
      <div>
        <Link to="/registry" className="text-sm text-blue-600 font-medium">
          Registry
        </Link>
        <h1 className="text-3xl font-semibold mt-1 mb-2">{cert.modelName}</h1>
        <p className="text-black/60 text-xs font-mono break-all m-0">{cert.certificationId}</p>
      </div>

      <CertificationCard cert={cert} isSample={isSample} />

      <div>
        <button
          type="button"
          onClick={downloadJson}
          className="border border-slate-300 rounded px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Download certification JSON
        </button>
      </div>
    </div>
  )
}
