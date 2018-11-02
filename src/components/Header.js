import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import logo from './../assets/quiz-logo.png';
// import logo2x from './../assets/quiz-logo2x.png';

import logo from './../assets/quizi-beta.png';
import logo2x from './../assets/quizi-beta2x.png';

import { NavLink } from './NavLink';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Modal from '@material-ui/core/Modal';

import {action, observable} from 'mobx';
import { observer } from 'mobx-react';

import Grow from '@material-ui/core/Grow';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Auth from "./../models/Auth";

import Login from './Login';

const isActive = (match, location, to) => {
    return ['/account','/history', '/dashboard'].some(str => location.pathname.includes(str) )
}

const styles = theme => ({
    loginBtn: {
        backgroundColor: theme.palette.common.white,
        margin: 2 * theme.spacing.unit,
        marginRight: 0,
        borderRadius: 74,
        color: '#fc3868',
        '@media (max-width: 600px)': {
            margin: theme.spacing.unit,
            marginRight: 0
        }
    },
    menuBtn:{
        width: 48,
        height: 48
    },

    menuBtnIcon:{
        color: 'white'
    },

    startMenu: {
        marginLeft: 'auto',
    },

    mobileMenu: {
        color: 'white',
        '@media (max-width: 600px)':{
            marginLeft: 'auto'
        },
    },

    menu: {
        display: 'flex',
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        '& .navmenu': {
            position: 'relative',
            listStyle: 'none',
            margin: `0 ${theme.spacing.unit}px`,
            '@media (max-width: 600px)': {
                margin: theme.spacing.unit,
            }
        },
        '& .navmenu.active': {
            pointerEvents: 'none'
        },
        '& .navmenu.active:hover:after': {
            opacity: .5
        },
        '& .navmenu.active:after': {
            content: '\"\"',
            position: 'absolute',
            bottom: -7,
            left: 0,
            listStyle: 'none',
            height: 2,
            width: '100%',
            backgroundColor: 'white',
            transition: 'opacity .3s ease-in-out'
        },
    },

    menuBtnSpacings: {
        display: 'block',
        textDecoration: 'none',
        transition: theme.transitions.create('opacity'),
        '&:hover':{
            opacity: .7
        },

        '& > li': {
            '@media (max-width: 600px)':{
                padding: 0
            }
        }
    },

    menuMobileLinkSpacings: {
        display: 'block',
        textDecoration: 'none',
        transition: theme.transitions.create('opacity'),
        '&:hover':{
            opacity: .7
        },
    },

    menuMobileItemSpacings: {
        borderBottom: '1px solid rgba(188, 194, 217, .4)',
        paddingLeft: 30,
        paddingRight: 30,
        '& > *':{
            fontWeight: '500'
        }
    },

    removeBorder:{
        borderBottom: 'none'
    },

    menuMobileBtnSpacings: {
        display: 'block',
        textDecoration: 'none',
        padding: '12px 30px',
        transition: theme.transitions.create('opacity'),
        '&:hover':{
            opacity: .7
        },
    },

    logo: {
        marginTop: 3,
        marginRight: 20,
        width: 'auto',
        height: 38,
        '@media (max-width: 600px)': {
            width: 'auto',
            height: '30px'
        }
    },
    header: {
        zIndex: 1202,
        fontFamily: "'Montserrat', 'Open Sans', sans-sarif",
        '@media (max-width: 600px)': {
            minHeight: 48,
        }
    },
    mainMenu:{
        width: 200,
        top: '60px !important',
        borderRadius: 8,
        '@media (max-width: 600px)':{
            top: '48px !important',
        }
    },

    headerBarCover: {
        height: '64px',
        '@media (max-width: 600px)': {
            height: 48,
        }
    },

    headerBarCoverZeroHeight: {
        height: '0',
    },

    headerBar: {
        position: 'fixed',
        width: '100%',
        width: '100vw',
        top: 0,
        left: 0
    },

    landing: {
        background: 'linear-gradient(to right, #d3129e 0%, #ed116f 100%)',
        '& > *': {
            width: '1140px',
            maxWidth: '100%',
            margin: '0 auto'
        }
    }
});

const ITEM_HEIGHT = 48;


