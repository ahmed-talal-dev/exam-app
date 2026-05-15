'use client'
import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { RegisterFields } from '@/lib/types/auth'
import useSentOtp from '../_hooks/use-sent-otp'
import useVerifyOtp from '../_hooks/use-verify-otp'
import SubmissionFeedback from '@/components/shared/submission-feedback'

type StepOtpProps = {
    form: UseFormReturn<RegisterFields>
    onNext: () => void
    onBack: () => void
}

export default function StepOtp({ form, onNext, onBack }: StepOtpProps) {
    const [otp, setOtp] = useState('')
    const [timer, setTimer] = useState(60)
    const email = form.getValues('email')
    const { isPending: isResending, sentOtp } = useSentOtp()
    const { isPending, error, verifyOtp } = useVerifyOtp()

    useEffect(() => {
        if (timer === 0) return
        const interval = setInterval(() => setTimer((t) => t - 1), 1000)
        return () => clearInterval(interval)
    }, [timer])

    const handleVerify = () => {
        if (otp.length === 6) {
            verifyOtp({ email, otp }, {
                onSuccess: () => onNext(),
            })
        }
    }

    const handleResend = () => {
        sentOtp(email, {
            onSuccess: () => setTimer(60),
        })
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <div className="mb-2">
                <h2 className="text-blue-600 font-inter font-bold text-[1.5rem] mt-1">Verify OTP</h2>
                <p className="w-full mt-1 text-sm text-muted-foreground">
                    Please enter the 6-digits code we have sent to:{' '}
                    <span className="font-medium text-foreground">{email}</span>
                    {' '}
                    <button type="button" onClick={onBack} className="text-xs text-primary hover:underline">
                        Edit
                    </button>
                </p>
            </div>

            <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

            <SubmissionFeedback>{error?.message}</SubmissionFeedback>

            <p className="text-sm text-center text-muted-foreground">
                {timer > 0 ? (
                    <>You can request another code in: <span className="font-medium text-foreground">{timer}s</span></>
                ) : (
                    <>Didn&apos;t receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResending}
                            className="font-medium text-primary hover:underline disabled:opacity-50"
                        >
                            {isResending ? 'Sending...' : 'Resend'}
                        </button>
                    </>
                )}
            </p>

            <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={onBack}>
                    ← Back
                </Button>
                <Button
                    type="button"
                    className="flex-1"
                    onClick={handleVerify}
                    disabled={otp.length < 6 || isPending}
                >
                    {isPending ? 'Verifying...' : 'Verify Code'}
                </Button>
            </div>
        </div>
    )
}