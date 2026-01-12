import lineClamp from '@tailwindcss/line-clamp';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '578px',
      md: '767px',
      lg: '992px',
      xl: '1367px',
      '2xl': '1660px',
    },
    extend: {
      colors: {
        pcRed: '#db232f',
        // 左選單
        leftNavActivityText: '#fff',
        leftNavActivityTextHover: '#1f1f1f',
        leftNavBg: '#fff',
        leftNavText: '#1f1f1f',
        leftNavTextHover: '#1f1f1f',
        leftNavTextBgHover: '#ffdbdb',
        // 右選單
        rightNavBg: '#ff718c',
        rightNavText: '#fff',
        rightNavActive: '#1f1f1f',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat'],
      notosans: ['Noto Sans TC'],
    },
  },
  plugins: [lineClamp, aspectRatio],
};
