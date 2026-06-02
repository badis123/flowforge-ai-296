import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 rounded-lg gradient-primary shadow-glow grid place-items-center">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4 18 L10 6 L14 14 L20 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {withText && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Nexa<span className="gradient-text">Flow</span>
        </span>
      )}
    </div>
  );
}