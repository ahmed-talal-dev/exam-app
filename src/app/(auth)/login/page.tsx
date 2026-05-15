import React from 'react'
import LoginForm from './_components/login-form'
import Link from 'next/link'

export default function LoginPage() {
    
    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-white'>
            <div className='flex flex-col w-full max-w-sm md:max-w-md '>
                {/* Heading */}
                <h1 className='font-inter text-2xl md:text-3xl font-bold text-gray-800 mt-38'>
                    Login
                </h1>

                {/* Form */}
                <LoginForm />
            </div>

            {/* Footer */}
            <footer className='pb-6'>
                <p className='text-sm text-gray-500'>
                    Don&apos;t have an account?{" "}
                    <Link href='/register' className='text-blue-600'>Create yours</Link>
                </p>
            </footer>
        </main>
    )
}