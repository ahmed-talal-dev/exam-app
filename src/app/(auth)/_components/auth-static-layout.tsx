import React from 'react';
import { cn } from '@/lib/utils/tailwind-merge';
import { Brain, BookOpenCheck, RectangleEllipsis, FolderCode, LucideIcon } from 'lucide-react';

interface FeatureItemProps {
    title: string;
    description: string;
    Icon: LucideIcon;
}

const FeatureItem = ({ title, description, Icon }: FeatureItemProps) => {
    return (
        <div className="flex flex-row items-start w-full gap-3">
            <div className="box-border flex justify-center items-center shrink-0 w-8 h-8 border border-blue-600">
                <Icon size={18} className="text-blue-600" />
            </div>
            <div className="flex flex-col items-start gap-1.5 flex-grow">
                <h3 className="font-mono font-semibold text-base leading-snug text-blue-600 m-0">
                    {title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-gray-700 m-0">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default function AuthStaticLayout() {
    const features = [
        {
            title: "Tailored Diplomas",
            description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
            Icon: Brain,
        },
        {
            title: "Focused Exams",
            description: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
            Icon: BookOpenCheck,
        },
        {
            title: "Smart Multi-Step Forms",
            description: "Experience seamless and intuitive form navigation for better user input.",
            Icon: RectangleEllipsis,
        },
    ];

    return (
        <aside
            className={cn(
                "relative flex flex-col justify-center items-center w-full h-full overflow-hidden bg-blue-50/20",
                "px-6 py-10 sm:px-10 md:px-12 lg:px-16",
                "before:absolute before:-top-20 before:-right-10 before:w-56 before:h-56 lg:before:w-72 lg:before:h-72 before:bg-blue-200 before:rounded-full before:blur-3xl before:-z-10",
                "after:absolute after:-bottom-20 after:-left-10 after:w-56 after:h-56 lg:after:w-72 lg:after:h-72 after:bg-blue-200 after:rounded-full after:blur-3xl after:-z-10"
            )}
        >
            <div className="relative z-20 flex flex-col items-start w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">

                {/* Logo */}
                <header className="flex flex-row items-center gap-2.5 w-full mb-10 md:mb-14 lg:mb-20">
                    <div className="flex justify-center items-center w-9 h-9 p-1.5">
                        <FolderCode size={24} className="text-blue-600" />
                    </div>
                    <span className="font-mono font-semibold text-lg leading-relaxed text-blue-600">
                        Exam App
                    </span>
                </header>

                {/* Content */}
                <main className="flex flex-col justify-center items-start gap-8 md:gap-10 w-full">
                    <h1 className="font-inter font-bold text-2xl md:text-3xl leading-snug md:leading-tight text-gray-800 m-0">
                        Empower your learning journey{" "}
                        <br className="hidden sm:block" />
                        with our smart exam platform.
                    </h1>

                    <div className="flex flex-col items-start gap-6 md:gap-7 w-full">
                        {features.map((feature) => (
                            <FeatureItem
                                key={feature.title}
                                title={feature.title}
                                description={feature.description}
                                Icon={feature.Icon}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </aside>
    );
}