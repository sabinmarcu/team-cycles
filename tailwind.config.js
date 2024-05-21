/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#fed095',
          secondary: '#ff816b',
          text: '#0b0a09',
          background: '#f8f7f6',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#6a3d01',
          secondary: '#941600',
          text: '#f6f5f4',
          background: '#090807',
        }
      }
    ],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
}

