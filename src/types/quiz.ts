export interface QuizQuestion {
  id: string
  question: string
  questionBn?: string          // Bengali translation
  options: QuizOption[]
  correctAnswers: string[]     // supports multi-correct
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
}

export interface QuizOption {
  id: string
  label: string                // "A", "B", "C", "D"
  text: string
  textBn?: string
}

export interface QuizAttempt {
  questionId: string
  selectedAnswers: string[]
  isCorrect: boolean
  timeSpentMs: number
}

export interface QuizResult {
  mode: 'pre-test' | 'post-test'
  totalQuestions: number
  correctCount: number
  score: number                // 0–100
  attempts: QuizAttempt[]
  completedAt: string
}
