import { isCertification, type Certification } from '../types/certification'

interface CertificationEntry {
  id: string
  cert: Certification
  /** True for the bundled sample/demo files, so the UI can label them clearly. */
  isSample: boolean
}

const files = import.meta.glob('./certifications/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>

export function loadCertifications(): CertificationEntry[] {
  const entries: CertificationEntry[] = []

  for (const [path, module] of Object.entries(files)) {
    const data = module.default
    if (!isCertification(data)) continue
    const fileName = path.split('/').pop() ?? path
    entries.push({
      id: fileName.replace(/\.json$/, ''),
      cert: data,
      isSample: fileName.startsWith('sample-'),
    })
  }

  return entries.sort((a, b) => a.cert.modelName.localeCompare(b.cert.modelName))
}
