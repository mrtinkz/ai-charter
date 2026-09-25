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
    label: 'Multi-Agent Interaction',
    abbreviation: 'MULTI',
    severity: 'high',
    description: 'Model or agent coordinates with other agents, where their combined behavior can differ from any one acting alone.',
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
    label: 'Battlefield Use',
    abbreviation: 'BATTLE',
    severity: 'critical',
    description: 'Model, agent, or autonomous bot that operates in, is used within, handles, or is capable of a battlefield or combat environment.',
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

// EU AI Act risk tier the subject self-classifies under.
export type RiskTier = 'unacceptable' | 'high' | 'limited' | 'minimal'

export interface RiskTierDefinition {
  value: RiskTier
  label: string
  description: string
}

export const RISK_TIER_DEFINITIONS: RiskTierDefinition[] = [
  { value: 'unacceptable', label: 'Unacceptable risk', description: 'Banned use under the EU AI Act, such as social scoring. Should not be deployed.' },
  { value: 'high', label: 'High risk', description: 'Regulated high-risk use under the EU AI Act, such as hiring, credit, or critical infrastructure.' },
  { value: 'limited', label: 'Limited risk', description: 'Transparency obligations apply, such as telling users they interact with AI.' },
  { value: 'minimal', label: 'Minimal risk', description: 'Little to no regulatory obligation under the EU AI Act.' },
]

// NIST AI Risk Management Framework core functions a certification can map to.
export const NIST_RMF_FUNCTIONS = ['Govern', 'Map', 'Measure', 'Manage'] as const

// Issuer-provided detached signature over the certification, for provenance.
export interface CertificationSignature {
  algorithm: string
  publicKeyUrl: string
  value: string
}

export type CertificationStatus = 'planned' | 'active' | 'deactivated'

// Who holds the certification: a registered company, a named individual, or a non-profit/public body.
export type OwnerType = 'company' | 'individual' | 'organization'

export const OWNER_TYPE_LABELS: Record<OwnerType, string> = {
  company: 'Company',
  individual: 'Individual',
  organization: 'Organization / non-profit',
}

// A certification can cover a base model, a specialized agent built on top of one, or a physical autonomous bot.
export type CertificationSubjectType = 'model' | 'agent' | 'autonomous-bot'

export const SUBJECT_TYPE_LABELS: Record<CertificationSubjectType, string> = {
  model: 'Model',
  agent: 'Agent',
  'autonomous-bot': 'Autonomous bot',
}

// Domain an autonomous bot operates in. Required when subjectType is 'autonomous-bot'.
// Open-ended by design, same as the other reference lists.
export interface BotCategoryDefinition {
  value: string
  label: string
  description: string
}

export const BOT_CATEGORY_DEFINITIONS: BotCategoryDefinition[] = [
  { value: 'civil', label: 'Civil', description: 'Public and civic use, such as transport, utilities, or municipal services.' },
  { value: 'military', label: 'Military / defense', description: 'Defense or combat use, including battlefield and weapons-adjacent systems.' },
  { value: 'industrial', label: 'Industrial', description: 'Factory, warehouse, logistics, or heavy-industry automation.' },
  { value: 'commercial', label: 'Commercial', description: 'Retail, hospitality, or other customer-facing commercial settings.' },
  { value: 'agricultural', label: 'Agricultural', description: 'Farming, harvesting, and land or livestock management.' },
  { value: 'medical', label: 'Medical', description: 'Clinical, surgical, or care settings.' },
  { value: 'domestic', label: 'Domestic / consumer', description: 'Home and personal consumer use.' },
  { value: 'research', label: 'Research', description: 'Laboratory, scientific, or exploratory research use.' },
]

export const BOT_CATEGORIES = BOT_CATEGORY_DEFINITIONS.map((definition) => definition.value)

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

// Data-handling / regulatory standards a model or agent is certified to meet.
// Curated to currently active regimes; open-ended, add a custom label if one is missing.
export interface ComplianceStandardDefinition {
  label: string
  /** Short code shown on the chip; keep it recognizable. */
  abbreviation: string
  description: string
}

