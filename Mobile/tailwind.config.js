/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3F51B5", // Royal Indigo
        secondary: "#009688", // Teal Blue
        background: "#F8F9FA", // Ghost White
        surface: "#FFFFFF", // White
        textPrimary: "#212121", // Charcoal Gray
        textSecondary: "#757575", // Cool Gray
        accent: "#FFB74D", // Gold Sand
        error: "#E57373", // Soft Red
        success: "#81C784", // Leaf Green
      },
    },
  },
  plugins: [],
};
