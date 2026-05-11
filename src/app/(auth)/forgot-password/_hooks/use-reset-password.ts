import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { JSON_HEADER } from '@/lib/constants/constant.api'

type ResetPasswordPayload = {
    email: string
    newPassword: string
    resetCode: string
}

export default function useResetPassword() {
    const router = useRouter()

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (payload: ResetPasswordPayload) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/reset-password`, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    newPassword: payload.newPassword,
                    resetCode: payload.resetCode,
                }),
                headers: { ...JSON_HEADER },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password')
            }

            return data
        },
        onSuccess: () => {
            toast.success('Password has been reset successfully')
            router.push('/login')
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Failed to reset password')
        },
    })

    return { isPending, error, resetPassword: mutate }
}