export const COMPLIANCE_STANDARD_DEFINITIONS: ComplianceStandardDefinition[] = [
  { label: 'PII Handling', abbreviation: 'PII', description: 'Handles personally identifiable information under recognized data-protection practice.' },
  { label: 'Sensitive PII', abbreviation: 'SPII', description: 'Handles sensitive personal data such as government IDs, biometrics, or precise location.' },
  { label: 'HIPAA (PHI)', abbreviation: 'HIPAA', description: 'Handles US protected health information under HIPAA safeguards.' },
  { label: 'GDPR', abbreviation: 'GDPR', description: 'Processes EU/EEA personal data under the General Data Protection Regulation.' },
  { label: 'CCPA / CPRA', abbreviation: 'CCPA', description: 'Handles California consumer personal data under CCPA/CPRA.' },
  { label: 'PCI DSS', abbreviation: 'PCI', description: 'Handles cardholder and payment data under PCI DSS.' },
  { label: 'Classified / SECRET', abbreviation: 'SECRET', description: 'Cleared to handle classified or SECRET-level government data under the relevant national scheme.' },
  { label: 'SOC 2', abbreviation: 'SOC2', description: 'Operated under a SOC 2 report for security, availability, and confidentiality controls.' },
  { label: 'ISO/IEC 27001', abbreviation: 'ISO27001', description: 'Information-security management certified to ISO/IEC 27001.' },
  { label: 'FedRAMP', abbreviation: 'FedRAMP', description: 'Authorized to handle US federal government cloud data under FedRAMP.' },
  { label: 'DPDP Act (India)', abbreviation: 'DPDP', description: 'Processes personal data under India\u2019s Digital Personal Data Protection Act.' },
  { label: 'PIPL (China)', abbreviation: 'PIPL', description: 'Processes personal data under China\u2019s Personal Information Protection Law.' },
  { label: 'LGPD (Brazil)', abbreviation: 'LGPD', description: 'Processes personal data under Brazil\u2019s Lei Geral de Proteção de Dados.' },
  { label: 'PIPEDA (Canada)', abbreviation: 'PIPEDA', description: 'Processes personal data under Canada\u2019s PIPEDA.' },
  { label: 'POPIA (South Africa)', abbreviation: 'POPIA', description: 'Processes personal data under South Africa\u2019s Protection of Personal Information Act.' },
]

export const COMPLIANCE_STANDARDS = COMPLIANCE_STANDARD_DEFINITIONS.map((definition) => definition.label)

// Where a model or agent is cleared to operate. Coarse regions, not a full country list.
export interface OperatingRegionDefinition {
  label: string
  description: string
}

export const OPERATING_REGION_DEFINITIONS: OperatingRegionDefinition[] = [
  { label: 'Global', description: 'Cleared to operate worldwide, subject to local law.' },
  { label: 'North America (NA)', description: 'United States, Canada, and Mexico.' },
  { label: 'Latin America (LATAM)', description: 'Central and South America and the Caribbean.' },
  { label: 'European Union (EU/EEA)', description: 'EU and European Economic Area member states.' },
  { label: 'United Kingdom (UK)', description: 'United Kingdom.' },
  { label: 'Middle East & North Africa (MENA)', description: 'Middle East and North Africa.' },
  { label: 'Sub-Saharan Africa (SSA)', description: 'Sub-Saharan Africa.' },
  { label: 'Asia-Pacific (APAC)', description: 'East, Southeast, and South Asia and Oceania.' },
]

export const OPERATING_REGIONS = OPERATING_REGION_DEFINITIONS.map((definition) => definition.label)

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

function isCertificationSignature(value: unknown): value is CertificationSignature {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.algorithm === 'string' && typeof v.publicKeyUrl === 'string' && typeof v.value === 'string'
}

export interface Certification {
  schema: 'ai-charter-certification-v1'
  /**
   * Opaque, immutable identifier for this certification, assigned once at issue time and never
   * recomputed. Format: 'urn:ai-charter:cert:<uuid>'. Like a DOI, it is not derived from content,
   * so updating disclosure fields never changes it. Resolve it in the public registry to
   * cross-verify, and pair it with the optional signature for issuer authenticity.
   */
  certificationId: string
  subjectType: CertificationSubjectType
  company: string
  ownerType: OwnerType
  originCountry: string
  modelName: string
  version: string
  status: CertificationStatus
  /** Required when subjectType is 'agent': what the agent specializes in, e.g. "Grid outage dispatch". */
  agentSpecialization: string
  /** Required when subjectType is 'autonomous-bot': its operating domain, e.g. "military". Empty otherwise. */
  botCategory?: string
  modalities: Modality[]
  /** Freeform disclosure, e.g. "7B", "24B", "1.8T", or "Undisclosed" — scales and units vary too widely for an enum. */
  parameterScale: string
  fingerprint: FingerprintDisclosure
  trainingSources: string
  agenticDecisionMaking: boolean
  hazardCategories: HazardCategory[]
  /** Data-handling / regulatory standards the subject is certified to meet. Optional for backward compatibility. */
  complianceStandards?: string[]
  /** Regions the subject is cleared to operate in. Optional for backward compatibility. */
  operatingRegions?: string[]
  /** EU AI Act risk tier the subject self-classifies under. Optional. */
  riskTier?: RiskTier
  /** NIST AI RMF core functions this certification addresses. Optional. */
  nistFunctions?: string[]
  /** Measured energy or compute profile, e.g. "0.8 kWh per 1M tokens". Optional. */
  energyProfile?: string
  /** Public URLs to logged incidents behind unintendedConsequences. Optional. */
  incidentReferences?: string[]
  /** Next yearly decision-disclosure due date, YYYY-MM-DD. Optional. */
  nextDisclosureDate?: string
  /** Issuer-provided detached signature over this certification. Optional. */
  signature?: CertificationSignature
  decisionCategorization: DecisionCategorization[]
  unintendedConsequences: string
  issuedDate: string
  effectiveDate: string
  endDate: string
}

