import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import CertificationCard from '../components/CertificationCard'
import { useSeo } from '../hooks/useSeo'
import {
  DECISION_CATEGORIES,
  HAZARD_CATEGORIES,
  isCertification,
  MODALITIES,
  OWNER_TYPE_LABELS,
  type Certification,
  type CertificationStatus,
  type CertificationSubjectType,
  type DecisionCategorization,
  type DecisionCategory,
  type HazardCategory,
  type Modality,
  type OwnerType,
} from '../types/certification'

const DECISION_CATEGORY_NAMES = Object.keys(DECISION_CATEGORIES) as DecisionCategory[]
const OTHER_CATEGORY = 'Other (specify)'
const OWNER_TYPES = Object.keys(OWNER_TYPE_LABELS) as OwnerType[]

const EMPTY_FORM: {
  subjectType: CertificationSubjectType
  company: string
  ownerType: OwnerType
  originCountry: string
  modelName: string
  version: string
  status: CertificationStatus
  agentSpecialization: string
  modalities: Modality[]
  parameterScale: string
  fingerprintPresent: boolean
  fingerprintMethod: string
  trainingSources: string
  agenticDecisionMaking: boolean
  hazardCategories: HazardCategory[]
  decisionCategorization: DecisionCategorization[]
  unintendedConsequences: string
  effectiveDate: string
  endDate: string
} = {
  subjectType: 'model',
  company: '',
  ownerType: 'company',
  originCountry: '',
  modelName: '',
  version: '',
  status: 'planned',
  agentSpecialization: '',
  modalities: [],
  parameterScale: '',
  fingerprintPresent: false,
  fingerprintMethod: '',
  trainingSources: '',
  agenticDecisionMaking: false,
  hazardCategories: [],
  decisionCategorization: [],
  unintendedConsequences: '',
  effectiveDate: '',
  endDate: '',
}

