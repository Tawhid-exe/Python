import { motion } from 'framer-motion'
import { fadeIn, slideUp, slideUpFade } from '@/utils/motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'none'
  duration?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.35,
}: FadeInProps) {
  const variant = direction === 'up' ? slideUpFade : direction === 'down' ? slideUp : fadeIn

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
