import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '17-problems')!

export default function ProblemSolvingPage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className='space-y-6'>
        {/* ── Coming in Phase 3: Problem Solving ── */}
        <div className='flex flex-col items-center justify-center min-h-[40vh] gap-6 text-center'>
          <div className='w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center'>
            <Construction size={28} className='text-primary-400' strokeWidth={1.5} />
          </div>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold text-white/85'>Part 17 — Problem Solving</h2>
            <p className='text-white/40 text-sm max-w-md'>
              সমস্যা সমাধান — This module is being built. Check back soon!
            </p>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3 border border-white/8 text-sm text-white/30'>
            <div className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse' />
            <span>Content coming in Phase 3–6</span>
          </div>
        </div>
      </motion.div>
    </ModulePage>
  )
}
