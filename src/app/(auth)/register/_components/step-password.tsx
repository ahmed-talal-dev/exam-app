'use client'
import { UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { stepPasswordSchema } from '@/lib/schemes/auth.schema'
import { RegisterFields } from '@/lib/types/auth'
import SubmissionFeedback from '@/components/shared/submission-feedback'

type StepPasswordProps = {
    form: UseFormReturn<RegisterFields>
    onBack: () => void
    onSubmit: () => void
    isPending: boolean
    error: Error | null
}

type PasswordFields = z.infer<typeof stepPasswordSchema>

export default function StepPassword({ form, onBack, onSubmit, isPending, error }: StepPasswordProps) {
    const stepForm = useForm<PasswordFields>({
        resolver: zodResolver(stepPasswordSchema),
        mode: 'onTouched',
        defaultValues: {
            password: form.getValues('password'),
            rePassword: form.getValues('rePassword'),
        },
    })

    const handleSubmit = stepForm.handleSubmit((values) => {
        form.setValue('password', values.password)
        form.setValue('rePassword', values.rePassword)
        onSubmit()
    })

    return (
        <Form {...stepForm}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="mb-2">
                    <p className="text-lg text-blue-600 font-inter font-bold text-[1.5rem] mt-1">Create a strong password</p>
                </div>

                <FormField
                    control={stepForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
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
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Error feedback */}
                <SubmissionFeedback className="mt-2">{error?.message}</SubmissionFeedback>

                <div className="flex gap-3 mt-4">
                    <Button type="button" variant="secondary" className="flex-1" onClick={onBack} disabled={isPending}>
                        ← Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Create Account'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}