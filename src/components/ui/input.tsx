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
        "h-11.5 w-110 min-w-0 border border-(--gray-200) bg-transparent px-2.5 py-3.5 font-mono text-sm font-normal text-(--gray-950) outline-none placeholder:text-(--gray-400) focus-visible:border-(--blue-600) focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      {...props}
    />
  );
}

export { Input };