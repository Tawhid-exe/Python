import { motion } from 'framer-motion'
import { staggerContainer, staggerChild } from '@/utils/motion'
import type { ReactNode } from 'react'

interface StaggerListProps {
  children: ReactNode
  className?: string
  delay?: number
  fast?: boolean
}

/**
 * Wraps children in a stagger container so each child
 * animates in sequentially. Each child MUST be wrapped
 * in a StaggerItem for the effect to work.
 */
export function StaggerList({ children, className, fast }: StaggerListProps) {
  const container = fast
    ? { ...staggerContainer, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
    : staggerContainer

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  )
}
