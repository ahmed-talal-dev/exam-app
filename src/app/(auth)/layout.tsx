import React from 'react'
import AuthStaticLayout from './_components/auth-static-layout'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen grid grid-cols-2">
            <AuthStaticLayout />

            <section className="flex items-center justify-center bg-   ">
                {children}
            </section>
        </main>
    )
}
