import { createTheme, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {  Link } from "@mui/material";

export const StyledLink = styled(Link)`
  word-break: break-all;
  &:hover {
    color: #006321;
  }
  &:focus {
    color: #006321;
  }
`;
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      dark:"#006321BB",
      light:"#ffffff"
    },
    secondary: {
      main: "#f6f8f5",
      light:"#70707033"
    },
    grey: {
      500: "#457C381A",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#395165",
      secondary: "#39516588",
    },
    action: {
        hover: "#006321",
       hoverOpacity: 0.07,
      // hover: "#006321",
    },
    button: {
      main:"#395165",
      contrastText: '#fff',
    },
    buttonGreen: {
      main:"#4C9163",
      contrastText: '#fff',
    },
    buttonLink: {
      main:"#4C916300",
      contrastText: '#457C381A',
    }
  },
 
  shape:{
    borderRadius:18
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Baloo Tamma2';
          font-style: normal;
          font-weight: 300;
          src: url(/fonts/balootamma2-regular.woff2) format('woff2');
        }  
      @font-face {
          font-family: 'Baloo Tamma2';
          font-style: normal;
          font-weight: 400;
          src: url(/fonts/balootamma2-medium.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Baloo Tamma2';
          font-style: normal;
          font-weight: 500;
          src: url(/fonts/balootamma2-semibold.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Baloo Tamma2';
          font-style: normal;
          font-weight: 600;
          src: url(/fonts/balootamma2-bold.woff2) format('woff2');
        }
        @font-face {
          font-family: 'Baloo Tamma2';
          font-style: normal;
          font-weight: 800;
          src: url(/fonts/balootamma2-extrabold.woff2) format('woff2');
        }
      `,
    },
  },
  typography: {
    button: {
      textTransform: "none"
    },
    fontFamily: [
      '"Baloo Tamma2"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 600, // or 'bold'
    },
    h4: {
      fontWeight: 500, // or 'bold'
    },
    subtitle1:{
      fontSize:18
    },
    subtitle2 :{
      fontSize:14
    }
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    button: Palette['primary'];
    buttonGreen: Palette['primary'];
    buttonLink: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    button?: PaletteOptions['primary'];
    buttonGreen?: PaletteOptions['primary'];
    buttonLink?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     button: true;
//     buttonGreen: true;
//     buttonLink: true;
//   }
// }

export default theme;
