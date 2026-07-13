import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import { staggerChild } from '@/utils/motion'
import { motion } from 'framer-motion'
import { ClipboardList, Code2, AlertTriangle, Sparkles } from 'lucide-react'
import Card from '@/components/common/Card/Card'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '19-assignment')!

const STARTER_CODE = `# River Crossing Riddle Starter Code
man = "left"
tiger = "left"
sheep = "left"
grass = "left"

print("Welcome to the River Crossing Game!")
print("Goal: Move everything to the right side safely.")

while True:
    # Print current status
    print(f"\\nStatus: Man={man}, Tiger={tiger}, Sheep={sheep}, Grass={grass}")
    
    # Check Win Condition
    if man == "right" and tiger == "right" and sheep == "right" and grass == "right":
        print("🎉 Congratulations! You won!")
        break

    # Check Lose Conditions
    # 1. Tiger eats Sheep
    if man != tiger and tiger == sheep:
        print("💀 Game Over! The tiger ate the sheep!")
        break
    # 2. Sheep eats Grass
    elif man != sheep and sheep == grass:
        print("💀 Game Over! The sheep ate the grass!")
        break

    # Get user move
    move = input("What do you want to move? (man/tiger/sheep/grass): ").strip().lower()

    # Process Move using IF-ELSE
    if move == "man":
        man = "right" if man == "left" else "left"
    elif move == "tiger":
        if tiger == man:
            tiger = "right" if tiger == "left" else "left"
            man = "right" if man == "left" else "left"
        else:
            print("❌ The man is not on the same side as the tiger!")
    elif move == "sheep":
        if sheep == man:
            sheep = "right" if sheep == "left" else "left"
            man = "right" if man == "left" else "left"
        else:
            print("❌ The man is not on the same side as the sheep!")
    elif move == "grass":
        if grass == man:
            grass = "right" if grass == "left" else "left"
            man = "right" if man == "left" else "left"
        else:
            print("❌ The man is not on the same side as the grass!")
    else:
        print("❌ Invalid move! Try again.")
`

export default function AssignmentPage() {
  const language = useSettingsStore(state => state.language)

  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className="space-y-8 mt-6">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
            <ClipboardList className="text-primary-400" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white/90">
            {language === 'bn' ? 'মডিউল অ্যাসাইনমেন্ট 📝' : 'Module Assignment 📝'}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            {language === 'bn' 
              ? 'বাস্তব জীবনের লজিক কোডিংয়ে রূপান্তর করুন। নদীর পারাপার ধাঁধাটি পাইথনে তৈরি করুন!'
              : 'Bring real-world logic into code. Build the River Crossing game in Python!'}
          </p>
        </div>

        {/* Task Description */}
        <Card padding="lg" className="space-y-4">
          <h3 className="text-xl font-semibold text-white/90 flex items-center gap-2">
            <Sparkles className="text-amber-400" size={20} />
            {language === 'bn' ? 'অ্যাসাইনমেন্ট টাস্ক: টার্মিনাল রিভার ক্রসিং' : 'Assignment Task: Terminal River Crossing'}
          </h3>
          <p className="text-white/70 leading-relaxed text-sm">
            {language === 'bn' 
              ? 'আপনার কাজ হলো Riddles পেজে খেলা ইন্টারেক্টিভ গেমটির একটি টেক্সট-ভিত্তিক টার্মিনাল সংস্করণ তৈরি করা। আপনাকে পাইথনের variable, input(), and if-elif-else কন্ডিশন ব্যবহার করে পুরো লজিকটি হ্যান্ডেল করতে হবে।'
              : 'Your task is to build a text-based, terminal-style version of the River Crossing game you played in the Riddles section. You will use variables, input(), and if-elif-else statements in Python to handle the game logic.'}
          </p>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <h4 className="font-semibold text-sm text-white/80">
              {language === 'bn' ? 'প্রয়োজনীয় শর্তাবলী (Requirements):' : 'Requirements:'}
            </h4>
            <ul className="list-disc pl-5 text-sm text-white/60 space-y-2">
              <li>
                {language === 'bn'
                  ? 'চারটি ক্যারেক্টারের পজিশন ট্র্যাকিংয়ের জন্য আলাদা ভেরিয়েবল তৈরি করুন: man, tiger, sheep, এবং grass (মান হতে পারে "left" বা "right")।'
                  : 'Track the positions of the four entities: man, tiger, sheep, and grass using variables (with values "left" or "right").'}
              </li>
              <li>
                {language === 'bn'
                  ? 'প্রতিটি লুপের শুরুতে বর্তমান স্ট্যাটাস প্রিন্ট করুন।'
                  : 'At the start of every turn, print the current positions.'}
              </li>
              <li>
                {language === 'bn'
                  ? 'ইনপুট নিয়ে চেক করুন মানুষ সেই জিনিসের সাথে একই পাড়ে আছে কিনা। না থাকলে মুভ বাতিল হবে।'
                  : 'Take user input for the move and ensure the man is on the same side as the item being moved.'}
              </li>
              <li>
                {language === 'bn'
                  ? 'IF-ELSE দিয়ে হার-জিতের কন্ডিশনগুলো হ্যান্ডেল করুন (বাঘ ও ভেড়া একসাথে থাকলে এবং মানুষ না থাকলে হার, ইত্যাদি)।'
                  : 'Use IF-ELSE to check for lose/win conditions (e.g., if tiger and sheep are together without the man).'}
              </li>
            </ul>
          </div>
        </Card>

        {/* Starter Code */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
            <Code2 className="text-emerald-400" size={20} />
            {language === 'bn' ? 'স্টার্টার কোড (Starter Code)' : 'Starter Code'}
          </h3>
          <p className="text-xs text-white/40">
            {language === 'bn'
              ? 'কোড এডিটর প্যানেলে গিয়ে নিচের স্টার্টার কোডটি দিয়ে শুরু করতে পারেন:'
              : 'You can copy this template into the Code Panel to begin writing:'}
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <SyntaxHighlighter
              language="python"
              style={oneDark}
              customStyle={{ margin: 0, padding: '1.25rem', background: '#0d0d14', fontSize: '0.85rem' }}
            >
              {STARTER_CODE}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Warning / Tips */}
        <Card padding="md" className="bg-rose-500/5 border-rose-500/10">
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-rose-300 mb-1">
                {language === 'bn' ? 'সতর্কতা ও টিপস' : 'Key Game Logic Tip'}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {language === 'bn' 
                  ? 'মনে রাখবেন, বাঘ আর ভেড়া বা ভেড়া আর ঘাস যদি একসাথে থাকে এবং মানুষ অন্যদিকে চলে যায়, তবে খেলা শেষ হবে। এটি চেক করতে পাইথনের nested if-else অথবা logical and/or অপারেটরগুলো বুদ্ধি খাটিয়ে ব্যবহার করুন!'
                  : 'Ensure you check for the fail conditions after every move! If the man is on one side, but the tiger and sheep are on the opposite side, the tiger eats the sheep. Use logical operators (and/or) to chain these checks correctly.'}
              </p>
            </div>
          </div>
        </Card>

      </motion.div>
    </ModulePage>
  )
}
