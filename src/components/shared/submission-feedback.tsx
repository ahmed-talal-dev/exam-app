
import { cn } from '@/lib/utils/tailwind-merge';
import { CircleX } from 'lucide-react';
import React from 'react';

type SubmissionFeedbackProps = React.HTMLAttributes<HTMLParagraphElement>;
export default function SubmissionFeedback({ className, children, ...props }: SubmissionFeedbackProps) {
    if (!children) return null;
    return (
        <p className={cn('text-sm text-destructive p-2.5 border border-destructive relative bg-red-50 font-medium text-center', className)} {...props}>
            {/* Icon */}
            <CircleX className="size-[1.25rem] bg-white rounded-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2" />

            {/* message */}
            {children}
        </p>
    );
}