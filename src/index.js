import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types'; 

import './index.css';
import DevTools from "mobx-react-devtools";

import Header from "./components/Header";
import Footer from "./components/Footer";

import registerServiceWorker from './registerServiceWorker';
import './intersection-observer';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input, { InputLabel } from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import * as cn  from 'classnames'; 
import { Lazy, getUniqueKey, dump, addClass, LightenDarkenColor} from './utils';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import {
    Route, 
    withRouter,
    BrowserRouter as Router,
    Link,
    Redirect,
    Switch } from 'react-router-dom';

import './services/seed';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Api from './services/Api';
import Auth from './models/Auth';

import Typography from '@material-ui/core/Typography';

import { saveAllToStoreMerge } from './services/localDb';
import Login from './components/Login';
import { when } from 'mobx';

injectTapEventPlugin();

const Term = (props) => <Lazy {...props} load={() => import('./pages/term-of-use')}/>
const Privacy = (props) => <Lazy {...props} load={() => import('./pages/privacy-policy')}/>
const Subscribe = (props) => <Lazy {...props} load={() => import('./pages/subscribe')}/>
const Dashboard = (props) => <Lazy {...props} load={() => import('./pages/dashboard')}/>
const Contact = (props) => <Lazy {...props} load={() => import('./pages/contact')}/>
const Create = (props) => <Lazy {...props} load={() => import('./pages/create')}/>
const Landing = (props) => <Lazy {...props} load={() => import('./pages/landing')}/>

const Card = (props) => <Lazy {...props} load={() => import('./components/CardWrapper')}/>
const OneCard = (props) => <Lazy {...props} load={() => import('./components/OneCard')}/>
const Explore = (props) => <Lazy {...props} load={() => import('./pages/Explore')}/>
const Cats = (props) => <Lazy {...props} load={() => import('./components/Cats')}/>
const DCard = (props) => <Lazy {...props} load={() => import('./components/DCard')}/>
const Cookies = (props) => <Lazy {...props} load={() => import('./components/Cookies')}/>



const theme = createMuiTheme(
    {
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
});


const styles = theme => ({
    mainScreen:{
        lineHeight: "0",
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },

    dartBackground:{
        backgroundColor: "#474E65"
    },

    trBackground:{
        backgroundColor: 'transparent'
    },

    container: {
        maxWidth: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 767px)':{
            margin: '25px 10px 15px'
        },
        overflowY: 'hidden',
        overflowX: 'hidden',
        '&> div':{
            width: '100%'
        },
        '&.fullscreen > div':{
            height: '100%',
        },
        '&.cardpage > div':{
            height: '100%',
        },
        '&.fullscreen':{
            margin: '0px 0px !important'
        }
    },
    
})


Auth.init();

@withRouter
@withStyles(styles)
class App extends React.Component{
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    componentDidMount(){
       if( /backup/.test(this.props.location.search) ){
            when(() => !Auth.logging && !Auth.loadingUserData , () => {
                saveAllToStoreMerge( JSON.parse(window.atob(
                        this.props.location.search.replace('?backup=', ''))))
                    .then(_ => {
                        Api.saveUserData();
                    });
            })
       }
    }

    firstChild(children) {
        const childrenArray = React.Children.toArray(children);
        return childrenArray[0] || null;
    }
      
    render() {
        const { classes } = this.props;
       
        return (
            <div className={cn({"App": true, [classes.mainScreen]: true, [classes.dartBackground] : !this.props.embed, [classes.trBackground]: this.props.embed})} >
                {!this.props.embed && <Header isLanding={this.props.landingscreen} /> }
                <div className={cn(classes.container, {'fullscreen': this.props.fullscreen}, {cardpage: this.props.cardpage})}>
                    {this.firstChild(this.props.children)}

                </div>
                {/*<DevTools />*/}
                { !(this.props.nofooter || this.props.embed) && <Footer /> }
            </div>
        );
    }
}



const PrivateRoute =  ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      Auth.isAuthenticated && rest.role.includes(Auth.role) ? (
         <Component currentRole={Auth.role} {...rest}/>
      ) : Auth.signout() && (<div><Login open={true} logout={()=>{}} close={()=>{}}/></div>)
        
    )} />
)
  
render(<Router>
    <Route render={({ location }) => (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {/*<ReactCSSTransitionGroup
                    transitionName={"fade"}
                    transitionAppear={false}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >*/}
                    <Switch>
                    <Route path={'/explore'} exact location={location} key={getUniqueKey()} component={() => <App nofooter={true} fullscreen={true} ><Explore/></App>}/>

                    { /* <Route path={'/polls'} location={location} key={getUniqueKey()} component={() =>        <App >
                            <div>
                                <Card  key="polls" store={storePoll} />
                            </div>
                        </App>}/>
                    */}
                    
                    <Route path={'/quizzes/:id'} location={location} key={getUniqueKey()} component={() => <App nofooter={true} cardpage={true}  ><DCard key="quizzes" /></App>}/>

                    <Route path={'/polls/:id'} location={location} key={getUniqueKey()} component={() => <App nofooter={true} cardpage={true}  ><DCard key="polls" /></App>}/>

                    <Route path={'/embed/:cardtype/:id'} location={location} key={getUniqueKey()} component={() => <App embed={true} cardpage={true}  ><DCard key="emded" /></App>}/>
                    
                    <Route path={'/card/:id'} location={location} key={getUniqueKey()} exact component={() => <App><OneCard key="OneCard"/></App>}/>
                    
                    <Route path={'/term-of-use'} location={location} key={getUniqueKey()} component={() => <App nofooter={true} fullscreen={true} ><Term /></App>}/>

                    <Route path={'/privacy-policy'} location={location} key={getUniqueKey()} component={() => <App nofooter={true} fullscreen={true} ><Privacy /></App>}/>
                    
                    <Route path={'/subscribe'} location={location} key={getUniqueKey()} component={() => <App nofooter={true} fullscreen={true} ><Subscribe /></App>}/>

                    <Route path={'/categories'}  key={getUniqueKey()} component={() => <App nofooter={true}  fullscreen={true} ><Cats match={{ params: { slug: '/' }, url: "" }} /></App>}/>

                    <Route path={'/contact'}  key={getUniqueKey()} component={() => <App nofooter={true}  fullscreen={true} ><Contact /></App>}/>

                    <Route path={'/create'}  key={getUniqueKey()} component={() => <App nofooter={true}  fullscreen={true} ><Create /></App>}/>
                    
                    <Route path={'/'} exact  key={getUniqueKey()} component={() =>  <App nofooter={true}  fullscreen={true}  landingscreen={true} ><Landing /></App>}/>
                    
                    <PrivateRoute role={['user', 'admin', 'business']} path={'/dashboard'} location={location} key={getUniqueKey()} component={() => <App fullscreen={true} nofooter={true}><Dashboard /></App>} />
                    
                    <Route path={'*'}  key={getUniqueKey()} component={() => <App nofooter={true} fullscreen={true} ><NotFound/></App>}/>
                    </Switch>
                    <Cookies location={location} />
                   {/* </ReactCSSTransitionGroup> */}
            </MuiThemeProvider>
        )}/>
    </Router>,
    document.getElementById("root")
);


function NotFound() {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}><Typography variant="display2" color="secondary">404</Typography> <Typography component="p" variant="display1" >Page Not Found</Typography></div>
}

//registerServiceWorker();

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

