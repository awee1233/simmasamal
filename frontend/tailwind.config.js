/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Allfeat custom colors
				"canvas-dark": "#151515",
				"blueprint-gray": "#383835",
				"whisper-white": "#fffbeb",
				"slate-text": "#b8b8b8",
				"ghost-gray": "#a6a6a6",
				"shadow-tint": "#504f4a",
				"cyber-teal": "#00b18c",
				"impact-red": "#ff4a5f",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xl: "12px",
				full: "900px",
			},
			fontFamily: {
				sans: ["'Montserrat'", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			boxShadow: {
				"subtle": "inset 0px 0px 0px 1px #383835",
				"subtle-2": "inset 0px 0px 0px 2px rgba(255, 251, 235, 0.25)",
				"glow-teal": "0 0 20px rgba(0, 177, 140, 0.3)",
				"glow-red": "0 0 20px rgba(255, 74, 95, 0.3)",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"pulse-teal": {
					"0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 177, 140, 0.4)" },
					"50%": { boxShadow: "0 0 0 10px rgba(0, 177, 140, 0)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.3s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"pulse-teal": "pulse-teal 2s infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
