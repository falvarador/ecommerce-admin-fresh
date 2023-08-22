/** @type {import('https://esm.sh/tailwindcss@3.3.3').Config} */
module.exports = {
  content: [
    "./src/routes/**/*.{tsx,ts}",
    "./src/islands/**/*.{tsx,ts}",
    "./src/components/**/*.{tsx,ts}",
    "./src/static/styles/input.css",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
