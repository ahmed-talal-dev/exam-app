import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function useLogin() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (Credentials: LoginFields) => {
            const response = await signIn('credentials', {
                username: Credentials.username,
                password: Credentials.password,
                redirect: false,
            });

            if (response?.error) {
                throw new Error(response.error)
            }
            return response
        },
        onSuccess: () => {
            toast.success('Successfully logged in', {
                onAutoClose: () => {
                    const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/'
                    location.href = callbackUrl
                },
                dismissible: false,
                duration: 2000,
            });
        }
    })
    return { isPending, error, login: mutate };
}