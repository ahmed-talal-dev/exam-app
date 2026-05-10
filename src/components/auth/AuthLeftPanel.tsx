'use client'

export default function AuthLeftPanel() {
  return (
    <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden py-28 lg:flex"
      style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 40%, #bfdbfe 100%)' }}>
      {/* Blur overlay matching Figma */}
      <div className="absolute inset-0 backdrop-blur-[100px]"
        style={{ backgroundColor: 'rgba(239,246,255,0.75)' }} />

      <div className="relative z-10 flex h-full w-[458px] flex-col">
        {/* Logo */}
        <div className="mb-auto flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <rect width="7" height="5" x="7" y="7" rx="1" /><rect width="7" height="5" x="10" y="12" rx="1" />
            </svg>
          </div>
          <span className="font-mono text-xl font-semibold text-primary">Exam App</span>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-center gap-[60px]">
          <h1 className="font-sans text-[30px] font-bold leading-snug text-gray-800">
            Empower your learning journey with our smart exam platform.
          </h1>

          <div className="flex flex-col gap-9">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border-[1.5px] border-primary text-primary">
                  <f.Icon />
                </div>
                <div className="flex flex-col gap-2.5">
                  <p className="font-mono text-xl font-semibold text-primary">{f.title}</p>
                  <p className="font-mono text-base font-normal leading-relaxed text-gray-700">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Tailored Diplomas',
    desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14" />
      </svg>
    ),
  },
  {
    title: 'Focused Exams',
    desc: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        <path d="m9 18 3 3 3-3" />
      </svg>
    ),
  },
  {
    title: 'Smart Multi-Step Forms',
    desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    ),
  },
]
