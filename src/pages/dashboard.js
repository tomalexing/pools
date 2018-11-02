import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';

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



import BTC from './../assets/BTC.svg';
import IMP from './../assets/IMP.png';

import info from './../assets/info.svg';


import * as User from './dashboard.user.js'
import * as Business from './dashboard.business.js'
import * as Admin from './dashboard.admin.js'

const RoutePassProps = ({ component: Component, redirect, ...rest }) =>
  (!redirect
    ? <Route {...rest} render={props => <Component {...props} {...rest} />} />
    : <Redirect to={`${redirect}`} />);
    
    
const PrivateRoute =  ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
          Auth.isAuthenticated && rest.role.includes(Auth.role) ? (
             <Component currentRole={Auth.role} {...rest} {...props}/>
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
        height: 'calc(100vh - 64px)',
        backgroundColor: "#474E65",
        zIndex: 1,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },

    dartBackground:{
        backgroundColor: "#474E65"
    },

    bussBackground: {
        backgroundColor: "#353B4D"
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
    },

    menuBtn:{
        width: 48,
        height: 48
    },

})

@withStyles(styles)
@withRouter
@observer
class Dashboard extends React.Component {


    state= {
        open: window.innerWidth > 600,
        business: false,
        admin: false,
        price: '---'
    }

    componentDidMount(){
        this.mounted = true;
        let that = this;

        loadFromStore('meta').then(meta => {
            if(that.mounted)
                that.setState({open: meta.userOpenMenu});
        }, _ => {})

        when(() => ['business'].includes(Auth.role) , _ => {
            if(that.mounted)
                that.setState({business: true});
        })

        when(() => ['admin'].includes(Auth.role) , _ => {
            if(that.mounted)
                that.setState({admin: true});
        })

        this.loadCBPrice();

    }   

    loadCBPrice = async _ => {
        try {
          let {last} = await Api.loadCBTicker('IMPL_BTC');
          this.setState({'price': last})
        } catch (error) {
        }
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

        let {business, admin, price} = this.state;

        return (
            <div className={classes.cardWrapper}>
            <aside className={classes.daside}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: cn({
                        [classes.drawerPaper]           : true, 
                        [classes.drawerPaperClose]      : !this.state.open,
                        [classes.dartBackground]        :   Auth.role == 'user', 
                        [classes.bussBackground]        :   Auth.role == 'business' || Auth.role == 'admin', 
                    })
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
                            <Typography variant="h4" >
                                Dashboard
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    { !admin && <NavLink tabIndex='1' to={'/dashboard/profile'} className={classes.link} >
                        <MenuItem selected={/dashboard\/profile/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon  className={classes.mainMenuIcon} >account_box</Icon>
                            </ListItemIcon>
                            <Typography variant="h4" >
                                Profile
                            </Typography>
                        </MenuItem>
                    </NavLink>}
                    { !admin && <NavLink tabIndex='1' to={'/dashboard/history'} className={classes.link} >
                        <MenuItem selected={/dashboard\/history/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon className={classes.mainMenuIcon} >access_time</Icon>
                            </ListItemIcon>
                            <Typography variant="h4" >
                                History
                            </Typography>
                            
                        </MenuItem>
                    </NavLink>}
                    { admin &&
                        <NavLink tabIndex='1' to={'/dashboard/requests'} className={classes.link} >
                            <MenuItem selected={/dashboard\/requests/.test(this.props.location.pathname)} onClick={this.handleClose}>
                                <ListItemIcon className={classes.icon}>
                                    <Icon className={classes.mainMenuIcon} >trending_up</Icon>
                                </ListItemIcon>
                                <Typography variant="h4" >
                                    Requests
                                </Typography>
                                
                            </MenuItem>
                        </NavLink>}
                </MenuList>
                <div className={classes.footer}>

                <IconButton className={classes.menuBtn} onClick={this.toogle}>
                    { !this.state.open ? <Icon className={classes.mainMenuIcon} >chevron_right</Icon> : <Icon   className={classes.mainMenuIcon} >chevron_left</Icon>}
                </IconButton>
                

                {this.state.open && <Typography component="div"  variant="body2"  className={classes.footerText + ' ' + classes.footerImageCover}> 
                    <a target="_blank" href="https://impleum.com"> <img className={classes.footerImage} src={IMP} /> </a> 
                    <Typography ref='copyright' variant="body2" className={classes.footerTitle + ' ' + classes.footerText} > <span className={classes.footerAltColor}> {Api.getCoinName()}/BTC</span></Typography>
                    <p className={classes.footerDesc} > {price} <span className={classes.footerAltColor}>BTC</span></p>
                </Typography>}
                
                {this.state.open && <Typography ref='copyright' variant="body2" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                    Copyright © 2018 Quizi.
                </Typography>}
                {this.state.open && <Typography ref='copyright' variant="body2" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                    All Rights Reserved.
                </Typography>}
                
                </div>

                </Drawer>
            </aside>
            
            <div className={classes.mainArea}>
                <PrivateRoute role={['user']} exact path="/dashboard" component={User.Common} /> 
                <PrivateRoute role={['user']} exact path="/dashboard/profile" component={User.Profile} /> 
                <PrivateRoute role={['user']} exact path="/dashboard/history" component={User.History} />


                <PrivateRoute role={['business']} exact path="/dashboard" component={Business.Dashboard} /> 
                <PrivateRoute role={['business']} exact path="/dashboard/profile" component={Business.Profile} /> 
                <PrivateRoute role={['business']} exact path="/dashboard/history" component={Business.History} />
                <PrivateRoute role={['business']} exact path="/dashboard/analytics/:slug/:id" component={Business.Analytics} />


                <PrivateRoute role={['admin']} exact path="/dashboard" component={Admin.Analytics} /> 
                <PrivateRoute role={['admin']} exact path="/dashboard/requests" component={Admin.Requests} /> 
                <PrivateRoute role={['admin']} exact path="/dashboard/analytics/:slug/:id" component={Admin.AnalyticsClick} />

            </div>

            </div>
        )
    }
}


export default Dashboard;
