import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star, Clock, CheckCircle2, Lock,
} from 'lucide-react'
import { IF_ELSE_MODULES, IF_ELSE_LESSON } from '@/constants/modules'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { staggerContainer, staggerChild } from '@/utils/motion'
import { cn } from '@/utils/cn'
import type { ModuleDefinition } from '@/types/lesson'

// ─── Icon Map ─────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star,
}

// ─── Type badge colors ────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  intro:       'bg-amber-500/10 text-amber-400 border-amber-500/20',
  declaration: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  outcomes:    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  quiz:        'bg-rose-500/10 text-rose-400 border-rose-500/20',
  discussion:  'bg-primary-500/10 text-primary-400 border-primary-500/20',
  notes:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  scope:       'bg-blue-500/10 text-blue-400 border-blue-500/20',
  practical:   'bg-orange-500/10 text-orange-400 border-orange-500/20',
  facts:       'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  tips:        'bg-teal-500/10 text-teal-400 border-teal-500/20',
  riddles:     'bg-violet-500/10 text-violet-400 border-violet-500/20',
  story:       'bg-pink-500/10 text-pink-400 border-pink-500/20',
  games:       'bg-green-500/10 text-green-400 border-green-500/20',
  worksheet:   'bg-slate-400/10 text-slate-400 border-slate-400/20',
  song:        'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  vocabulary:  'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  problems:    'bg-red-500/10 text-red-400 border-red-500/20',
  assignment:  'bg-amber-600/10 text-amber-300 border-amber-600/20',
  infographic: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  jokes:       'bg-lime-500/10 text-lime-400 border-lime-500/20',
  ending:      'bg-primary-500/10 text-primary-300 border-primary-500/20',
}

// ─── Module Card ──────────────────────────────────────────────
function ModuleCard({ module, isCompleted, isActive }: {
  module: ModuleDefinition
  isCompleted: boolean
  isActive: boolean
}) {
  const navigate = useNavigate()
  const { language } = useSettingsStore()
  const Icon = ICON_MAP[module.icon] ?? BookOpen

  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => navigate(module.route)}
      className={cn(
        'relative flex flex-col gap-3 p-5 rounded-2xl cursor-pointer',
        'bg-white/[0.03] border border-white/[0.07]',
        'hover:bg-white/[0.06] hover:border-white/[0.12]',
        'transition-colors duration-200',
        'shadow-[0_1px_3px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]',
        isActive && 'border-primary-500/30 bg-primary-500/5',
        isCompleted && 'border-emerald-500/20',
      )}
    >
      {/* Completion overlay tint */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/3 pointer-events-none" />
      )}

      {/* Part number + status */}
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-mono text-white/25">
          Part {String(module.part).padStart(2, '0')}
        </span>
        {isCompleted ? (
          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
        ) : isActive ? (
          <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse mt-0.5" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-white/10 mt-0.5" />
        )}
      </div>

      {/* Icon */}
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        isCompleted
          ? 'bg-emerald-500/15 text-emerald-400'
          : isActive
          ? 'bg-primary-500/20 text-primary-400'
          : 'bg-white/5 text-white/40',
      )}>
        <Icon size={18} strokeWidth={1.7} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white/90 leading-snug">
          {language === 'bn' ? module.titleBn : module.title}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
          {language === 'bn' ? module.descriptionBn : module.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className={cn(
          'text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize',
          TYPE_COLORS[module.type] ?? 'bg-white/5 text-white/40 border-white/10',
        )}>
          {module.type}
        </span>
        <div className="flex items-center gap-1 text-white/25">
          <Clock size={10} />
          <span className="text-[10px]">{module.estimatedMinutes}m</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function LessonOverviewPage() {
  const { progress } = useProgressStore()
  const { language } = useSettingsStore()
  const completedIds = new Set(
    Object.values(progress.modules)
      .filter(m => m.completed)
      .map(m => m.moduleId)
  )
  const activeId = progress.lastVisitedModuleId
  const overallPercent = progress.overallPercent

  return (
    <div className="min-h-full p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8 space-y-4"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-medium text-primary-400 tracking-widest uppercase mb-2">
              {IF_ELSE_LESSON.difficulty} · {language === 'bn' ? 'পাইথন' : 'Python'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white/95">
              {language === 'bn' ? IF_ELSE_LESSON.titleBn : IF_ELSE_LESSON.title}
            </h1>
            <p className="text-white/40 mt-1.5 text-sm">
              {language === 'bn' ? IF_ELSE_LESSON.title : IF_ELSE_LESSON.titleBn}
            </p>
          </div>

          {/* Summary pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/4 border border-white/8">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-sm text-white/60">
                <span className="text-white/90 font-semibold">{completedIds.size}</span> / {IF_ELSE_LESSON.totalModules} {language === 'bn' ? 'সম্পন্ন' : 'done'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/4 border border-white/8">
              <Clock size={14} className="text-primary-400" />
              <span className="text-sm text-white/60">
                <span className="text-white/90 font-semibold">~{IF_ELSE_LESSON.totalMinutes}</span> {language === 'bn' ? 'মিনিট মোট' : 'min total'}
              </span>
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/35">
            <span>{language === 'bn' ? 'সামগ্রিক অগ্রগতি' : 'Overall Progress'}</span>
            <span className="font-mono">{overallPercent}%</span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Module Grid ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {IF_ELSE_MODULES.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedIds.has(module.id)}
            isActive={activeId === module.id}
          />
        ))}
      </motion.div>
    </div>
  )
}
