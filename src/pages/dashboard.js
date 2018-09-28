import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';
import cx from 'classnames';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { listener, getMonthName, roundeWithDec, loadScript } from './../utils';

import {Switch, Route, Redirect, Link, withRouter} from 'react-router-dom';
import {NavLink} from './../components/NavLink';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Auth from './../models/Auth';
import Api from './../services/Api';
import { Hidden } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import classNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import {loadFromStore , saveToStore, clearAll} from "./../services/localDb";

import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardsModel from './../models/Cards'

import Share from './../components/Share';
import SModal from './../components/Modal';

import Checkbox from '@material-ui/core/Checkbox';


import BTC from './../assets/BTC.svg';
import IMP from './../assets/IMP.png';

import info from './../assets/info.svg';

import Explore  from './Explore.js';

import * as User from './dashboard.user.js'
import * as Business from './dashboard.business.js'

const RoutePassProps = ({ component: Component, redirect, ...rest }) =>
  (!redirect
    ? <Route {...rest} render={props => <Component {...props} {...rest} />} />
    : <Redirect to={`${redirect}`} />);
    
    
const PrivateRoute =  ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
          Auth.isAuthenticated && rest.role.includes(Auth.role) ? (
             <Component currentRole={Auth.role} {...rest}/>
          ) : (
               <div/>
            )
        )} />)

const drawerWidth = 200;

const styles = theme => ({

    cardWrapper:{
        display: 'flex',
        margin: 'auto',
        height: '100%',
        // position: 'relative',
        width: '100%'
    },
    aside:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRight: '1px solid #6b7183',
    },
    icon:{
        color: 'white'
    },
    link: {
        textDecoration: 'none'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: '20px',
        padding: '0 20px',
    },

    footerText:{
        color: '#f2f2f2',
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },

    footerImageCover:{
        position: 'relative',
        marginBottom: 10,
        overflow: 'hidden'
    },

    footerImage:{
        width: 36,
        position: 'absolute',
    },


    footerTitle:{
        margin: '-2px 0 0 50px',
    },

    footerDesc:{
        margin: '0px 0 0 50px',
        fontWeight: 600
    },

    footerAltColor: {
        color: '#a7adc4',
        fontWeight: 300
    },

    menuBtnSpacings:{
        padding: '3px 0px',
        textAlign: 'left'
    },
    
    mainArea: {
        padding: 40,
        overflowY: 'auto',
        overflowX: 'hidden',
        flexGrow: 1,
        '@media (max-width: 600px)':{
            overflowX: 'auto',
            padding: 20,
        }
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: '#474E65',
        height: 'calc(100vh - 64px)',
        zIndex: 1,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '56px',
    },
    mainMenuIcon: {
        color: 'white'
    }

})

@withStyles(styles)
@withRouter
@observer
class Dashboard extends React.Component {


    state= {
        open: window.innerWidth > 600,
        analytics: false
    }

    componentDidMount(){
        this.mounted = true;
        let that = this;

        loadFromStore('meta').then(meta => {
            if(that.mounted)
                that.setState({open: meta.userOpenMenu});
        }, _ => {})

        when(() => ['business', 'admin'].includes(Auth.role) , _ => {
            if(that.mounted)
                that.setState({analytics: true});
        })

    }

    componentWillUnmount(){
        this.mounted = false;
    }

      
    toogle = () => {
        this.setState({ open: !this.state.open }, _ =>   
            loadFromStore('meta').then( meta => { 
                        saveToStore('meta', Object.assign(meta, {userOpenMenu: this.state.open}))
                    }).then(Api.saveUserData)
                )
    };

    render() {
        
        let {classes} = this.props;

        let {analytics} = this.state;

        return (
            <div className={classes.cardWrapper}>
            <aside className={classes.daside}>
            <Drawer
                variant="permanent"
                classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
                className={classes.aside}
            >
                <MenuList>
                    <NavLink tabIndex='1' to={'/dashboard'} className={classes.link} >
                        <MenuItem selected={/^\/dashboard$/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon  className={classes.mainMenuIcon} >dashboard</Icon>
                            </ListItemIcon>
                            <Typography variant="display1" >
                                Dashboard
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <NavLink tabIndex='1' to={'/dashboard/profile'} className={classes.link} >
                        <MenuItem selected={/dashboard\/profile/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon  className={classes.mainMenuIcon} >account_box</Icon>
                            </ListItemIcon>
                            <Typography variant="display1" >
                                Profile
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <NavLink tabIndex='1' to={'/dashboard/history'} className={classes.link} >
                        <MenuItem selected={/dashboard\/history/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon className={classes.mainMenuIcon} >access_time</Icon>
                            </ListItemIcon>
                            <Typography variant="display1" >
                                History
                            </Typography>
                            
                        </MenuItem>
                    </NavLink>
                    { analytics &&
                        <NavLink tabIndex='1' to={'/dashboard/analytics'} className={classes.link} >
                            <MenuItem selected={/dashboard\/analytics/.test(this.props.location.pathname)} onClick={this.handleClose}>
                                <ListItemIcon className={classes.icon}>
                                    <Icon className={classes.mainMenuIcon} >trending_up</Icon>
                                </ListItemIcon>
                                <Typography variant="display1" >
                                    Analytics
                                </Typography>
                                
                            </MenuItem>
                        </NavLink>}
                </MenuList>
                <div className={classes.footer}>

                <IconButton onClick={this.toogle}>
                    { !this.state.open ? <Icon className={classes.mainMenuIcon} >chevron_right</Icon> : <Icon   className={classes.mainMenuIcon} >chevron_left</Icon>}
                </IconButton>
                

                {this.state.open && <Typography component="div"  variant="body1"  className={classes.footerText + ' ' + classes.footerImageCover}> 
                    <img className={classes.footerImage} src={IMP} /> 
                    <Typography ref='copyright' variant="body1" className={classes.footerTitle + ' ' + classes.footerText} > <span className={classes.footerAltColor}> IMP/BTC</span></Typography>
                    <p className={classes.footerDesc} >0.838 <span className={classes.footerAltColor}>USD</span></p>
                </Typography>}
                
                {this.state.open && <Typography ref='copyright' variant="body1" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                    Copyright © 2018 Quizi.
                </Typography>}
                {this.state.open && <Typography ref='copyright' variant="body1" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                    All Rights Reserved.
                </Typography>}
                
                </div>

                </Drawer>
            </aside>
            
            <div className={classes.mainArea}>
                <PrivateRoute role={['user']} exact path="/dashboard" component={User.Common} /> 
                <PrivateRoute role={['user']} exact path="/dashboard/profile" component={User.Profile} /> 
                <PrivateRoute role={['user']} exact path="/dashboard/history" component={User.History} />

                <PrivateRoute role={['business']} exact path="/dashboard" component={Business.Analytics} /> 
                <PrivateRoute role={['business']} exact path="/dashboard/profile" component={Business.Profile} /> 
            </div>
            </div>
        )
    }
}


export default Dashboard;
