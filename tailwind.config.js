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
        'innerShadow': 'inset 1px 2px 5px 5px rgba(0,0,0,0.63) ',
        '3xl': '0px 0px 15px 0px rgba(0, 0, 0, 0.2)',
        '7xl': '0px 0px 15px 0px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
