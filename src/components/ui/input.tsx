import * as React from "react";
import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Optional icon prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon = null, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {icon && (
          <span className="absolute left-3 text-muted-foreground">{icon}</span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-9" : "px-3", // Adjust padding if icon is present
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
