import React from 'react';
import { cn } from '@/lib/utils/tailwind-merge';
import { Brain, BookOpenCheck, RectangleEllipsis, FolderCode, LucideIcon } from 'lucide-react';

// --- Types ---
interface FeatureItemProps {
    title: string;
    description: string;
    Icon: LucideIcon;
}

// --- Sub-component: Feature Item ---
const FeatureItem = ({ title, description, Icon }: FeatureItemProps) => {
    return (
        <div className="flex flex-row items-start w-full gap-3 md:gap-4 lg:gap-5">
            <div className="box-border flex justify-center items-center shrink-0 w-8 h-8 md:w-9 md:h-9 border border-blue-600">
                <Icon size={20} className="text-blue-600" />
            </div>

            <div className="flex flex-col items-start gap-1.5 md:gap-2 lg:gap-2.5 flex-grow">
                <h3 className="font-mono font-semibold text-lg md:text-xl leading-5 md:leading-relaxed text-blue-600 m-0">
                    {title}
                </h3>
                <p className="font-mono  text-sm md:text-base  leading-4 md:leading-relaxed text-gray-700 m-0">
                    {description}
                </p>


            </div>
        </div>
    );
};

// --- Main Component: Auth Static Layout ---
export default function AuthStaticLayout() {
    const features = [
        {
            title: "Tailored Diplomas",
            description: "Choose from specialized tracks like  Frontend, Backend, and Mobile Development.",
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
                "relative flex flex-col justify-center items-center w-full h-full grow self-stretch overflow-hidden  bg-blue-50/20",
                "before:absolute before:-top-24 before:-right-16 before:w-64 before:h-64 md:before:w-80 md:before:h-80 lg:before:w-100 lg:before:h-100 before:bg-blue-200 before:rounded-full before:blur-3xl before:-z-10",
                "after:absolute after:-bottom-24 after:-left-16 after:w-64 after:h-64 md:after:w-80 md:after:h-80 lg:after:w-100 lg:after:h-100 after:bg-blue-200 after:rounded-full after:blur-3xl after:-z-10"
            )}
        >
            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-start w-full max-w-sm md:max-w-md lg:max-w-xl px-6 md:px-12 lg:px-0">

                {/* Header / Logo */}
                <header className="flex flex-row items-center gap-2.5 w-full h-10 mb-12 md:mb-24 ">
                    {/* Logo */}
                    <div className="flex justify-center items-center w-10 h-10 p-1.5">
                        <FolderCode size={28} className="text-blue-600" />
                    </div>

                    {/* Name */}
                    <span className="font-mono font-semibold text-xl leading-relaxed text-blue-600">
                        Exam App
                    </span>
                </header>

                {/* Main Content Area */}
                <main className="flex flex-col justify-center items-start gap-10 md:gap-12 lg:gap-16 w-full">
                    <h1 className="font-inter font-bold text-3xl md:text-3xl- leading-8 md:leading-10 text-gray-800 m-0">
                        Empower your learning journey <br /> with our smart exam platform.
                    </h1>

                    {/* Features List */}
                    <div className="flex flex-col items-start gap-7 md:gap-8 w-full">
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