import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

import practicalImg from '@/assets/practicaluses.png'
import Card from '@/components/common/Card/Card'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '08-practical')!

const FUNNY_EXAMPLES = [
  {
    title: "Program 5: Mom's Anger Level Checker (মায়ের রাগের মাত্রা পরীক্ষক)",
    code: `hours_played = int(input("How many hours did you play games today? "))\n\nif hours_played > 4:\n    print("Run for your life! (জীবন বাঁচাতে পালাও!) 🏃‍♂️💨")\nelif hours_played > 2:\n    print("Mom is angry. (মা রেগে আছেন।)")\nelse:\n    print("You are safe... for now. (তুমি আপাতত নিরাপদ।)")`
  },
  {
    title: "Program 6: Midnight Snack Checker (মাঝরাতে খাওয়ার পরীক্ষক)",
    code: `time = input("What time is it? (e.g. 12 AM): ")\n\nif time == "2 AM" or time == "3 AM":\n    print("Time for Maggi noodles! (ম্যাগি নুডুলস খাওয়ার সময়!) 🍜")\nelse:\n    print("Go to sleep! (ঘুমাতে যাও!) 😴")`
  }
]

export default function PracticalUsesPage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className="space-y-8 mt-6">
        
        <Card padding="md" className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img 
              src={practicalImg} 
              alt="Practical Uses of IF ELSE" 
              className="w-full h-auto object-contain"
            />
          </div>
        </Card>

        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold text-white/90 text-center">Bonus: Practical Funny Examples 😂</h2>
          
          <div className="grid gap-6">
            {FUNNY_EXAMPLES.map((example, i) => (
              <Card key={i} padding="lg" className="space-y-3 bg-[#0a0a0f] border-white/5">
                <h3 className="text-emerald-400 font-semibold">{example.title}</h3>
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{ margin: 0, padding: '1rem', background: '#0d0d14', fontSize: '0.85rem' }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </motion.div>
    </ModulePage>
  )
}
