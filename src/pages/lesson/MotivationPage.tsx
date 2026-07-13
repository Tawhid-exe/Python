import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild, staggerContainer } from '@/utils/motion'
import { motion } from 'framer-motion'
import motivationVideo from '@/assets/motivation.mp4'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '01-motivation')!

export default function MotivationPage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8 mt-10"
      >
        {/* ── Video Player ── */}
        <motion.div variants={staggerChild} className="relative">
          <div className="absolute -inset-4 bg-primary-500/8 rounded-3xl blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.12)] bg-black/60">
            <video
              src={motivationVideo}
              className="w-full h-auto aspect-video object-cover"
              controls
              playsInline
            />
          </div>
        </motion.div>

        {/* ── Motivational Hook Text ── */}
        <motion.div variants={staggerChild} className="text-center space-y-4 max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #22d3ee 100%)' }}
            >
              Why Does This Matter?
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/65 leading-relaxed">
            Every app, game, and website you use runs on decisions. <strong className="text-white/85">IF this happens, do that.</strong> Learning to write these conditions is the first real superpower a programmer earns.
          </p>
          <p className="text-sm text-white/40 leading-relaxed">
            By the end of this lesson, you won't just understand IF-ELSE — you'll <em>think</em> in conditions. Let's begin. 🚀
          </p>
        </motion.div>
      </motion.div>
    </ModulePage>
  )
}
