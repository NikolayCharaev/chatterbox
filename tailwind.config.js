const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      screens: {
        mt: { max: '500px' },
        xs: { max: '580px' },
        sm: { max: '768px' },
        lg: { max: '992px' },
        md: { max: '1060px' },
        st: { max: '1200px' },
        xl: { max: '1280px' },
        '2xl': '1600px',
        '3xl': { max: '1500px' },
      },
    },
  },
  plugins: [],
});

export {};
