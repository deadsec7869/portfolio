import { useRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial';
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
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm'
  };

  const variantStyles = {
    primary:
      'bg-[#3F3F3C] text-[#F4F1E8] hover:bg-[#5E5E5A] border border-[#3F3F3C] shadow-sm',
    secondary:
      'bg-[#ECE8DD] text-[#3F3F3C] hover:bg-[#F4F1E8] border border-[#5E5E5A]/25 shadow-xs',
    outline:
      'bg-transparent text-[#3F3F3C] border border-[#5E5E5A]/25 hover:border-[#5E5E5A] hover:text-[#5E5E5A]',
    ghost:
      'bg-transparent text-[#5E5E5A] hover:text-[#3F3F3C] border border-transparent',
    editorial:
      'bg-transparent text-[#3F3F3C] hover:text-[#5E5E5A] border-b border-[#5E5E5A]/30 hover:border-[#5E5E5A] rounded-none px-0 py-1'
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
          'relative inline-flex items-center justify-center gap-2 font-mono-tech tracking-wider uppercase transition-all duration-300 select-none overflow-hidden group cursor-pointer rounded-full',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );

  if (asAnchor && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="inline-block cursor-pointer"
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-block bg-transparent border-none p-0 cursor-pointer focus:outline-none"
      {...props}
    >
      {content}
    </button>
  );
}
