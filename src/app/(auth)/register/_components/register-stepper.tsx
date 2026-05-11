'use client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/schemes/auth.schema'
import { RegisterFields } from '@/lib/types/auth'
import useRegister from '../_hooks/use-register'
import useSentOtp from '../_hooks/use-sent-otp'
import StepEmail from './step-email'
import StepOtp from './step-otp'
import StepUserInfo from './step-user-info'
import StepPassword from './step-password'

const STEPS = [
    { id: 1, label: 'Email' },
    { id: 2, label: 'Verify Email' },
    { id: 3, label: 'User Info' },
    { id: 4, label: 'Password' },
]

export default function RegisterStepper() {
    const [currentStep, setCurrentStep] = useState(1)
    const { isPending, error, register } = useRegister()
    const { sentOtp } = useSentOtp()

    const form = useForm<RegisterFields>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
        },
    })

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

    const handleEmailNext = () => {
        sentOtp(form.getValues('email'), {
            onSuccess: () => goNext(),
        })
    }

    const handleSubmit = () => {
        register(form.getValues())
    }


    return (
        <div className="w-full max-w-md">
            {/* Step Indicators */}
            <div className="flex items-center justify-start gap-2 mb-8">
                {STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                                    ${currentStep === step.id
                                        ? 'bg-primary text-primary-foreground shadow-md scale-110'
                                        : currentStep > step.id
                                            ? 'bg-primary/80 text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {currentStep > step.id ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    step.id
                                )}
                            </div>
                            <span className={`text-xs font-medium hidden sm:block transition-colors duration-300
                                ${currentStep === step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                                {step.label}
                            </span>
                        </div>
                        {/* Connector line */}
                        {index < STEPS.length - 1 && (
                            <div className={`h-0.5 w-10 mb-4 rounded-full transition-all duration-500
                                ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Steps */}
            {currentStep === 1 && (
                <StepEmail form={form} onNext={handleEmailNext} />
            )}
            {currentStep === 2 && (
                <StepOtp form={form} onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 3 && (
                <StepUserInfo form={form} onNext={goNext} onBack={goBack} />
            )}
            {currentStep === 4 && (
                <StepPassword
                    form={form}
                    onBack={goBack}
                    onSubmit={handleSubmit}
                    isPending={isPending}
                    error={error}
                />
            )}
        </div>
    )
}