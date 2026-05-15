'use client'
import { GraduationCap, ChevronDown } from 'lucide-react'
import useDiplomas from './_hooks/use-diplomas'
import DiplomaCard from './_components/diploma-card'
import { useEffect, useRef } from 'react'

export default function DiplomasPage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useDiplomas(12)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Auto fetch on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allDiplomas = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <div className="flex flex-col min-h-full gap-8 p-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400">Diplomas</p>

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-blue-600 ">
        <GraduationCap className="text-white size-7 shrink-0" />
        <h1 className="font-mono text-2xl font-bold text-white">Diplomas</h1>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded aspect-4/3 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-red-500">Failed to load diplomas. Please try again.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {allDiplomas.map((diploma) => (
              <DiplomaCard key={diploma.id} diploma={diploma} />
            ))}
          </div>

          {/* Infinite scroll loader */}
          <div ref={loaderRef} className="flex flex-col items-center gap-2 mt-4">
            {isFetchingNextPage && (
              <div className="grid w-full grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded aspect-4/3 animate-pulse" />
                ))}
              </div>
            )}
            {hasNextPage && !isFetchingNextPage && (
              <>
                <p className="text-sm text-gray-400">Scroll to view more</p>
                <ChevronDown className="text-gray-400 size-5" />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}