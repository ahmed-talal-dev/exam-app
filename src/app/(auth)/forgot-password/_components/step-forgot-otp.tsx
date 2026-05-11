// 'use client'
// import { useState } from 'react'
// import { UseFormReturn } from 'react-hook-form'
// import { Button } from '@/components/ui/button'
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
// import { ForgotPasswordFields } from './forgot-password-stepper'
// import useVerifyResetCode from '../_hooks/use-verify-reset-code'
// import useForgotPassword from '../_hooks/use-forgot-password'
// import SubmissionFeedback from '@/components/shared/submission-feedback'

// type Props = {
//     form: UseFormReturn<ForgotPasswordFields>
//     onNext: () => void
//     onBack: () => void
// }

// export default function StepForgotOtp({ form, onNext, onBack }: Props) {
//     const [otp, setOtp] = useState('')
//     const email = form.getValues('email')

//     const { isPending, error, verifyResetCode } = useVerifyResetCode()
//     const { isPending: isResending, forgotPassword } = useForgotPassword()

//     const handleVerify = () => {
//         if (otp.length === 6) {
//             form.setValue('otp', otp)
//             verifyResetCode(otp, {
//                 onSuccess: () => onNext(),
//             })
//         }
//     }

//     const handleResend = () => {
//         forgotPassword(email)
//     }

//     return (
//         <div className="flex flex-col w-full gap-6">
//             {/* Back button */}
//             <button
//                 type="button"
//                 onClick={onBack}
//                 className="flex items-center justify-center transition-colors border rounded-md w-9 h-9 border-border text-muted-foreground hover:text-foreground hover:border-foreground"
//             >
//                 ←
//             </button>

//             <div>
//                 <h2 className="text-2xl font-bold text-foreground">Password Reset Sent</h2>
//                 <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
//                     We have sent a password reset code to:{' '}
//                     <span className="text-primary">{email}</span>.
//                 </p>
//                 <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
//                     Please check your inbox and enter the code below.
//                 </p>
//                 <p className="mt-2 font-mono text-sm text-muted-foreground">
//                     If you don&apos;t see the email within a few minutes, check your spam or junk folder.
//                 </p>
//             </div>

//             {/* OTP Input */}
//             <div className="flex justify-center mt-2">
//                 <InputOTP maxLength={6} value={otp} onChange={setOtp}>
//                     <InputOTPGroup>
//                         <InputOTPSlot index={0} />
//                         <InputOTPSlot index={1} />
//                         <InputOTPSlot index={2} />
//                         <InputOTPSlot index={3} />
//                         <InputOTPSlot index={4} />
//                         <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                 </InputOTP>
//             </div>

//             <SubmissionFeedback>{error?.message}</SubmissionFeedback>

//             {/* Resend */}
//             <p className="text-sm text-center text-muted-foreground">
//                 Didn&apos;t receive the code?{' '}
//                 <button
//                     type="button"
//                     onClick={handleResend}
//                     disabled={isResending}
//                     className="font-medium text-primary hover:underline disabled:opacity-50"
//                 >
//                     {isResending ? 'Sending...' : 'Resend'}
//                 </button>
//             </p>

//             <Button
//                 type="button"
//                 className="w-full"
//                 onClick={handleVerify}
//                 disabled={otp.length < 6 || isPending}
//             >
//                 {isPending ? 'Verifying...' : 'Verify Code'}
//             </Button>

//             <p className="text-sm text-center text-muted-foreground">
//                 Don&apos;t have an account?{' '}
//                 <a href="/register" className="font-medium text-primary hover:underline">
//                     Create yours
//                 </a>
//             </p>
//         </div>
//     )
// }