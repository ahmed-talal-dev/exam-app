'use client'
import { use } from 'react'
import { ChevronLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import useExams from './_hooks/use-exams'
import ExamCard from './_components/exam-card'

export default function DiplomaExamsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { data, isLoading, isError } = useExams(id)

    const diplomaTitle = data?.data?.[0]?.diploma?.title ?? 'Diploma'

    return (
        <div className="flex flex-col min-h-full gap-8 p-10">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-400">
                <Link href="/" className="hover:text-blue-600">Diplomas</Link>
                {' / '}
                <Link href="/" className="hover:text-blue-600">{diplomaTitle}</Link>
                {' / '}
                <span className="text-blue-600">Exams</span>
            </p>

            {/* Header */}
            <div className="flex items-center gap-0">
                <Link
                    href="/"
                    className="flex items-center justify-center bg-white border border-blue-600 text-blue-600 h-15 w-12.5 hover:bg-blue-50 transition-colors shrink-0"
                >
                    <ChevronLeft className="size-5" />
                </Link>
                <div className="flex items-center flex-1 gap-4 px-6 py-4 bg-blue-600 h-15">
                    <BookOpen className="text-white size-6 shrink-0" />
                    <h1 className="font-mono text-xl font-bold text-white">
                        {diplomaTitle} Exams
                    </h1>
                </div>
            </div>

            {/* Exams List */}
            {isLoading ? (
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded h-30 animate-pulse" />
                    ))}
                </div>
            ) : isError ? (
                <p className="text-red-500">Failed to load exams. Please try again.</p>
            ) : (
                <div className="flex flex-col border border-gray-200 rounded">
                    {data?.data.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} />
                    ))}
                    {data?.data.length === 0 && (
                        <p className="py-10 text-center text-gray-400">No exams available.</p>
                    )}
                </div>
            )}

            {/* End of list */}
            {data && data.data.length > 0 && (
                <p className="text-sm text-center text-gray-400">End of list</p>
            )}
        </div>
    )
}