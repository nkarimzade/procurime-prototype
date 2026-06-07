/**
 * Procurime renk sistemi — Gün 1'de tam tanımlanır, sonradan değiştirilmez.
 * Buyer paneli → buyer (turkuaz) ağırlıklı.
 * Teklif kartları & badge → supplier (turuncu).
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        buyer: {
          DEFAULT: "#06B6D4",
          light: "#ECFEFF",
          hover: "#0891B2",
        },
        supplier: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
          hover: "#B45309",
        },
        admin: {
          DEFAULT: "#6D28D9",
          light: "#F5F3FF",
          hover: "#5B21B6",
        },
        success: "#0A7A58",
        danger: "#C41B1B",
        procurime: {
          text: "#0D1421",
          sub: "#3D4A5C",
          muted: "#8491A8",
          border: "#E4E7F0",
          bg: "#F7F8FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
