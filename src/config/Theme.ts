import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#292D39'
        },
        secondary: {
            main: '#39B6FF'
        }
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1495,
          xl: 1920
        }
    },
    typography: {
        fontFamily: `Poppins, sans-serif`
    }
});

export default Theme;