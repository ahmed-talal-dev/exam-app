'use client'
import { signOut } from "next-auth/react";
import { JSON_HEADER } from "@/lib/constants/constant.api";
import { useSession } from "next-auth/react";

export default function useLogout() {
    const { data: session } = useSession()

    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
            method: 'GET',
            headers: {
                ...JSON_HEADER,
                token: session?.token ?? '',
            },
        })

        signOut({ callbackUrl: '/login' })
    }

    return { logout };
}