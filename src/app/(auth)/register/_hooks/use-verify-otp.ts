import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { JSON_HEADER } from "@/lib/constants/constant.api";

export default function useVerifyOtp() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/confirm-email-verification`, {
                method: "POST",
                body: JSON.stringify({ email, code: otp }),
                headers: { ...JSON_HEADER },
            })

            const payload = await response.json()
            if (!response.ok) {
                throw new Error(payload.message || 'Invalid OTP')
            }
            return payload
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Invalid OTP');
        }
    });

    return { isPending, error, verifyOtp: mutate };
}