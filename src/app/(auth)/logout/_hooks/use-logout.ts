'use client'
import { signOut, getSession } from "next-auth/react";
import { JSON_HEADER } from "@/lib/constants/constant.api";

export default function useLogout() {
    const logout = async () => {
        const session = await getSession()

        await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/logout`, {
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