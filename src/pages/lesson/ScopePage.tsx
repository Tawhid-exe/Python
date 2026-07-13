import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import Card from '@/components/common/Card/Card'
import scopeImg from '@/assets/scope.png'
import { useSettingsStore } from '@/store/useSettingsStore'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '07-scope')!

const TABLE_1 = [
  {
    icon: '🌐',
    areaEn: 'Web Development',
    areaBn: 'ওয়েব ডেভেলপমেন্ট',
    usage: 'Login check: if username and password match → allow entry',
  },
  {
    icon: '🏦',
    areaEn: 'Banking Software',
    areaBn: 'ব্যাংকিং সফটওয়্যার',
    usage: 'if balance >= withdrawal amount → allow; else → deny',
  },
  {
    icon: '🎮',
    areaEn: 'Game Development',
    areaBn: 'গেম ডেভেলপমেন্ট',
    usage: 'if player health == 0 → game over; else → continue game',
  },
  {
    icon: '📱',
    areaEn: 'Mobile Apps',
    areaBn: 'মোবাইল আ্যাপ',
    usage: 'if notification settings == ON → send alert; else → skip',
  },
]

const TABLE_2 = [
  {
    icon: '🛒',
    areaEn: 'E-commerce',
    areaBn: 'ই-কমার্স',
    usage: "if stock > 0 → show 'Add to Cart'; else → show 'Out of Stock'",
  },
  {
    icon: '🎓',
    areaEn: 'Education Systems',
    areaBn: 'শিক্ষা ব্যবস্থা',
    usage: 'if marks >= 50 → pass; elif marks >= 33 → supplementary; else → fail',
  },
  {
    icon: '🏥',
    areaEn: 'Medical Systems',
    areaBn: 'চিকিৎসা ব্যবস্থা',
    usage: 'if temperature > 38 → flag as fever; else → normal',
  },
  {
    icon: '🤖',
    areaEn: 'AI & Machine Learning',
    areaBn: 'এআই এবং মেশিন লার্নিং',
    usage: 'if confidence score > 0.9 → classify as positive; else → negative',
  },
  {
    icon: '🔒',
    areaEn: 'Security Systems',
    areaBn: 'নিরাপত্তা ব্যবস্থা',
    usage: 'if login attempts > 3 → lock account; else → allow retry',
  },
  {
    icon: '📊',
    areaEn: 'Data Analysis',
    areaBn: 'ডেটা বিশ্লেষণ',
    usage: 'if value > threshold → label as outlier; else → normal',
  },
]

function ScopeTable({ rows, language }: { rows: typeof TABLE_1, language: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary-500/10 border-b border-white/10">
            <th className="text-left px-5 py-3 text-primary-300 font-semibold w-[40%]">
              {language === 'bn' ? 'Area (ক্ষেত্র)' : 'Area'}
            </th>
            <th className="text-left px-5 py-3 text-primary-300 font-semibold">
              {language === 'bn' ? 'How IF-ELSE is Used (কীভাবে ব্যবহার হয়)' : 'How IF-ELSE is Used'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} hover:bg-primary-500/5 transition-colors`}>
              <td className="px-5 py-4 text-white/80 font-medium flex items-center gap-2">
                <span>{row.icon}</span>
                <span>{language === 'bn' ? row.areaBn || row.areaEn : row.areaEn}</span>
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
  const language = useSettingsStore(state => state.language)

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
            {language === 'bn' ? 'IF-ELSE কোথায় ব্যবহার হয়?' : 'Where is IF-ELSE Used?'}
          </h2>
          <p className="text-white/50">
            {language === 'bn' ? (
              <>IF-ELSE প্রায় <span className="text-amber-400 font-semibold">সব</span> পাইথন প্রোগ্রামে ব্যবহৃত হয়! নিচে কিছু প্রধান ক্ষেত্র দেওয়া হলো:</>
            ) : (
              <>IF-ELSE is used in almost <span className="text-amber-400 font-semibold">EVERY</span> Python program! Here are the main areas:</>
            )}
          </p>
        </div>

        {/* Table 1 */}
        <div className="mb-8">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
            {language === 'bn' ? 'প্রধান ক্ষেত্রসমূহ' : 'Core Areas'}
          </p>
          <ScopeTable rows={TABLE_1} language={language} />
        </div>

        {/* Table 2 */}
        <div>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
            {language === 'bn' ? 'উন্নত অ্যাপ্লিকেশন' : 'Advanced Applications'}
          </p>
          <ScopeTable rows={TABLE_2} language={language} />
        </div>

      </motion.div>
    </ModulePage>
  )
}
