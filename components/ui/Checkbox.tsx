
import React from 'react';
import { CheckIcon } from '../icons/CheckIcon';

// A simple utility to merge class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
            "checked:bg-primary checked:text-primary-foreground",
            className
          )}
          {...props}
        />
        <CheckIcon className="absolute w-4 h-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground hidden peer-checked:block pointer-events-none" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
