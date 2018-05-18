import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import cx from 'classnames';
import Menu, { MenuList, MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import logo from './../assets/quiz-logo.png';
import {NavLink} from './NavLink';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import Modal from 'material-ui/Modal';

import {action, observable} from 'mobx';
import { observer } from 'mobx-react';

import Grow from 'material-ui/transitions/Grow';
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import { LightenDarkenColor } from "./../utils"; 
import Api from "./../services/Api";
import Auth from "./../models/Auth";
import Redirect from 'react-router-dom/Redirect';

// const isActive = (match, location,to) => {
//   return ['/quizzes','/pools'].some(str => location.pathname.includes(str))
// }

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '270px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        '& #login-modal-title': {
            margin: `${-1 * theme.spacing.unit * 4}px ${-1 * theme.spacing.unit * 4}px 0 ${-1 * theme.spacing.unit * 4}px`,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #login-modal-description': {
            minHeight: 50,
            margin: `${theme.spacing.unit}px 0`,
        }
    },
    closeModal:{
        float: 'right',
        marginBottom: `${-1 * theme.spacing.unit }px`,
        borderRadius: 15
    },
    google:{
        height: '40px',
        width: '100%',
        margin: '9px 0',
        borderRadius: '74px',
    },
    facebook:{
        height: '40px',
        width: '100%',
        margin: '9px 0',
        borderRadius: '74px',
        backgroundColor: '#5378d1',
        '&:focus, &:hover': {
            backgroundColor: LightenDarkenColor('#5378d1', -20)
        }
    },
    mainMenu:{
        maxHeight: ITEM_HEIGHT * 4.5,
        width: 200,
        top: '60px !important'
    },
    mainMenuIcon:{

    },
    font12:{
        fontSize: 12
    },
    font14:{
        fontSize: 14
    },
    paddingTop1: {
        paddingTop: theme.spacing.unit * 1
    },
    paddingTop2: {
        paddingTop: theme.spacing.unit * 2
    },
    paddingTop3: {
        paddingTop: theme.spacing.unit * 3
    },
    paddingTop4: {
        paddingTop: theme.spacing.unit * 4
    },
    paddingBottom1: {
        paddingBottom: theme.spacing.unit * 1
    },
    paddingBottom2: {
        paddingBottom: theme.spacing.unit * 2
    },
    paddingBottom3: {
        paddingBottom: theme.spacing.unit * 3
    },
    paddingBottom4: {
        paddingBottom: theme.spacing.unit * 4
    }
});

const ITEM_HEIGHT = 48;


@withStyles(styles)
@observer
class Login extends React.Component {

  constructor(props) {
    super(props)
    props.close(this.logout.bind(this));
  }

  @action.bound
  componentWillReceiveProps(nextProps){
    this.open = nextProps.open
  }

  @observable anchorEl: null;

  handleClick = event => {
    this.anchorEl = event.currentTarget
  };

  handleClose = () => {
    this.anchorEl = null
  };

  logout = () => {
    let that = this;
    this.anchorEl = null;
    Auth.signout().then(_ => {
        if(window.location.pathname === '/') return
        that.ctx.pathname = '/';
        that.ctx.redirect = true;
        //Auth.stores.map(store => store.clear()); 
    })
  }

  @observable open = false
  @action.bound
  openLoginModal = () => {
      this.open = true;
  };

  @action.bound
  closeLoginModal = () => {
      this.open = false;
  };

  @observable ctx = { redirect: false, state: {} }

  @action.bound
  loginWithGoogle = async (info) => {
    let _self = this;

    Api.auth().signInWithPopup(Api.GoogleAuthProvider()).then(function(result) {

        let {credential:{ accessToken }, user: { photoURL, displayName, email, uid } = {photoURL: '', displayName:'', email: '', uid: ''}} = result;
        Auth.authorize({
          accessToken,
          photoURL,
          displayName,
          email,
          uid
        },
        (resolve) => {
            let user = Api.auth().currentUser;
            let ctx = {};
            if(user){

                

              Api.loadUserData(user.uid).then( _ => {
                Auth.stores.map(store => store.load()); 
                Auth.stores.map(store => store.ditch()); 
                _self.ctx = {
                    redirect: true,
                    pathname: '/dashboard'
                  }
              });

            }
        });
        
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  loginWithFb = async (info) => { 

    let _self = this;

    Api.auth().signInWithPopup(Api.FacebookAuthProvider()).then(function(result) {
        let {credential:{ accessToken }, user: { photoURL, displayName, email, uid } = {photoURL: '', displayName:'', email: '', uid: ''}} = result;

        Auth.authorize({
          accessToken,
          photoURL,
          displayName,
          email,
          uid
        },
        (resolve) => {
            let user = Api.auth().currentUser;
            let ctx = {};
            if(user){
                Api.loadUserData(user.uid).then( _ => {
                    Auth.stores.map(store => store.load()); 
                    Auth.stores.map(store => store.ditch()); 
                    _self.ctx = {
                        redirect: true,
                        pathname: '/dashboard'
                      }
                  });

            }
        });
        
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  
  static propTypes = {
      classes: PropTypes.object.isRequired,
  }



  getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
    
  render() {
    const { classes } = this.props;


    let froms  = !!this.ctx.pathname 
                ? {pathname: this.ctx.pathname, state: this.ctx.state } 
                : {pathname: '/dashboard'} ;

    if(this.ctx.redirect){
        return  <Redirect to={froms} />
    } 

    return (
        <Modal
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            open={this.open}
            onClose={this.closeLoginModal}
            >
           
            <div style={this.getModalStyle()} className={classes.paper + ' ' + classes.paddingBottom3}>
                <Typography variant="display1" id="login-modal-title">
                    Login/registration
                </Typography>
                <div id="login-modal-description"> 
                    <Typography variant="body1" className={classes.font14 + ' ' + classes.paddingTop1 + ' ' +  classes.paddingBottom1 } >
                        You can login / register with Quizion via social networks
                    </Typography>
                    <Button  variant="raised" color="secondary" className={classes.facebook } onClick={this.loginWithFb}>Facebook</Button>
                    <Button  variant="raised" color="secondary"  className={classes.google} onClick={this.loginWithGoogle}>Google</Button>
                    <Typography variant="body1" className={classes.font12  + ' ' + classes.paddingTop1}>
                    By using our website and/or services, you agree to our Terms of Service and Privacy Policy.
                    </Typography>
                    <div style={{height: '12px'}} />
                    <Button size="small" color="primary" className={classes.closeModal} onClick={this.closeLoginModal}>Close</Button>
                </div>
            </div>
            
        </Modal>

    );
  }

}

export default Login