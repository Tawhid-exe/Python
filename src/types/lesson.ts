// ─── Types ────────────────────────────────────────────────────
export interface ModuleDefinition {
  id: string              // e.g. "01-motivation"
  part: number            // 1–22
  title: string
  titleBn: string         // Bengali label
  icon: string            // Lucide icon name
  route: string           // e.g. "/lesson/01-motivation"
  estimatedMinutes: number
  type: ModuleType
  description: string
}

export type ModuleType =
  | 'intro'
  | 'declaration'
  | 'outcomes'
  | 'quiz'
  | 'discussion'
  | 'notes'
  | 'scope'
  | 'practical'
  | 'facts'
  | 'tips'
  | 'riddles'
  | 'story'
  | 'games'
  | 'worksheet'
  | 'song'
  | 'vocabulary'
  | 'problems'
  | 'assignment'
  | 'infographic'
  | 'jokes'
  | 'ending'

export interface LessonManifest {
  id: string
  title: string
  titleBn: string
  subtitle: string
  totalModules: number
  totalMinutes: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: ModuleDefinition[]
}

export interface ModuleProgress {
  moduleId: string
  completed: boolean
  startedAt?: string
  completedAt?: string
  timeSpentSeconds: number
}

export interface LessonProgress {
  lessonId: string
  modules: Record<string, ModuleProgress>
  overallPercent: number
  lastVisitedModuleId?: string
}