const CERTIFICATION_ID_PREFIX = 'urn:ai-charter:cert:'

// Mint a new opaque, immutable certification identifier. Called once, at issue time.
export function newCertificationId(): string {
  return `${CERTIFICATION_ID_PREFIX}${crypto.randomUUID()}`
}

export function isCertificationId(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith(CERTIFICATION_ID_PREFIX) && value.length > CERTIFICATION_ID_PREFIX.length
}

// Bare UUID part of a certification id, safe to use in a URL path (the full id has colons).
export function certificationUuid(certificationId: string): string {
  return certificationId.startsWith(CERTIFICATION_ID_PREFIX)
    ? certificationId.slice(CERTIFICATION_ID_PREFIX.length)
    : certificationId
}

export function isCertification(value: unknown): value is Certification {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    v.schema === 'ai-charter-certification-v1' &&
    isCertificationId(v.certificationId) &&
    (v.subjectType === 'model' || v.subjectType === 'agent' || v.subjectType === 'autonomous-bot') &&
    typeof v.company === 'string' &&
    (v.ownerType === 'company' || v.ownerType === 'individual' || v.ownerType === 'organization') &&
    typeof v.originCountry === 'string' &&
    typeof v.modelName === 'string' &&
    typeof v.version === 'string' &&
    (v.status === 'planned' || v.status === 'active' || v.status === 'deactivated') &&
    typeof v.agentSpecialization === 'string' &&
    (v.botCategory === undefined || typeof v.botCategory === 'string') &&
    Array.isArray(v.modalities) &&
    v.modalities.every((m) => typeof m === 'string') &&
    typeof v.parameterScale === 'string' &&
    isFingerprintDisclosure(v.fingerprint) &&
    typeof v.trainingSources === 'string' &&
    typeof v.agenticDecisionMaking === 'boolean' &&
    Array.isArray(v.hazardCategories) &&
    (v.complianceStandards === undefined ||
      (Array.isArray(v.complianceStandards) && v.complianceStandards.every((s) => typeof s === 'string'))) &&
    (v.operatingRegions === undefined ||
      (Array.isArray(v.operatingRegions) && v.operatingRegions.every((s) => typeof s === 'string'))) &&
    (v.riskTier === undefined ||
      v.riskTier === 'unacceptable' ||
      v.riskTier === 'high' ||
      v.riskTier === 'limited' ||
      v.riskTier === 'minimal') &&
    (v.nistFunctions === undefined ||
      (Array.isArray(v.nistFunctions) && v.nistFunctions.every((s) => typeof s === 'string'))) &&
    (v.energyProfile === undefined || typeof v.energyProfile === 'string') &&
    (v.incidentReferences === undefined ||
      (Array.isArray(v.incidentReferences) && v.incidentReferences.every((s) => typeof s === 'string'))) &&
    (v.nextDisclosureDate === undefined || typeof v.nextDisclosureDate === 'string') &&
    (v.signature === undefined || isCertificationSignature(v.signature)) &&
    Array.isArray(v.decisionCategorization) &&
    v.decisionCategorization.every(isDecisionCategorization) &&
    typeof v.unintendedConsequences === 'string' &&
    typeof v.issuedDate === 'string' &&
    typeof v.effectiveDate === 'string' &&
    typeof v.endDate === 'string'
  )
}