export default function Certify() {
  useSeo({
    title: 'Certify a Model',
    description:
      'Download an AI model or agent certification, or upload one to render it. Certification is a public contract covering origin, capabilities, training sources, agentic decision-making, and unintended consequences.',
    path: '/certify',
  })

  const [form, setForm] = useState(EMPTY_FORM)
  const [downloaded, setDownloaded] = useState<Certification | null>(null)
  const [uploaded, setUploaded] = useState<Certification | null>(null)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newCategory, setNewCategory] = useState<string>(DECISION_CATEGORY_NAMES[0])
  const [newSubcategory, setNewSubcategory] = useState<string>(DECISION_CATEGORIES[DECISION_CATEGORY_NAMES[0]][0])
  const [customCategory, setCustomCategory] = useState('')
  const [customSubcategory, setCustomSubcategory] = useState('')
  const isOtherCategory = newCategory === OTHER_CATEGORY

  const [hazardCustom, setHazardCustom] = useState('')
  const [modalityCustom, setModalityCustom] = useState('')

  function toggleHazard(category: HazardCategory) {
    setForm((prev) => ({
      ...prev,
      hazardCategories: prev.hazardCategories.includes(category)
        ? prev.hazardCategories.filter((c) => c !== category)
        : [...prev.hazardCategories, category],
    }))
  }

  function addCustomHazard() {
    const label = hazardCustom.trim()
    if (!label) return
    setForm((prev) => (prev.hazardCategories.includes(label) ? prev : { ...prev, hazardCategories: [...prev.hazardCategories, label] }))
    setHazardCustom('')
  }

  function removeHazard(category: HazardCategory) {
    setForm((prev) => ({ ...prev, hazardCategories: prev.hazardCategories.filter((c) => c !== category) }))
  }

  function toggleModality(modality: Modality) {
    setForm((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modality)
        ? prev.modalities.filter((m) => m !== modality)
        : [...prev.modalities, modality],
    }))
  }

  function addCustomModality() {
    const label = modalityCustom.trim()
    if (!label) return
    setForm((prev) => (prev.modalities.includes(label) ? prev : { ...prev, modalities: [...prev.modalities, label] }))
    setModalityCustom('')
  }

  function removeModality(modality: Modality) {
    setForm((prev) => ({ ...prev, modalities: prev.modalities.filter((m) => m !== modality) }))
  }

  function addDecisionCategorization() {
    const category = isOtherCategory ? customCategory.trim() : newCategory
    const subcategory = isOtherCategory ? customSubcategory.trim() : newSubcategory
    if (!category || !subcategory) return
    setForm((prev) => {
      const exists = prev.decisionCategorization.some(
        (entry) => entry.category === category && entry.subcategory === subcategory,
      )
      if (exists) return prev
      return {
        ...prev,
        decisionCategorization: [...prev.decisionCategorization, { category, subcategory }],
      }
    })
    if (isOtherCategory) {
      setCustomCategory('')
      setCustomSubcategory('')
    }
  }

  function removeDecisionCategorization(index: number) {
    setForm((prev) => ({
      ...prev,
      decisionCategorization: prev.decisionCategorization.filter((_, i) => i !== index),
    }))
  }

  const [formError, setFormError] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError('')
    if (!form.company || !form.modelName || !form.version || !form.effectiveDate || !form.originCountry) return
    if (form.subjectType === 'agent' && !form.agentSpecialization) {
      setFormError('Specify what the agent specializes in.')
      return
    }
    if (form.endDate && form.endDate < form.effectiveDate) {
      setFormError('End date cannot be before the effective date.')
      return
    }

    const { fingerprintPresent, fingerprintMethod, ...rest } = form
    const cert: Certification = {
      schema: 'ai-charter-certification-v1',
      ...rest,
      fingerprint: { present: fingerprintPresent, method: fingerprintPresent ? fingerprintMethod : '' },
      issuedDate: new Date().toISOString().slice(0, 10),
    }

    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cert.modelName}-${cert.version}-certification.json`.replace(/\s+/g, '-')
    link.click()
    URL.revokeObjectURL(url)

    setDownloaded(cert)
  }

  function handleFile(file: File | undefined) {
    setUploadError('')
    setUploaded(null)
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!isCertification(parsed)) {
          setUploadError('That file is not a recognized ai-charter certification.')
          return
        }
        setUploaded(parsed)
      } catch {
        setUploadError('Could not read that file as JSON.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold m-0">Certify a model or agent</h1>
        <p className="mt-2 text-black/70">
          Certification is a contract: it names who owns and built the model or agent, where it originates, what it
          is capable of, its scale, whether it fingerprints its output, whether it makes agentic decisions, and what
          unintended consequences have been reported. Fill in the form to download a certification file, or upload
          one to render it below.
        </p>
        <p className="mt-3 text-black/70 bg-blue-50 rounded-lg px-4 py-3 text-sm max-w-2xl">
          To list your certification in the public{' '}
          <Link to="/registry" className="text-blue-600 font-medium">
            registry
          </Link>
          , download it below, add the JSON file to <code>src/data/certifications/</code> in this repository, and
          open a pull request. Anyone can review it before it goes live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-slate-200 rounded-lg p-6">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm mb-1">What are you certifying?</legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="subjectType"
                checked={form.subjectType === 'model'}
                onChange={() => setForm({ ...form, subjectType: 'model' })}
              />
              Base model
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="subjectType"
                checked={form.subjectType === 'agent'}
                onChange={() => setForm({ ...form, subjectType: 'agent' })}
              />
              Specialized agent
            </label>
          </div>
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1 text-sm">
            Owner name (company, organization, or individual)
            <input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Owner type
            <select
              value={form.ownerType}
              onChange={(e) => setForm({ ...form, ownerType: e.target.value as OwnerType })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {OWNER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {OWNER_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Country of origin
            <input
              required
              placeholder="e.g. United States, or Undisclosed"
              value={form.originCountry}
              onChange={(e) => setForm({ ...form, originCountry: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            {form.subjectType === 'agent' ? 'Underlying model name' : 'Model name'}
            <input
              required
              value={form.modelName}
              onChange={(e) => setForm({ ...form, modelName: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Version
            <input
              required
              value={form.version}
              onChange={(e) => setForm({ ...form, version: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Training parameter scale
            <input
              placeholder="e.g. 7B, 24B, 1.8T, or Undisclosed"
              value={form.parameterScale}
              onChange={(e) => setForm({ ...form, parameterScale: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as CertificationStatus })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="deactivated">Deactivated</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Effective date
            <input
              required
              type="date"
              value={form.effectiveDate}
              onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            End date (optional)
            <input
              type="date"
              value={form.endDate}
              min={form.effectiveDate || undefined}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        {form.subjectType === 'agent' && (
          <label className="flex flex-col gap-1 text-sm">
            Agent specialization
            <input
              required
              placeholder="e.g. Grid outage dispatch and restoration sequencing"
              value={form.agentSpecialization}
              onChange={(e) => setForm({ ...form, agentSpecialization: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        )}

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm mb-1">Capabilities (modalities)</legend>
          <div className="flex flex-wrap gap-4">
            {MODALITIES.map((modality) => (
              <label key={modality} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.modalities.includes(modality)}
                  onChange={() => toggleModality(modality)}
                />
                {modality}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-3 mt-1">
            <label className="flex flex-col gap-1 text-sm">
              Not listed? Add a custom capability
              <input
                value={modalityCustom}
                onChange={(e) => setModalityCustom(e.target.value)}
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <button
              type="button"
              onClick={addCustomModality}
              className="border border-blue-600 text-blue-600 font-medium px-4 py-2 rounded hover:bg-blue-50"
            >
              Add
            </button>
          </div>
          {form.modalities.filter((m) => !MODALITIES.includes(m)).length > 0 && (
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0 mt-1">
              {form.modalities
                .filter((modality) => !MODALITIES.includes(modality))
                .map((modality) => (
                  <li key={modality} className="flex items-center gap-2 text-sm bg-blue-50 rounded-full px-3 py-1">
                    {modality}
                    <button
                      type="button"
                      onClick={() => removeModality(modality)}
                      aria-label={`Remove ${modality}`}
                      className="text-blue-700 font-semibold"
                    >
                      &times;
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm mb-1">Fingerprinting</legend>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.fingerprintPresent}
              onChange={(e) => setForm({ ...form, fingerprintPresent: e.target.checked })}
            />
            Output carries a fingerprint or watermark
          </label>
          {form.fingerprintPresent && (
            <input
              required
              placeholder="How is it fingerprinted? e.g. Invisible token-pattern watermark"
              value={form.fingerprintMethod}
              onChange={(e) => setForm({ ...form, fingerprintMethod: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </fieldset>

        <label className="flex flex-col gap-1 text-sm">
          Training sources (books, datasets, disclosures)
          <textarea
            required
            rows={3}
            value={form.trainingSources}
            onChange={(e) => setForm({ ...form, trainingSources: e.target.value })}
            className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.agenticDecisionMaking}
            onChange={(e) => setForm({ ...form, agenticDecisionMaking: e.target.checked })}
          />
          This model makes agentic decisions
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm mb-1">Hazard categories to disclose</legend>
          <div className="flex flex-wrap gap-4">
            {HAZARD_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.hazardCategories.includes(category)}
                  onChange={() => toggleHazard(category)}
                />
                {category}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-3 mt-1">
            <label className="flex flex-col gap-1 text-sm">
              Not listed? Add a custom hazard category
              <input
                value={hazardCustom}
                onChange={(e) => setHazardCustom(e.target.value)}
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <button
              type="button"
              onClick={addCustomHazard}
              className="border border-blue-600 text-blue-600 font-medium px-4 py-2 rounded hover:bg-blue-50"
            >
              Add
            </button>
          </div>
          {form.hazardCategories.filter((c) => !HAZARD_CATEGORIES.includes(c)).length > 0 && (
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0 mt-1">
              {form.hazardCategories
                .filter((category) => !HAZARD_CATEGORIES.includes(category))
                .map((category) => (
                  <li key={category} className="flex items-center gap-2 text-sm bg-blue-50 rounded-full px-3 py-1">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeHazard(category)}
                      aria-label={`Remove ${category}`}
                      className="text-blue-700 font-semibold"
                    >
                      &times;
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm mb-1">
            Decision categorization &amp; sub-categorization (yearly disclosure)
          </legend>
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Category
              <select
                value={newCategory}
                onChange={(e) => {
                  const category = e.target.value
                  setNewCategory(category)
                  if (category !== OTHER_CATEGORY) {
                    setNewSubcategory(DECISION_CATEGORIES[category as DecisionCategory][0])
                  }
                }}
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {DECISION_CATEGORY_NAMES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value={OTHER_CATEGORY}>{OTHER_CATEGORY}</option>
              </select>
            </label>
            {isOtherCategory ? (
              <>
                <label className="flex flex-col gap-1 text-sm">
                  Custom category
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Custom sub-category
                  <input
                    value={customSubcategory}
                    onChange={(e) => setCustomSubcategory(e.target.value)}
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              </>
            ) : (
              <label className="flex flex-col gap-1 text-sm">
                Sub-category
                <select
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {DECISION_CATEGORIES[newCategory as DecisionCategory].map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              type="button"
              onClick={addDecisionCategorization}
              className="border border-blue-600 text-blue-600 font-medium px-4 py-2 rounded hover:bg-blue-50"
            >
              Add
            </button>
          </div>
          {form.decisionCategorization.length > 0 && (
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0 mt-1">
              {form.decisionCategorization.map((entry, index) => (
                <li
                  key={`${entry.category}-${entry.subcategory}`}
                  className="flex items-center gap-2 text-sm bg-blue-50 rounded-full px-3 py-1"
                >
                  {entry.category} &rsaquo; {entry.subcategory}
                  <button
                    type="button"
                    onClick={() => removeDecisionCategorization(index)}
                    aria-label={`Remove ${entry.category} / ${entry.subcategory}`}
                    className="text-blue-700 font-semibold"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <label className="flex flex-col gap-1 text-sm">
          Unintended consequences on record
          <textarea
            rows={2}
            value={form.unintendedConsequences}
            onChange={(e) => setForm({ ...form, unintendedConsequences: e.target.value })}
            placeholder="None reported."
            className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        {formError && <p className="text-red-600 text-sm m-0">{formError}</p>}

        <button
          type="submit"
          className="self-start bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700"
        >
          Download certification
        </button>
      </form>

      {downloaded && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Downloaded certification</h2>
          <CertificationCard cert={downloaded} />
        </div>
      )}

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold m-0">Upload a certification</h2>
        <p className="mt-2 text-black/70">
          Have a certification file already? Upload it here to render it.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="mt-3 text-sm"
        />
        {uploadError && <p className="text-red-600 text-sm mt-2">{uploadError}</p>}
        {uploaded && (
          <div className="mt-5">
            <CertificationCard cert={uploaded} />
          </div>
        )}
      </div>
    </div>
  )
}
