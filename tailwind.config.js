/**
 * @format
 * @type {import('tailwindcss').Config}
 */
const flowbite = require("flowbite-react/tailwind");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "1rem", 
			},
			screens: {
				sm: "576px", 
				md: "768px", 
				lg: "992px", 
				xl: "1200px", 
				"2xl": "1400px", 
			},
		},
	},
	plugins: [flowbite.plugin()],
};
