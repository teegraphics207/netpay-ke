import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-emerald-600 text-white rounded-full hover:bg-emerald-500 tracking-wide": variant === "default",
            "bg-slate-900 text-white rounded-xl hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100": variant === "secondary",
            "bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800": variant === "outline",
            "hover:bg-slate-100 hover:text-slate-900 rounded-xl dark:hover:bg-slate-800 dark:hover:text-slate-100": variant === "ghost",
            "text-emerald-600 underline-offset-4 hover:underline": variant === "link",
            "px-6 py-2.5": size === "default",
            "px-4 py-2 text-xs": size === "sm",
            "px-8 py-3": size === "lg",
            "w-10 h-10 rounded-xl": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
