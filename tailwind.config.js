/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        aspectRatio: {
          '15/4': '15 / 4'
        }
      },
    },
    plugins: [],
  }