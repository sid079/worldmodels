import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Overview from './benchmarking/Overview'
import Product from './benchmarking/Product'
import Pricing from './benchmarking/Pricing'
import Technology from './benchmarking/Technology'
import GTM from './benchmarking/GTM'
import Demos from './benchmarking/Demos'

type SubTab = 'overview' | 'product' | 'pricing' | 'technology' | 'gtm' | 'demos'

const subTabs: { id: SubTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'product', label: 'Product' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'technology', label: 'Technology' },
  { id: 'gtm', label: 'GTM' },
  { id: 'demos', label: 'Demos' },
]

export default function CompetitiveBenchmarking() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('overview')

  return (
    <div>
      {/* Secondary sub-tab bar */}
      <div className="mb-8 flex gap-1 border-b border-[rgba(255,255,255,0.06)]">
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
        {activeSubTab === 'product' && (
          <motion.div
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Product />
          </motion.div>
        )}
        {activeSubTab === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Pricing />
          </motion.div>
        )}
        {activeSubTab === 'technology' && (
          <motion.div
            key="technology"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Technology />
          </motion.div>
        )}
        {activeSubTab === 'gtm' && (
          <motion.div
            key="gtm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <GTM />
          </motion.div>
        )}
        {activeSubTab === 'demos' && (
          <motion.div
            key="demos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Demos />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
