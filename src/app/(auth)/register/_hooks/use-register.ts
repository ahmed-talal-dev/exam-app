import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth.action";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRegister() {
    // Navigation
    const router = useRouter();

    // Mutation
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: RegisterFields) => {
            const payload = await registerAction(fields);

            if ('code' in payload) {
                throw new Error(payload.message);
            }
            return payload;
        },
        onSuccess: () => {
            toast.success('Your account has been created successfully')
            router.push('/login')
        }
    });
    return { isPending, error, register: mutate };
}