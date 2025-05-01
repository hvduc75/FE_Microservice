/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        safelist: ['focus:border-purple-300', 'focus:outline-none', 'focus:shadow-outline-purple'],
    },
    darkMode: 'class',
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            borderColor: ['focus'],
            outline: ['focus'],
        },
    },
    plugins: [],
};
