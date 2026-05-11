'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import StepForgotEmail from './step-forgot-email'
import StepNewPassword from './step-new-password'
import { ForgotPasswordFields } from '@/lib/types/auth'

export type { ForgotPasswordFields }

export default function ForgotPasswordStepper() {
    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<ForgotPasswordFields>({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            otp: '',
            password: '',
            rePassword: '',
        },
    })

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, 2))
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

    return (
        <div className="w-full max-w-md">
            {currentStep === 1 && (
                <StepForgotEmail form={form} onNext={goNext} />
            )}
            {/* {currentStep === 2 && (
                <StepForgotOtp form={form} onNext={goNext} onBack={goBack} />
            )} */}
            {currentStep === 2 && (
                <StepNewPassword form={form} onBack={goBack} />
            )}
        </div>
    )
}