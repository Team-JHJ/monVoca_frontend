/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard-Regular', 'sans-serif'],
            },
        },
        screens: {
            sm: { max: '400px' },
        },
    },
    plugins: [],
}
