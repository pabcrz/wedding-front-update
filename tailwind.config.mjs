/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        mainFont: "#CB5E20",
        mainBG: "#DBE9DF",
        secondaryBG: "#DEDEBE",
        secondaryFont: "#09391B",
      },
    },
  },
  plugins: [],
};
