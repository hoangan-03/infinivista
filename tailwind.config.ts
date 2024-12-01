/* eslint-disable @typescript-eslint/no-require-imports */
import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    darkMode: ['class'],
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    desktop: '1440px',
                },
            },
            screens: {
                desktop: '1440px',
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                overline: '0.625rem', // 10px
                caption: '0.75rem', // 12px
                paragraph2: '0.875rem', // 14px
                paragraph1: '1rem', // 16px
                subtitle2: '1rem', // 16px
                subtitle1: '1.25rem', // 20px
                heading6: '1rem', // 16px
                heading5: '1.25rem', // 20px
                heading4: '1.75rem', // 28px
                heading3: '2.25rem', // 36px
                heading2: '3rem', // 48px
                heading1: '3.5rem', // 56px
                display3: '4rem', // 64px
                display2: '5rem', // 80px
                display1: '6rem', // 96px
            },
            borderRadius: {
                xs: '5px',
                sm: '8px',
                DEFAULT: '10px',
                lg: '12px',
                xl: '16px',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(function ({addUtilities, addBase, theme}) {
            addUtilities({
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            });
            addBase({
                body: {
                    fontFamily: theme('fontFamily.montserrat'),
                    fontSize: theme('fontSize.paragraph1'),
                },
            });
        }),
    ],
};
export default config;
