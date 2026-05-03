'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { PasswordInput } from '@/components/ui/password-input'
import { loginSchema } from '@/lib/schemes/auth.schema'
import { LoginFields } from '@/lib/types/auth'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function LoginForm() {
    //form
    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    //function
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 max-w-112 w-full my-9'>
                {/*email*/}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            {/*label*/}
                            <FormLabel>Email</FormLabel>
                            {/*field*/}
                            <FormControl>
                                <Input placeholder="user@example.com"  {...field} autoComplete='email' />
                            </FormControl>
                            {/*message*/}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*password*/}
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} type='password' autoComplete='current password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* forget password*/}
                <Link href='/forget-password' className='text-sm text-primary font-medium block -mt-1.5 self-end'>Forget your password?</Link>

                {/*Submit*/}
                <Button type='submit' className='w-full mt-6'>
                    login
                </Button>
            </form>
        </Form>

    )
} 
