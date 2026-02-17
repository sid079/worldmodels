import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Thesis from './components/Thesis'
import CompetitiveBenchmarking from './components/CompetitiveBenchmarking'
import AboutMe from './components/AboutMe'
import KonamiEasterEgg from './components/KonamiEasterEgg'

type MainTab = 'thesis' | 'benchmarking' | 'about'

function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('thesis')
  const [glitching, setGlitching] = useState(false)

  const handleTabChange = useCallback(
    (tab: MainTab) => {
      if (tab === activeTab) return
      setGlitching(true)
      setTimeout(() => {
        setActiveTab(tab)
        setTimeout(() => setGlitching(false), 160)
      }, 40)
    },
    [activeTab]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Glitch overlay */}
      {glitching && (
        <div className="glitch-overlay pointer-events-none fixed inset-0 z-[100]" />
      )}

      {/* Konami easter egg */}
      <KonamiEasterEgg />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-1">
            {(['thesis', 'benchmarking', 'about'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab === 'thesis' && 'Thesis'}
                {tab === 'benchmarking' && 'Competitive Benchmarking'}
                {tab === 'about' && 'Why Me?'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'thesis' && (
            <motion.div
              key="thesis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Thesis />
            </motion.div>
          )}
          {activeTab === 'benchmarking' && (
            <motion.div
              key="benchmarking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <CompetitiveBenchmarking />
            </motion.div>
          )}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <AboutMe />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
