module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "80vh": "80vh",
      },
    },
    screens: {
      "3xs": "380px",
      "2xs": "420px",
      xs: "460px",
      sm: "520px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      lora: ["Lora"],
      gunny: ["Gunny"],
      wonder: ["Wonder Easter"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover", "group-hover"],
      borderColor: ["hover", "group-hover"],
      margin: ["hover"],
    },
  },
  plugins: [],
};
