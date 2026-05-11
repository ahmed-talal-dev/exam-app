'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { loginSchema } from '@/lib/schemes/auth.schema'
import { LoginFields } from '@/lib/types/auth'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from '../_hooks/use-login'
import SubmissionFeedback from '@/components/shared/submission-feedback'

export default function LoginForm() {
    // Mutation 
    const { isPending, error, login } = useLogin()
    //form
    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        },
    })

    //function
    const onSubmit: SubmitHandler<LoginFields> = (values) => {
        login(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4 my-7 md:my-9'>
                {/* email */}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="user@example.com" {...field} autoComplete='email' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* password */}
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete='current-password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* forget password */}
                <Link href='/forgot-password' className='text-sm text-primary font-medium block -mt-1.5 self-end'>
                    Forget your password?
                </Link>

                {/* feedback */}
                <SubmissionFeedback className='mt-6'>{error?.message}</SubmissionFeedback>

                {/* Submit */}
                <Button
                    disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                    type='submit'
                    className='w-full mt-6'>
                    Login
                </Button>
            </form>
        </Form>

    )
} 
