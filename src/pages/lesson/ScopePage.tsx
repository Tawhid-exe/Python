import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import Card from '@/components/common/Card/Card'
import scopeImg from '@/assets/scope.png'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '07-scope')!

const TABLE_1 = [
  {
    icon: '🌐',
    area: 'Web Development',
    areaBn: 'ওয়েব ডেভেলপমেন্ট',
    usage: 'Login check: if username and password match → allow entry',
  },
  {
    icon: '🏦',
    area: 'Banking Software',
    areaBn: 'ব্যাংকিং সফটওয়্যার',
    usage: 'if balance >= withdrawal amount → allow; else → deny',
  },
  {
    icon: '🎮',
    area: 'Game Development',
    areaBn: 'গেম ডেভেলপমেন্ট',
    usage: 'if player health == 0 → game over; else → continue game',
  },
  {
    icon: '📱',
    area: 'Mobile Apps',
    areaBn: 'মোবাইল আ্যাপ',
    usage: 'if notification settings == ON → send alert; else → skip',
  },
]

const TABLE_2 = [
  {
    icon: '🛒',
    area: 'E-commerce',
    areaBn: 'ই-কমার্স',
    usage: "if stock > 0 → show 'Add to Cart'; else → show 'Out of Stock'",
  },
  {
    icon: '🎓',
    area: 'Education Systems',
    areaBn: 'শিক্ষা ব্যবস্থা',
    usage: 'if marks >= 50 → pass; elif marks >= 33 → supplementary; else → fail',
  },
  {
    icon: '🏥',
    area: 'Medical Systems',
    areaBn: 'চিকিৎসা ব্যবস্থা',
    usage: 'if temperature > 38 → flag as fever; else → normal',
  },
  {
    icon: '🤖',
    area: 'AI & Machine Learning',
    areaBn: '',
    usage: 'if confidence score > 0.9 → classify as positive; else → negative',
  },
  {
    icon: '🔒',
    area: 'Security Systems',
    areaBn: '',
    usage: 'if login attempts > 3 → lock account; else → allow retry',
  },
  {
    icon: '📊',
    area: 'Data Analysis',
    areaBn: '',
    usage: 'if value > threshold → label as outlier; else → normal',
  },
]

function ScopeTable({ rows }: { rows: typeof TABLE_1 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary-500/10 border-b border-white/10">
            <th className="text-left px-5 py-3 text-primary-300 font-semibold w-[40%]">Area (ক্ষেত্র)</th>
            <th className="text-left px-5 py-3 text-primary-300 font-semibold">How IF-ELSE is Used (কীভাবে ব্যবহার হয়)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} hover:bg-primary-500/5 transition-colors`}>
              <td className="px-5 py-4 text-white/80 font-medium">
                <span className="mr-2">{row.icon}</span>
                {row.area}
                {row.areaBn && <span className="text-white/40 text-xs block mt-0.5 ml-6">({row.areaBn})</span>}
              </td>
              <td className="px-5 py-4 text-white/60 font-mono text-xs leading-relaxed">{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ScopePage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className='max-w-4xl mx-auto pb-12 mt-16'>

        {/* Hero Image */}
        <Card className="overflow-hidden border-primary-500/20 bg-[#0a0a0f]/80 p-2 shadow-2xl mb-10">
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img
              src={scopeImg}
              alt="Scope of IF-ELSE"
              className="w-full h-auto object-contain"
            />
          </div>
        </Card>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white/90 mb-2">
            Where is IF-ELSE Used? <span className="text-primary-400">(IF-ELSE কোথায় ব্যবহার হয়?)</span>
          </h2>
          <p className="text-white/50">IF-ELSE is used in almost <span className="text-amber-400 font-semibold">EVERY</span> Python program! Here are the main areas:</p>
        </div>

        {/* Table 1 */}
        <div className="mb-8">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">Core Areas</p>
          <ScopeTable rows={TABLE_1} />
        </div>

        {/* Table 2 */}
        <div>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">Advanced Applications</p>
          <ScopeTable rows={TABLE_2} />
        </div>

      </motion.div>
    </ModulePage>
  )
}

