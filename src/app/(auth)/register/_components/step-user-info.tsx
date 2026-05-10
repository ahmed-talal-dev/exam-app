'use client'
import { UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { stepUserInfoSchema } from '@/lib/schemes/auth.schema'
import { RegisterFields } from '@/lib/types/auth'

type StepUserInfoProps = {
    form: UseFormReturn<RegisterFields>
    onNext: () => void
    onBack: () => void
}

type UserInfoFields = z.infer<typeof stepUserInfoSchema>

export default function StepUserInfo({ form, onNext, onBack }: StepUserInfoProps) {
    const stepForm = useForm<UserInfoFields>({
        resolver: zodResolver(stepUserInfoSchema),
        mode: 'onTouched',
        defaultValues: {
            firstName: form.getValues('firstName'),
            lastName: form.getValues('lastName'),
            username: form.getValues('username'),
            phone: form.getValues('phone'),
        },
    })

    const handleNext = stepForm.handleSubmit((values) => {
        form.setValue('firstName', values.firstName)
        form.setValue('lastName', values.lastName)
        form.setValue('username', values.username)
        form.setValue('phone', values.phone)
        onNext()
    })

    return (
        <Form {...stepForm}>
            <form onSubmit={handleNext} className="flex flex-col gap-4 w-full">
                <div className="mb-2">
                    <p className="text-lg text-blue-600 font-inter font-bold text-[1.5rem] mt-1">Tell us more about you</p>
                </div>

                {/* First & Last name in a row */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={stepForm.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input className='w-full' placeholder="Ahmed" {...field} autoComplete="given-name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={stepForm.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input className='w-full' placeholder="Abdullah" {...field} autoComplete="family-name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={stepForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="abdullah" {...field} autoComplete="username" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={stepForm.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput placeholder="1012345678" {...field} autoComplete="tel" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-3 mt-4">
                    <Button type="button" variant="secondary" className="flex-1" onClick={onBack}>
                        ← Back
                    </Button>
                    <Button type="submit" className="flex-1">
                        Next →
                    </Button>
                </div>
            </form>
        </Form>
    )
}