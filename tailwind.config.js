/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: {
          DEFAULT: "hsl(var(--purple-h) var(--purple-s) 79% / <alpha-value>)",
          // We can't use variables in react-email, so we need hex alternatives
          hex: "#d294ff",
          400: "hsl(var(--purple-h) var(--purple-s) 83% / <alpha-value>)",
        },
      },
      fontFamily: {
        antonio: ["var(--font-antonio)"],
        montserrat: ["var(--font-montserrat)"],
        "open-sans": ["var(--font-open-sans)"],
      },
      keyframes: {
        "slide-in-left": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-out-left": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        "slide-in-bottom": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "slide-out-bottom": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(100%)",
          },
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 0.15s ease-out",
        "slide-out-left": "slide-out-left 0.15s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.3s ease-out",
        "slide-out-bottom": "slide-out-bottom 0.3s ease-out",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
