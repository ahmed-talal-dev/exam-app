import React from 'react';
import { Brain, BookOpenCheck, RectangleEllipsis, FolderCode, LucideIcon } from 'lucide-react';

// --- Types ---
interface FeatureItemProps {
    title: string;
    description: string;
    Icon: LucideIcon;
}

// --- Sub-component: Feature Item ---
const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, Icon }) => {
    return (
        <div className="flex flex-row items-start w-full gap-3 md:gap-4 lg:gap-5">
            <div className="box-border flex justify-center items-center shrink-0 w-8 h-8 md:w-9 md:h-9 border border-blue-600">
                <Icon size={20} className="text-blue-600 md:text-blue-600" />
            </div>

            <div className="flex flex-col items-start gap-1.5 md:gap-2 lg:gap-2.5 flex-grow">
                <h3 className="font-mono font-semibold text-lg md:text-xl leading-5 md:leading-6.5 text-blue-600 m-0">
                    {title}
                </h3>
                <p className="font-mono font-normal text-sm md:text-base leading-4 md:leading-5.25 text-muted-foreground m-0">
                    {description}
                </p>
            </div>
        </div>
    );
};

// --- Main Component: Auth Static Layout (Left Panel) ---
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
            description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
            Icon: RectangleEllipsis,
        },
    ];

    return (
        <aside className="relative flex flex-col justify-center items-center w-full h-full grow self-stretch overflow-hidden bg-blue-50/20">

            {/* Circles */}
            <div className="absolute -top-10 -right-20 w-64 h-64 md:w-80 md:h-80 lg:w-100.5 lg:h-100.5 bg-blue-400 rounded-full z-0" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-80 md:h-80 lg:w-100.5 lg:h-100.5 bg-blue-400 rounded-full z-0" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-50/75 backdrop-blur-3xl z-10" />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-start w-full max-w-sm md:max-w-md lg:max-w-114.5 px-6 md:px-12 lg:px-0">

                {/* Header / Logo */}
                <header className="flex flex-row items-center gap-2.5 w-full h-10 mb-12 md:mb-24">
                    <div className="flex justify-center items-center w-10 h-10 p-1.5">
                        <FolderCode size={28} className="text-blue-600" />
                    </div>
                    <span className="font-mono font-semibold text-xl leading-6.5 text-blue-600">
                        Exam App
                    </span>
                </header>

                {/* Main Content Area */}
                <main className="flex flex-col justify-center items-start gap-10 md:gap-12 lg:gap-16 w-full">

                    <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-3xl leading-8 md:leading-9 text-card-foreground m-0">
                        Empower your learning journey with our smart exam platform.
                    </h1>

                    {/* Features List */}
                    <div className="flex flex-col items-start gap-7 md:gap-8 lg:gap-9 w-full">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
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