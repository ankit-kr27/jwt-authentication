import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
        prefix: "nextui", // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: "light", // default theme from the themes object
        defaultExtendTheme: "light", // default theme to extend on custom themes
        layout: {}, // common layout tokens (applied to all themes)
        themes: {
            light: {
                layout: {}, // light theme layout tokens
                colors: {
                    primary: "#2196f3",
                    secondary: "#e3f2fd", 
                },
            },
            dark: {
                layout: {}, // dark theme layout tokens
                colors: {
                    primary: "#2196f3", 
                    secondary: "#e3f2fd", 
                },
            },
            // ... custom themes
        },
    }),
    function ({ addUtilities }) {
        addUtilities({
            ".scrollbar-thin": {
                "&::-webkit-scrollbar": {
                    width: "6px",
                    marginTop: "2px",
                    marginBottom: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#d1d5db",
                    borderRadius: "6px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                },
            },
        });
    },
],
}

