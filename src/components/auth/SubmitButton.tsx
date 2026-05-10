'use client'

interface SubmitButtonProps {
  label: string
  loading?: boolean
  onClick?: () => void
}

export default function SubmitButton({ label, loading, onClick }: SubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex h-[46px] w-full items-center justify-center bg-primary font-mono text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {loading ? (
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : label}
    </button>
  )
}
