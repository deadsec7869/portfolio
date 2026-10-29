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
    default: 'bg-[#272735] text-[#ededf3] border-[#70707d]/20',
    accent: 'bg-[#5266eb] text-[#ffffff] border-[#5266eb]',
    muted: 'bg-[#272735]/60 text-[#c3c3cc] border-[#70707d]/15',
    outline: 'bg-transparent text-[#ededf3] border-[#70707d]/30',
    status: 'bg-[#272735] text-[#ededf3] border-[#70707d]/25 font-[480]',
    cyan: 'bg-[#272735] text-[#ededf3] border-[#70707d]/20',
    emerald: 'bg-[#272735] text-[#ededf3] border-[#70707d]/20',
    purple: 'bg-[#272735] text-[#ededf3] border-[#70707d]/20',
    amber: 'bg-[#272735] text-[#ededf3] border-[#70707d]/20',
  };

  const dotColors = {
    default: 'bg-[#c3c3cc]',
    accent: 'bg-[#ffffff]',
    muted: 'bg-[#70707d]',
    outline: 'bg-[#70707d]',
    status: 'bg-[#5266eb]',
    cyan: 'bg-[#5266eb]',
    emerald: 'bg-[#5266eb]',
    purple: 'bg-[#5266eb]',
    amber: 'bg-[#5266eb]',
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
