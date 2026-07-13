import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import Card from '@/components/common/Card/Card'
import keynotesImg from '@/assets/keynotes.png'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '06-key-notes')!

const KEYNOTES = [
  {
    emoji: '🔑',
    title: 'Colon is Mandatory',
    note: 'Conditions must end with a colon (:).',
    imageIdea: 'A giant glowing colon next to a stop sign',
    color: 'amber',
  },
  {
    emoji: '🔑',
    title: 'Indentation is Everything',
    note: 'Indentation is everything. No spaces = Error!',
    imageIdea: 'A ruler measuring the space before a line of code',
    color: 'rose',
  },
  {
    emoji: '🔑',
    title: '== vs = Operator',
    note: '== means "Are they equal?", = means "Make it equal to".',
    imageIdea: 'A balancing scale for == and a box being packed for =',
    color: 'primary',
  },
  {
    emoji: '🔑',
    title: 'elif for Multiple Conditions',
    note: 'Use elif for multiple continuous options.',
    imageIdea: 'A decision tree branching into multiple paths',
    color: 'emerald',
  },
]

const colorMap: Record<string, { border: string; bg: string; badge: string; text: string }> = {
  amber:   { border: 'border-amber-500/20',   bg: 'bg-amber-500/5',   badge: 'bg-amber-500/20 text-amber-300',   text: 'text-amber-300' },
  rose:    { border: 'border-rose-500/20',     bg: 'bg-rose-500/5',     badge: 'bg-rose-500/20 text-rose-300',     text: 'text-rose-300' },
  primary: { border: 'border-primary-500/20', bg: 'bg-primary-500/5', badge: 'bg-primary-500/20 text-primary-300', text: 'text-primary-300' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', badge: 'bg-emerald-500/20 text-emerald-300', text: 'text-emerald-300' },
}

export default function KeyNotesPage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className='max-w-4xl mx-auto pb-12 mt-16'>

        {/* Hero Image */}
        <Card className="overflow-hidden border-primary-500/20 bg-[#0a0a0f]/80 p-2 shadow-2xl mb-10">
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img
              src={keynotesImg}
              alt="Key Notes"
              className="w-full h-auto object-contain"
            />
          </div>
        </Card>

        {/* Section Label */}
        <p className="text-white/40 text-sm font-mono uppercase tracking-widest mb-6">
          🔑 Key Points to Remember
        </p>

        {/* Keynotes Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {KEYNOTES.map((kn, i) => {
            const c = colorMap[kn.color]
            return (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl border ${c.border} ${c.bg} hover:scale-[1.02] transition-all duration-300 flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-full ${c.badge} font-bold`}>
                    {kn.emoji}
                  </span>
                  <h3 className={`text-base font-bold ${c.text}`}>{kn.title}</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed font-medium">{kn.note}</p>
                <div className="mt-auto pt-3 border-t border-white/5">
                  <p className="text-white/30 text-xs italic">💡 {kn.imageIdea}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </motion.div>
    </ModulePage>
  )
}

