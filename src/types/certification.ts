// Placard taxonomy: open-ended by design, expand via pull request as new risk classes emerge.
export type HazardSeverity = 'low' | 'moderate' | 'high' | 'critical'

export interface HazardCategoryDefinition {
  label: string
  /** Short code shown inside the placard diamond; keep to 6 characters or fewer so it stays legible. */
  abbreviation: string
  severity: HazardSeverity
  description: string
}

export const HAZARD_CATEGORY_DEFINITIONS: HazardCategoryDefinition[] = [
  {
    label: 'Data & Training Bias',
    abbreviation: 'BIAS',
    severity: 'low',
    description: 'Training data or sourcing may skew outcomes for some groups or cases.',
  },
  {
    label: 'Agentic Decision-Making',
    abbreviation: 'AGENT',
    severity: 'moderate',
    description: 'Model takes decisions on its own, without a human confirming each one.',
  },
  {
    label: 'Human-in-the-Loop Oversight',
    abbreviation: 'HITL',
    severity: 'moderate',
    description: 'Discloses the ratio of human overseers to AI agents, within the charter\u2019s 1:8 to 1:15 range.',
  },
  {
    label: 'Unintended Consequences',
    abbreviation: 'UNINT',
    severity: 'high',
    description: 'Model has caused, or could cause, effects nobody intended or predicted.',
  },
  {
    label: 'Autonomous Operation',
    abbreviation: 'AUTO',
    severity: 'high',
    description: 'Model runs and acts continuously, without a human present to supervise it.',
  },
  {
    label: 'Public Infrastructure Control',
    abbreviation: 'INFRA',
    severity: 'critical',
    description: 'Model controls shared infrastructure, such as power, water, or traffic systems.',
  },
  {
    label: 'Nuclear & Strategic Systems Control',
    abbreviation: 'NUCL',
    severity: 'critical',
    description: 'Model controls, or assists in controlling, nuclear or other strategic defense systems.',
  },
  {
    label: 'Parental Guidance Suggested',
    abbreviation: 'PG',
    severity: 'low',
    description: 'Output may include themes better reviewed by a parent or guardian before a minor sees them.',
  },
  {
    label: 'Mature Content (18+)',
    abbreviation: '18+',
    severity: 'moderate',
    description: 'Model can generate content intended for adult audiences only, unsuitable for minors.',
  },
  {
    label: 'NSFW / Explicit Content',
    abbreviation: 'NSFW',
    severity: 'high',
    description: 'Model can generate sexually explicit, graphic, or otherwise not-safe-for-work content.',
  },
  {
    label: 'Analytical Thinking Loss',
    abbreviation: 'ATLOSS',
    severity: 'moderate',
    description: 'Over-reliance on the model risks eroding users\u2019 own critical thinking and analytical skills.',
  },
  {
    label: 'Child Safe',
    abbreviation: 'CHILD',
    severity: 'low',
    description: 'Model has been reviewed and filtered for content safe for minors, with no adult or explicit material.',
  },
]

export const HAZARD_CATEGORIES = HAZARD_CATEGORY_DEFINITIONS.map((definition) => definition.label)

export type HazardCategory = string

export type CertificationStatus = 'planned' | 'active' | 'deactivated'

// Who holds the certification: a registered company, a named individual, or a non-profit/public body.
export type OwnerType = 'company' | 'individual' | 'organization'

export const OWNER_TYPE_LABELS: Record<OwnerType, string> = {
  company: 'Company',
  individual: 'Individual',
  organization: 'Organization / non-profit',
}

// A certification can cover a base model, or a specialized agent built on top of one.
export type CertificationSubjectType = 'model' | 'agent'

// Charter governance article: "AI tokens must be fingerprinted to protect intellectual property."
export interface FingerprintDisclosure {
  present: boolean
  /** How the fingerprint/watermark works, e.g. "Invisible token-pattern watermark". Empty when present is false. */
  method: string
}

// Capability disclosure: what the model/agent can actually produce or understand.
// Open-ended by design, same as hazard categories: add a custom label if this list is missing one.
export interface ModalityDefinition {
  label: string
  description: string
}

