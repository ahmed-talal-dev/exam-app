import React from 'react'
import LoginForm from './_components/login-form'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <main className='flex flex-col items-center justify-center h-screen bg-white'>
            {/*heading*/}
            <h1 className='font-inter text-3xl font-bold text-gray-800 max-w-112 w-full pt-22'>Login</h1>

            {/*form*/}

            <LoginForm />


            {/*Footer*/}

            <footer>
                <p className='text-gray-500'>Don&apos;t  have an account?{" "} <Link href='/register' className='text-blue-600'>Create yours</Link></p>
            </footer>


        </main>
    )
}
