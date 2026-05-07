'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { PasswordInput } from '@/components/ui/password-input'
import { registerSchema } from '@/lib/schemes/auth.schema'
import { RegisterFields } from '@/lib/types/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import SubmissionFeedback from '@/components/shared/submission-feedback'
import useRegister from '../_hooks/use-register'

export default function RegisterForm() {
    // Mutation 
    const { isPending, error, register } = useRegister()
    //form
    const form = useForm<RegisterFields>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',

        },
    })

    //function
    const onSubmit: SubmitHandler<RegisterFields> = (values) => {
        register(values);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 max-w-112 w-full my-3'>
                {/*First name*/}
                <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            {/*label*/}
                            <FormLabel>First Name</FormLabel>
                            {/*field*/}
                            <FormControl>
                                <Input placeholder="Ahmed"  {...field} autoComplete='first-name' />
                            </FormControl>
                            {/*message*/}
                            <FormMessage />

                        </FormItem>
                    )}
                />

                {/*Last name*/}
                <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            {/*label*/}
                            <FormLabel>Last Name</FormLabel>
                            {/*field*/}
                            <FormControl>
                                <Input placeholder="abdullah"  {...field} autoComplete='last-name' />
                            </FormControl>
                            {/*message*/}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*Username*/}
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            {/*label*/}
                            <FormLabel>Username</FormLabel>
                            {/*field*/}
                            <FormControl>
                                <Input placeholder="abdullah"  {...field} autoComplete='user-name' />
                            </FormControl>
                            {/*message*/}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*Email*/}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
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

                {/*Phone*/}
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            {/*label*/}
                            <FormLabel>Phone</FormLabel>
                            {/*field*/}
                            <FormControl>
                                <PhoneInput placeholder="1012345678"  {...field} autoComplete='phone' />
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
                        <FormItem className='col-span-2'>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete='current password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*confirm password*/}
                <FormField
                    control={form.control}
                    name='rePassword'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete='confirm password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*feedback*/}
                <SubmissionFeedback className='mt-6 col-span-2'>{error?.message}</SubmissionFeedback>


                {/*Submit*/}
                <Button
                    disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                    type='submit'
                    className='w-full mt-6 col-span-2'>
                    Create Account
                </Button>
            </form>

        </Form>

    )
} 
