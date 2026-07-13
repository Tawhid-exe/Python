import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { staggerContainer, staggerChild, scaleIn, fadeIn } from '@/utils/motion'

export interface Question {
  id: string
  question: string
  options: string[]
  correctIndex?: number
  correctIndices?: number[]
  explanation: string
  codeSnippet?: string
}

interface QuizEngineProps {
  questions: Question[]
  title: string
  onComplete?: (score: number) => void
}

export default function QuizEngine({ questions, title, onComplete }: QuizEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const getCorrect = (q: Question) => q.correctIndices ?? (q.correctIndex !== undefined ? [q.correctIndex] : [])

  const handleSubmit = () => {
    setIsAnswered(true)
    const q = questions[currentIdx]
    const correct = getCorrect(q)
    const isAllCorrect = selected.length === correct.length && correct.every(i => selected.includes(i))
    if (isAllCorrect) {
      setScore(s => s + 1)
    }
  }

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    const q = questions[currentIdx]
    const correct = getCorrect(q)
    
    if (correct.length === 1) {
      // Auto-submit for single select
      setSelected([idx])
      setIsAnswered(true)
      if (idx === correct[0]) {
        setScore(s => s + 1)
      }
    } else {
      // Toggle for multi select
      setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1)
      setSelected([])
      setIsAnswered(false)
    } else {
      setIsFinished(true)
      // Score is already updated in handleSubmit or handleSelect
      onComplete?.(score)
    }
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelected([])
    setIsAnswered(false)
    setScore(0)
    setIsFinished(false)
  }

  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center p-8 space-y-6">
          <motion.div variants={scaleIn} className="w-24 h-24 mx-auto rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary-400">{percent}%</span>
          </motion.div>
          
          <motion.div variants={staggerChild} className="space-y-2">
            <h2 className="text-2xl font-semibold text-white/90">Quiz Completed!</h2>
            <p className="text-white/50">You scored {score} out of {questions.length}</p>
          </motion.div>

          <motion.div variants={staggerChild} className="pt-4 flex justify-center gap-4">
            <Button variant="secondary" onClick={handleRestart} leftIcon={<RotateCcw size={16} />}>
              Retry Quiz
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    )
  }

  const q = questions[currentIdx]
  const progress = ((currentIdx + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header & Progress */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white/80 flex items-center gap-2">
          <HelpCircle size={18} className="text-primary-400" />
          {title}
        </h3>
        <span className="text-sm font-mono text-white/40">
          Question {currentIdx + 1} / {questions.length}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 space-y-6">
            <h2 className="text-xl text-white/90 font-medium leading-relaxed">
              {currentIdx + 1}. {q.question}
            </h2>

            {q.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-white/10">
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  customStyle={{ margin: 0, padding: '1rem', background: '#0a0a0f', fontSize: '14px' }}
                >
                  {q.codeSnippet}
                </SyntaxHighlighter>
              </div>
            )}

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const correct = getCorrect(q)
                const isCorrect = correct.includes(idx)
                const isSelected = selected.includes(idx)
                let stateClass = "border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90"
                
                if (isAnswered) {
                  if (isCorrect) {
                    stateClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  } else if (isSelected) {
                    stateClass = "border-rose-500/50 bg-rose-500/10 text-rose-400"
                  } else {
                    stateClass = "border-white/5 bg-transparent text-white/30 opacity-50"
                  }
                } else if (isSelected) {
                  stateClass = "border-primary-500/50 bg-primary-500/10 text-primary-400"
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 font-medium",
                      stateClass
                    )}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                  </button>
                )
              })}
            </div>

            {!isAnswered && getCorrect(q).length !== 1 && (
              <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex justify-end pt-4">
                <Button variant="primary" onClick={handleSubmit}>
                  Submit Answer
                </Button>
              </motion.div>
            )}

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className={cn(
                    "p-4 rounded-xl border",
                    (selected.length === getCorrect(q).length && getCorrect(q).every(i => selected.includes(i)))
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200" 
                      : "bg-rose-500/10 border-rose-500/20 text-rose-200"
                  )}>
                    <p className="text-sm leading-relaxed font-medium">
                      {(selected.length === getCorrect(q).length && getCorrect(q).every(i => selected.includes(i))) ? '✅ Correct! ' : '❌ Incorrect. '}
                      <span className="opacity-80">{q.explanation}</span>
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="primary" rightIcon={<ArrowRight size={16} />} onClick={handleNext}>
                      {currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
