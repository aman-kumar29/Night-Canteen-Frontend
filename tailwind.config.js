module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',	  
			'2xl': '1536px',
			'3xl': '1940px',
			'4xl': '2560px',
		  },

		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem"
			},
		},
		extend: {
			animation: {
				spotlight: "spotlight 2s ease .75s 1 forwards",
			  },
			  keyframes: {
				spotlight: {
				  "0%": {
					opacity: 0,
					transform: "translate(-72%, -62%) scale(0.5)",
				  },
				  "100%": {
					opacity: 1,
					transform: "translate(-50%,-40%) scale(1)",
				  },
				},
			  },		
			colors: {
				purple: {
					100: "#6C79FF",
					200: "#7477F0",
					300: "#6E79D6",
					400: "#5E6AD2",
					500: "#666BE2",
					600: "#5C67C7",
					700: "#575BC7",
					800: "#9747FF",
				},
				red: {
					100: "#FFEEEE",
					200: "#FFC4C4",
					300: "#FF9A9A",
					400: "#FF7070",
					500: "#FF4646",
					600: "#FF1C1C",
					700: "#E60000",
					800: "#B30000",
					900: "#800000",
				},
				danger: {
					100: "#E10721",
					200: "#C60B21",
					300: "#981717",
				},
				body: {
					900: "#000000",
					800: "#1A1A1A",
					700: "#333333",
					600: "#4D4D4D",
					light: "#F0F0F0",
				},
				text: {
					dark: "#858699",
					light: "#333333",
				},
				secondary: {
					dark: "#1c1d2a",
					light: "#F9FAFB",
				},
				secondary2: {
					dark: "#292a35",
					light: "#E5E7EB",
				},
				secondary3: {
					dark: "#2a2b51",
					light: "#D1D5DB",
				},
				border: {
					dark: "#2c2d3c",
					light: "#D1D5DB",
				},
			},
			backgroundImage: {},
			fontFamily: {
				inter: ["'Inter'", "sans-serif"],
			},
			fontSize: {
				xs: ["12px", { lineHeight: "20px" }],
				sm: ["14px", { lineHeight: "22px" }],
				normal: ["16px", { lineHeight: "24px" }],
				md: ["18px", { lineHeight: "28px" }],
				lg: ["20px", { lineHeight: "27px" }],
				xl: ["24px", { lineHeight: "36px" }],
				"2xl": ["28px", { lineHeight: "34px" }],
				"3xl": ["30px", { lineHeight: "72px" }],
				"4xl": ["32px", { lineHeight: "38px" }],
				"5xl": ["36px", { lineHeight: "42px" }],
				"6xl": ["42px", { lineHeight: "48px" }],
			},
			boxShadow: {},
		},
	},
	plugins: [],
};