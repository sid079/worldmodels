import { useState, useMemo } from 'react'
import { companies } from '../../data/companies'
import type { CompanyOverview, Stage } from '../../data/companies'
import ScatterPlot from '../ScatterPlot'

const dotClass: Record<string, string> = {
  revenue: 'stage-dot-revenue',
  'pre-revenue': 'stage-dot-pre-revenue',
  'pre-product': 'stage-dot-pre-product',
  production: 'stage-dot-production',
  research: 'stage-dot-research',
  'limited-access': 'stage-dot-limited',
}

function StageDot({ stage }: { stage: Stage }) {
  const config = {
    revenue: { color: 'bg-green-500', label: 'Revenue' },
    'pre-revenue': { color: 'bg-yellow-500', label: 'Pre-Revenue' },
    'pre-product': { color: 'bg-red-500', label: 'Pre-Product' },
    production: { color: 'bg-green-500', label: 'Production' },
    research: { color: 'bg-red-500', label: 'Research' },
    'limited-access': { color: 'bg-yellow-500', label: 'Limited' },
  }
  const { color, label } = config[stage] || config['pre-revenue']
  return (
    <span className="flex items-center gap-2" title={label}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${color} ${dotClass[stage] || ''}`} />
      <span className="font-mono text-xs">{label}</span>
    </span>
  )
}

type SortKey = keyof CompanyOverview | null
type ViewMode = 'table' | 'scatter'

export default function Overview() {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [view, setView] = useState<ViewMode>('table')

  const sortedCompanies = useMemo(() => {
    if (!sortKey) return companies
    return [...companies].sort((a, b) => {
      const aVal = a.overview[sortKey as keyof CompanyOverview]
      const bVal = b.overview[sortKey as keyof CompanyOverview]
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const headers: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Company' },
    { key: 'founded', label: 'Founded' },
    { key: 'hq', label: 'HQ' },
    { key: 'funding', label: 'Funding' },
    { key: 'valuation', label: 'Valuation' },
    { key: 'teamSize', label: 'Team Size' },
    { key: 'keyFounders', label: 'Key Founders' },
    { key: 'stage', label: 'Stage' },
  ]

  return (
    <div>
      {/* View toggle */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setView('table')}
          className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
            view === 'table'
              ? 'bg-accent/10 text-accent'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          <span className="mr-1.5">&#9638;</span>Table
        </button>
        <button
          onClick={() => setView('scatter')}
          className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
            view === 'scatter'
              ? 'bg-accent/10 text-accent'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          <span className="mr-1.5">&#8226;&#8226;</span>Graph
        </button>
      </div>

      {view === 'scatter' ? (
        <ScatterPlot />
      ) : (
        <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                {headers.map(({ key, label }, i) => (
                  <th
                    key={label}
                    onClick={() => key && handleSort(key)}
                    className={`cursor-pointer px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted ${
                      key ? 'hover:text-accent' : ''
                    } ${sortKey === key ? 'text-accent' : ''} ${i === 0 ? 'min-w-[140px]' : ''}`}
                  >
                    {label}
                    {sortKey === key && (
                      <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-[rgba(255,255,255,0.06)] transition-colors hover:bg-surface/30"
                >
                  <td className="px-4 py-3 font-mono text-sm text-text-primary whitespace-nowrap">
                    {company.overview.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm tabular-nums text-text-secondary">
                    {company.overview.founded}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-text-secondary">
                    {company.overview.hq}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm tabular-nums text-text-secondary">
                    {company.overview.funding}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm tabular-nums text-text-secondary">
                    {company.overview.valuation}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm tabular-nums text-text-secondary">
                    {company.overview.teamSize}
                  </td>
                  <td className="max-w-[200px] px-4 py-3 font-mono text-xs text-text-secondary">
                    {company.overview.keyFounders}
                  </td>
                  <td className="px-4 py-3">
                    <StageDot stage={company.overview.stage} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
