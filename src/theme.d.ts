import { createTheme } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles";

// Extend the Palette and PaletteOptions interfaces
declare module "@mui/material/styles" {
  interface Palette {
    kyoBlue: Palette["primary"]; // Define kyoBlue as a palette color
    kyoPurple: Palette["primary"]; // Define kyoPurple as a palette color
  }
  interface PaletteOptions {
    kyoBlue?: PaletteOptions["primary"]; // Optional for theme configuration
    kyoPurple?: PaletteOptions["primary"]; // Optional for theme configuration
  }
}

// Define the theme options
const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3b6df1",
    },
    secondary: {
      main: "#000004",
      light: "#333333", // Optional lighter variant
      dark: "#000000", // Optional darker variant
      contrastText: "#ffffff", // Optional text color for contrast
    },
    kyoBlue: {
      main: "#0a9bcd", // Custom color
    },
    kyoPurple: {
      main: "#6e3cbe", // Custom color
    },
  },
  typography: {
    fontFamily: "Manrope, Arial, sans-serif", // Use Manrope as the default font
    h5: {
      fontWeight: 700,
      marginBottom: "0.5em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small", // Set default size to small
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "bold", // Set font weight to bold
          textTransform: "capitalize",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "rgba(30, 31, 43, 0.16) 0px 4px 8px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          
        },
      },
    },
  },
};

// Create the theme
const theme = createTheme(themeOptions);

export default theme;