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
        'CollorDefault': '#212121',
        'CollorSecondaryDefault': '#FCB040',
      },
      boxShadow: {
        'innerShadow': '0px 0px 8px 0px rgba(0,0,0,0.43) inset ',
        '3xl': '0px 0px 15px 0px rgba(0, 0, 0, 0.2)',
        '7xl': '0px 0px 15px 0px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
