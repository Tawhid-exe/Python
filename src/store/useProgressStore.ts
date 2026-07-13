import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ModuleProgress, LessonProgress } from '@/types/lesson'
import { IF_ELSE_MODULES } from '@/constants/modules'

interface ProgressState {
  progress: LessonProgress
  markComplete: (moduleId: string) => void
  unmarkComplete: (moduleId: string) => void
  markVisited: (moduleId: string) => void
  addTimeSpent: (moduleId: string, seconds: number) => void
  resetProgress: () => void
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined
  getOverallPercent: () => number
}

const createInitialProgress = (): LessonProgress => ({
  lessonId: 'python-if-else',
  modules: {},
  overallPercent: 0,
  lastVisitedModuleId: undefined,
})

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: createInitialProgress(),

      markComplete: (moduleId) =>
        set((state) => {
          const existing = state.progress.modules[moduleId] ?? {
            moduleId,
            completed: false,
            timeSpentSeconds: 0,
          }
          const updated: ModuleProgress = {
            ...existing,
            completed: true,
            completedAt: new Date().toISOString(),
          }
          const modules = { ...state.progress.modules, [moduleId]: updated }
          const completedCount = Object.values(modules).filter((m) => m.completed).length
          const overallPercent = Math.round((completedCount / IF_ELSE_MODULES.length) * 100)
          return {
            progress: {
              ...state.progress,
              modules,
              overallPercent,
              lastVisitedModuleId: moduleId,
            },
          }
        }),

      unmarkComplete: (moduleId) =>
        set((state) => {
          const existing = state.progress.modules[moduleId]
          if (!existing) return { progress: state.progress }
          
          const updated: ModuleProgress = {
            ...existing,
            completed: false,
            completedAt: undefined,
          }
          const modules = { ...state.progress.modules, [moduleId]: updated }
          const completedCount = Object.values(modules).filter((m) => m.completed).length
          const overallPercent = Math.round((completedCount / IF_ELSE_MODULES.length) * 100)
          
          return {
            progress: {
              ...state.progress,
              modules,
              overallPercent,
              lastVisitedModuleId: moduleId,
            },
          }
        }),

      markVisited: (moduleId) =>
        set((state) => {
          const existing = state.progress.modules[moduleId]
          if (existing) {
            return {
              progress: {
                ...state.progress,
                lastVisitedModuleId: moduleId,
              },
            }
          }
          const newProgress: ModuleProgress = {
            moduleId,
            completed: false,
            startedAt: new Date().toISOString(),
            timeSpentSeconds: 0,
          }
          return {
            progress: {
              ...state.progress,
              modules: { ...state.progress.modules, [moduleId]: newProgress },
              lastVisitedModuleId: moduleId,
            },
          }
        }),

      addTimeSpent: (moduleId, seconds) =>
        set((state) => {
          const existing = state.progress.modules[moduleId] ?? {
            moduleId,
            completed: false,
            timeSpentSeconds: 0,
          }
          return {
            progress: {
              ...state.progress,
              modules: {
                ...state.progress.modules,
                [moduleId]: {
                  ...existing,
                  timeSpentSeconds: existing.timeSpentSeconds + seconds,
                },
              },
            },
          }
        }),

      resetProgress: () => set({ progress: createInitialProgress() }),

      getModuleProgress: (moduleId) => get().progress.modules[moduleId],

      getOverallPercent: () => get().progress.overallPercent,
    }),
    {
      name: 'python-lesson-progress',
      version: 1,
    }
  )
)
