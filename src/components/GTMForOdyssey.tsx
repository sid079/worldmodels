import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Overview from './gtm-odyssey/Overview'
import ShortTermPlan from './gtm-odyssey/ShortTermPlan'
import InvestorConnects from './gtm-odyssey/InvestorConnects'
import EventsConferences from './gtm-odyssey/EventsConferences'
import ProductDeepDive from './ProductDeepDive'

type SubTab = 'overview' | 'short-term' | 'investor-connects' | 'events' | 'custom-demos'

const subTabs: { id: SubTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'short-term', label: 'Short Term Plan' },
  { id: 'investor-connects', label: 'Investor → ICP Connects' },
  { id: 'events', label: 'Events & Conferences' },
  { id: 'custom-demos', label: 'Custom Demos' },
]

export default function GTMForOdyssey() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('overview')

  return (
    <div>
      {/* Secondary sub-tab bar */}
      <div className="sticky top-[69px] z-40 -mx-6 mb-8 flex gap-1 border-b border-[rgba(255,255,255,0.06)] bg-background/95 px-6 backdrop-blur-md">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-3 py-2 font-mono text-xs transition-colors ${
              activeSubTab === tab.id
                ? 'border-b border-accent text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Overview />
          </motion.div>
        )}
        {activeSubTab === 'short-term' && (
          <motion.div
            key="short-term"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ShortTermPlan />
          </motion.div>
        )}
        {activeSubTab === 'investor-connects' && (
          <motion.div
            key="investor-connects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <InvestorConnects />
          </motion.div>
        )}
        {activeSubTab === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <EventsConferences />
          </motion.div>
        )}
        {activeSubTab === 'custom-demos' && (
          <motion.div
            key="custom-demos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ProductDeepDive />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
