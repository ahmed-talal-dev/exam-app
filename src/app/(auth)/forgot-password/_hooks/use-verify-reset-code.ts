// import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import { JSON_HEADER } from '@/lib/constants/constant.api'

// export default function useVerifyResetCode() {
//     const { isPending, error, mutate } = useMutation({
//         mutationFn: async (resetCode: string) => {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/verify-reset-code`, {
//                 method: 'POST',
//                 body: JSON.stringify({ resetCode }),
//                 headers: { ...JSON_HEADER },
//             })

//             const payload = await response.json()

//             if (!response.ok) {
//                 throw new Error(payload.message || 'Invalid or expired reset code')
//             }

//             return payload
//         },
//         onError: (err: Error) => {
//             toast.error(err.message || 'Invalid or expired reset code')
//         },
//     })

//     return { isPending, error, verifyResetCode: mutate }
// }