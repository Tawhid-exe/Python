import { useState, useCallback, useEffect } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar/Sidebar'
import Navbar from '@/components/layout/Navbar/Navbar'
import AIChatWidget from '@/components/chat/AIChatWidget'
import CodeEditorPanel from '@/components/editor/CodeEditorPanel'
import { cn } from '@/utils/cn'
import { pageVariants } from '@/utils/motion'
import { getModuleById } from '@/constants/modules'
import { useProgressStore } from '@/store/useProgressStore'
import { useSettingsStore } from '@/store/useSettingsStore'

const SIDEBAR_OPEN_KEY = 'sidebar-open'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Default: open on desktop, closed on mobile
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SIDEBAR_OPEN_KEY)
      if (stored !== null) return stored === 'true'
      return window.innerWidth >= 1024
    }
    return true
  })
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  // Detect mobile and window width
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setWindowWidth(window.innerWidth)
      if (mobile) setSidebarOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => {
      const next = !prev
      localStorage.setItem(SIDEBAR_OPEN_KEY, String(next))
      return next
    })
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    localStorage.setItem(SIDEBAR_OPEN_KEY, 'false')
  }, [])

  // Derive current module from route
  const pathParts = location.pathname.split('/')
  const moduleId = pathParts[pathParts.length - 1]
  const currentModule = getModuleById(moduleId)

  // Mark module as visited
  const { markVisited } = useProgressStore()
  useEffect(() => {
    if (currentModule) {
      markVisited(currentModule.id)
    }
  }, [currentModule, markVisited])

  const { codePanelMode } = useSettingsStore()
  const codePanelMargin = codePanelMode === 'expanded' ? windowWidth * 0.5 : codePanelMode === 'slim' ? 56 : 0

  const sidebarWidth = sidebarOpen && !isMobile ? 260 : isMobile ? 0 : 68

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
        isMobile={isMobile}
      />

      {/* Main content area */}
      <motion.div
        className="flex-1 flex flex-col min-h-screen overflow-hidden"
        animate={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 260 : 68,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      >
        {/* Navbar – always full width of the remaining space */}
        <Navbar
          onMenuToggle={toggleSidebar}
          currentModule={currentModule}
        />

        {/* Page content – shrinks to give space to code panel */}
        <motion.main
          className="flex-1 relative overflow-hidden"
          animate={{ marginRight: codePanelMargin }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </motion.div>

      {/* Floating Widgets & Panels */}
      <CodeEditorPanel />
      <AIChatWidget />
    </div>
  )
}
