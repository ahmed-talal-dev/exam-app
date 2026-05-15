import { useRouter } from "next/navigation";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { JSON_HEADER } from "@/lib/constants/constant.api";

export default function useRegister() {
    const router = useRouter();

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: RegisterFields) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    username: fields.username,
                    email: fields.email,
                    password: fields.password,
                    confirmPassword: fields.rePassword,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    phone: fields.phone.replace(/^\+2/, ''),
                }),
                headers: { ...JSON_HEADER },
            })

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.message || 'Registration failed')
            }

            return payload
        },
        onSuccess: () => {
            toast.success('Your account has been created successfully')
            router.push('/login')
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Registration failed')
        }
    });

    return { isPending, error, register: mutate };
}