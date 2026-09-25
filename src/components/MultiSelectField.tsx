import { useState } from 'react'

export interface MultiSelectOption {
  label: string
  description?: string
}

interface MultiSelectFieldProps {
  legend: string
  help?: string
  options: MultiSelectOption[]
  values: string[]
  onChange: (next: string[]) => void
  allowCustom?: boolean
  customLabel?: string
  placeholder?: string
}

/** Dropdown-driven multi-select: pick from a curated list, render chips, optionally add custom values. */
export default function MultiSelectField({
  legend,
  help,
  options,
  values,
  onChange,
  allowCustom = false,
  customLabel = 'Not listed? Add a custom entry',
  placeholder = 'Select to add\u2026',
}: MultiSelectFieldProps) {
  const [custom, setCustom] = useState('')

  function add(value: string) {
    const label = value.trim()
    if (!label || values.includes(label)) return
    onChange([...values, label])
  }

  function remove(value: string) {
    onChange(values.filter((entry) => entry !== value))
  }

  const available = options.filter((option) => !values.includes(option.label))

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm mb-1">{legend}</legend>
      {help && <p className="text-xs text-black/60 m-0 -mt-1 mb-1">{help}</p>}

      <select
        value=""
        onChange={(event) => {
          if (event.target.value) add(event.target.value)
        }}
        className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">{placeholder}</option>
        {available.map((option) => (
          <option key={option.label} value={option.label} title={option.description}>
            {option.label}
          </option>
        ))}
      </select>

      {allowCustom && (
        <div className="flex flex-wrap items-end gap-3 mt-1">
          <label className="flex flex-col gap-1 text-sm flex-1 min-w-[220px]">
            {customLabel}
            <input
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              add(custom)
              setCustom('')
            }}
            className="border border-blue-600 text-blue-600 font-medium px-4 py-2 rounded hover:bg-blue-50"
          >
            Add
          </button>
        </div>
      )}

      {values.length > 0 && (
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0 mt-1">
          {values.map((value) => (
            <li key={value} className="flex items-center gap-2 text-sm bg-blue-50 rounded-full px-3 py-1">
              {value}
              <button
                type="button"
                onClick={() => remove(value)}
                aria-label={`Remove ${value}`}
                className="text-blue-700 font-semibold"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  )
}
