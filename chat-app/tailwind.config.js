/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'chat': "url('https://imgs.search.brave.com/e93WqiBZWA9AGA2raQdCmIyx6MdFHbLd1FH7kP1_Kko/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQ0MTA3/MTQuanBn')",
    }
  },
  plugins: [],
}