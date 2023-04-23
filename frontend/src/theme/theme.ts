import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

export const theme = extendTheme(
  { config },
  {
    colors: {
      blue: "#2196F3",

      gray: {
        50: "#f9f9f9",
        100: "#ededed",
        200: "d3d3d3",
        300: "#b3b3b3",
        400: "#a0a0a0",
        500: "#898989",
        600: "6c6c6c",
        700: "#202020",
        800: "#121212",
        900: "#111"
      },

      brand: {
        50: "#5c5c5c",
        100: "#333333",
        200: "#3d3d3d",
      },
    },
  }
)