import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export interface Exam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    questionsCount: number;
    diplomaId: string;
    diploma: { id: string; title: string };
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ExamsResponse {
    data: Exam[];
    metadata: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function useExams(diplomaId: string) {
    return useQuery<ExamsResponse>({
        queryKey: ['exams', diplomaId],
        queryFn: async () => {
            const session = await getSession();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API}/api/exams?diplomaId=${diplomaId}&page=1&limit=100`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.token ?? ''}`,
                    },
                }
            );
            const payload = await response.json();
            if (!response.ok) throw new Error('Failed to fetch exams');
            return payload.payload as ExamsResponse;
        },
    });
}