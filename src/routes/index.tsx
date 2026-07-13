import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'

// ─── Lazy-loaded pages ────────────────────────────────────────
const LandingPage          = lazy(() => import('@/pages/LandingPage'))
const LessonOverviewPage   = lazy(() => import('@/pages/LessonOverviewPage'))
const LessonShell          = lazy(() => import('@/pages/lesson/LessonShell'))

// Lesson module pages
const MotivationPage       = lazy(() => import('@/pages/lesson/MotivationPage'))
const DeclarationPage      = lazy(() => import('@/pages/lesson/DeclarationPage'))
const OutcomesPage         = lazy(() => import('@/pages/lesson/OutcomesPage'))
const PreTestPage          = lazy(() => import('@/pages/lesson/PreTestPage'))
const DiscussionPage       = lazy(() => import('@/pages/lesson/DiscussionPage'))
const KeyNotesPage         = lazy(() => import('@/pages/lesson/KeyNotesPage'))
const ScopePage            = lazy(() => import('@/pages/lesson/ScopePage'))
const PracticalUsesPage    = lazy(() => import('@/pages/lesson/PracticalUsesPage'))
const FunFactsPage         = lazy(() => import('@/pages/lesson/FunFactsPage'))
const TipsPage             = lazy(() => import('@/pages/lesson/TipsPage'))
const RiddlesPage          = lazy(() => import('@/pages/lesson/RiddlesPage'))
const StoryPage            = lazy(() => import('@/pages/lesson/StoryPage'))
const GamesPage            = lazy(() => import('@/pages/lesson/GamesPage'))
const WorksheetPage        = lazy(() => import('@/pages/lesson/WorksheetPage'))
const SongPage             = lazy(() => import('@/pages/lesson/SongPage'))
const VocabularyPage       = lazy(() => import('@/pages/lesson/VocabularyPage'))
const ProblemSolvingPage   = lazy(() => import('@/pages/lesson/ProblemSolvingPage'))
const PostTestPage         = lazy(() => import('@/pages/lesson/PostTestPage'))
const AssignmentPage       = lazy(() => import('@/pages/lesson/AssignmentPage'))
const InfographicPage      = lazy(() => import('@/pages/lesson/InfographicPage'))
const JokesPage            = lazy(() => import('@/pages/lesson/JokesPage'))
const InspirationPage      = lazy(() => import('@/pages/lesson/InspirationPage'))

// ─── Loading Fallback ─────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/30 text-sm">Loading module…</p>
      </div>
    </div>
  )
}

// ─── Router ───────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/lesson',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LessonOverviewPage />
          </Suspense>
        ),
      },
      {
        path: '01-motivation',
        element: <Suspense fallback={<PageLoader />}><MotivationPage /></Suspense>,
      },
      {
        path: '02-declaration',
        element: <Suspense fallback={<PageLoader />}><DeclarationPage /></Suspense>,
      },
      {
        path: '03-outcomes',
        element: <Suspense fallback={<PageLoader />}><OutcomesPage /></Suspense>,
      },
      {
        path: '04-pre-test',
        element: <Suspense fallback={<PageLoader />}><PreTestPage /></Suspense>,
      },
      {
        path: '05-discussion',
        element: <Suspense fallback={<PageLoader />}><DiscussionPage /></Suspense>,
      },
      {
        path: '06-key-notes',
        element: <Suspense fallback={<PageLoader />}><KeyNotesPage /></Suspense>,
      },
      {
        path: '07-scope',
        element: <Suspense fallback={<PageLoader />}><ScopePage /></Suspense>,
      },
      {
        path: '08-practical',
        element: <Suspense fallback={<PageLoader />}><PracticalUsesPage /></Suspense>,
      },
      {
        path: '09-fun-facts',
        element: <Suspense fallback={<PageLoader />}><FunFactsPage /></Suspense>,
      },
      {
        path: '10-tips',
        element: <Suspense fallback={<PageLoader />}><TipsPage /></Suspense>,
      },
      {
        path: '11-riddles',
        element: <Suspense fallback={<PageLoader />}><RiddlesPage /></Suspense>,
      },
      {
        path: '12-story',
        element: <Suspense fallback={<PageLoader />}><StoryPage /></Suspense>,
      },
      {
        path: '13-games',
        element: <Suspense fallback={<PageLoader />}><GamesPage /></Suspense>,
      },
      {
        path: '14-worksheet',
        element: <Suspense fallback={<PageLoader />}><WorksheetPage /></Suspense>,
      },
      {
        path: '15-song',
        element: <Suspense fallback={<PageLoader />}><SongPage /></Suspense>,
      },
      {
        path: '16-vocabulary',
        element: <Suspense fallback={<PageLoader />}><VocabularyPage /></Suspense>,
      },
      {
        path: '17-problems',
        element: <Suspense fallback={<PageLoader />}><ProblemSolvingPage /></Suspense>,
      },
      {
        path: '18-post-test',
        element: <Suspense fallback={<PageLoader />}><PostTestPage /></Suspense>,
      },
      {
        path: '19-assignment',
        element: <Suspense fallback={<PageLoader />}><AssignmentPage /></Suspense>,
      },
      {
        path: '20-infographic',
        element: <Suspense fallback={<PageLoader />}><InfographicPage /></Suspense>,
      },
      {
        path: '21-jokes',
        element: <Suspense fallback={<PageLoader />}><JokesPage /></Suspense>,
      },
      {
        path: '22-inspiration',
        element: <Suspense fallback={<PageLoader />}><InspirationPage /></Suspense>,
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
