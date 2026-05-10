'use client'

import { useState } from 'react'

interface InputFieldProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  autoComplete?: string
}

export default function InputField({
  label, type = 'text', placeholder, value, onChange, error, autoComplete,
}: InputFieldProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="flex flex-col">
      <label className="flex h-[27px] items-center font-mono text-base font-medium text-gray-800">
        {label}
      </label>
      <div className={`flex h-[46px] items-center border px-[10px] ${error ? 'border-red-400' : 'border-gray-200'}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}
            className="ml-2 shrink-0 text-gray-400 hover:text-gray-600">
            {show ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 font-mono text-xs text-red-500">{error}</p>}
    </div>
  )
}
