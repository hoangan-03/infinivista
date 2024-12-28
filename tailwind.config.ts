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
			backgroundImage: {
				'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
			},
    		container: {
    			center: true,
    			screens: {
    				desktop: '1440px'
    			}
    		},
    		screens: {
    			desktop: '1440px'
    		},
    		colors: {
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
				'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
    		},
    		fontFamily: {
    			montserrat: [
    				'Montserrat',
    				'sans-serif'
    			]
    		},
    		fontSize: {
    			overline: '0.625rem',
    			caption: '0.75rem',
    			paragraph2: '0.875rem',
    			paragraph1: '1rem',
    			subtitle2: '1rem',
    			subtitle1: '1.25rem',
    			heading6: '1rem',
    			heading5: '1.25rem',
    			heading4: '1.75rem',
    			heading3: '2.25rem',
    			heading2: '3rem',
    			heading1: '3.5rem',
    			display3: '4rem',
    			display2: '5rem',
    			display1: '6rem'
    		},
    		borderRadius: {
    			xs: '5px',
    			sm: '8px',
    			DEFAULT: '10px',
    			lg: '12px',
    			xl: '16px'
    		},
			flex: {
				2: '2 2 0%', // Grow 2 times compared to others
			}
    	}
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
