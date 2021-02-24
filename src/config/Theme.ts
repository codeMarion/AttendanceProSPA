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
    typography: {
        fontFamily: `Poppins, sans-serif`
    }
});

export default Theme;