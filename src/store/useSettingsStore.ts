import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CodePanelMode = 'closed' | 'slim' | 'expanded'

interface SettingsState {
  language: 'en' | 'bn'
  theme: 'dark' | 'light'
  codePanelMode: CodePanelMode
  // Computed helpers for consumers
  isCodePanelOpen: boolean
  toggleLanguage: () => void
  toggleTheme: () => void
  toggleCodePanel: () => void
  expandCodePanel: () => void
  closeCodePanel: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'dark',
      codePanelMode: 'closed',
      isCodePanelOpen: false,

      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'bn' : 'en' })),

      // First click → slim, second click → closed
      toggleCodePanel: () =>
        set((state) => {
          if (state.codePanelMode === 'closed') return { codePanelMode: 'slim', isCodePanelOpen: true }
          return { codePanelMode: 'closed', isCodePanelOpen: false }
        }),

      expandCodePanel: () =>
        set({ codePanelMode: 'expanded', isCodePanelOpen: true }),

      closeCodePanel: () =>
        set({ codePanelMode: 'closed', isCodePanelOpen: false }),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark'
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
          } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
          }
          return { theme: newTheme }
        }),
    }),
    {
      name: 'python-lesson-settings',
      // Reset panel state on reload to avoid stale full-screen overlay
      partialize: (state) => ({ language: state.language, theme: state.theme }),
    }
  )
)

// Initialize theme on load
if (typeof window !== 'undefined') {
  const settings = localStorage.getItem('python-lesson-settings')
  if (settings) {
    try {
      const parsed = JSON.parse(settings)
      if (parsed.state?.theme === 'light') {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    } catch (e) {
      // Ignore
    }
  } else {
    document.documentElement.classList.add('dark')
  }
}
