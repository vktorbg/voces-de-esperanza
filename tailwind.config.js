module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      boxShadow: {
        'top-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
  safelist: [
    "bg-white", "dark:bg-gray-900", "border", "border-gray-200", "dark:border-gray-700",
    "rounded-xl", "shadow", "px-4", "py-6", "text-green-800", "dark:text-green-300",
    "text-indigo-800", "dark:text-indigo-300", "bg-green-800", "hover:bg-green-900",
    "bg-indigo-800", "hover:bg-indigo-900", "text-white", "font-semibold"
  ],
}
