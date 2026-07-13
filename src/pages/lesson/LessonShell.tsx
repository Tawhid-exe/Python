import { Outlet } from 'react-router-dom'

/**
 * LessonShell — shared wrapper for all 22 lesson module pages.
 * The AppLayout already provides Sidebar + Navbar.
 * This shell can hold any additional per-lesson chrome:
 * module breadcrumb, bottom nav bar, completion trigger, etc.
 * Currently passes through to the page via <Outlet />.
 */
export default function LessonShell() {
  return <Outlet />
}
