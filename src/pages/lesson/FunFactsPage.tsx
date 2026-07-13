import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild, staggerContainer } from '@/utils/motion'
import { motion } from 'framer-motion'
import { useSettingsStore } from '@/store/useSettingsStore'
import Card from '@/components/common/Card/Card'
import { Sparkles, Brain, Rocket } from 'lucide-react'
import funfactImg from '@/assets/funfact.png'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '09-fun-facts')!

const FACTS = [
  {
    icon: <Brain className="text-purple-400" size={24} />,
    titleEn: "AI & Games",
    titleBn: "এআই এবং গেমস",
    descEn: "Did you know that early Artificial Intelligence was just thousands of IF-ELSE statements? Even today, basic game logic like 'IF player hits enemy THEN reduce health' runs entirely on these conditions!",
    descBn: "আপনি কি জানেন যে শুরুর দিকের কৃত্রিম বুদ্ধিমত্তা (AI) মূলত হাজার হাজার IF-ELSE স্টেটমেন্ট ছিল? এমনকি আজও, 'IF player hits enemy THEN reduce health'-এর মতো গেম লজিক এই শর্তগুলোর ওপর ভিত্তি করেই চলে!"
  },
  {
    icon: <Rocket className="text-orange-400" size={24} />,
    titleEn: "NASA Uses IF-ELSE",
    titleBn: "নাসা-ও এটি ব্যবহার করে",
    descEn: "The Mars Rovers use complex conditional logic to navigate. The code basically says: 'IF there is a rock ahead THEN stop and turn around'.",
    descBn: "মঙ্গলগ্রহের রোভারগুলো চলাচল করার জন্য জটিল শর্তযুক্ত লজিক ব্যবহার করে। কোডটি মূলত বলে: 'IF there is a rock ahead THEN stop and turn around'."
  },
  {
    icon: <Sparkles className="text-emerald-400" size={24} />,
    titleEn: "The Pythonic Ternary",
    titleBn: "পাইথনের শর্টকাট",
    descEn: "Python allows you to write an IF-ELSE in a single line! It is called the Ternary Operator. Example: 'result = True if x > 5 else False'.",
    descBn: "পাইথন আপনাকে এক লাইনে একটি IF-ELSE লেখার সুযোগ দেয়! একে টার্নারি অপারেটর বলা হয়। উদাহরণ: 'result = True if x > 5 else False'."
  }
]

export default function FunFactsPage() {
  const language = useSettingsStore(state => state.language)

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 mt-6">
        
        <Card padding="md" className="space-y-4 mb-8">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img 
              src={funfactImg} 
              alt="Fun Facts about IF ELSE" 
              className="w-full h-auto object-contain"
            />
          </div>
        </Card>

        <div className="text-center space-y-3 mb-8">
          <h2 className="text-2xl font-bold text-white/90">
            {language === 'bn' ? 'আপনি কি জানেন? 🤯' : 'Did You Know? 🤯'}
          </h2>
          <p className="text-white/60">
            {language === 'bn' ? 'IF-ELSE স্টেটমেন্ট সম্পর্কে কিছু চমকপ্রদ তথ্য' : 'Some mind-blowing facts about IF-ELSE statements'}
          </p>
        </div>

        <div className="grid gap-6">
          {FACTS.map((fact, i) => (
            <motion.div key={i} variants={staggerChild}>
              <Card padding="lg" className="space-y-4 bg-white/5 border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0">
                    {fact.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white/90">
                    {language === 'bn' ? fact.titleBn : fact.titleEn}
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed ml-16">
                  {language === 'bn' ? fact.descBn : fact.descEn}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ModulePage>
  )
}
