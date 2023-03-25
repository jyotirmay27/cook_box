function withOpacity(variableName) {
    return ({ opacityValue }) => {
      if (opacityValue !== undefined) {
        return `rgba(var(${variableName}), ${opacityValue})`;
      }
      return `rgb(var(${variableName}))`;
    };
  }
  module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        xlsm: { min: "0px", max: "450px" },
      },
      extend: {
        colors: {
          linkedin: "#2867B2",
          twitter: "#1DA1F2",
          facebook: "#4267B2",
          instagram: "#e95950",
          custom: {
            accent: withOpacity("--color-accent"),
            secondary: withOpacity("--color-secondary"),
            dark: withOpacity("--color-dark"),
            light: withOpacity("--color-light"),
          },
        },
        backgroundColor: {
          custom: {
            accent: withOpacity("--bg-accent"),
            dark: withOpacity("--bg-dark"),
            light: withOpacity("--bg-light"),
          },
        }, //usage: bg-custom-primary
        borderColor: {
          custom: {
            accent: withOpacity("--border-accent"),
            primary: withOpacity("--border-primary"),
            secondary: withOpacity("--border-secondary"),
          },
        }, //usage: bg-custom-primary
      },
    },
    plugins: [],
  };