import React from 'react'
import AuthStaticLayout from './_components/auth-static-layout'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="grid grid-cols-2">
            {/*Side Sections*/}
            <AuthStaticLayout />

            <section className="flex items-center justify-center">

                {/*Content*/}
                {children}
            </section>
        </main>
    )
}
