import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function useLogin() {
    //Mutation 
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (Credentials: LoginFields) => {
            console.log('Sending to signIn:', {
                username: Credentials.username,
                password: Credentials.password,
            })

            const response = await signIn('credentials', {
                username: Credentials.username,
                password: Credentials.password,
                redirect: false,
            });

            console.log('signIn response:', response)

            if (response?.error) {
                throw new Error(response.error)
            }
            return response
        },
        onSuccess: () => {
            toast.success('Successfully logged in', {
                onAutoClose: () => {

                    // Get callback url // 
                    const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/'

                    //Redirect to callback url
                    location.href = callbackUrl

                },
                dismissible: false,
                duration: 2000,
            });
        }
    })
    return { isPending, error, login: mutate };
}