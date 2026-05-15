'use client'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ForgotPasswordFields } from './forgot-password-stepper'
import useForgotPassword from '../_hooks/use-forgot-password'
import SubmissionFeedback from '@/components/shared/submission-feedback'

const stepSchema = z.object({
    email: z.string().email('Email is invalid'),
})
type StepFields = z.infer<typeof stepSchema>

type Props = {
    form: UseFormReturn<ForgotPasswordFields>
    onNext: () => void
}

export default function StepForgotEmail({ form, onNext }: Props) {
    const { isPending, error, forgotPassword } = useForgotPassword()

    const stepForm = useForm<StepFields>({
        resolver: zodResolver(stepSchema),
        mode: 'onTouched',
        defaultValues: { email: form.getValues('email') },
    })

    const handleNext = stepForm.handleSubmit((values) => {
        form.setValue('email', values.email)
        forgotPassword(values.email, {
            onSuccess: (data) => {
                form.setValue('resetToken', data.resetToken)
                onNext()
            },
        })
    })

    return (
        <Form {...stepForm}>
            <form onSubmit={handleNext} className="flex flex-col w-full gap-4">
                <div className="mt-2 mb-2">
                    <h2 className="mt-2 mt-8 text-3xl font-bold font-inter ">Forgot Password</h2>
                    <p className="mt-2 font-mono text-[16px] text-muted-foreground">
                        Don&apos;t worry, we will help you recover your account.
                    </p>
                </div>

                <FormField
                    control={stepForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@example.com" {...field} autoComplete="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmissionFeedback className="mt-1">{error?.message}</SubmissionFeedback>

                <Button type="submit" className="w-full mt-2" disabled={isPending}>
                    {isPending ? 'Sending...' : 'Next →'}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="font-medium text-primary hover:underline">
                        Create yours
                    </a>
                </p>
            </form>
        </Form>
    )
}