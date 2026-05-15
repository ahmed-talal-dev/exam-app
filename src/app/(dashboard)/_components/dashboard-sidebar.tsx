'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, UserRound, FolderCode, EllipsisVertical, LogOut, Settings } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useLogout from '@/app/(auth)/logout/_hooks/use-logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

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
        <aside className="flex flex-col gap-15 items-start p-10 bg-blue-50 h-full w-90.5 shrink-0">
            {/* Logo */}
            <div className="flex flex-col gap-2">
                <Image
                    src="/logo.png"
                    alt="Elevate"
                    width={192}
                    height={37}
                    className="object-contain"
                />                <div className="flex items-center gap-2">
                    <FolderCode className="text-blue-600 size-7" />
                    <span className="font-mono text-lg font-semibold text-blue-600">Exam App</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col justify-between flex-1 w-full min-h-0">
                {/* Links */}
                <div className="flex flex-col w-full gap-2">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const isActive =
                            href === '/'
                                ? pathname === '/' || pathname.startsWith('/diplomas')
                                : pathname.startsWith(href)
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
                        <div className="size-13.5 rounded-full border border-blue-600 overflow-hidden shrink-0 bg-white">
                            {user?.profilePhoto ? (
                                <Image
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
                            <EllipsisVertical className="text-gray-500 size-18px" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-40'>
                            <DropdownMenuItem asChild>
                                <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                                    <UserRound className="text-gray-500 size-4" />
                                    <span>Account</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                                    <Settings className="text-gray-500 size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={logout}
                                className="flex items-center gap-2 text-red-500 cursor-pointer focus:text-red-500"
                            >
                                <LogOut className="size-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </aside>
    )
}