import { useState, useMemo } from 'react'
import { companies } from '../../data/companies'

type SortKey =
  | 'name'
  | 'productNames'
  | 'coreCapability'
  | 'inputModalities'
  | 'outputFormat'
  | 'targetVerticals'
  | 'accessModel'
  | null

const verticalIcons: Record<string, string> = {
  Gaming: '🎮',
  'Film/VFX': '🎬',
  Robotics: '🤖',
  Architecture: '🏛️',
  'E-commerce': '🛒',
  Film: '🎬',
  Simulation: '📐',
  Healthcare: '🏥',
  Industrial: '🏭',
  'Real Estate': '🏠',
  Social: '💬',
  Research: '🔬',
  'China market': '🌏',
}

export default function Product() {
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
      let aVal: string
      let bVal: string
      if (sortKey === 'name') {
        aVal = a.overview.name
        bVal = b.overview.name
      } else if (sortKey === 'productNames') {
        aVal = a.product.productNames.join(', ')
        bVal = b.product.productNames.join(', ')
      } else if (sortKey === 'inputModalities') {
        aVal = a.product.inputModalities.join(', ')
        bVal = b.product.inputModalities.join(', ')
      } else if (sortKey === 'outputFormat') {
        aVal = a.product.outputFormat.join(', ')
        bVal = b.product.outputFormat.join(', ')
      } else if (sortKey === 'targetVerticals') {
        aVal = String(a.product.targetVerticals.length)
        bVal = String(b.product.targetVerticals.length)
      } else {
        aVal = String(a.product[sortKey as keyof typeof a.product])
        bVal = String(b.product[sortKey as keyof typeof b.product])
      }
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [sortKey, sortDir])

  const headers: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Company' },
    { key: 'productNames', label: 'Products' },
    { key: 'coreCapability', label: 'Core Capability' },
    { key: 'inputModalities', label: 'Input' },
    { key: 'outputFormat', label: 'Output' },
    { key: 'targetVerticals', label: 'Verticals' },
    { key: 'accessModel', label: 'Access' },
  ]

  return (
    <div>
      <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
        <table className="w-full min-w-[1000px] border-collapse">
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
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.product.productNames.join(', ')}
                </td>
                <td className="max-w-[250px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.product.coreCapability}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary whitespace-nowrap">
                  {company.product.inputModalities.join(', ')}
                </td>
                <td className="max-w-[200px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.product.outputFormat.join(', ')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {company.product.targetVerticals.map((v) => (
                      <span
                        key={v}
                        className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-secondary whitespace-nowrap"
                      >
                        {verticalIcons[v] || '•'} {v}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-accent whitespace-nowrap">
                  {company.product.accessModel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
