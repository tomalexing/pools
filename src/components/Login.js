import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import Menu, { MenuList, MenuItem } from '@material-ui/core/Menu';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from './../assets/quiz-logo.png';
import {NavLink} from './NavLink';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Modal from '@material-ui/core/Modal';

import {action, observable} from 'mobx';
import { observer } from 'mobx-react';

import Grow from '@material-ui/core/Grow';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { LightenDarkenColor } from "./../utils"; 
import Api from "./../services/Api";
import Auth from "./../models/Auth";
import Redirect from 'react-router-dom/Redirect';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import {saveAllToStoreMerge} from "./../services/localDb";
import withRouter from 'react-router-dom/withRouter';

// const isActive = (match, location,to) => {
//   return ['/quizzes','/polls'].some(str => location.pathname.includes(str))
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
        color: 'white',
        '&$disabled': {
            background: '#ff88b8',
            color: 'white',
            boxShadow: 'none',
            opacity: .8
        },
    },
    facebook:{
        height: '40px',
        width: '100%',
        margin: '9px 0',
        borderRadius: '74px',
        color: 'white',
        backgroundColor: '#5378d1',
        '&:focus, &:hover': {
            backgroundColor: LightenDarkenColor('#5378d1', -20)
        },
        '&$disabled': {
            background: '#5378d1',
            color: 'white',
            boxShadow: 'none',
            opacity: .8
        },

    },
    disabled: {},
    
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
    },

    agree: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const ITEM_HEIGHT = 48;


@withRouter
@withStyles(styles)
@observer
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.closeLoginModal = props.close
    this.open = props.open
    props.logout(this.logout.bind(this));
  }

  componentDidMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
      this.mounted = false;
  }

  @action.bound
  componentWillReceiveProps(nextProps){
    this.open = nextProps.open
  }

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

  @observable open = false;
  @observable ctx = { redirect: false, state: {} }

  loginWithGoogle = async (info) => {
    let _self = this;

    Api.auth().signInWithPopup(Api.GoogleAuthProvider()).then(function(result) {

        let {credential:{ accessToken }, user: { uid, photoURL } = {uid: '', photoURL: ''}, additionalUserInfo:{profile: { name: displayName, email } = { displayName:'', email: ''}} = {}} = result;
     
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
                Auth.logging = true;
                if(! _self.mounted) return
                    _self.ctx = {
                        redirect: true,
                        pathname: '/dashboard',
                        search: _self.props.location.search
                    }
                if(! _self.mounted) return
                    _self.forceUpdate();

                Api.loadUserData()
                .then( _ => {
                    Auth.stores.map(store => store.load()); 
                    Auth.stores.map(store => store.ditch());
                    Auth.logging = false;
                }, _ => {
                    Auth.logging = false;
                })

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


        let {credential:{ accessToken }, user: { uid, photoURL } = {uid: '', photoURL: ''}, additionalUserInfo:{profile: {  name: displayName, email } = { displayName:'', email: ''}} = {}} = result;
     

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
                if(! _self.mounted) return
                Auth.logging = true;
                _self.ctx = {
                    redirect: true,
                    pathname: '/dashboard',
                    search: _self.props.location.search
                }
                if(! _self.mounted) return
                    _self.forceUpdate();
                Api.loadUserData()
                .then( _ => {
                    Auth.stores.map(store => store.load());
                    Auth.stores.map(store => store.ditch());
                    Auth.logging = false;
                }, () => {
                    Auth.logging = false;
                })

            }
        });
    }).catch(function(error){
    
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

  @observable email = false;
  @observable terms = false


  checkbox = name => event => {
      this[name] = event.target.checked;
  }
    
  render() {
    const { classes } = this.props;


    let froms  = !!this.ctx.pathname 
                ? {pathname: this.ctx.pathname, state: this.ctx.state, search: this.ctx.search } 
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
                    <Button  variant="raised" color="secondary" className={classes.facebook } disabled={!(this.terms && this.email)} classes={{disabled:classes.disabled}} onClick={this.loginWithFb}>Facebook</Button>
                    <Button  variant="raised" color="secondary"  className={classes.google} disabled={!(this.terms && this.email)} classes={{disabled:classes.disabled}} onClick={this.loginWithGoogle}>Google</Button>
                    <div className={classes.agree}>
                    
                        <Checkbox
                        checked={this.terms}
                        value="terms"
                        onChange={this.checkbox('terms')}

                        />
                        <Typography variant="body1" className={classes.font12  + ' ' + classes.paddingTop1}>
                            I agree to Quizi’s <Link style={{color: '#FC3868', textDecoration: 'none'}} to={'/terms-of-use'} >Terms of Use</Link> and <Link style={{color: '#FC3868', textDecoration: 'none'}} to={'/privacy-policy'} >Privacy Policy</Link>
                        </Typography>

                    </div>
                    <div className={classes.agree}>
                    
                        <Checkbox
                        checked={this.email}
                        value="email"
                        onChange={this.checkbox('email')}

                        />
                        <Typography variant="body1" className={classes.font12  + ' ' + classes.paddingTop1}>
                            I agree to receive emails from Quizi
                        </Typography>

                    </div>
                    <div style={{height: '12px'}} />
                    <Button size="small" color="primary" className={classes.closeModal} onClick={this.closeLoginModal}>Close</Button>
                </div>
            </div>
            
        </Modal>

    );
  }

}

export default Login