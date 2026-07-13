// ─── Common Shared Types ──────────────────────────────────────

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
export type Status = 'locked' | 'available' | 'in-progress' | 'completed'

export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string | number
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface CodeExample {
  id: string
  title: string
  code: string
  language: 'python' | 'javascript' | 'html' | 'css'
  explanation?: string
  expectedOutput?: string
}

export interface PracticeProb {
  id: string
  title: string
  titleBn?: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  hint?: string
  starterCode?: string
  solution: string
  explanation: string
  category: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  frontBn?: string
  backBn?: string
}

export interface Vocab {
  id: string
  term: string
  definition: string
  termBn?: string
  definitionBn?: string
  example?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isStreaming?: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  condition: 'first-module' | 'quiz-perfect' | 'all-complete' | 'problem-solved'
}
