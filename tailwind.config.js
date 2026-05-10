/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#155DFC',
        'primary-hover': '#1249d4',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
        'gray-500': '#6B7280',
        'gray-400': '#9CA3AF',
        'gray-200': '#E5E7EB',
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
