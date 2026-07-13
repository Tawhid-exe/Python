import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Lightbulb, Code2, AlertCircle, HelpCircle } from 'lucide-react'
import Card from '@/components/common/Card/Card'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '10-tips')!

const TIPS = [
  {
    titleEn: "1. Simplify Boolean Checks (বুলিয়ান চেক সহজ করুন)",
    descEn: "Instead of comparing variables directly to True or False, just use the variable itself!",
    descBn: "ভেরিয়েবল সরাসরি True বা False এর সাথে তুলনা করার পরিবর্তে, ভেরিয়েবলটি সরাসরি ব্যবহার করুন!",
    badCode: "if is_logged_in == True:\n    print('Welcome!')",
    goodCode: "if is_logged_in:\n    print('Welcome!')"
  },
  {
    titleEn: "2. Flatten Nested IFs (নেস্টেড IF কমান)",
    descEn: "Deeply nested IF statements are hard to read. Use logical operators (and, or) to make your code flat and readable.",
    descBn: "বেশি ভেতরের নেস্টেড IF কোড পড়া কঠিন করে তোলে। কোড পরিষ্কার রাখতে লজিক্যাল অপারেটর (and, or) ব্যবহার করুন।",
    badCode: "if is_weekend:\n    if is_sunny:\n        print('Let\\'s go out!')",
    goodCode: "if is_weekend and is_sunny:\n    print('Let\\'s go out!')"
  },
  {
    titleEn: "3. Order of Conditions Matters (শর্তের ক্রম ঠিক রাখুন)",
    descEn: "Python evaluates conditions top-to-bottom. Always check the most specific/highest threshold conditions first when using elif.",
    descBn: "পাইথন উপর থেকে নিচে শর্তগুলো চেক করে। তাই elif ব্যবহারের সময় সবসময় সর্বোচ্চ বা নির্দিষ্ট শর্তটি সবার আগে চেক করুন।",
    badCode: "# BUG: score of 95 will print B!\nif score >= 80:\n    print('B')\nelif score >= 90:\n    print('A')",
    goodCode: "# Correct Order:\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')"
  },
  {
    titleEn: "4. The Ternary Operator (টার্নারি অপারেটর)",
    descEn: "For simple assignments based on a condition, you can write IF-ELSE in a single line!",
    descBn: "সহজ কোনো কন্ডিশনের ওপর ভ্যালু অ্যাসাইন করার জন্য, এক লাইনে IF-ELSE লিখতে পারেন!",
    badCode: "if score >= 50:\n    result = 'Pass'\nelse:\n    result = 'Fail'",
    goodCode: "result = 'Pass' if score >= 50 else 'Fail'"
  }
]

export default function TipsPage() {
  const language = useSettingsStore(state => state.language)

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className="space-y-8 mt-6">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Lightbulb className="text-amber-400" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white/90">
            {language === 'bn' ? 'টিপস এবং ট্রিক্স 💡' : 'Tips and Tricks 💡'}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            {language === 'bn' 
              ? 'ক্লিন এবং দক্ষ পাইথন কন্ডিশনাল কোড লেখার সেরা কৌশলসমূহ।'
              : 'Write clean, readable, and highly efficient Python conditional code.'}
          </p>
        </div>

        {/* List of Tips */}
        <div className="space-y-6">
          {TIPS.map((tip, idx) => (
            <Card key={idx} padding="lg" className="space-y-4">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                {language === 'bn' ? tip.titleEn : tip.titleEn}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {language === 'bn' ? tip.descBn : tip.descEn}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Bad Code */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                    <AlertCircle size={14} />
                    <span>{language === 'bn' ? 'খারাপ প্র্যাকটিস (Avoid)' : 'Avoid'}</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-rose-500/20">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{ margin: 0, padding: '1rem', background: '#12080c', fontSize: '0.8rem' }}
                    >
                      {tip.badCode}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Good Code */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Code2 size={14} />
                    <span>{language === 'bn' ? 'সেরা প্র্যাকটিস (Recommended)' : 'Recommended'}</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-emerald-500/20">
                    <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{ margin: 0, padding: '1rem', background: '#08120d', fontSize: '0.8rem' }}
                    >
                      {tip.goodCode}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Indentation Warning Card */}
        <Card padding="md" className="bg-primary-500/5 border-primary-500/10">
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-primary-500/10 text-primary-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-primary-300 mb-1">
                {language === 'bn' ? 'পাইথনে ইনডেন্টেশন (Indentation)' : 'Why Indentation is Rule #1'}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {language === 'bn' 
                  ? 'অন্যান্য ল্যাঙ্গুয়েজে ব্র্যাকেট {} ব্যবহার হলেও পাইথন ব্লক চিনতে স্পেস ব্যবহার করে। প্রতিটি IF ব্লকের ভেতর কোডকে ৪টি স্পেস (বা একটি Tab) ডানে সরাতে হবে। ভুল হলে কোড রান না হয়ে IndentationError দেবে!'
                  : 'Unlike other languages, Python doesn\'t use {} for code blocks. It relies strictly on indentation (usually 4 spaces or 1 tab). If your blocks don\'t line up correctly, Python will throw an IndentationError and refuse to run!'}
              </p>
            </div>
          </div>
        </Card>

      </motion.div>
    </ModulePage>
  )
}
