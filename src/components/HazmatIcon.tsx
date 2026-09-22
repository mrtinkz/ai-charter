import type { HazardSeverity } from '../types/certification'

interface HazmatIconProps {
  /** Short single-word label shown inside the diamond, e.g. "Agentic", "Data" */
  label: string
  /** Mild fill tint by severity; omit for the neutral white placard. */
  severity?: HazardSeverity
  size?: number
}

// Mild, calm tints so the placard reads as a category marker, not an alarm.
const SEVERITY_FILL: Record<HazardSeverity, string> = {
  low: '#ecfdf5',
  moderate: '#fffbeb',
  high: '#fff7ed',
  critical: '#fff1f2',
}

/**
 * Original diamond warning-placard style icon, inspired by the general idea
 * of hazmat placards (a diamond carrying a short label) so a certification
 * can flag categories of risk at a glance. Drawn as SVG so the diamond and
 * its text stay inside a fixed square bounding box, no DOM rotation, no
 * overflow into neighboring icons.
 */
export default function HazmatIcon({ label, severity, size = 52 }: HazmatIconProps) {
  const text = label.toUpperCase()
  const fontSize = text.length > 8 ? 11 : 15
  const fill = severity ? SEVERITY_FILL[severity] : 'white'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Hazard category: ${label}${severity ? `, ${severity} severity` : ''}`}
    >
      <polygon points="50,4 96,50 50,96 4,50" fill={fill} stroke="black" strokeWidth="5" />
      <text
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill="black"
        fontFamily="system-ui, sans-serif"
      >
        {text}
      </text>
    </svg>
  )
}

