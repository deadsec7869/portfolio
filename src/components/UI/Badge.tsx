import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'muted' | 'outline' | 'status' | 'cyan' | 'emerald' | 'purple' | 'amber';
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  className,
  dot = false
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/25',
    accent: 'bg-[#5E5E5A] text-[#F4F1E8] border-[#5E5E5A]',
    muted: 'bg-[#ECE8DD]/50 text-[#8A8983] border-[#5E5E5A]/15',
    outline: 'bg-transparent text-[#5E5E5A] border-[#5E5E5A]/30',
    status: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/30 font-semibold',
    cyan: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/25',
    emerald: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/25',
    purple: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/25',
    amber: 'bg-[#ECE8DD] text-[#3F3F3C] border-[#5E5E5A]/25',
  };

  const dotColors = {
    default: 'bg-[#5E5E5A]',
    accent: 'bg-[#F4F1E8]',
    muted: 'bg-[#8A8983]',
    outline: 'bg-[#8A8983]',
    status: 'bg-[#5E5E5A]',
    cyan: 'bg-[#5E5E5A]',
    emerald: 'bg-[#5E5E5A]',
    purple: 'bg-[#5E5E5A]',
    amber: 'bg-[#5E5E5A]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech uppercase tracking-wider border transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
