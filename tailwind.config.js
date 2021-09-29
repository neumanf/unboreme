module.exports = {
    purge: [
        './resources/views/**/*.edge',
        './resources/css/**/*.css',
        './resources/js/**/*.js',
        './resources/js/**/*.ts',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                purpleish: {
                    light: '#A682FF',
                    DEFAULT: '#715AFF',
                },
                blueish: {
                    light: '#55C1FF',
                    DEFAULT: '5887FF',
                    dark: '#102E4A',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
