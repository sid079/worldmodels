import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { companies } from '../../data/companies'
import type { TechnologyInfo } from '../../data/companies'

type SortKey = keyof TechnologyInfo | 'name' | null

function getOpenSourceColor(val: string): string {
  if (val.toLowerCase().startsWith('yes')) return '#22c55e'
  if (val.toLowerCase().startsWith('partial')) return '#eab308'
  if (val.toLowerCase().startsWith('planned')) return '#3b82f6'
  return '#ef4444'
}

export default function Technology() {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedCompanies = useMemo(() => {
    if (!sortKey) return companies
    return [...companies].sort((a, b) => {
      const aVal = sortKey === 'name' ? a.overview.name : a.technology[sortKey as keyof TechnologyInfo]
      const bVal = sortKey === 'name' ? b.overview.name : b.technology[sortKey as keyof TechnologyInfo]
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [sortKey, sortDir])

  const tableHeaders: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Company' },
    { key: 'architectureType', label: 'Architecture' },
    { key: 'trainingDataStrategy', label: 'Training Data' },
    { key: 'modelSize', label: 'Model Size' },
    { key: 'outputQuality', label: 'Output' },
    { key: 'openSource', label: 'Open Source' },
    { key: 'keyTechnicalInnovation', label: 'Key Innovation' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              {tableHeaders.map(({ key, label }, i) => (
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
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.technology.architectureType}
                </td>
                <td className="max-w-[180px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.technology.trainingDataStrategy}
                </td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums text-text-secondary">
                  {company.technology.modelSize}
                </td>
                <td className="max-w-[160px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.technology.outputQuality}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-xs"
                    style={{
                      backgroundColor: `${getOpenSourceColor(company.technology.openSource)}15`,
                      color: getOpenSourceColor(company.technology.openSource),
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: getOpenSourceColor(company.technology.openSource) }}
                    />
                    {company.technology.openSource}
                  </span>
                </td>
                <td className="max-w-[220px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.technology.keyTechnicalInnovation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
