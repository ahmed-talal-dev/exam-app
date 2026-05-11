'use client'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { ForgotPasswordFields } from './forgot-password-stepper'
import useResetPassword from '../_hooks/use-reset-password'
import SubmissionFeedback from '@/components/shared/submission-feedback'

const stepSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
})
type StepFields = z.infer<typeof stepSchema>

type Props = {
    form: UseFormReturn<ForgotPasswordFields>
    onBack: () => void
}

export default function StepNewPassword({ form, onBack }: Props) {
    const { isPending, error, resetPassword } = useResetPassword()

    const stepForm = useForm<StepFields>({
        resolver: zodResolver(stepSchema),
        mode: 'onTouched',
        defaultValues: { password: '', rePassword: '' },
    })

    const handleSubmit = stepForm.handleSubmit((values) => {
        resetPassword({
            email: form.getValues('email'),
            newPassword: values.password,
            resetCode: form.getValues('otp'),
        })
    })

    return (
        <Form {...stepForm}>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-foreground">Create a New Password</h2>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                        Create a new strong password for your account.
                    </p>
                </div>

                <FormField
                    control={stepForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={stepForm.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmissionFeedback className="mt-1">{error?.message}</SubmissionFeedback>

                <Button type="submit" className="w-full mt-2" disabled={isPending}>
                    {isPending ? 'Resetting...' : 'Reset Password'}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="font-medium text-primary hover:underline">
                        Create yours
                    </a>
                </p>
            </form>
        </Form>)
}
