import * as React from "react"
import { cn } from "../../lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100",
          className
        )}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

export { Select }
