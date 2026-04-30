"use client";

import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type MenuOption = {
    id: string;
    title: string;
    description: string;
};

type OptionsMenuProps = {
    options: MenuOption[];
    selectedId?: string;
    onSelect?: (id: string) => void;
};

function OptionsMenu({
    options,
    onSelect,
}: OptionsMenuProps) {
    return (
        <DropdownMenu>
            {/* Trigger button */}
            <DropdownMenuTrigger asChild>
                <button className="flex size-10 items-center justify-center bg-(--gray-100)">
                    <MoreHorizontal className="size-5" />
                </button>
            </DropdownMenuTrigger>

            {/* Dropdown content */}
            <DropdownMenuContent className="w-86.25 p-0">
                {options.map((option) => {
                    return (
                        <DropdownMenuItem
                            key={option.id}
                            onClick={() => onSelect?.(option.id)}
                            className={`flex items-start gap-3 rounded-none border-none px-4 py-3 
                                }`}
                        >
                            {/* Left icon box */}
                            <div className="size-8 shrink-0 bg-(--blue-200)" />

                            {/* Text content */}
                            <div>
                                <p
                                    className={`font-mono text-sm }`}

                                >
                                    {option.title}
                                </p>

                                <p className="text-xs text-(--gray-400)">
                                    {option.description}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { OptionsMenu };