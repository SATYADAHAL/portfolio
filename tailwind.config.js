/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        // You can add more variations if needed
        rotateBack: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' }
        },
        rotatePulse: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        rotate: 'rotate 1s linear infinite',
        rotateBack: 'rotateBack 1s linear infinite',
        rotatePulse: 'rotatePulse 2s ease-in-out infinite',
        // You can add duration variations
        rotateSlow: 'rotate 3s linear infinite',
        rotateFast: 'rotate 0.5s linear infinite'
      }
    },
  },
  plugins: [],
}
