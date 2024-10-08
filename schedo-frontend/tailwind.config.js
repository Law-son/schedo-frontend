/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
      colors: {
        'primary-blue': 'hsl(215, 100%, 50%)',
        'blue-black': 'hsl(207, 78%, 19%)',
        'light-blue': 'hsl(205, 100%, 87%)',
        'primary-grey': 'hsl(218, 36%, 96%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  
}
