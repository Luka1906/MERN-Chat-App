/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color-dark": "#176B87",
        "primary-color-medium": "#64CCC5",
        "primary-color-light": "#DAFFFB",
        "bg-color": "	#001C30",
        "text-color": "	#FFFAFA",
        "input-color": "rgba(255, 255, 255, 0.25)",
        "placeholder-color": "#00dfc4",
        "error-color": "#D8000C",
        "message-color": "#003249",
      },
      boxShadow: {
        "card-shadow": "0px 4px 15px 4px #64CCC5;",
        "inner-shadow": "inset 0 0 0 1000px rgba(0,0,0,0.20)",
      },
      gridTemplateColumns: {
        "chat-grid": "30% 70%",
        "chat-grid-tablet": "40% 60%",
        "chat-grid-mobile-list": "100% 0%",
        "chat-grid-mobile-chat": "0% 100%",
      },
      gridTemplateRows: {
        "contact-grid": "20% 57% 23%",
        "chat-grid": "10% 78% 12%",
        "chat-grid-tablet": "15% 70% 15%",
     
      },
    },
  },

  plugins: [],
};
