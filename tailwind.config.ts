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
                white: '#FCFCFC',
                black: '#1E1E20',
                primary: {
                    DEFAULT: '#0369A1',
                },
                gray: {
                    100: '#EFEFEF',
                    200: '#DCDCDC',
                    300: '#BDBDBD',
                    400: '#989898',
                    500: '#7C7C7C',
                    600: '#656565',
                    700: '#525252',
                    800: '#464646',
                    900: '#3D3D3D',
                },
                green: {
                    100: '#DCFCE7',
                    200: '#BBF7D0',
                    300: '#86EFAC',
                    400: '#4ADE80',
                    500: '#22C55E',
                    600: '#16A34A',
                    700: '#15803D',
                    800: '#166534',
                    900: '#14532D',
                },
                orange: {
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                },
                red: {
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                    800: '#991B1B',
                    900: '#7F1D1D',
                },
                blue: {
                    100: '#DBEAFE',
                    200: '#BAE6FD',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                },
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(180deg, #2583FE, #F2C2FF, #FFF6A2)',
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
                xs: '4px',
                sm: '6px',
                DEFAULT: '8px',
                md: '10px',
                lg: '12px',
                xl: '16px',
            },
            flex: {
                2: '2 2 0%', // Grow 2 times compared to others
                3: '3 3 0%', // Grow 3 times compared to others
                4: '4 4 0%', // Grow 4 times compared to others
            },
            boxShadow: {
                sm: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                md: '0 4px 8px 0 rgba(0, 0, 0, 0.25)',
                lg: '0 8px 25px 0 rgba(0, 0, 0, 0.25)',
            },
            transitionProperty: {
                width: 'width',
                height: 'height',
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
                    // fontSize: theme('fontSize.paragraph1'),
                    color: theme('colors.black'),
                    fontWeight: theme('fontWeight.medium'),
                },
                overline: {fontSize: theme('fontSize.overline')},
                cap: {fontSize: theme('fontSize.caption')},
                p2: {fontSize: theme('fontSize.paragraph2')},
                p1: {fontSize: theme('fontSize.paragraph1')},
                subtitle2: {fontSize: theme('fontSize.subtitle2')},
                subtitle1: {fontSize: theme('fontSize.subtitle1')},
                h6: {fontSize: theme('fontSize.heading6')},
                h5: {fontSize: theme('fontSize.heading5')},
                h4: {fontSize: theme('fontSize.heading4')},
                h3: {fontSize: theme('fontSize.heading3')},
                h2: {fontSize: theme('fontSize.heading2')},
                h1: {fontSize: theme('fontSize.heading1')},
                display3: {fontSize: theme('fontSize.display3')},
                display2: {fontSize: theme('fontSize.display2')},
                display1: {fontSize: theme('fontSize.display1')},
            });
        }),
    ],
};
export default config;
