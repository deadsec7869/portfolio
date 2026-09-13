import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'cyan' | 'emerald' | 'purple' | 'amber' | 'outline';
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
    default: 'bg-black/5 text-slate-700 border-black/10',
    cyan: 'bg-black/5 text-[#111111] border-black/15',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    outline: 'bg-transparent text-slate-700 border-black/15'
  };

  const dotColors = {
    default: 'bg-slate-500',
    cyan: 'bg-[#111111]',
    emerald: 'bg-emerald-600',
    purple: 'bg-purple-600',
    amber: 'bg-amber-600',
    outline: 'bg-slate-500'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono-tech uppercase tracking-wider border transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
