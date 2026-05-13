'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import StepForgotEmail from './step-forgot-email'
import { ForgotPasswordFields } from '@/lib/types/auth'
import StepForgotOtp from './step-forgot-otp'

export type { ForgotPasswordFields }

export default function ForgotPasswordStepper() {
    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<ForgotPasswordFields>({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            resetToken: '',
            password: '',
            rePassword: '',
        },
    })

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, 2))
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1))
    return (
        <div className="w-full max-w-md">
            {currentStep === 1 && <StepForgotEmail form={form} onNext={goNext} />}
            {currentStep === 2 && <StepForgotOtp form={form} onBack={goBack} />}
        </div>
    )
}