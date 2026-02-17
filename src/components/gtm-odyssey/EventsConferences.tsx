import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
}

interface ConferenceRow {
  tier: 'P0' | 'P1' | 'P2'
  name: string
  url: string
  dates: string
  location: string
  attendees: string
  icps: string
}

const rows: ConferenceRow[] = [
  {
    tier: 'P0',
    name: 'GDC — Game Developers Conference',
    url: 'https://gdconf.com',
    dates: 'Mar 9–13, 2026',
    location: 'San Francisco',
    attendees: '~30,000',
    icps: 'Indie Games',
  },
  {
    tier: 'P0',
    name: 'NVIDIA GTC 2026',
    url: 'https://www.nvidia.com/gtc/',
    dates: 'Mar 16–19, 2026',
    location: 'San Jose',
    attendees: '~25,000+',
    icps: 'Automotive, Defense, Virtual Production',
  },
  {
    tier: 'P0',
    name: 'NAB Show 2026',
    url: 'https://www.nabshow.com/las-vegas/',
    dates: 'Apr 18–22, 2026',
    location: 'Las Vegas',
    attendees: '~55,000',
    icps: 'Virtual Production, Social Entertainment',
  },
  {
    tier: 'P0',
    name: 'SIGGRAPH 2026',
    url: 'https://s2026.siggraph.org',
    dates: 'Jul 19–23, 2026',
    location: 'Los Angeles',
    attendees: '~12,000–15,000',
    icps: 'Virtual Production, Indie Games, Architecture/AEC',
  },
  {
    tier: 'P1',
    name: 'Cannes Lions 2026',
    url: 'https://www.canneslions.com',
    dates: 'Jun 22–26, 2026',
    location: 'Cannes',
    attendees: '~12,000',
    icps: 'Interactive Advertising',
  },
  {
    tier: 'P1',
    name: 'MIPCOM Cannes 2026',
    url: 'https://www.mipcom.com',
    dates: 'Oct 12–15, 2026',
    location: 'Cannes',
    attendees: '~10,600',
    icps: 'Virtual Production, Social Entertainment',
  },
  {
    tier: 'P1',
    name: 'CES 2027',
    url: 'https://www.ces.tech',
    dates: 'Jan 5–8, 2027 (est.)',
    location: 'Las Vegas',
    attendees: '~130,000',
    icps: 'Automotive, Social Entertainment, Interactive Advertising',
  },
  {
    tier: 'P2',
    name: 'Gamescom 2026',
    url: 'https://www.gamescom.global',
    dates: 'Aug 19–23, 2026',
    location: 'Cologne',
    attendees: '~320,000 (public + trade)',
    icps: 'Indie Games',
  },
  {
    tier: 'P2',
    name: 'NAB Show New York 2026',
    url: 'https://www.nabshow.com',
    dates: 'Oct 21–22, 2026',
    location: 'New York City',
    attendees: '~15,000',
    icps: 'Virtual Production, Interactive Advertising',
  },
]

const tierStyle: Record<string, { bg: string; text: string }> = {
  P0: { bg: 'bg-accent/10', text: 'text-accent' },
  P1: { bg: 'bg-[rgba(255,255,255,0.06)]', text: 'text-text-primary' },
  P2: { bg: 'bg-[rgba(255,255,255,0.04)]', text: 'text-text-muted' },
}

export default function EventsConferences() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[rgba(255,255,255,0.03)]">
              {['Conference', 'Tier', 'Dates', 'Location', 'Attendees', 'Relevant ICPs'].map((h, i) => (
                <th
                  key={h}
                  className={`border-b border-[rgba(255,255,255,0.08)] px-5 py-3.5 text-left font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted ${i === 0 ? 'min-w-[200px]' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const ts = tierStyle[row.tier]
              return (
                <motion.tr
                  key={i}
                  variants={itemVariants}
                  className="border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <td className="px-5 py-3.5">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] font-medium text-text-primary transition-colors hover:text-accent whitespace-nowrap"
                    >
                      {row.name}
                    </a>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold ${ts.bg} ${ts.text}`}>
                      {row.tier}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-text-secondary">
                    {row.dates}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-text-secondary">
                    {row.location}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-text-secondary">
                    {row.attendees}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-text-secondary">
                    {row.icps}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}
