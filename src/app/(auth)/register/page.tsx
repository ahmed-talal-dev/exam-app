import React from 'react'
import Link from 'next/link'
import RegisterStepper from './_components/register-stepper'

export default function RegisterPage() {
    return (
        <main className='flex flex-col items-center justify-center h-screen bg-white'>
            {/*heading*/}
            <h1 className='w-full text-3xl font-bold text-gray-800 font-inter max-w-112 pt-22 pb-7 '>Create Account</h1>

            {/*form*/}

            {/* <RegisterForm /> */}
            <RegisterStepper />

            {/*Footer*/}

            <footer>
                <p className='py-6 text-gray-500'>Already have an account?{" "} <Link href='/login' className='text-blue-600'>login</Link></p>
            </footer>
        </main>
    )
}
