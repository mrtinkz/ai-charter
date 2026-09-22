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
]

export const HAZARD_CATEGORIES = HAZARD_CATEGORY_DEFINITIONS.map((definition) => definition.label)

export type HazardCategory = string

export type CertificationStatus = 'planned' | 'active' | 'deactivated'

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

export interface DecisionCategorization {
  category: DecisionCategory
  subcategory: string
}

function isDecisionCategorization(value: unknown): value is DecisionCategorization {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.category === 'string' && v.category in DECISION_CATEGORIES && typeof v.subcategory === 'string'
}

export interface Certification {
  schema: 'ai-charter-certification-v1'
  company: string
  modelName: string
  version: string
  status: CertificationStatus
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
    typeof v.company === 'string' &&
    typeof v.modelName === 'string' &&
    typeof v.version === 'string' &&
    (v.status === 'planned' || v.status === 'active' || v.status === 'deactivated') &&
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
