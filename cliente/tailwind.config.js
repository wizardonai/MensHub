const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["src/**/*.{ts,tsx}"],
	theme: {
		screens: {
			tel: "450px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "var(--background)",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				marrone: "var(--marrone)",
				arancioneScuro: "var(--arancioneScuro)",
				arancioneChiaro: "var(--arancioneChiaro)",
				marroncino: "var(--marroncino)",
				biancoLatte: "var(--biancolatte)",
				rosso: "var(--rosso)",
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				elementoNelCarrello: {
					"0%": {
						transform: "rotate(-3deg)",
					},
					"25%": {
						transform: "rotate(3deg)",
					},
					"50%": {
						transform: "rotate(-3deg)",
					},
					"75%": {
						transform: "rotate(3deg)",
					},
				},
				swipeLeftCarrello: {
					from: { width: "100%" },
					to: {
						width: "75%",
						clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%, 0% 38%)",
						borderTopRightRadius: "0",
					},
				},
				swipeLeftCarrelloEl: {
					from: { width: "0%", display: "none" },
					to: {
						width: "25%",
						// display: "flex",
						clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0 100%, 0% 100%)",
						borderBottomLeftRadius: "0",
					},
				},
				swipeRightCarrello: {
					from: {
						width: "75%",
						clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%, 0% 38%)",
					},
					to: {
						width: "100%",
						clipPath: "none",
					},
				},
				swipeRightCarrelloEl: {
					from: {
						width: "25%",
						// display: "flex",
						clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0 100%, 0% 100%)",
						borderBottomLeftRadius: "0",
					},
					to: { width: "0%", display: "none" },
				},
				hideElement: {
					from: {
						opacity: "1",
					},
					to: {
						opacity: "0",
					},
				},
				showElement: {
					from: {
						opacity: "0",
					},
					to: {
						opacity: "1",
					},
				},
				sopra0: {
					to: {
						top: "0",
					},
				},
				sopra5: {
					to: {
						top: "-5svh",
					},
				},
				sopra10: {
					to: {
						top: "-10svh",
					},
				},
				sopra15: {
					to: {
						top: "-15svh",
					},
				},
				sopra20: {
					to: {
						top: "-20svh",
					},
				},
				sopra25: {
					to: {
						top: "-25svh",
					},
				},
				sopra30: {
					to: {
						top: "-30svh",
					},
				},
				sopra35: {
					to: {
						top: "-35svh",
					},
				},
				sopra40: {
					to: {
						top: "-40svh",
					},
				},
				sopra45: {
					to: {
						top: "-45svh",
					},
				},
				sopra50: {
					to: {
						top: "-50svh",
					},
				},
				sopra55: {
					to: {
						top: "-55svh",
					},
				},
				sopra60: {
					to: {
						top: "-60svh",
					},
				},
				sopra65: {
					to: {
						top: "-65svh",
					},
				},
				sopra70: {
					to: {
						top: "-70svh",
					},
				},
				sotto0: {
					to: {
						bottom: "0",
					},
				},
				sotto5: {
					to: {
						bottom: "-5svh",
					},
				},
				sotto10: {
					to: {
						bottom: "-10svh",
					},
				},
				sotto15: {
					to: {
						bottom: "-15svh",
					},
				},
				sotto20: {
					to: {
						bottom: "-20svh",
					},
				},
				sotto25: {
					to: {
						bottom: "-25svh",
					},
				},
				sotto30: {
					to: {
						bottom: "-30svh",
					},
				},
				sotto35: {
					to: {
						bottom: "-35svh",
					},
				},
				sotto40: {
					to: {
						bottom: "-40svh",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				elementoNelCarrello: "elementoNelCarrello 0.2s",
				swipeLeftCarrello: "swipeLeftCarrello 0.5s forwards",
				swipeLeftCarrelloEl: "swipeLeftCarrelloEl 0.5s forwards",
				swipeRightCarrello: "swipeRightCarrello 0.5s forwards",
				swipeRightCarrelloEl: "swipeRightCarrelloEl 0.5s forwards",
				hideElement: "hideElement 1s forwards",
				hideFast: "hideElement 0.5s forwards",
				showElement: "showElement 1s forwards",
				showFast: "showElement 0.5s forwards",
				sopra0: "sopra0 1s forwards",
				sopra5: "sopra5 1s forwards",
				sopra10: "sopra10 1s forwards",
				sopra15: "sopra15 1s forwards",
				sopra20: "sopra20 1s forwards",
				sopra25: "sopra25 1s forwards",
				sopra30: "sopra30 1s forwards",
				sopra35: "sopra35 1s forwards",
				sopra40: "sopra40 1s forwards",
				sopra45: "sopra45 1s forwards",
				sopra50: "sopra50 1s forwards",
				sopra55: "sopra55 1s forwards",
				sopra60: "sopra60 1s forwards",
				sopra65: "sopra65 1s forwards",
				sopra70: "sopra70 1s forwards",
				sotto0: "sotto0 1s forwards",
				sotto5: "sotto5 1s forwards",
				sotto10: "sotto10 1s forwards",
				sotto15: "sotto15 1s forwards",
				sotto20: "sotto20 1s forwards",
				sotto25: "sotto25 1s forwards",
				sotto30: "sotto30 1s forwards",
				sotto35: "sotto35 1s forwards",
				sotto40: "sotto40 1s forwards",
			},
			height: {
				navbar: "var(--navbarH)",
				topbar: "var(--topbarH)",
				container: "var(--containerH)",
				containerProfile: "var(--containerProfileH)",
				containerProduct: "var(--containerProductH)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