export const MODALITY_DEFINITIONS: ModalityDefinition[] = [
  { label: 'Text Generation', description: 'Produces written language output.' },
  { label: 'Text Embedding', description: 'Converts text into vector representations for search or comparison.' },
  { label: 'Image Generation', description: 'Produces image output.' },
  { label: 'Image Understanding', description: 'Interprets image input.' },
  { label: 'Audio Generation', description: 'Produces speech or other sound output.' },
  { label: 'Audio Transcription', description: 'Converts speech input to text.' },
  { label: 'Video Generation', description: 'Produces video output.' },
  { label: 'Code Generation', description: 'Produces or edits source code.' },
  { label: 'Multimodal Reasoning', description: 'Reasons jointly across two or more of the modalities above.' },
]

export const MODALITIES = MODALITY_DEFINITIONS.map((definition) => definition.label)

export type Modality = string

// Yearly decision categorization/sub-categorization disclosure, per the charter's governance article.
export const DECISION_CATEGORIES = {
  Healthcare: ['Diagnosis Support', 'Treatment Recommendation', 'Risk Triage'],
  'Financial Services': ['Credit Scoring', 'Fraud Detection', 'Loan Underwriting'],
  'Public Infrastructure': ['Utility Dispatch', 'Traffic Control', 'Emergency Response'],
  Agriculture: ['Crop Advisory', 'Yield Prediction', 'Resource Allocation'],
  'Consumer & Retail': ['Personalization', 'Pricing', 'Content Moderation'],
  'Employment & HR': ['Hiring', 'Performance Evaluation'],
} as const

export type DecisionCategory = keyof typeof DECISION_CATEGORIES

// Category/subcategory are open strings, not the enum above, so a custom pair can be disclosed
// when the preset list in the certify form does not cover a company's use case.
export interface DecisionCategorization {
  category: string
  subcategory: string
}

function isDecisionCategorization(value: unknown): value is DecisionCategorization {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.category === 'string' && v.category.length > 0 && typeof v.subcategory === 'string' && v.subcategory.length > 0
}

function isFingerprintDisclosure(value: unknown): value is FingerprintDisclosure {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.present === 'boolean' && typeof v.method === 'string'
}

export interface Certification {
  schema: 'ai-charter-certification-v1'
  subjectType: CertificationSubjectType
  company: string
  ownerType: OwnerType
  originCountry: string
  modelName: string
  version: string
  status: CertificationStatus
  /** Required when subjectType is 'agent': what the agent specializes in, e.g. "Grid outage dispatch". */
  agentSpecialization: string
  modalities: Modality[]
  /** Freeform disclosure, e.g. "7B", "24B", "1.8T", or "Undisclosed" — scales and units vary too widely for an enum. */
  parameterScale: string
  fingerprint: FingerprintDisclosure
  trainingSources: string
  agenticDecisionMaking: boolean
  hazardCategories: HazardCategory[]
  decisionCategorization: DecisionCategorization[]
  unintendedConsequences: string
  issuedDate: string
  effectiveDate: string
  endDate: string
}

export function isCertification(value: unknown): value is Certification {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    v.schema === 'ai-charter-certification-v1' &&
    (v.subjectType === 'model' || v.subjectType === 'agent') &&
    typeof v.company === 'string' &&
    (v.ownerType === 'company' || v.ownerType === 'individual' || v.ownerType === 'organization') &&
    typeof v.originCountry === 'string' &&
    typeof v.modelName === 'string' &&
    typeof v.version === 'string' &&
    (v.status === 'planned' || v.status === 'active' || v.status === 'deactivated') &&
    typeof v.agentSpecialization === 'string' &&
    Array.isArray(v.modalities) &&
    v.modalities.every((m) => typeof m === 'string') &&
    typeof v.parameterScale === 'string' &&
    isFingerprintDisclosure(v.fingerprint) &&
    typeof v.trainingSources === 'string' &&
    typeof v.agenticDecisionMaking === 'boolean' &&
    Array.isArray(v.hazardCategories) &&
    Array.isArray(v.decisionCategorization) &&
    v.decisionCategorization.every(isDecisionCategorization) &&
    typeof v.unintendedConsequences === 'string' &&
    typeof v.issuedDate === 'string' &&
    typeof v.effectiveDate === 'string' &&
    typeof v.endDate === 'string'
  )
}
