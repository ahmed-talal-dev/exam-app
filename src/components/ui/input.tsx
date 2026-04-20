import * as React from "react";

import { cn } from "@/lib/utils/tailwind-merge";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[46px] w-[347px] min-w-0 border border-[var(--gray-200)] bg-transparent px-[10px] font-mono text-[14px] font-normal text-[var(--gray-950)] outline-none placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue-600)] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      {...props}
    />
  );
}

export { Input };