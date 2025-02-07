/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #FF5A00, #FF7A00)",
      },
    },
  },
  plugins: [],
};
