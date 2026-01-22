
import React from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

// A simple utility to merge class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
        <div className="relative">
            <select
                className={cn(
                "h-10 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
