import React from 'react'
import AuthStaticLayout from './_components/auth-static-layout'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Side Section - hidden on mobile, visible from md+ */}
            <div className="hidden md:flex">
                <AuthStaticLayout />
            </div>

            {/* Content Section */}
            <section className="flex items-center justify-center min-h-screen md:min-h-0 px-4">
                {children}
            </section>
        </main>
    )
}