import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Target, Info, ArrowRight } from 'lucide-react'
import Card from '@/components/common/Card/Card'
import Button from '@/components/common/Button/Button'
import { useNavigate } from 'react-router-dom'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '02-declaration')!

export default function DeclarationPage() {
  const navigate = useNavigate()

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className='max-w-4xl mx-auto pb-12 mt-16'>

        {/* Video Section — served from /public for proper HTTP range-request support */}
        <Card className="overflow-hidden border-primary-500/20 bg-[#0a0a0f]/80 p-2 shadow-2xl">
          <div className="relative rounded-xl overflow-hidden bg-black border border-white/10">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto block"
              src="/Mastering_Conditional_Statemen.mp4"
            />
          </div>
        </Card>

        {/* Bottom Content Area */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 space-y-4 bg-primary-500/5 border-primary-500/10 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-2">
              <Target size={24} className="text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white/90">Learning Objectives</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-primary-400 font-bold shrink-0">1.</span>
                <span>Understand the concept of conditional logic in programming</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 font-bold shrink-0">2.</span>
                <span>Explain what IF-ELSE statements are and why we use them in Python.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 font-bold shrink-0">3.</span>
                <span>Use comparison operators (==, !=, &gt;, &lt;, &gt;=, &lt;=) in conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 font-bold shrink-0">4.</span>
                <span>Use nested IF-ELSE and understand indentation rules.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 font-bold shrink-0">5.</span>
                <span>Apply IF-ELSE in real-life programming problems like grade checkers, login systems, etc.</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-2">
              <Info size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white/90">Why It Matters</h3>
            <p className="text-white/60 leading-relaxed">
              Every interactive program relies on making decisions. From simple tasks like validating a password to complex AI systems deciding the next move in a game, conditional statements are the foundation of logic.
            </p>
            <div className="pt-4 flex items-center justify-between text-sm">
              <span className="text-emerald-400/80">Estimated Time: 5 mins</span>
              <Button variant="secondary" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/lesson/03-outcomes')}>Next Module</Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </ModulePage>
  )
}
