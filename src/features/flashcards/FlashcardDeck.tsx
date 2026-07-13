import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface Flashcard {
  id: string
  front: string
  back: string
  codeSnippet?: string
}

interface FlashcardDeckProps {
  cards: Flashcard[]
}

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(i => i + 1), 150)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(i => i - 1), 150)
    }
  }

  const card = cards[currentIndex]

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between text-sm font-mono text-white/40 px-2">
        <span>Flashcards</span>
        <span>{currentIndex + 1} / {cards.length}</span>
      </div>

      <div className="relative h-[300px] w-full perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <motion.div
              className="w-full h-full relative preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors shadow-2xl shadow-black/50">
                <h3 className="text-2xl font-medium text-white/90 leading-relaxed">
                  {card.front}
                </h3>
                <div className="absolute bottom-6 flex items-center gap-2 text-white/20 text-xs font-medium">
                  <RotateCcw size={14} />
                  Click to flip
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-primary-500/10 border border-primary-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl shadow-primary-500/10"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl text-primary-300 leading-relaxed font-medium">
                    {card.back}
                  </h3>
                  {card.codeSnippet && (
                    <div className="p-3 bg-[#0a0a0f] rounded-xl border border-white/10 font-mono text-sm text-emerald-400">
                      {card.codeSnippet}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
