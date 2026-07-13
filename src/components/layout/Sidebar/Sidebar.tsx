import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, NavLink } from 'react-router-dom'
import {
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star, ChevronLeft, GraduationCap, Trophy,
  X,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { sidebarVariants, sidebarLabelVariants, staggerContainer, staggerChild } from '@/utils/motion'
import { IF_ELSE_MODULES, IF_ELSE_LESSON } from '@/constants/modules'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import type { ModuleDefinition } from '@/types/lesson'

// ─── Icon Map ─────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star, GraduationCap, Trophy,
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onClose?: () => void
  isMobile?: boolean
}

// ─── Single Nav Item ──────────────────────────────────────────
const SidebarItem = memo(({ module, isOpen, isCompleted }: {
  module: ModuleDefinition
  isOpen: boolean
  isCompleted: boolean
}) => {
  const Icon = ICON_MAP[module.icon] ?? BookOpen
  const location = useLocation()
  const { language } = useSettingsStore()
  const isActive = location.pathname === module.route

  return (
    <NavLink to={module.route} tabIndex={0}>
      <motion.div
        className={cn(
          'sidebar-item group',
          isActive && 'active',
        )}
        whileHover={{ x: isOpen ? 2 : 0 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {/* Icon */}
        <div className={cn(
          'relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200',
          isActive
            ? 'bg-primary-500/20 text-primary-400'
            : 'text-white/40 group-hover:text-white/70 group-hover:bg-white/5',
        )}>
          <Icon size={16} strokeWidth={1.8} />
          {/* Completion dot */}
          {isCompleted && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-[#0a0a0f]" />
          )}
        </div>

        {/* Label (only when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={sidebarLabelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px]">
                  {language === 'bn' ? module.titleBn : module.title}
                </span>
                <span className={cn(
                  'flex-shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded text-white/25',
                  isActive && 'text-primary-400/60',
                )}>
                  {String(module.part).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </NavLink>
  )
})
SidebarItem.displayName = 'SidebarItem'

// ─── Progress Ring ────────────────────────────────────────────
const ProgressRing = memo(({ percent }: { percent: number }) => {
  const r = 20
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="rotate-[-90deg]">
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      <motion.circle
        cx="24" cy="24" r={r}
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
})
ProgressRing.displayName = 'ProgressRing'

// ─── Main Sidebar ─────────────────────────────────────────────
const Sidebar = memo(({ isOpen, onToggle, onClose, isMobile = false }: SidebarProps) => {
  const { progress } = useProgressStore()
  const { language } = useSettingsStore()
  const overallPercent = progress.overallPercent
  const completedIds = new Set(
    Object.values(progress.modules)
      .filter((m) => m.completed)
      .map((m) => m.moduleId)
  )

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className={cn(
          'fixed top-0 left-0 h-full z-50',
          'flex flex-col',
          'bg-[#0d0d18] border-r border-white/6',
          'shadow-[1px_0_0_rgba(255,255,255,0.06)]',
          isMobile ? 'z-50' : 'z-30',
        )}
        style={{ backgroundImage: 'radial-gradient(ellipse 80% 40% at 0% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      >
        {/* ── Header ── */}
        <div className={cn(
          'flex items-center h-[60px] px-4 flex-shrink-0 border-b border-white/6',
          !isOpen && 'justify-center',
        )}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-primary-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-white/35 font-medium tracking-widest uppercase">
                    {language === 'bn' ? 'পাইথন' : 'Python'}
                  </div>
                  <div className="text-sm font-semibold text-white/90 truncate leading-tight">
                    {language === 'bn' ? IF_ELSE_LESSON.titleBn : 'IF-ELSE Lesson'}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center"
              >
                <GraduationCap size={16} className="text-primary-400" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile close button */}
          {isMobile && isOpen && (
            <button
              onClick={onClose}
              className="ml-auto p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/6 transition-all"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ── Progress Summary ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 px-4 py-3 mx-3 my-3 rounded-xl bg-white/3 border border-white/6"
            >
              <ProgressRing percent={overallPercent} />
              <div className="min-w-0">
                <div className="text-white/90 font-semibold text-sm">
                  {overallPercent}% {language === 'bn' ? 'সম্পন্ন' : 'Complete'}
                </div>
                <div className="text-white/40 text-xs mt-0.5">
                  {completedIds.size} / {IF_ELSE_LESSON.totalModules} {language === 'bn' ? 'মডিউল শেষ' : 'modules done'}
                </div>
                <div className="progress-track mt-1.5">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPercent}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Nav Items ── */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-2 pb-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-0.5"
          >
            {IF_ELSE_MODULES.map((module) => (
              <motion.div key={module.id} variants={staggerChild}>
                <SidebarItem
                  module={module}
                  isOpen={isOpen}
                  isCompleted={completedIds.has(module.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Collapse Toggle ── */}
        <div className="flex-shrink-0 p-3 border-t border-white/6">
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl',
              'text-white/40 hover:text-white/70 hover:bg-white/5',
              'transition-all duration-200 text-sm',
              !isOpen && 'justify-center',
            )}
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronLeft size={16} />
            </motion.div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-medium"
                >
                  {language === 'bn' ? 'গুটিয়ে নিন' : 'Collapse'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
})

Sidebar.displayName = 'Sidebar'
export default Sidebar
