import { useState, useMemo } from 'react'
import { companies } from '../data/companies'

const PAD = { top: 30, right: 40, bottom: 55, left: 65 }
const W = 780
const H = 420

const stageColors: Record<string, string> = {
  revenue: '#22c55e',
  'pre-revenue': '#eab308',
  'pre-product': '#ef4444',
  production: '#22c55e',
  research: '#ef4444',
  'limited-access': '#eab308',
}

const stageLabels: Record<string, string> = {
  revenue: 'Revenue',
  'pre-revenue': 'Pre-Revenue',
  'pre-product': 'Pre-Product',
  production: 'Production',
  research: 'Research',
  'limited-access': 'Limited Access',
}

function parseFunding(str: string): number | null {
  const cleaned = str.replace(/[~+,]/g, '').replace('€', '$')
  const match = cleaned.match(/\$(\d+\.?\d*)([BMK])/i)
  if (!match) return null
  const num = parseFloat(match[1])
  const unit = match[2].toUpperCase()
  if (unit === 'B') return num * 1000
  if (unit === 'M') return num
  if (unit === 'K') return num / 1000
  return null
}

function parseTeamSize(str: string): number | null {
  if (str === 'N/A') return null
  if (/^early$/i.test(str.trim())) return 5
  const rangeMatch = str.replace(/[~+]/g, '').match(/(\d+)[–-](\d+)/)
  if (rangeMatch) return (parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2
  const numMatch = str.replace(/[~+]/g, '').match(/(\d+)/)
  if (numMatch) return parseInt(numMatch[1])
  return null
}

export default function ScatterPlot() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const data = useMemo(() => {
    return companies
      .map((c) => ({
        id: c.id,
        name: c.overview.name,
        funding: parseFunding(c.overview.funding),
        teamSize: parseTeamSize(c.overview.teamSize),
        stage: c.overview.stage,
        valuation: c.overview.valuation,
        category: c.overview.category,
      }))
      .filter(
        (d): d is typeof d & { funding: number; teamSize: number } =>
          d.funding !== null && d.teamSize !== null
      )
  }, [])

  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom

  const logMin = Math.log10(Math.max(Math.min(...data.map((d) => d.funding)) * 0.7, 1))
  const logMax = Math.log10(Math.max(...data.map((d) => d.funding)) * 1.3)
  const yMax = Math.max(...data.map((d) => d.teamSize)) * 1.2

  const scaleX = (v: number) =>
    PAD.left + ((Math.log10(Math.max(v, 1)) - logMin) / (logMax - logMin)) * plotW
  const scaleY = (v: number) => PAD.top + plotH - (v / yMax) * plotH

  const xTicks = [10, 25, 50, 100, 250, 500, 1000].filter(
    (v) => Math.log10(v) >= logMin && Math.log10(v) <= logMax
  )
  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round((yMax / 5) * i))

  const legendStages = [...new Set(data.map((d) => d.stage))]

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-text-muted">
        {legendStages.map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: stageColors[s] }}
            />
            {stageLabels[s] || s}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-accent bg-transparent" />
          Interview Target
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full">
        {/* Arrowhead marker */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8" fill="none" stroke="#FAFAFA" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* X axis line with arrow */}
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={W - PAD.right + 10}
          y2={H - PAD.bottom}
          stroke="#FAFAFA"
          strokeWidth="1"
          opacity="0.6"
          markerEnd="url(#arrow)"
        />
        {/* Y axis line with arrow */}
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={PAD.left}
          y2={PAD.top - 10}
          stroke="#FAFAFA"
          strokeWidth="1"
          opacity="0.6"
          markerEnd="url(#arrow)"
        />

        {/* Grid lines */}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line
              x1={scaleX(t)}
              y1={PAD.top}
              x2={scaleX(t)}
              y2={H - PAD.bottom}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2,4"
            />
            {/* Tick mark */}
            <line
              x1={scaleX(t)}
              y1={H - PAD.bottom}
              x2={scaleX(t)}
              y2={H - PAD.bottom + 5}
              stroke="#FAFAFA"
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x={scaleX(t)}
              y={H - PAD.bottom + 20}
              fill="#A1A1AA"
              fontSize="10"
              fontFamily="IBM Plex Mono, monospace"
              textAnchor="middle"
            >
              ${t >= 1000 ? `${t / 1000}B` : `${t}M`}
            </text>
          </g>
        ))}
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD.left}
              y1={scaleY(t)}
              x2={W - PAD.right}
              y2={scaleY(t)}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2,4"
            />
            {/* Tick mark */}
            <line
              x1={PAD.left - 5}
              y1={scaleY(t)}
              x2={PAD.left}
              y2={scaleY(t)}
              stroke="#FAFAFA"
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x={PAD.left - 10}
              y={scaleY(t) + 3}
              fill="#A1A1AA"
              fontSize="10"
              fontFamily="IBM Plex Mono, monospace"
              textAnchor="end"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={W / 2}
          y={H - 6}
          fill="#FAFAFA"
          fontSize="11"
          fontFamily="IBM Plex Mono, monospace"
          textAnchor="middle"
        >
          Funding →
        </text>
        <text
          x={14}
          y={H / 2}
          fill="#FAFAFA"
          fontSize="11"
          fontFamily="IBM Plex Mono, monospace"
          textAnchor="middle"
          transform={`rotate(-90, 14, ${H / 2})`}
        >
          Team Size →
        </text>

        {/* Data points */}
        {data.map((d) => {
          const cx = scaleX(d.funding)
          const cy = scaleY(d.teamSize)
          const hovered = hoveredId === d.id
          const color = stageColors[d.stage] || '#eab308'
          const isTarget = d.category === 'interview-target'

          // Manual label offsets for crowded clusters
          const labelOverrides: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
            'lucid':    { dx: -12, dy: -12, anchor: 'end' },
            'spaitial': { dx: 14, dy: -10, anchor: 'start' },
            'iconic-ai':{ dx: 12, dy: 4,   anchor: 'start' },
          }
          const override = labelOverrides[d.id]
          const labelDx = override?.dx ?? 0
          const labelDy = override?.dy ?? -15
          const anchor: 'start' | 'middle' | 'end' = override?.anchor ?? 'middle'

          return (
            <g
              key={d.id}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Hover glow */}
              <circle
                cx={cx}
                cy={cy}
                r={hovered ? 18 : 0}
                fill={color}
                opacity={0.12}
                style={{ transition: 'all 200ms ease' }}
              />
              {/* Dot */}
              <circle
                cx={cx}
                cy={cy}
                r={hovered ? 8 : isTarget ? 7 : 5}
                fill={color}
                opacity={0.9}
                stroke={isTarget ? '#E8FF59' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isTarget ? 2 : 1}
                style={{ transition: 'all 200ms ease' }}
              />
              {/* Label — always visible */}
              <text
                x={cx + labelDx}
                y={cy + labelDy}
                fill="#FAFAFA"
                fontSize="11"
                fontFamily="IBM Plex Mono, monospace"
                textAnchor={anchor}
                opacity={hovered ? 1 : isTarget ? 0.85 : 0.7}
              >
                {d.name}
              </text>
              {/* Tooltip: valuation */}
              {hovered && (
                <text
                  x={cx}
                  y={cy + 22}
                  fill="#A1A1AA"
                  fontSize="10"
                  fontFamily="IBM Plex Mono, monospace"
                  textAnchor="middle"
                >
                  {d.valuation}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
