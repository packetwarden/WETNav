import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If using pages router later
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // For App router
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: { // Add custom colors here
         'gray-850': '#182133', // Example: A slightly lighter dark blue/gray
         // Add more custom colors if needed
      },
      // Add custom theme extensions here if needed
    },
  },
  plugins: [require('@tailwindcss/typography'),],
  darkMode: 'class', // Optional: enables dark mode based on a class, useful later
}
export default config
