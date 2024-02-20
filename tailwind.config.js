/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        onePointFive: '1.5',
      },
      width: {
        postCard: 'calc(50% - 1.6rem)',
      },
      boxShadow: {
        bookShadow: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.15)',
      },
    },
    fontFamily: {
      Pretendard: ['Pretendard'],
    },
  },
  plugins: [],
};
