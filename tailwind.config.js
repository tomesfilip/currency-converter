/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,jsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins'],
    },
    colors: {
      primary: '#1E3A8A',
      secondary: '#3B82F6',
      accent: '#10B981',
      background: '#F9FAFB',
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      lightGray: '#C7C8CA',
      error: '#EF4444',
      dark: {
        primary: '#93C5FD',
        secondary: '#2563EB',
        accent: '#34D399',
        background: '#1F2937',
        textPrimary: '#F3F4F6',
        textSecondary: '#9CA3AF',
        error: '#F87171',
      },
    },
    extend: {
      fontSize: {
        h1: [
          '52px',
          {
            fontWeight: 900,
            lineHeight: '72px',
            letterSpacing: '-0.25px',
          },
        ],
        'h1-mobile': [
          '32px',
          {
            fontWeight: 700,
            lineHeight: '42px',
            letterSpacing: '-0.25px',
          },
        ],
        'input-number': [
          '40px',
          {
            fontWeight: 400,
          },
        ],
        'input-number-mobile': [
          '30px',
          {
            fontWeight: 400,
          },
        ],
        'text-bold': [
          '26px',
          {
            fontWeight: 500,
          },
        ],
        text: [
          '16px',
          {
            fontWeight: 400,
          },
        ],
        'text-thin': [
          '16px',
          {
            fontWeight: 200,
          },
        ],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
};
