/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Inter: ['Inter', 'Inter Fallback']
            },
            screens: {
                xs: '560px',
                xxs: '440px'
            },
            width: {
                'screen-90': '90vw',
                'screen-80': '80vw',
                'screen-70': '70vw',
                'screen-60': '60vw',
                'screen-50': '50vw',
                'screen-40': '40vw',
                'screen-30': '30vw',
                'screen-20': '20vw',
                'screen-10': '10vw'
            },
            height: {
                'screen-90': '90vh',
                'screen-80': '80vh',
                'screen-70': '70vh',
                'screen-60': '60vh',
                'screen-50': '50vh',
                'screen-40': '40vh',
                'screen-30': '30vh',
                'screen-20': '20vh',
                'screen-10': '10vh'
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',

                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                    hover: 'var(--primary-hover)'
                }
            }
        }
    },
    plugins: []
};
