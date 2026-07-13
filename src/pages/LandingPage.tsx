import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Code2, Sparkles, BookOpen, Zap,
  Trophy, Clock, Star, ChevronRight,
} from 'lucide-react'
import { IF_ELSE_LESSON, IF_ELSE_MODULES } from '@/constants/modules'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { staggerContainer, staggerChild, slideUpFade, fadeIn } from '@/utils/motion'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'

// ─── Feature pill ─────────────────────────────────────────────
const FeaturePill = ({ icon: Icon, label }: { icon: typeof Code2; label: string }) => (
  <motion.div
    variants={staggerChild}
    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/4 border border-white/8 text-sm text-white/60"
  >
    <Icon size={14} className="text-primary-400 flex-shrink-0" />
    <span>{label}</span>
  </motion.div>
)

// ─── Module preview card ───────────────────────────────────────
const ModulePreviewCard = ({
  part, title, type, minutes
}: { part: number; title: string; type: string; minutes: number }) => (
  <motion.div
    variants={staggerChild}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 hover:border-white/10 transition-all cursor-default"
  >
    <div className="w-7 h-7 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
      <span className="text-[10px] font-mono font-bold text-primary-400">
        {String(part).padStart(2, '0')}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm text-white/80 truncate">{title}</div>
      <div className="text-xs text-white/30 capitalize">{type}</div>
    </div>
    <div className="text-xs text-white/25 flex-shrink-0">{minutes}m</div>
  </motion.div>
)

// ─── Stat pill ────────────────────────────────────────────────
const StatPill = ({ value, label }: { value: string | number; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-2xl font-bold text-white/95">{value}</span>
    <span className="text-xs text-white/40 text-center">{label}</span>
  </div>
)

export default function LandingPage() {
  const navigate = useNavigate()
  const { progress } = useProgressStore()
  const { language } = useSettingsStore()
  const hasStarted = progress.overallPercent > 0
  const lastModule = progress.lastVisitedModuleId
    ? IF_ELSE_MODULES.find(m => m.id === progress.lastVisitedModuleId)
    : null

  const handleStart = () => {
    if (lastModule) {
      navigate(lastModule.route)
    } else {
      navigate(IF_ELSE_MODULES[0].route)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Radial glow top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary-500/8 blur-[120px]" />
        {/* Secondary glow bottom right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Hero Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div variants={staggerChild} className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                <Sparkles size={12} className="text-primary-400" />
                <span className="text-xs font-medium text-primary-300 tracking-wide">
                  Interactive Python Learning
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400">Beginner</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={staggerChild} className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white/95">{language === 'bn' ? 'পাইথন' : 'Python'}</span>
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #22d3ee 100%)' }}
                >
                  IF-ELSE
                </span>
                <br />
                <span className="text-white/95">{language === 'bn' ? 'স্টেটমেন্টস' : 'Statements'}</span>
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-lg">
                {language === 'bn'
                  ? 'বেসিক ব্রাঞ্চিং থেকে শুরু করে অ্যাডভান্সড টার্নারি অপারেটর পর্যন্ত — পাইথনের ডিসিশন মেকিং আয়ত্ত করুন ২২টি ইন্টারেক্টিভ মডিউল, লাইভ কোড এক্সিকিউশন এবং এআই টিউটরের মাধ্যমে।'
                  : 'From basic branching to advanced ternary operators — master Python decision-making through 22 interactive modules, live code execution, and an AI tutor.'}
              </p>
              <p className="text-sm text-white/30 font-medium">
                {language === 'bn'
                  ? 'Python IF-ELSE Statements — Full Interactive Lesson'
                  : 'পাইথন IF-ELSE স্টেটমেন্ট — সম্পূর্ণ ইন্টারেক্টিভ পাঠ'}
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-2"
            >
              {[
                { icon: Code2,    label: 'Live Python Interpreter' },
                { icon: BookOpen, label: '22 Modules' },
                { icon: Zap,      label: 'AI Tutor' },
                { icon: Trophy,   label: 'Quizzes & Games' },
                { icon: Clock,    label: `~${IF_ELSE_LESSON.totalMinutes} min` },
              ].map((f) => (
                <FeaturePill key={f.label} icon={f.icon} label={f.label} />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={staggerChild} className="flex items-center gap-4">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={18} />}
                onClick={handleStart}
              >
                {hasStarted 
                  ? (language === 'bn' ? 'চালিয়ে যান' : 'Continue Learning') 
                  : (language === 'bn' ? 'শুরু করুন' : 'Start Learning')}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                rightIcon={<ChevronRight size={18} />}
                onClick={() => navigate('/lesson')}
              >
                {language === 'bn' ? 'সব মডিউল দেখুন' : 'View All Modules'}
              </Button>
            </motion.div>

            {/* Progress resume */}
            {hasStarted && lastModule && (
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8"
              >
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-sm text-white/50">
                  {language === 'bn' ? 'যেখান থেকে ছেড়েছিলেন:' : 'Continue from:'}{' '}
                  <span className="text-white/80 font-medium">
                    {language === 'bn' ? lastModule.titleBn : lastModule.title}
                  </span>
                </span>
                <div className="ml-auto text-xs text-white/30">
                  {progress.overallPercent}% {language === 'bn' ? 'সম্পন্ন' : 'complete'}
                </div>
              </motion.div>
            )}

            {/* Stats row */}
            <motion.div
              variants={staggerChild}
              className="flex items-center gap-8 pt-2 border-t border-white/6"
            >
              <StatPill value={22} label="Modules" />
              <div className="w-px h-8 bg-white/8" />
              <StatPill value={`${IF_ELSE_LESSON.totalMinutes}m`} label="Total Time" />
              <div className="w-px h-8 bg-white/8" />
              <StatPill value="10+" label="Code Problems" />
              <div className="w-px h-8 bg-white/8" />
              <StatPill value="EN + বাং" label="Bilingual" />
            </motion.div>
          </motion.div>

          {/* ── Right: Module Preview Panel ── */}
          <motion.div
            variants={slideUpFade}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Glow behind the panel */}
            <div className="absolute -inset-6 bg-primary-500/5 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl bg-[#0f0f1a] border border-white/8 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.5)]">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  </div>
                  <span className="text-xs text-white/30 font-mono ml-1">lesson-modules.py</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-amber-400" />
                  <span className="text-xs text-white/30">22 modules</span>
                </div>
              </div>

              {/* Module list preview */}
              <div className="p-4 space-y-2 max-h-[420px] overflow-y-auto no-scrollbar">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1.5"
                >
                  {IF_ELSE_MODULES.map((module) => (
                    <ModulePreviewCard
                      key={module.id}
                      part={module.part}
                      title={language === 'bn' ? module.titleBn : module.title}
                      type={module.type}
                      minutes={module.estimatedMinutes}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Panel footer */}
              <div className="px-5 py-4 border-t border-white/6 flex items-center justify-between">
                <span className="text-xs text-white/30 font-mono">
                  total: {IF_ELSE_LESSON.totalMinutes} minutes
                </span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStart}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/15 border border-primary-500/25 text-primary-300 text-xs font-medium hover:bg-primary-500/25 transition-all"
                >
                  <ArrowRight size={12} />
                  Begin
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Removed Motivation Video Section */}
      </div>
    </div>
  )
}
