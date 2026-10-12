import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, glass, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-line/60',
        glass ? 'glass shadow-card' : 'bg-surface shadow-soft',
        hover && 'transition-all duration-300 hover:shadow-card hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({
  children, variant = 'primary', size = 'md', className, onClick, disabled, type = 'button', fullWidth
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-glow-blue',
    secondary: 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white hover:from-secondary-600 hover:to-accent-600 shadow-glow-cyan',
    ghost: 'text-ink hover:bg-primary-50 dark:hover:bg-primary-900/30',
    outline: 'border border-line text-ink hover:border-primary-400 hover:text-primary-600',
    danger: 'bg-gradient-to-r from-error-500 to-rose-600 text-white hover:from-error-600 hover:to-rose-700 shadow-glow-red',
    success: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-glow-green',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], sizes[size], fullWidth && 'w-full', className
      )}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'primary', className }: { children: ReactNode; variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'; className?: string }) {
  const variants = {
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
    success: 'bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300',
    error: 'bg-error-50 text-error-700 dark:bg-error-900/40 dark:text-error-300',
    neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('animate-spin rounded-full border-2 border-primary-200 border-t-primary-600', className || 'h-6 w-6')} />
  );
}

export function ProgressRing({ value, size = 120, stroke = 8, label, sublabel }: { value: number; size?: number; stroke?: number; label?: string; sublabel?: string }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 75 ? '#10b981' : value >= 50 ? '#f59e0b' : value >= 25 ? '#f97316' : '#ef4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-200 dark:text-slate-700" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-2xl font-bold font-display text-ink">{label}</span>}
        {sublabel && <span className="text-xs text-muted">{sublabel}</span>}
      </div>
    </div>
  );
}

export function RiskMeter({ value }: { value: number }) {
  const level = value >= 75 ? { label: 'High', color: 'bg-error-500' } : value >= 40 ? { label: 'Moderate', color: 'bg-warning-500' } : { label: 'Low', color: 'bg-accent-500' };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Risk Level</span>
        <span className={cn('font-semibold', value >= 75 ? 'text-error-600' : value >= 40 ? 'text-warning-600' : 'text-accent-600')}>{level.label}</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className={cn('h-full rounded-full transition-all duration-1000', level.color)} style={{ width: `${value}%` }} />
      </div>
      <div className="flex justify-between text-xs text-muted">
        <span>0%</span><span>{value}%</span><span>100%</span>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-900/30">{icon}</div>
      <h3 className="mb-1 text-lg font-semibold text-ink">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-muted">{description}</p>
      {action}
    </div>
  );
}
