import { useRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  cursorAction?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  cursorAction,
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const variantStyles = {
    primary:
      'bg-[#111111] text-white font-medium hover:bg-black hover:shadow-lg border border-black/10',
    secondary:
      'bg-black/5 text-[#111111] hover:bg-black/10 border border-black/10',
    outline:
      'bg-transparent text-[#111111] border border-black/15 hover:border-black/40 hover:bg-black/5',
    ghost:
      'bg-transparent text-slate-600 hover:text-black hover:bg-black/5 border border-transparent'
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      data-cursor={cursorAction}
      className="inline-block"
    >
      <div
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-full font-mono-tech tracking-wider uppercase transition-all duration-300 select-none overflow-hidden group cursor-pointer',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </div>
    </motion.div>
  );

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block focus:outline-none" {...props}>
      {content}
    </button>
  );
}
