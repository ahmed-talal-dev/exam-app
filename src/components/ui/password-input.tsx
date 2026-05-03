"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind-merge";

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div className="relative w-full">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="****************"
                    className={cn("h-11.5 pr-10", className)}
                    ref={ref}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                    className="absolute right-2.5 top-1/2 -translate-y-1/2"

                >
                    {showPassword ? (
                        <Eye className="size-5 text-(--gray-500)" />
                    ) : (
                        <EyeOff className="size-5 text-(--gray-500)" />
                    )}
                </button>
            </div>
        );
    }
)

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 