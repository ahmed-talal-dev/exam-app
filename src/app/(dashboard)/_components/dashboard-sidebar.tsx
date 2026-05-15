'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, UserRound, FolderCode, EllipsisVertical, LogOut } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useLogout from '@/app/(auth)/logout/_hooks/use-logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const NAV_LINKS = [
    { href: '/', label: 'Diplomas', icon: GraduationCap },
    { href: '/account', label: 'Account Settings', icon: UserRound },
]

export default function Sidebar() {
    const pathname = usePathname()
    const { logout } = useLogout()
    const [user, setUser] = useState<{ firstName?: string; email?: string; profilePhoto?: string } | null>(null)

    useEffect(() => {
        getSession().then((session) => {
            if (session?.user) {
                setUser({
                    firstName: session.user.firstName,
                    email: session.user.email,
                    profilePhoto: session.user.profilePhoto,
                })
            }
        })
    }, [])

    return (
        <aside className="flex flex-col gap-[60px] items-start p-10 bg-blue-50 h-full w-[362px] shrink-0">
            {/* Logo */}
            <div className="flex flex-col gap-2">
                <div className="h-[37px] w-48">
                    {/* Replace with your actual logo image */}
                    <img src="/public/" alt="Elevate" className="h-[37px] w-auto" />                </div>
                <div className="flex items-center gap-2">
                    <FolderCode className="text-blue-600 size-7" />
                    <span className="font-mono text-lg font-semibold text-blue-600">Exam App</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col justify-between flex-1 w-full min-h-0">
                {/* Links */}
                <div className="flex flex-col w-full gap-2">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 px-4 py-4 w-full transition-colors
                                    ${isActive
                                        ? 'bg-blue-100 border border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:bg-blue-100 hover:text-blue-600'
                                    }`}
                            >
                                <Icon className="size-6 shrink-0" />
                                <span className="font-mono text-base">{label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* User info */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {/* Avatar */}
                        <div className="size-[54px] rounded-full border border-blue-600 overflow-hidden shrink-0 bg-white">
                            {user?.profilePhoto ? (
                                <img
                                    src={user.profilePhoto}
                                    alt={user.firstName ?? ''}
                                    className="object-cover size-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center text-xl font-bold text-blue-600 bg-blue-100 size-full">
                                    {user?.firstName?.[0]?.toUpperCase() ?? '?'}
                                </div>
                            )}
                        </div>
                        {/* Info */}
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-mono text-base font-medium text-blue-600 truncate">
                                {user?.firstName ?? 'Loading...'}
                            </span>
                            <span className="font-mono text-sm text-gray-500 truncate">
                                {user?.email ?? ''}
                            </span>
                        </div>
                    </div>

                    {/* Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center transition-colors rounded size-7 hover:bg-blue-100">
                            <EllipsisVertical className="size-[18px] text-gray-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                                <LogOut className="mr-2 size-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </aside>
    )
}