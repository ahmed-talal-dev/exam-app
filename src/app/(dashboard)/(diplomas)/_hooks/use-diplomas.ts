import { useInfiniteQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export interface Diploma {
    id: string;
    title: string;
    description: string;
    image: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function useDiplomas(limit = 12) {
    return useInfiniteQuery({
        queryKey: ['diplomas'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const session = await getSession();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API}/api/diplomas?page=${pageParam}&limit=${limit}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.token ?? ''}`,
                    },
                }
            );
            const payload = await response.json();
            if (!response.ok) throw new Error('Failed to fetch diplomas');
            return payload.payload;
        },
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.metadata;
            return page < totalPages ? page + 1 : undefined;
        },
    });
}