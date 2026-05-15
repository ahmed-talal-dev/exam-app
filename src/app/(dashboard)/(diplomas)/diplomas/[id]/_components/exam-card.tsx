import { Exam } from '../_hooks/use-exams'
import Link from 'next/link'
import { CircleHelp, Clock } from 'lucide-react'
import Image from 'next/image'

export default function ExamCard({ exam }: { exam: Exam }) {
    return (
        <div className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0">
            {/* Image */}
            <div className="overflow-hidden bg-gray-100 rounded size-25 shrink-0">
                <div className="relative overflow-hidden bg-gray-100 rounded size-25 shrink-0">
                    <Image
                        src={exam.image}
                        alt={exam.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2">
                {/* Title + meta */}
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-mono text-lg font-bold text-blue-600">
                        {exam.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
                        <span className="flex items-center gap-1">
                            <CircleHelp className="size-4" />
                            {exam.questionsCount} Questions
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {exam.duration} minutes
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="font-mono text-sm text-gray-500 line-clamp-3">
                    {exam.description}
                </p>

                {/* Start button */}
                <div className="flex justify-end mt-1">
                    <Link
                        href={`/exams/${exam.id}`}
                        className="flex items-center gap-2 px-4 py-2 font-mono text-sm text-white transition-colors bg-blue-600 hover:bg-blue-700"
                    >
                        START →
                    </Link>
                </div>
            </div>
        </div>
    )
}