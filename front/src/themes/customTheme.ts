import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#e3f2f9",
    100: "#c5e4f3",
    200: "#a2d4ec",
    300: "#7ac1e4",
    400: "#47a9da",
    500: "#0088cc", // cor principal
    600: "#007ab8",
    700: "#006ba1",
    800: "#005885",
    900: "#003f5e",
  },
};

const fonts = {
  heading: "'Roboto', sans-serif",
  body: "'Open Sans', sans-serif",
};

const sizes = {
  container: {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
  },
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
};

const customTheme = extendTheme({ colors, fonts, sizes, breakpoints });

export default customTheme;
