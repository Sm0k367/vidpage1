/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./app/**/*.{js,ts,jsx,tsx}",
"./pages/**/*.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
colors: {
epicCyan: "#00F6FF",
spectralMagenta: "#FA28FF",
cyberBlack: "#090B12",
},
fontFamily: {
display: ['Oswald', 'Arial Black', 'sans-serif'],
body: ['Inter', 'sans-serif'],
},
},
},
plugins: [],
};
