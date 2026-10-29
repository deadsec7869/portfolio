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
    sm: 'px-4 py-2 text-xs rounded-[32px]',
    md: 'px-6 py-2.5 text-xs rounded-[32px]',
    lg: 'px-8 py-3.5 text-sm rounded-[32px]'
  };

  const variantStyles = {
    primary:
      'bg-[#5266eb] text-[#ffffff] hover:bg-[#4355db] border-0 shadow-none font-[400]',
    secondary:
      'bg-[#272735] text-[#ededf3] hover:bg-[#323244] border-0 shadow-none font-[400]',
    outline:
      'bg-transparent text-[#ededf3] border border-[#ededf3] hover:bg-white/5 rounded-[40px] font-[400]',
    ghost:
      'bg-transparent text-[#c3c3cc] hover:text-[#ededf3] hover:bg-white/5 border border-transparent rounded-[40px]',
    editorial:
      'bg-transparent text-[#ededf3] hover:text-white border-b border-[#70707d]/40 hover:border-[#ededf3] rounded-none px-0 py-1'
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
