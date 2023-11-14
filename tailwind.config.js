/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)'
      },
      colors: {
        shadeD100: '#b5bac1',
        shadeD200: '#4c4e54',
        shadeD300: '#43444b',
        shadeD400: '#404249',
        shadeD500: '#383a40',
        shadeD600: '#36373d',
        shadeD700: '#313338',
        shadeD800: '#2e3035',
        shadeD900: '#2b2d31',
        shadeD1000: '#232428',
        shadeD1100: '#1e1f22',

        shadeL100: '#f9f9f9',
        shadeL200: '#f2f3f5',
        shadeL300: '#ebedef',
        shadeL400: '#e3e5e8',
        shadeL500: '#e1e1e3',
        shadeL600: '#d7d9dc',
        shadeL700: '#c4c9ce',
        shadeL800: '#c1c2c6',
        shadeL900: '#6b7280',
        shadeL1000: '#374151',

        green500: '#32ad84',
        green400: '#5abd9c',
        green300: '#84cdb5',
        green200: '#addecd',
        green100: '#d6eee6',
        red: '#ff2424'
      }
    }
  },
  plugins: []
};
