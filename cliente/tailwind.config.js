const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["src/**/*.{ts,tsx}"],
	theme: {
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
				suSopra: {
					from: {
						marginTop: "0",
					},
					to: {
						marginTop: "-120px",
					},
				},
				giuSopra: {
					from: {
						marginTop: "-120px",
					},
					to: {
						marginTop: "0",
					},
				},
				giuSotto: {
					from: {
						marginBottom: "0",
					},
					to: {
						marginBottom: "-120px",
					},
				},
				suSotto: {
					from: {
						marginBottom: "-120px",
					},
					to: {
						marginBottom: "0",
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
				hideElement: "hideElement 1s",
				showElement: "showElement 1s forwards",
				suSopra: "suSopra 1s forwards",
				giuSopra: "giuSopra 1s forwards",
				giuSotto: "giuSotto 1s forwards",
				suSotto: "suSotto 1s forwards",
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
