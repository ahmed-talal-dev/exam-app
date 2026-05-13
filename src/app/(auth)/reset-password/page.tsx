'use client'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import useResetPassword from '../forgot-password/_hooks/use-reset-password'
import SubmissionFeedback from '@/components/shared/submission-feedback'

const schema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

type FormFields = z.infer<typeof schema>

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token') ?? ''
    const { isPending, error, resetPassword } = useResetPassword()

    const form = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: { password: '', confirmPassword: '' },
    })

    const onSubmit = form.handleSubmit((values) => {
        resetPassword({
            token,
            newPassword: values.password,
            confirmPassword: values.confirmPassword,
        })
    })

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Form {...form}>
                    <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-foreground">Create a New Password</h2>
                            <p className="mt-1 font-mono text-sm text-muted-foreground">
                                Create a new strong password for your account.
                            </p>
                        </div>

                        <FormField
                            control={form.control}
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
                            control={form.control}
                            name="confirmPassword"
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

                        <Button type="submit" className="w-full mt-2" disabled={isPending || !token}>
                            {isPending ? 'Resetting...' : 'Reset Password'}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <a href="/register" className="font-medium text-primary hover:underline">
                                Create yours
                            </a>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}