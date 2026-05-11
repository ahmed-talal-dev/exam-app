'use client'
import { UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { stepEmailSchema } from '@/lib/schemes/auth.schema'
import { RegisterFields } from '@/lib/types/auth'

type StepEmailProps = {
    form: UseFormReturn<RegisterFields>
    onNext: () => void
}

type EmailFields = z.infer<typeof stepEmailSchema>

export default function StepEmail({ form, onNext }: StepEmailProps) {
    const stepForm = useForm<EmailFields>({
        resolver: zodResolver(stepEmailSchema),
        mode: 'onTouched',
        defaultValues: {
            email: form.getValues('email'),
        },
    })

    const handleNext = stepForm.handleSubmit((values) => {
        console.log('step email submitted', values)
        form.setValue('email', values.email)
        onNext()
    })

    return (
        <Form {...stepForm}>
            <form onSubmit={handleNext} className="flex flex-col w-full gap-4">


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

                <Button type="submit" className="w-full mt-4">
                    Next →
                </Button>


            </form>
        </Form>
    )
}