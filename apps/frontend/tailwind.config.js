/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/**/*.{js,jsx,ts,tsx}',
    '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
