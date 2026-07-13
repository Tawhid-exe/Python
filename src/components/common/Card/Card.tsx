import { memo, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { cardHover } from '@/utils/motion'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hoverable?: boolean
  onClick?: () => void
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const PADDING = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
}

const Card = memo(({
  children,
  className,
  glow = false,
  hoverable = false,
  onClick,
  padding = 'md',
}: CardProps) => {
  const Tag = (hoverable || onClick) ? motion.div : 'div'
  const motionProps = (hoverable || onClick)
    ? { variants: cardHover, initial: 'rest', whileHover: 'hover', transition: { duration: 0.2 } }
    : {}

  return (
    <Tag
      // @ts-expect-error motion props on conditional
      {...motionProps}
      onClick={onClick}
      className={cn(
        'card',
        glow && 'card-glow',
        hoverable && 'cursor-pointer',
        PADDING[padding],
        className,
      )}
    >
      {children}
    </Tag>
  )
})

Card.displayName = 'Card'
export default Card

// ─── GlowCard variant ─────────────────────────────────────────
interface GlowCardProps {
  children: ReactNode
  className?: string
  color?: 'primary' | 'cyan' | 'emerald' | 'amber' | 'rose'
}

const GLOW_COLORS = {
  primary: 'rgba(99,102,241,0.12)',
  cyan:    'rgba(34,211,238,0.10)',
  emerald: 'rgba(16,185,129,0.10)',
  amber:   'rgba(245,158,11,0.10)',
  rose:    'rgba(244,63,94,0.10)',
}

export const GlowCard = memo(({ children, className, color = 'primary' }: GlowCardProps) => (
  <div
    className={cn('card relative overflow-hidden p-5', className)}
    style={{
      background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${GLOW_COLORS[color]} 0%, transparent 60%)`,
    }}
  >
    {/* Top border glow line */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${GLOW_COLORS[color].replace('0.12', '0.5')}, transparent)` }}
    />
    {children}
  </div>
))
GlowCard.displayName = 'GlowCard'
