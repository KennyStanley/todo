module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: {
                    750: '#22222b',
                    770: '#202028',
                    950: '#121212',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
