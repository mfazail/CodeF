module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      cookie: ["Kaushan Script", "cursive"],
    },
    extend: {
      keyframes: {
        fly: {
          "0%": {
            transform: "rotate(0deg) translateX(0px) transform-origin:50% 50%",
          },
          "25%": { transform: "rotate(-2deg) translateX(-10px)" },
          "50%": { transform: "rotate(-3deg) translateX(-15px)" },
          "75%": { transform: "rotate(2deg) translateX(10px)" },
          "100%": { transform: "rotate(0deg) translateX(0px)" },
        },
      },
      animation: {
        fly: "fly 7s linear infinite",
      },
    },
  },
  plugins: [],
};
