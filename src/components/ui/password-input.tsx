"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind-merge";

type PasswordInputProps = React.ComponentProps<"input">;

function PasswordInput({
    className,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] =
        React.useState(false);

    return (
        <div className="relative w-full">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="****************"
                className={cn("h-[46px] pr-10", className)}
                {...props}
            />

            <button
                type="button"
                onClick={() =>
                    setShowPassword(!showPassword)
                }
                className="absolute right-[10px] top-1/2 -translate-y-1/2"

            >
                {showPassword ? (
                    <Eye className="size-5 text-[var(--gray-500)]" />
                ) : (
                    <EyeOff className="size-5 text-[var(--gray-500)]" />
                )}
            </button>
        </div>
    );
}

export { PasswordInput };