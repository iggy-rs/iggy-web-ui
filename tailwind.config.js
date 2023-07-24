/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bgPrimary)',
        bgSecondary: 'var(--bgSecondary)',
        border: 'var(--border)',
        'soft-gray': 'var(--soft-gray)'
      }
    }
  },
  plugins: []
};
