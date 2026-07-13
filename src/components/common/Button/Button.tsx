import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { buttonTap, buttonHover } from '@/utils/motion'
import type { Size, Variant } from '@/types/common'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: [
    'bg-primary-500 text-white font-semibold',
    'hover:bg-primary-400',
    'shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_4px_16px_rgba(99,102,241,0.25)]',
    'hover:shadow-[0_0_0_1px_rgba(99,102,241,0.6),0_8px_24px_rgba(99,102,241,0.35)]',
  ].join(' '),
  secondary: [
    'bg-white/6 text-white/85 font-medium border border-white/10',
    'hover:bg-white/10 hover:border-white/20 hover:text-white',
  ].join(' '),
  ghost: 'text-white/60 hover:text-white hover:bg-white/6 font-medium',
  danger: [
    'bg-rose-500/15 text-rose-400 border border-rose-500/25',
    'hover:bg-rose-500/25 hover:border-rose-500/40',
  ].join(' '),
  success: [
    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    'hover:bg-emerald-500/25',
  ].join(' '),
}

const Button = memo(({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <motion.button
      whileHover={!isDisabled ? buttonHover : {}}
      whileTap={!isDisabled ? buttonTap : {}}
      transition={{ duration: 0.15 }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium',
        'transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        fullWidth && 'w-full',
        className,
      )}
      disabled={isDisabled}
      {...(props as object)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
