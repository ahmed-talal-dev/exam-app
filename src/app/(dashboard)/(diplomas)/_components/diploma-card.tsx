import Image from 'next/image'
import { Diploma } from '../_hooks/use-diplomas'
import Link from 'next/link'

export default function DiplomaCard({ diploma }: { diploma: Diploma }) {
    return (
        <Link href={`/diplomas/${diploma.id}`}>
            <div className="relative w-full overflow-hidden cursor-pointer aspect-4/3 group">
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded cursor-pointer aspect-4/3 group">
                    <Image
                        src={diploma.image}
                        alt={diploma.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay + Content */}
                    <div className="absolute inset-x-0 bottom-0 bg-blue-700/90 h-[30%] group-hover:h-[60%] transition-all duration-300 ease-in-out flex flex-col justify-start p-4">
                        <h3 className="font-mono text-lg font-bold leading-tight text-white">
                            {diploma.title}
                        </h3>
                        <p className="mt-1 font-mono text-sm transition-opacity duration-300 delay-100 opacity-0 text-white/80 line-clamp-none group-hover:opacity-100">
                            {diploma.description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}