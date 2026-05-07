import React from 'react'
import Link from 'next/link'
import RegisterForm from './_components/register-form'

export default function RegisterPage() {
    return (
        <main className='flex flex-col items-center justify-center h-screen bg-white'>
            {/*heading*/}
            <h1 className='font-inter text-3xl font-bold text-gray-800 max-w-112 w-full pt-22'>Create Account</h1>

            {/*form*/}

            <RegisterForm />


            {/*Footer*/}

            <footer>
                <p className='text-gray-500'>Already have an account?{" "} <Link href='/login' className='text-blue-600'>login</Link></p>
            </footer>


        </main>
    )
}