// One row per Certification field, for the /schema page. Single source of truth so the
// human-readable table and the JSON schema at /schema/certification.schema.json stay in sync.
export interface SchemaFieldDefinition {
  field: string
  type: string
  description: string
}

export const CERTIFICATION_SCHEMA_FIELDS: SchemaFieldDefinition[] = [
  { field: 'schema', type: '"ai-charter-certification-v1"', description: 'Schema version marker.' },
  { field: 'certificationId', type: 'string (urn:ai-charter:cert:<uuid>)', description: 'Opaque, immutable identifier assigned once at issue time. Not derived from content, so disclosure updates never change it. Resolve it in the registry to cross-verify.' },
  { field: 'subjectType', type: '"model" | "agent" | "autonomous-bot"', description: 'Whether this covers a base model, an agent built on top of one, or a physical autonomous bot.' },
  { field: 'company', type: 'string', description: 'Name of the certification holder.' },
  { field: 'ownerType', type: '"company" | "individual" | "organization"', description: 'Who holds the certification.' },
  { field: 'originCountry', type: 'string', description: 'Country of origin. May be empty when undisclosed.' },
  { field: 'modelName', type: 'string', description: 'Name of the model, or of the agent when subjectType is "agent".' },
  { field: 'version', type: 'string', description: 'Version this certification applies to.' },
  { field: 'status', type: '"planned" | "active" | "deactivated"', description: 'Current lifecycle state of the certification.' },
  { field: 'agentSpecialization', type: 'string', description: 'Required when subjectType is "agent": what the agent specializes in. Empty for a model.' },
  { field: 'botCategory', type: 'string', description: 'Required when subjectType is "autonomous-bot": its operating domain, e.g. "civil", "military", "industrial". Empty otherwise.' },
  { field: 'modalities', type: 'string[]', description: 'Capabilities disclosed, e.g. "Text Generation". Open-ended, see /placards for the closest reference set.' },
  { field: 'parameterScale', type: 'string', description: 'Freeform training parameter scale, e.g. "7B", "1.8T", or "Undisclosed".' },
  { field: 'fingerprint', type: '{ present: boolean, method: string }', description: 'Whether output is fingerprinted, and how.' },
  { field: 'trainingSources', type: 'string', description: 'Disclosure of what the model or agent was trained on.' },
  { field: 'agenticDecisionMaking', type: 'boolean', description: 'Whether the model or agent decides on its own, without a human confirming each decision.' },
  { field: 'hazardCategories', type: 'string[]', description: 'Hazard placard labels disclosed, HAZMAT-style. Open-ended, see /placards.' },
  { field: 'complianceStandards', type: 'string[]', description: 'Data-handling / regulatory standards the subject is certified to meet, e.g. "GDPR", "HIPAA (PHI)", "Classified / SECRET". Optional, open-ended.' },
  { field: 'operatingRegions', type: 'string[]', description: 'Regions the subject is cleared to operate in, e.g. "European Union (EU/EEA)", "Asia-Pacific (APAC)". Optional, open-ended.' },
  { field: 'riskTier', type: '"unacceptable" | "high" | "limited" | "minimal"', description: 'EU AI Act risk tier the subject self-classifies under. Optional.' },
  { field: 'nistFunctions', type: 'string[]', description: 'NIST AI RMF functions addressed: Govern, Map, Measure, Manage. Optional.' },
  { field: 'energyProfile', type: 'string', description: 'Measured energy or compute profile, e.g. "0.8 kWh per 1M tokens". Optional.' },
  { field: 'incidentReferences', type: 'string[]', description: 'Public URLs to logged incidents behind unintendedConsequences. Optional.' },
  { field: 'nextDisclosureDate', type: 'string (YYYY-MM-DD)', description: 'Next yearly decision-disclosure due date. Optional.' },
  { field: 'signature', type: '{ algorithm, publicKeyUrl, value }', description: 'Issuer-provided detached signature over the certification, for provenance. Optional.' },
  { field: 'decisionCategorization', type: '{ category: string, subcategory: string }[]', description: 'Yearly categorization of decisions the model or agent took.' },
  { field: 'unintendedConsequences', type: 'string', description: 'Unintended consequences on record. Empty string means none reported.' },
  { field: 'issuedDate', type: 'string (YYYY-MM-DD)', description: 'Date this certification was issued.' },
  { field: 'effectiveDate', type: 'string (YYYY-MM-DD)', description: 'Date this certification takes effect.' },
  { field: 'endDate', type: 'string (YYYY-MM-DD)', description: 'Date this certification ends. Empty string means open-ended.' },
]