@withStyles(styles)
@observer
class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  @observable anchorEl = null;
  @observable makeLogout = null;

  handleClick = event => {
    this.anchorEl = event.currentTarget
  };

  handleClose = () => {
    this.anchorEl = null
  };



  logout = () => {}
  getLogOut = f => this.logout = f; 

  @observable open = false
  @action.bound
  openLoginModal = () => {
      this.open = true;
  };

  @action.bound
  closeLoginModal = () => {
      this.open = false;
  };
    
  render() {
    const { classes } = this.props;

    return (
    <div id="header" className={cx(classes.headerBarCover, { [ classes.headerBarCoverZeroHeight ]: this.props.isLanding} )} >
     <AppBar className={cx(classes.headerBar, { [ classes.landing ]: this.props.isLanding})}  color="primary">
        <Login open={this.open} logout={this.getLogOut} close={this.closeLoginModal}/>
        <Toolbar  className={classes.header}>
            <a href="/">
                <img className={classes.logo} srcSet={`${logo2x} 2x, ${logo} 1x`} src={logo} />
            </a>
            {  /* Desktop menu */ }

            <div className={classes.mobileMenu + ' ' + classes.menu + ' ' + classes.startMenu}>
                <IconButton
                aria-label="More"
                aria-owns={this.anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.menuBtn}>
                <Icon className={classes.menuBtnIcon}>more_horiz</Icon>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.anchorEl}
                    open={Boolean(this.anchorEl)}
                    onClose={this.handleClose}
                    placement="bottom"
                    classes={{paper: classes.mainMenu}}
                    PaperProps={{
                        style: {width: 200},
                    }}
                >
                    <NavLink tabIndex='1' to={'/term-of-use'} className={classes.menuMobileLinkSpacings} >
                        <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={this.handleClose}>
                            <Typography variant="subtitle1" >
                                Terms of Use
                            </Typography>
                            </MenuItem>
                    </NavLink>  

                    <NavLink tabIndex='1' to={'/privacy-policy'} className={classes.menuMobileLinkSpacings} >
                        <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={this.handleClose}>
                            <Typography variant="subtitle1" >
                                Privacy Policy
                            </Typography>
                            </MenuItem>
                    </NavLink>  

                    <NavLink tabIndex='1' to={'/subscribe'} className={classes.menuMobileLinkSpacings} >
                        <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={this.handleClose}>
                            <Typography variant="subtitle1" >
                                Subscribe
                            </Typography>
                            </MenuItem>
                    </NavLink>

                    <NavLink tabIndex='1' to={'/create'} className={classes.menuMobileLinkSpacings} >
                        <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={this.handleClose}>
                            <Typography variant="subtitle1" >
                                Create Quiz or Poll
                            </Typography>
                        </MenuItem>
                    </NavLink>

                    <NavLink tabIndex='1' to={'/contact'} className={classes.menuMobileLinkSpacings} >
                        <MenuItem selected={false} className={cx(classes.menuMobileItemSpacings, { [classes.removeBorder]: !Auth.isAuthenticated})} onClick={this.handleClose}>
                            <Typography variant="subtitle1" >
                                Contact us
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    
                    {Auth.isAuthenticated && <MenuItem selected={false} className={classes.menuMobileBtnSpacings}  onClick={this.logout}>
                        <Typography variant="subtitle1" >
                            Logout
                        </Typography> 
                    </MenuItem>}
                </Menu>
            </div>

            
            <ul className={classes.menu}>
                    <NavLink tabIndex='1' to={'/categories'} className={classes.menuBtnSpacings} >
                        <MenuItem selected={false}>
                            <Typography variant="button" >
                                Explore
                            </Typography>
                        </MenuItem>
                    </NavLink>

                    { Auth.isAuthenticated && <NavLink tabIndex='1' comp={isActive} to={'/dashboard'} className={classes.menuBtnSpacings} >
                        <MenuItem selected={false} onClick={this.handleClose}>
                            <Typography variant="button" >
                                Dashboard
                            </Typography>
                        </MenuItem>
                    </NavLink>}
            </ul> 

            { !Auth.isAuthenticated &&  <Button variant="raised" className={classes.loginBtn} onClick={this.openLoginModal}>
                        Sign Up
                </Button> }

        </Toolbar>
      </AppBar>
      </div>
    );
  }

}

export default Header