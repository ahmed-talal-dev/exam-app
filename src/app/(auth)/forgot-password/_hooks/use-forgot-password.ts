import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { JSON_HEADER } from '@/lib/constants/constant.api'

export default function useForgotPassword() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (email: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/forgot-password`
                , {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: { ...JSON_HEADER },
                })

            const payload = await response.json()

            if (!response.ok) {
                throw new Error(payload.message || 'Failed to send reset code')
            }

            return payload
        },
        onSuccess: () => {
            toast.success('Reset code has been sent to your email')
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Failed to send reset code')
        },
    })

    return { isPending, error, forgotPassword: mutate }
}