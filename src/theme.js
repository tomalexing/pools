import {LightenDarkenColor} from './utils';
export default {
    background: {
        paper: "#fff",
        default: "#474E65"
    },
    divider: "#6C7184",
    palette:{
        primary: {
            light: LightenDarkenColor("#474E65", 20),
            main: "#474E65",
            dark: LightenDarkenColor("#474E65", -20),
            contrastText: "#fff"
        },
        secondary: {
            light: LightenDarkenColor("#FC3868", 20),
            main: "#FC3868",
            dark: LightenDarkenColor("#FC3868", -20),
            contrastText: "#fff"
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            hover: "rgba(0, 0, 0, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(0, 0, 0, 0.14)",
            disabled: "rgba(255, 255, 255, 1)",
            disabledBackground: LightenDarkenColor("#FC3868", 80),
        },
        background: {
            default: 'transparent'
        }
    },
    typography: {
        button: {
            fontSize: "0.875rem",
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: "0.048rem",
            textDecoration: "none",
            color: "white",
            fontFamily: '"Montserrat" ,"Open Sans", "Helvetica", "Arial", "sans-serif"'
        },
        title: { // h2
            fontSize: '1rem',
            fontFamily: '"Montserrat", "Open Sans", "Helvetica", "Arial", sans-serif',
            color: '#474e65'
        },
        headline: { // h1
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
            color: '#474e65',
            fontSize: '1.125rem',
        },
        subheading: { // h3
            color: '#797E8F',
            fontSize: '1rem',
            fontFamily: '"Montserrat", "Open Sans", "Helvetica", "Arial", sans-serif',
            color: '#474e65',
            fontWeight: 600
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#474e65',
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
        },
        display1: {
            color: '#ffffff',
            fontFamily: '"Montserrat", "Open Sans", "Helvetica", "Arial", sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
        },
        display2: {
            color: '#506980',
            fontFamily: '"Montserrat", "Open Sans", "Helvetica", "Arial", sans-serif',
            fontSize: 88,
            fontWeight: 200,
        },
        display3: {
            fontSize: '3rem',
            fontWeight: 400,
            color: '#fff',
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
        },
        display4: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#fff',
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
        },
    },
    shadows: [
        "none",
         "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
         "", // buttons have no shadow
         "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
         "0 2px 50px rgba(0, 0, 0, 0.5)", // Overrided
         "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
         "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
         "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
         "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
         "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
         "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
         "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
         "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
         "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
         "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
         "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
         "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
         "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
         "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
         "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
         "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
         "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
         "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
         "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
         "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
    ]
}