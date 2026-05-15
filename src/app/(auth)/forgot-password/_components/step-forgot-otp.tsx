'use client'
import { UseFormReturn } from 'react-hook-form'
import { ForgotPasswordFields } from './forgot-password-stepper'

type Props = {
    form: UseFormReturn<ForgotPasswordFields>
    onBack: () => void
}

export default function StepForgotOtp({ form, onBack }: Props) {
    const email = form.getValues('email')

    return (
        <div className="flex flex-col w-full gap-6 mt-7">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center justify-center transition-colors border rounded-md w-9 h-9 border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            >
                ←
            </button>

            <div>
                <h2 className="text-2xl font-bold font-inter">Password Reset Sent</h2>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                    We have sent a password reset link to:{' '}
                    <span className="text-primary">{email}</span>.
                </p>
                <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                    Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="mt-2 font-mono text-sm text-muted-foreground">
                    If you don&apos;t see the email within a few minutes, check your spam or junk folder.
                </p>
            </div>

            <p className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{' '}
                <a href="/register" className="font-medium text-primary hover:underline">
                    Create yours
                </a>
            </p>
        </div>
    )
}