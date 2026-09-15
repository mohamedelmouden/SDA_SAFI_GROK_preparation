import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-ring",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
