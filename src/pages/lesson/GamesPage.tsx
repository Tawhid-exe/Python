import ModulePage from './ModulePage'
import { IF_ELSE_MODULES } from '@/constants/modules'
import FlashcardDeck, { Flashcard } from '@/features/flashcards/FlashcardDeck'
import { motion } from 'framer-motion'
import { staggerChild } from '@/utils/motion'
import { Gamepad2 } from 'lucide-react'

const MODULE = IF_ELSE_MODULES.find(m => m.id === '13-games')!

const FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    front: 'What does IF do?',
    back: 'Executes a block of code only when its condition evaluates to True.'
  },
  {
    id: 'f2',
    front: 'What is the purpose of ELIF?',
    back: 'It checks another condition if the previous IF condition was False, avoiding deep nested blocks.'
  },
  {
    id: 'f3',
    front: 'What is the Ternary Operator syntax?',
    back: 'It allows one-line conditionals.',
    codeSnippet: 'value = True if condition else False'
  },
  {
    id: 'f4',
    front: 'What happens if you use "=" inside an IF statement?',
    back: 'Python will throw a SyntaxError. You must use "==" for comparison.'
  }
]

export default function GamesPage() {
  return (
    <ModulePage module={MODULE}>
      <motion.div variants={staggerChild} className="space-y-12">
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <Gamepad2 size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white/90">Interactive Flashcards</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Test your memory! Read the front of the card, guess the answer, and tap to flip it over to see if you were right.
          </p>
        </div>

        <FlashcardDeck cards={FLASHCARDS} />

      </motion.div>
    </ModulePage>
  )
}
