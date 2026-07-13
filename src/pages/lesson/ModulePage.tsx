import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, CheckCircle, Clock,
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star, Undo2
} from 'lucide-react'
import { getAdjacentModules } from '@/constants/modules'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { staggerContainer, staggerChild } from '@/utils/motion'
import { cn } from '@/utils/cn'
import Button from '@/components/common/Button/Button'
import type { ModuleDefinition } from '@/types/lesson'
import type { ReactNode } from 'react'

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Flag, Target, ClipboardList, BookOpen,
  StickyNote, Layers, Wrench, Lightbulb, Zap,
  HelpCircle, BookMarked, Gamepad2, FileText, Music,
  BookA, Code2, CheckSquare, PenLine, LayoutDashboard,
  SmilePlus, Star,
}

const TYPE_TAG_COLORS: Record<string, string> = {
  intro:       'text-amber-400 bg-amber-500/10',
  declaration: 'text-purple-400 bg-purple-500/10',
  outcomes:    'text-cyan-400 bg-cyan-500/10',
  quiz:        'text-rose-400 bg-rose-500/10',
  discussion:  'text-primary-400 bg-primary-500/10',
  notes:       'text-emerald-400 bg-emerald-500/10',
  scope:       'text-blue-400 bg-blue-500/10',
  practical:   'text-orange-400 bg-orange-500/10',
  facts:       'text-yellow-400 bg-yellow-500/10',
  tips:        'text-teal-400 bg-teal-500/10',
  riddles:     'text-violet-400 bg-violet-500/10',
  story:       'text-pink-400 bg-pink-500/10',
  games:       'text-green-400 bg-green-500/10',
  worksheet:   'text-slate-400 bg-slate-500/10',
  song:        'text-fuchsia-400 bg-fuchsia-500/10',
  vocabulary:  'text-indigo-400 bg-indigo-500/10',
  problems:    'text-red-400 bg-red-500/10',
  assignment:  'text-amber-300 bg-amber-600/10',
  infographic: 'text-sky-400 bg-sky-500/10',
  jokes:       'text-lime-400 bg-lime-500/10',
  ending:      'text-primary-300 bg-primary-500/10',
}

interface ModulePageProps {
  module: ModuleDefinition
  children: ReactNode
  /** Call this to trigger the completion marking */
  onComplete?: () => void
  showCompleteButton?: boolean
}

/**
 * Base wrapper used by all 22 module pages.
 * Provides:
 *  - Animated header with icon, part number, title, bilingual subtitle
 *  - Content area
 *  - Footer navigation (prev/next + mark complete)
 */
export default function ModulePage({
  module,
  children,
  showCompleteButton = true,
}: ModulePageProps) {
  const navigate = useNavigate()
  const { markComplete, unmarkComplete, getModuleProgress } = useProgressStore()
  const { language } = useSettingsStore()
  const moduleProgress = getModuleProgress(module.id)
  const isCompleted = moduleProgress?.completed ?? false
  const { prev, next } = getAdjacentModules(module.id)
  const Icon = ICON_MAP[module.icon] ?? BookOpen

  const handleComplete = () => {
    markComplete(module.id)
    if (next) navigate(next.route)
  }

  return (
    <div className="min-h-full">
      {/* ── Animated Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="sticky top-[60px] z-10 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/6 px-6 py-4"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Part icon */}
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              isCompleted
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-primary-500/15 text-primary-400',
            )}>
              {isCompleted ? <CheckCircle size={18} /> : <Icon size={18} strokeWidth={1.7} />}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono text-white/30">
                  Part {String(module.part).padStart(2, '0')}
                </span>
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize',
                  TYPE_TAG_COLORS[module.type] ?? 'text-white/40 bg-white/5',
                )}>
                  {module.type}
                </span>
                {isCompleted && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium text-emerald-400 bg-emerald-500/10">
                    Completed ✓
                  </span>
                )}
              </div>
              <h2 className="text-base font-semibold text-white/90 truncate">
                {language === 'bn' ? module.titleBn : module.title}
              </h2>
              <p className="text-xs text-white/30 truncate">
                {language === 'bn' ? module.title : module.titleBn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-white/30 flex-shrink-0">
            <Clock size={12} />
            <span className="text-xs">{module.estimatedMinutes} {language === 'bn' ? 'মিনিট' : 'min'}</span>
          </div>
        </div>
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 py-8"
      >
        {children}
      </motion.div>

      {/* ── Footer Navigation ── */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between gap-4 pt-8 border-t border-white/6">
          {/* Prev */}
          <Button
            variant="ghost"
            size="md"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => prev && navigate(prev.route)}
            disabled={!prev}
          >
            {prev ? (language === 'bn' ? prev.titleBn : prev.title) : (language === 'bn' ? 'পাঠ শুরু' : 'Start of Lesson')}
          </Button>

          {/* Mark Complete + Next */}
          <div className="flex items-center gap-3">
            {showCompleteButton && !isCompleted && (
              <Button
                variant="success"
                size="md"
                leftIcon={<CheckCircle size={16} />}
                onClick={handleComplete}
              >
                {language === 'bn' ? 'সম্পন্ন করুন' : 'Mark Complete'}
              </Button>
            )}
            {showCompleteButton && isCompleted && (
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Undo2 size={16} />}
                onClick={() => unmarkComplete(module.id)}
                className="text-white/40 hover:text-rose-400 border-transparent hover:bg-rose-500/10"
              >
                {language === 'bn' ? 'অসম্পূর্ণ' : 'Unmark'}
              </Button>
            )}
            {isCompleted && next && (
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => navigate(next.route)}
              >
                {language === 'bn' ? 'পরবর্তী: ' : 'Next: '} {language === 'bn' ? next.titleBn : next.title}
              </Button>
            )}
            {!isCompleted && next && (
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => navigate(next.route)}
              >
                {language === 'bn' ? 'এড়িয়ে যান' : 'Skip'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
