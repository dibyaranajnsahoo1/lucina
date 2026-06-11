/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Purple
        purple: {
          DEFAULT: '#6B2D8B',
          dark:    '#4A1A6E',
          light:   '#9B5EC0',
          pale:    '#F3EEF8',
          muted:   '#D4B8E8',
          // legacy alias used across the codebase
          lucina:  '#7B3FA0',
        },
        // Pink Accent
        pink: {
          DEFAULT: '#E8619A',
          dark:    '#C94478',
          light:   '#F093B4',
          pale:    '#FDEEF5',
        },
        // Navy
        navy: {
          DEFAULT: '#2D1353',
          dark:    '#1A0830',
        },
        // Card / Section
        card:     '#F8F0F8',
        lavender: {
          DEFAULT: '#EDE8F5',
          mid:     '#DDD5EE',
        },
        // Neutrals
        'off-white':  '#FAFAFA',
        'light-gray': '#F5F5F5',
        'mid-gray':   '#E5E7EB',
        // Text
        text: {
          DEFAULT: '#1A1A2E',
          sec:     '#4A4A5A',
          muted:   '#6B7280',
          light:   '#9CA3AF',
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        sans:  ["'DM Sans'", "'Helvetica Neue'", 'Arial', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT:  '10px',
        lg:       '20px',
        xl:       '32px',
        full:     '9999px',
      },
      boxShadow: {
        purple:    '0 4px 24px rgba(107,45,139,0.10)',
        'purple-md':'0 8px 40px rgba(107,45,139,0.15)',
      },
      spacing: {
        'section': '80px',
        'container': '1280px',
      },
    },
  },
  plugins: [],
}
