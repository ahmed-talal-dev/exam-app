import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { JSON_HEADER } from "@/lib/constants/constant.api";

export default function useSentOtp() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (email: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/send-otp`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { ...JSON_HEADER },
            })

            if (!response.ok) {
                const payload = await response.json()
                throw new Error(payload.message || 'Failed to send OTP')
            }
        },
        onSuccess: () => {
            toast.success('OTP has been sent to your email');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to send OTP');
        }
    });

    return { isPending, error, sentOtp: mutate };
}