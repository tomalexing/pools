import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types'; 

import './index.css';
import DevTools from "mobx-react-devtools";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Cards from "./models/Cards";
import registerServiceWorker from './registerServiceWorker';

import { withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';

import { Lazy, getUniqueKey, dump, addClass } from './utils';

import {
    Route, 
    withRouter,
    BrowserRouter as Router,
    Link,
    Redirect,
    Switch } from 'react-router-dom';

import './services/seed';
import injectTapEventPlugin from 'react-tap-event-plugin';
import noPullToRefresh from './no-pull-to-refresh.js';
import Api from './services/Api';
import Term from './term-of-use'

injectTapEventPlugin();
noPullToRefresh();


const Card = (props) => <Lazy {...props} load={() => import('./components/CardWrapper')}/>

const storeQuiz = new Cards({getIds: Api.getQuizzesIds(), cardSlug: 'quizzes'});
const storePool = new Cards({getIds: Api.getPoolsIds(), cardSlug: 'pools'});

const theme = createMuiTheme(
    {
    background: {
        paper: "#fff",
        default: "#474E65"
    },
    divider: "#6C7184",
    palette:{
        primary: {
            light: "#474E65",
            main: "#474E65",
            dark: "#474E65",
            contrastText: "#fff"
        },
        secondary: {
            light: "#FC3868",
            main: "#FC3868",
            dark: "#FC3868",
            contrastText: "#fff"
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
        subheading: {
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
            textTransform: 'uppercase'
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
});


const styles = theme => ({
    mainScreen:{
        backgroundColor: "#474E65",
        lineHeight: "0",
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    container: {
        margin: 'auto',
        maxWidth: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 767px)':{
            margin: '25px 10px'
        }
       
    }
})

@withStyles(styles)
class App extends React.Component{

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
      
  render() {

    const { classes } = this.props;

    return (
        <div className={"App".concat(' ' + classes.mainScreen)} >
            <Header />
            <div className={classes.container}>
            {React.Children.only(this.props.children)}
            </div>
            {/*<DevTools />*/}
            <Footer />
        </div>
    );
  }
}


render(<Router>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>
                <Route path={'/'} exact  component={() => <App><Card store={storeQuiz} /></App>}/>
                <Route path={'/pools'} component={() => <App ><Card key="quizzes" store={storeQuiz} /></App>}/>
                <Route path={'/quizzes'} component={() => <App><Card key="pools" store={storePool} /></App>}/>
                <Route path={'/term-of-use'} component={() => <App><Term /></App>}/>
                <Route path='*' exact component={() => (<App>404<p>NOT FOUND</p></App>)} />
            </Switch>
        </MuiThemeProvider>
    </Router>,
    document.getElementById("root")
);


// playing around in the console
registerServiceWorker();
window.storeQuiz = storeQuiz;
window.storePool = storePool;

// Chech for safari privat mode
if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    }
}
if (navigator.userAgent.indexOf('Safari') != -1 &&  navigator.userAgent.indexOf('Chrome') == -1) {
    addClass(document.body, "safari");
    
}

function isgetMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return true//return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return true //return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true// return "iOS";
    }

    return false;
}

if ( isgetMobileOperatingSystem() ){
    window.isMobileDevice = true
}