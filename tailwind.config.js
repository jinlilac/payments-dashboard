/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#3B82F6',
        },
        // 상태별 컬러
        success: {
          DEFAULT: '#10B981',
        },
        warning: {
          DEFAULT: '#F59E0B',
        },
        error: {
          DEFAULT: '#EF4444',
        },
        info: {
          DEFAULT: '#0EA5E9',
        },
        // 그레이 컬러
        gray: {
          50: '#F9FAFB', // --gray-50
          100: '#F3F4F6', // --gray-100
          600: '#4B5563', // --gray-600
          900: '#111827', // --gray-900
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
      },
      fontFamily: {
        //전역 폰트
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        input: '6px',
        full: '9999px',
      },

      boxShadow: {
        // 카드 호버용
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },

      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
    },
  },

  plugins: [],
};
