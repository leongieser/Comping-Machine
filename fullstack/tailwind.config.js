/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-raimdial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },  gridTemplateColumns: {
        'custom': '1fr 3fr 2fr 1fr',
      },
      gridTemplateRows: {
        'custom': '0.25fr 0.75fr 0.25fr repeat(2, 1fr) 0.25fr',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
