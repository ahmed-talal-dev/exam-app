'use client'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { RegisterFields } from '@/lib/types/auth'
import useSentOtp from '../_hooks/use-sent-otp'

type StepOtpProps = {
    form: UseFormReturn<RegisterFields>
    onNext: () => void
    onBack: () => void
}

export default function StepOtp({ form, onNext, onBack }: StepOtpProps) {
    const [otp, setOtp] = useState('')
    const email = form.getValues('email')
    const { isPending, sentOtp } = useSentOtp()

    const handleVerify = () => {
        // TODO: هنضيف verify endpoint هنا لما يجي جاهز
        // في الوقت الحالي بنعدي على طول
        if (otp.length === 6) {
            onNext()
        }
    }

    const handleResend = () => {
        sentOtp(email)
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="mb-2">
                <h2 className="text-lg text-blue-600 font-inter font-bold text-[1.5rem] mt-1">Verify OTP</h2>
                <p className="text-sm text-muted-foreground mt-1 w-full">
                    Please enter the 6-digits code we have sent to:{' '}
                    <span className="font-medium text-foreground">{email}</span>
                    {' '}
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-primary hover:underline text-xs"
                    >
                        Edit
                    </button>
                </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            {/* Resend */}
            <p className="text-center text-sm text-muted-foreground">
                You can request another code in: 60s{' '}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isPending}
                    className="text-primary hover:underline font-medium disabled:opacity-50"
                >
                    {isPending ? 'Sending...' : 'Resend'}
                </button>
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={onBack}>
                    ← Back
                </Button>
                <Button
                    type="button"
                    className="flex-1"
                    onClick={handleVerify}
                    disabled={otp.length < 6}
                >
                    Verify Code
                </Button>
            </div>
        </div>
    )
}