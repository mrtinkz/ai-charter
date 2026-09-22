import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import CertificationCard from '../components/CertificationCard'
import { useSeo } from '../hooks/useSeo'
import {
  DECISION_CATEGORIES,
  HAZARD_CATEGORIES,
  isCertification,
  type Certification,
  type CertificationStatus,
  type DecisionCategorization,
  type DecisionCategory,
  type HazardCategory,
} from '../types/certification'

const DECISION_CATEGORY_NAMES = Object.keys(DECISION_CATEGORIES) as DecisionCategory[]

const EMPTY_FORM: {
  company: string
  modelName: string
  version: string
  status: CertificationStatus
  trainingSources: string
  agenticDecisionMaking: boolean
  hazardCategories: HazardCategory[]
  decisionCategorization: DecisionCategorization[]
  unintendedConsequences: string
  effectiveDate: string
  endDate: string
} = {
  company: '',
  modelName: '',
  version: '',
  status: 'planned',
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
      'Download an AI model certification, or upload one to render it. Certification is a public contract covering training sources, agentic decision-making, and unintended consequences.',
    path: '/certify',
  })

  const [form, setForm] = useState(EMPTY_FORM)
  const [downloaded, setDownloaded] = useState<Certification | null>(null)
  const [uploaded, setUploaded] = useState<Certification | null>(null)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newCategory, setNewCategory] = useState<DecisionCategory>(DECISION_CATEGORY_NAMES[0])
  const [newSubcategory, setNewSubcategory] = useState<string>(DECISION_CATEGORIES[DECISION_CATEGORY_NAMES[0]][0])

  function toggleHazard(category: HazardCategory) {
    setForm((prev) => ({
      ...prev,
      hazardCategories: prev.hazardCategories.includes(category)
        ? prev.hazardCategories.filter((c) => c !== category)
        : [...prev.hazardCategories, category],
    }))
  }

  function addDecisionCategorization() {
    setForm((prev) => {
      const exists = prev.decisionCategorization.some(
        (entry) => entry.category === newCategory && entry.subcategory === newSubcategory,
      )
      if (exists) return prev
      return {
        ...prev,
        decisionCategorization: [...prev.decisionCategorization, { category: newCategory, subcategory: newSubcategory }],
      }
    })
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
    if (!form.company || !form.modelName || !form.version || !form.effectiveDate) return
    if (form.endDate && form.endDate < form.effectiveDate) {
      setFormError('End date cannot be before the effective date.')
      return
    }

    const cert: Certification = {
      schema: 'ai-charter-certification-v1',
      ...form,
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
        <h1 className="text-3xl font-semibold m-0">Certify a model</h1>
        <p className="mt-2 text-black/70">
          Certification is a contract: it names the model and version, whether it is active, whether it makes
          agentic decisions, and what unintended consequences have been reported. Fill in the form to download a
          certification file, or upload one to render it below.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1 text-sm">
            Company
            <input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Model name
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
                  const category = e.target.value as DecisionCategory
                  setNewCategory(category)
                  setNewSubcategory(DECISION_CATEGORIES[category][0])
                }}
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {DECISION_CATEGORY_NAMES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Sub-category
              <select
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {DECISION_CATEGORIES[newCategory].map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </label>
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
