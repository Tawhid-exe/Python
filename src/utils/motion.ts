import { type Variants, type Transition } from 'framer-motion'

// ─── Base Transitions ──────────────────────────────────────────
export const TRANSITION_FAST: Transition = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1],
}

export const TRANSITION_BASE: Transition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1],
}

export const TRANSITION_SLOW: Transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
}

export const TRANSITION_SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const TRANSITION_SPRING_GENTLE: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
}

// ─── Fade Variants ────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION_BASE },
  exit:    { opacity: 0, transition: TRANSITION_FAST },
}

export const fadeInSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION_SLOW },
  exit:    { opacity: 0, transition: TRANSITION_BASE },
}

// ─── Slide Variants ───────────────────────────────────────────
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: TRANSITION_BASE },
  exit:    { opacity: 0, y: -10, transition: TRANSITION_FAST },
}

export const slideDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: TRANSITION_BASE },
  exit:    { opacity: 0, y: 20, transition: TRANSITION_FAST },
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: TRANSITION_BASE },
  exit:    { opacity: 0, x: -20, transition: TRANSITION_FAST },
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: TRANSITION_BASE },
  exit:    { opacity: 0, x: 20, transition: TRANSITION_FAST },
}

// ─── Scale Variants ───────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION_SPRING },
  exit:    { opacity: 0, scale: 0.95, transition: TRANSITION_FAST },
}

export const scaleInBig: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION_SPRING },
  exit:    { opacity: 0, scale: 0.9, transition: TRANSITION_FAST },
}

// ─── Combined: Slide + Fade (most common) ─────────────────────
export const slideUpFade: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ...TRANSITION_BASE, duration: 0.35 } },
  exit:    { opacity: 0, y: -12, transition: TRANSITION_FAST },
}

// ─── Page Transition ──────────────────────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
}

// ─── Stagger Container ────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// ─── Stagger Child (used inside staggerContainer) ─────────────
export const staggerChild: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

// ─── Card Hover ───────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: TRANSITION_SPRING_GENTLE },
}

// ─── Sidebar ──────────────────────────────────────────────────
export const sidebarVariants: Variants = {
  open: {
    width: 260,
    transition: { type: 'spring', stiffness: 350, damping: 35 },
  },
  closed: {
    width: 68,
    transition: { type: 'spring', stiffness: 350, damping: 35 },
  },
}

export const sidebarLabelVariants: Variants = {
  open:   { opacity: 1, x: 0, display: 'block', transition: { delay: 0.05, duration: 0.2 } },
  closed: { opacity: 0, x: -8, transitionEnd: { display: 'none' } },
}

// ─── Number Counter ───────────────────────────────────────────
export const counterVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: TRANSITION_SPRING },
}

// ─── Modal ────────────────────────────────────────────────────
export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION_FAST },
  exit:    { opacity: 0, transition: TRANSITION_FAST },
}

export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: TRANSITION_SPRING },
  exit:    { opacity: 0, scale: 0.95, y: 10, transition: TRANSITION_FAST },
}

// ─── Progress Bar ─────────────────────────────────────────────
export const progressVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: (value: number) => ({
    scaleX: value / 100,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  }),
}

// ─── Button Press ────────────────────────────────────────────
export const buttonTap = { scale: 0.97 }
export const buttonHover = { scale: 1.02 }
