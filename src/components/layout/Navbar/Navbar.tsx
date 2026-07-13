import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Menu, ChevronRight, Clock, BookOpen, Home,
  ChevronLeft as ChevronLeftIcon, Sun, Moon, Languages, Code2
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { IF_ELSE_LESSON } from '@/constants/modules'
import { getAdjacentModules } from '@/constants/modules'
import type { ModuleDefinition } from '@/types/lesson'

interface NavbarProps {
  onMenuToggle: () => void
  currentModule?: ModuleDefinition
}

// ─── Top Progress Bar ─────────────────────────────────────────
const TopProgressBar = memo(({ percent }: { percent: number }) => (
  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
    <motion.div
      className="h-full bg-gradient-to-r from-primary-500 to-cyan-400"
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: percent / 100 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
    />
  </div>
))
TopProgressBar.displayName = 'TopProgressBar'

// ─── Breadcrumb ───────────────────────────────────────────────
const Breadcrumb = memo(({ module }: { module?: ModuleDefinition }) => {
  const { language } = useSettingsStore()
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/"
            className="text-white/35 hover:text-white/60 transition-colors text-xs font-medium"
          >
            {language === 'bn' ? 'হোম' : 'Home'}
          </Link>
        </li>
        <li className="text-white/20"><ChevronRight size={12} /></li>
        <li>
          <Link
            to="/lesson"
            className="text-white/35 hover:text-white/60 transition-colors text-xs font-medium"
          >
            IF-ELSE
          </Link>
        </li>
        {module && (
          <>
            <li className="text-white/20"><ChevronRight size={12} /></li>
            <li>
              <span className="text-white/80 text-xs font-medium truncate max-w-[200px] block">
                {language === 'bn' ? module.titleBn : module.title}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
})
Breadcrumb.displayName = 'Breadcrumb'

const ModuleNavigator = memo(({ currentModule }: { currentModule?: ModuleDefinition }) => {
  const navigate = useNavigate()
  const { language } = useSettingsStore()
  if (!currentModule) return null
  const { prev, next } = getAdjacentModules(currentModule.id)

  const prevTitle = prev ? (language === 'bn' ? prev.titleBn : prev.title) : ''
  const nextTitle = next ? (language === 'bn' ? next.titleBn : next.title) : ''

  return (
    <div className="flex items-center gap-1">
      <motion.button
        onClick={() => prev && navigate(prev.route)}
        disabled={!prev}
        whileHover={prev ? { scale: 1.05 } : {}}
        whileTap={prev ? { scale: 0.95 } : {}}
        className={cn(
          'p-1.5 rounded-lg transition-all duration-200 text-sm',
          prev
            ? 'text-white/50 hover:text-white/85 hover:bg-white/6'
            : 'text-white/15 cursor-not-allowed',
        )}
        title={prev ? `Previous: ${prevTitle}` : 'No previous module'}
      >
        <ChevronLeftIcon size={16} />
      </motion.button>

      <span className="text-white/20 text-xs font-mono px-1">
        {String(currentModule.part).padStart(2, '0')}/{String(IF_ELSE_LESSON.totalModules).padStart(2, '0')}
      </span>

      <motion.button
        onClick={() => next && navigate(next.route)}
        disabled={!next}
        whileHover={next ? { scale: 1.05 } : {}}
        whileTap={next ? { scale: 0.95 } : {}}
        className={cn(
          'p-1.5 rounded-lg transition-all duration-200 text-sm',
          next
            ? 'text-white/50 hover:text-white/85 hover:bg-white/6'
            : 'text-white/15 cursor-not-allowed',
        )}
        title={next ? `Next: ${nextTitle}` : 'No next module'}
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  )
})
ModuleNavigator.displayName = 'ModuleNavigator'

// ─── Navbar ───────────────────────────────────────────────────
const Navbar = memo(({ onMenuToggle, currentModule }: NavbarProps) => {
  const { progress } = useProgressStore()
  const { language, theme, toggleLanguage, toggleTheme, toggleCodePanel, isCodePanelOpen } = useSettingsStore()
  const overallPercent = progress.overallPercent

  return (
    <header className={cn(
      'sticky top-0 z-20',
      'h-[60px] flex items-center',
      'navbar-bg',
    )}>
      <div className="flex items-center gap-3 px-4 w-full">
        {/* Menu Toggle */}
        <motion.button
          onClick={onMenuToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/6 transition-all"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </motion.button>

        {/* Breadcrumb */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <Breadcrumb module={currentModule} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Reading time */}
          {currentModule && (
            <div className="hidden md:flex items-center gap-1.5 text-white/35 text-xs">
              <Clock size={12} />
              <span>{currentModule.estimatedMinutes} min</span>
            </div>
          )}

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* Module navigator */}
          <ModuleNavigator currentModule={currentModule} />

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/6 transition-all"
            title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
          >
            <Languages size={16} />
            <span className="text-xs font-medium uppercase">{language}</span>
          </button>

          {/* Code Panel Toggle */}
          <button
            onClick={toggleCodePanel}
            className={cn(
              'flex items-center gap-1.5 p-1.5 rounded-lg transition-all',
              isCodePanelOpen
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-white/40 hover:text-white/80 hover:bg-white/6'
            )}
            title="Toggle Code Workspace"
          >
            <Code2 size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/6 transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Overall progress pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/8">
            <BookOpen size={12} className="text-primary-400" />
            <span className="text-xs font-medium text-white/70">
              {overallPercent}%
            </span>
          </div>

          {/* Home */}
          <Link
            to="/"
            className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/6 transition-all"
            aria-label="Home"
          >
            <Home size={16} />
          </Link>
        </div>
      </div>

      {/* Top progress stripe */}
      <TopProgressBar percent={overallPercent} />
    </header>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
