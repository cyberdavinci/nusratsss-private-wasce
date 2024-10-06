const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "light-custom-gradient":
          "linear-gradient(to right top, #d8feee, #d2faee, #cdf7ee, #c9f3ee, #c5efee, #c4eeec, #c4eceb, #c3ebe9, #c6ece5, #c9ede1, #ceeede, #d3eeda)",
        "dark-custom-gradient":
          "linear-gradient(to right top,  #4a6976, #435e6d, #3c5364, #36485a, #303e50, #303e50, #313e50, #313e50, #37495b,#3d5565, #44606f, #4c6c79)",
        "dark-custom-gradient-2":
          "linear-gradient(to bottom, #090e0a, #0e120e, #111512, #141815, #171b18, #1b1f1c, #1f2420, #232824, #2a2f2b, #313632, #383e3a, #3f4541)",
        "green-custom-gradient":
          "linear-gradient(to right top, #3d7061, #3a7067, #38706c, #387072, #397076, #3a7078, #3b717b, #3d717d, #3d727f, #3c7280, #3c7382, #3c7384)",
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
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      boxShadow: {
        "custom-1":
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        mac: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      },
      colors: {
        dark: {
          primary: "#293042",
          secondary: "#4A6976",
          green: "#22b971",
          darkgreen: "#1E765C",
          darkericongreen: "#3f4e46",
          verylightgreen: "#eaf9ef",
          greylight: "#303531",
        },
        light: {
          primary: "#C1E9ED",
          secondary: "#D8FEEE",
          lightgreen: "",
          darkgreen: "#1E765C",
          // dark: '#065f46',
        },
        // Add more custom colors as needed
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin"), nextui()],
};
