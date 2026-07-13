import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import outcomesImg from '@/assets/learnOutcomes.png'
import Card from '@/components/common/Card/Card'
import { Target, Info, ArrowRight } from 'lucide-react'
import Button from '@/components/common/Button/Button'
import { useNavigate } from 'react-router-dom'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '03-outcomes')!

export default function OutcomesPage() {
  const navigate = useNavigate()

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className='max-w-4xl mx-auto pb-12 mt-16'>

        {/* Hero Image — full width, like the video on Declaration page */}
        <Card className="overflow-hidden border-primary-500/20 bg-[#0a0a0f]/80 p-2 shadow-2xl mb-8">
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img
              src={outcomesImg}
              alt="Learning Outcomes"
              className="w-full h-auto object-contain"
            />
          </div>
        </Card>

        {/* Outcomes List */}
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-white/50 text-sm font-mono uppercase tracking-widest mb-2">After this lesson, you will be able to:</p>
          {[
            "Understand the concept of conditional logic in programming",
            "Explain what IF-ELSE statements are and why we use them in Python.",
            "Use comparison operators (==, !=, >, <, >=, <=) in conditions.",
            "Use nested IF-ELSE and understand indentation rules.",
            "Apply IF-ELSE in real-life programming problems like grade checkers, login systems, etc."
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl border border-primary-500/10 bg-primary-500/5 hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <p className="text-white/80 text-[15px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 bg-primary-500/5 border-primary-500/10 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-2">
              <Target size={24} className="text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white/90">What's the Goal?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              These outcomes define exactly what you will master by the end of this lesson. Each point is a skill you will be able to demonstrate — both in code and in real-world problem solving.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-2">
              <Info size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white/90">Ready to Begin?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Keep these outcomes in mind as you go through each module. They are your checkpoint — by the end, you will revisit this page and be able to confirm each one.
            </p>
            <div className="pt-2 flex justify-end">
              <Button variant="secondary" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/lesson/04-pre-test')}>Start Pre-Test</Button>
            </div>
          </Card>
        </div>

      </motion.div>
    </ModulePage>
  )
}
