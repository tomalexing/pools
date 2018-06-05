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

import Login from './Login';


const styles = theme => ({
    loginBtn: {
        backgroundColor: theme.palette.common.white,
        margin: 2 * theme.spacing.unit,
        marginRight: 0,
        borderRadius: 74,
        '@media (max-width: 600px)': {
            margin: theme.spacing.unit,
            marginRight: 0
        }
    },
    menuBtn:{
        color: 'white',
    },
    mobileMenu:{
        color: 'white',
        '@media (max-width: 600px)':{
            marginLeft: 'auto'
        },
    },
    startMenu: {
        display: 'flex',
        marginLeft: 'auto',
        marginTop: 0,
        marginBottom: 0,
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
        '@media (max-width: 600px)': {
            minHeight: 48,
        }
    },
    mainMenu:{
        maxHeight: ITEM_HEIGHT * 4.5,
        width: 200,
        top: '60px !important'
    },
});

const ITEM_HEIGHT = 48;


@withStyles(styles)
@observer
class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  @observable anchorEl: null;
  @observable makeLogout: null;

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
     <AppBar position="static" style={{zIndex: 1201}} color="primary">
        <Login open={this.open} logout={this.getLogOut} close={this.closeLoginModal}/>
        <Toolbar className={classes.header}>
            <a href="/">
                <img className={classes.logo} src={logo} />
            </a>
            {  /* Deskttop menu */
                window.innerWidth > 600 && 
                <ul className={[classes.ul, classes.startMenu].join(" ")}>
                    <NavLink tabIndex='1' to={'/'} className={classes.menuBtnSpacings} >
                        <MenuItem selected={false}>
                            <Typography variant="button" >
                                Explore
                            </Typography>
                        </MenuItem>
                    </NavLink>  
            </ul> }
            
            { window.innerWidth > 600 && 
                !Auth.isAuthenticated &&  <Button variant="raised" className={classes.loginBtn} onClick={this.openLoginModal}>
                        Sign Up
                </Button>
            }

            { window.innerWidth > 600 && 
                Auth.isAuthenticated && <div className={classes.mobileMenu}>
                <IconButton
                aria-label="More"
                aria-owns={this.anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                    >
                    <Icon className={classes.menuBtn}>more_horiz</Icon>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.anchorEl}
                    open={Boolean(this.anchorEl)}
                    onClose={this.handleClose}
                    classes={{paper: classes.mainMenu}}
                >
                <NavLink tabIndex='1' to={'/dashboard'} className={classes.menuBtnSpacings} >
                    <MenuItem selected={false} onClick={this.handleClose}>
                        <ListItemIcon className={classes.icon}>
                            <Icon className={classes.mainMenuIcon} >dashboard</Icon>
                        </ListItemIcon>
                        <Typography variant="body1" >
                            Dashboard
                        </Typography>
                    </MenuItem>
                </NavLink>
                <NavLink tabIndex='1' to={'/dashboard/account'} className={classes.menuBtnSpacings} >
                    <MenuItem selected={false} onClick={this.handleClose}>
                        <ListItemIcon className={classes.icon}>
                            <Icon className={classes.mainMenuIcon} >account_box</Icon>
                        </ListItemIcon>
                        <Typography variant="body1" >
                            Account
                        </Typography>
                    </MenuItem>
                </NavLink> 
                <MenuItem selected={false} onClick={this.logout}>
                    <ListItemIcon className={classes.icon}>
                        <Icon className={classes.mainMenuIcon} >power_settings_new</Icon>
                    </ListItemIcon>
                    <Typography variant="body1" >
                        Logout
                    </Typography>
                </MenuItem>
                </Menu>
            </div>} 


            {/* Mobile menu */}
            { window.innerWidth <= 600 && 
            <div className={classes.mobileMenu}>
                <IconButton
                aria-label="More"
                aria-owns={this.anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                >
                    <Icon  className={classes.menuBtn}>more_horiz</Icon>
                </IconButton>
                <Menu
                id="long-menu"
                anchorEl={this.anchorEl}
                open={Boolean(this.anchorEl)}
                onClose={this.handleClose}
                PaperProps={{
                    style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                    },
                }}
                >
                <NavLink tabIndex='1' to={'/'} className={classes.menuBtnSpacings} >
                    <MenuItem selected={false} onClick={this.handleClose}>
                        <Typography variant="body1" >
                            Explore
                        </Typography>
                    </MenuItem>
                </NavLink>  
                 
                {!Auth.isAuthenticated && <MenuItem selected={false} onClick={this.openLoginModal}>
                        Sign Up
                </MenuItem>}
                {Auth.isAuthenticated && <NavLink tabIndex='1' to={'/dashboard'} className={classes.menuBtnSpacings} >
                    <MenuItem selected={false}  onClick={this.handleClose}>
                        <Typography variant="body1" >
                            Dashboard
                        </Typography>
                        </MenuItem>
                    </NavLink>  
                }
                {Auth.isAuthenticated && <NavLink tabIndex='1' to={'/dashboard/account'} className={classes.menuBtnSpacings} >
                    <MenuItem selected={false}  onClick={this.handleClose}>
                        <Typography variant="body1" >
                        Account
                        </Typography>
                        </MenuItem>
                </NavLink>  
                }
                {Auth.isAuthenticated && <MenuItem selected={false} onClick={this.logout}>
                        Logout
                </MenuItem>}
                </Menu>
            </div>}

        </Toolbar>
      </AppBar>
    );
  }

}

export default Header