/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // SOLID
    "!bg-emerald-600",
    "!border-emerald-700",
    "!text-white",
    "!bg-rose-600",
    "!border-rose-700",
    "!bg-sky-600",
    "!border-sky-700",
    "!bg-amber-500",
    "!border-amber-600",
    "!text-amber-950",
    "!bg-zinc-600",
    "!border-zinc-700",
    // SOFT (مع الشفافية)
    "!bg-emerald-600/90",
    "!border-emerald-700/50",
    "!bg-rose-600/90",
    "!border-rose-700/50",
    "!bg-sky-600/90",
    "!border-sky-700/50",
    "!bg-amber-500/90",
    "!border-amber-600/50",
    "!bg-zinc-600/90",
    "!border-zinc-700/50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
