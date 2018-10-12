import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { listener, getMonthName, roundeWithDec, loadScript, copy } from './../utils';

import {Route, Redirect, Link, withRouter} from 'react-router-dom';
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

import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import {loadFromStore , saveToStore, clearAll} from "./../services/localDb";


import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardsModel from './../models/Cards'

import Share from './../components/Share';
import SModal from './../components/Modal';

import Checkbox from '@material-ui/core/Checkbox';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeObject from './../theme.js';

import BTC from './../assets/BTC.svg';
import IMP from './../assets/IMP.svg';

import info from './../assets/info.svg';

import Explore  from './Explore.js';

const RoutePassProps = ({ component: Component, redirect, ...rest }) =>
  (!redirect
    ? <Route {...rest} render={props => <Component {...props} {...rest} />} />
    : <Redirect to={`${redirect}`} />);
    
    
const PrivateRoute =  ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
          Auth.isAuthenticated && rest.role.includes(Auth.role) ? (
             <Component currentRole={Auth.role} {...rest}/>
          ) : (
               <div>Private Route. You should be logged in!!!</div>
            )
        )} />)


const stylesProfile = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap'
    },
    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '690px',
        height: '100%',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
        '@media (max-width: 600px)':{
            marginRight: 0,
            minWidth: 690
        }
    },
    header:{
        color: 'white',
        background: '#FC3868',
        fontWeight: 100,
        display: 'flex',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        '& $delimeter': {
            background: 'rgba(0, 0, 0, 0.1)',
            height: '100%',
            width: 1,
            marginLeft: 'auto'
        },
        '& $impNum':{
            padding: '0 10px'
        }
    },
    delimeter:{},
    impNum:{},

    cardBodyResult: {
        padding: '23px 30px',
        backgroundColor: '#474E65',
        overflow: 'hidden'
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    responseRow:{
        '@media (max-width: 600px)':{
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1 0 66%'
        }
    },
    col:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 200,
        height: 33,
    },
    btnResult: {
        marginTop: 30,
        borderRadius: 74
    },
    title: {
        padding: '0 30px',
    },
    column:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerResult: {
        paddingBottom: '1rem'
    },
    noWrap:{
        whiteSpace: 'nowrap',
        textAlign: 'center'
    },

    account:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 22
    },

    accountPic:{
        width: 80,
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
            width: '100%',
            height: 'auto',
        }
    },
    accountDetails:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20, 
    },
    accountName:{
        fontSize: 16,
        fontWeight: 600
    },

    accountEmail:{
        fontSize: 14,
        fontWeight: 400
    },
 

    divider: {
        backgroundColor: "#bbc2d8"
    },

    headerField:{
        margin: '20px 0 12px',
        fontSize: 16,
    },

    bold:{
        fontWeight: 600,
    },

    formInput:{
        width: '100%',
        color: '#ECEDF3',
        '&:after, &:before': {
            content: 'none'
        },
    },

    formField:{
        color: '#ECEDF3',
        display: 'block',
        width: 480,
        '&:after, &:before': {
            content: 'none'
        },

    },

    submitBtn:{
        float: 'right',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },

    editBtn:{
        float: 'right',
        borderRadius: 74,
    },

    editBtnTypo:{
        fontSize: 14,
        fontWeight: 700
    },

    short:{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'inlineBlock',
        width: '100%'
    },
    
    delBtn:{
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },

    captcha:{
        display: 'flex',
        '& > *':{
            margin: 'auto'
        }
    },

    getIMP: {
        display: 'flex',
        textDecoration: 'none',
        marginTop: '34px',
    },

    getIMPmark: {
        width: 21,
        marginRight: '10px',
    },

    getIMPtext: {
        fontSize: '13px'

    },

    disabled:{
        color: '#ECEDF3'
    }


})

const themeProfile = createMuiTheme( Object.assign(themeObject, {
    typography: {
        ...themeObject.typography,
        display4: {
             ...themeObject.typography.display4,
            fontSize: '14px',
        },
        body1: {
             ...themeObject.typography.body1,
            fontSize: '14px',
        },
        display1:{
             ...themeObject.typography.display1,
            fontSize: '14px',
        }
    },
    palette:{
         ...themeObject.palette,
        text: {
            disabled: '#ECEDF3'    
        }
    }
}));

// Profile
@withStyles(stylesProfile)
@observer
export class Profile extends React.Component{

    constructor(props){
        super(props);
        this.user = null;
        this.walletRef = React.createRef();


        (async _ => {
            await this.getUser()
            this.getAnalytics();
            this.getWallet();
        }).bind(this)();


    }

    @observable analitics = {};
    @observable loaded = false;
    @observable wallet = '';

    @action.bound
    getUser = async _ => {
        this.user = await new Promise(r => Api.auth().onAuthStateChanged(r)).catch(function(error) {
            console.trace(error.stack);
            console.log('User token is outdated. Relogin is required.')
        });
    }

    @action.bound
    getWallet = async _ => {

        let idToken = await this.user.getIdToken();

        let body = {
            uid: Auth.uid,
            token: idToken
        };
        let that = this;  

        Api.getWallet().then(wallet => {
            
            if(!wallet)
                Api.ourApi('createwallet', body).then(wallet => {
               
                    that.wallet = wallet
                });

            that.wallet = wallet
        })
    }



    @action.bound
    getAnalytics = async _ => {
    
        let that = this;
        if (this.user) {

            let idToken = await this.user.getIdToken();
            let fetchBody = {token: idToken, uid: Auth.uid};

            that.balanceIncome = await Api.ourApi('getbalance', fetchBody);
            
            let analitics = await Api.ourApi('getAnalytics', fetchBody);

            that.analitics = analitics;
            this.loaded = true;
        }else{
            await this.getUser();
            this.getAnalytics();
        }
      
    }


    @computed
    get balance(){
        return this.balanceIncome - this.paid;
    }

    @computed
    get paid(){
        return Object.entries(this.analitics).reduce((allpayoutsIMP ,[path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount}]) => {
            return allpayoutsIMP + payoutsIMP + sharedReward * sharedPaidCount
        }, 0)
    }

    @computed
    get blocked(){
        return Object.entries(this.analitics).reduce((allblocked ,[path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount, blockedIMP}]) => {
            return allblocked + blockedIMP
        }, 0)   
    }

    @computed
    get available(){
        let available = this.balance - this.blocked;
        Object.values(this.analitics).map(({entry_path, entry_id}) => {
           Api.setValueInCatalog('blockedEntity', available < 0, entry_path, entry_id);
        });
        return available;
    }

    getBalanceInfo(){

        let {classes} = this.props;
        
        return (
            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <div className={classes.row}>
                        <div style={{ alignItems: 'flex-start', width: '200px'}} className={classes.col}>
                            <Typography  align="left" variant="display1" className={classes.bold}>
                                Balance
                            </Typography>
                        </div>
                    </div>
                </div>

                {this.loaded && 
                <div className={classes.cardBodyResult}>
                    <div className={classes.analitics}>
                        <div className={classes.row} >

                            <div style={{ alignItems: 'flex-start', width: '100px'}} className={classes.col}>
                                <Typography  align="left" variant="display4" >
                                    Available:
                                </Typography>
                            </div>
                            <div style={{ alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="display4" className={classes.bold} >
                                    {roundeWithDec(this.available)} {Api.getCoinName()}      
                                </Typography>
                            </div>
            
                        </div>  

                        <div className={classes.row} >
                           
                            <div style={{ alignItems: 'flex-start', width: '100px'}} className={classes.col}>
                                <Typography variant="display4" >
                                    Blocked:
                                </Typography>
                            </div>
                            <div style={{alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="display4" className={classes.bold} >
                                    {roundeWithDec(this.blocked)} {Api.getCoinName()}      
                                </Typography>
                            </div>

                        </div>  

                        <div className={classes.row} >
   
                            <div style={{ alignItems: 'flex-start', width: '100px'}} className={classes.col}>
                                <Typography variant="display4" >
                                    Balance:
                                </Typography>
                            </div>

                            <div style={{ alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="display4" className={classes.bold}>
                                    {roundeWithDec(this.balance)} {Api.getCoinName()}      
                                </Typography>
                            </div>
        
                        </div>  
                    </div>
                    <div className={classes.row} >
                        <Button variant="raised" color="secondary" className={classes.submitBtn} href={'/contact'}>
                            <Typography variant="button" >Add {Api.getCoinName()} </Typography>
                        </Button>
                    </div>  
                </div>}

                {!this.loaded && 
                <div className={classes.cardBodyResult}>
                    <div className={classes.analitics}>
                        <div className={classes.row} >
                            <div style={{ alignItems: 'center', width: '200px'}} className={classes.col}>
                                <CircularProgress color="secondary" />
                            </div>            
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

    @action.bound
    copy = _ => {
        copy(this.walletRef);
    }


    render(){
        let {classes} = this.props;
        
        const Textarea = React.forwardRef((props, ref) => ( 
            <TextField
                inputRef={ref}
                value={props.value}
                onChange={_=>{}}
                readOnly={'readonly'}
                className={classes.formField}
                type="text"
                margin="normal"
                InputProps={{
                    className: classes.formInput
                }}
            />
        ));

        return( 
            <MuiThemeProvider theme={themeProfile}>
                <div className={classes.cardWrapper} >
        
                    <div className={classes.card}>
                        <div ref='header' className={classes.header}>
                            <Typography variant="display1" className={classes.title}>
                                Business account
                            </Typography>
                            <span className={classes.delimeter}></span>

                        </div>
                        <div className={classes.cardBodyResult}>
                            <div className={classes.account}>
                                <div className={classes.accountPic}>
                                    <img src={Auth.photoURL} />
                                </div>
                                <div className={classes.accountDetails}>
                                    <Typography className={classes.accountName} variant="display4" gutterBottom>
                                            {Auth.displayName}
                                    </Typography>
                        
                                    <Typography className={classes.accountEmail} variant="display4" gutterBottom>
                                            {Auth.email}
                                    </Typography>
                                </div>
                            </div>
                            <Divider className={classes.divider} />

                            <Typography variant="display4" className={classes.headerField + ' ' + classes.bold} >Your Impleum wallet address:
                            </Typography>
                            
                            <Textarea ref={this.walletRef} value={this.wallet} />

                            <Button variant="raised" color="secondary" className={classes.submitBtn} onClick={this.copy}>
                                <Typography variant="button" >Copy</Typography>
                            </Button>
                        </div>
                    </div>

                    {this.getBalanceInfo()}

                </div>
            </MuiThemeProvider>)
    }
}


const stylesAnalytics = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap'
    },

    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '100%',
        width: 'auto',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
    },

    header:{
        color: 'white',
        background: '#FC3868',
        fontWeight: 100,
        display: 'flex',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        '& $delimeter': {
            background: 'rgba(0, 0, 0, 0.1)',
            height: '100px',
            width: 1,
            margin: '-50px 0'
        },
        '& $impNum':{
            padding: '0 10px'
        }
    },
    
    delimeter:{},
    impNum:{},

    cardBodyResult: {
        padding: '12px 0px',
        backgroundColor: '#474E65',
        overflow: 'hidden'
    },

    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 30px',
        width: '100%'
    },

    col: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 200,
        height: 33,
        flexShrink: 0,
    },

    btnResult: {
        marginTop: 30,
        borderRadius: 74
    },

    title: {
        padding: '0 30px',
    },

    column:{
        flexDirection: 'column',
        alignItems: 'center'
    },

    headerResult: {
        paddingBottom: '1rem'
    },

    noWrap:{
        whiteSpace: 'nowrap',
        textAlign: 'center'
    },

    center:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    analitics:{
        display: 'flex',
        flexDirection: 'column',
    },

    walletSetWrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        width: 480,
        marginBottom: 7,
        marginTop: 29
    },

    walletSet:{
        width: 'calc(100% - 65px)',
        display: 'inline-block',
    },
    
    divider: {
        margin: '7px 30px',
        backgroundColor: "#bbc2d8"
    },

    headerField:{
        margin: '20px 0 12px',
        fontSize: 16,
    },

    bold:{
        fontWeight: 600,
        textAlign: 'center'
    },

    formInput:{
        width: '100%',
        '&:after, &:hover:before': {
            borderBottomColor: '#FC3868 !important'
        },
    },

    formField:{
        display: 'block',
        width: 480,
        '&:after': {
            borderBottomColor: '#FC3868',
        },
    },

    submitBtn:{
        float: 'right',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },

    editBtn:{
        float: 'right',
        borderRadius: 74,
    },

    editBtnTypo:{
        fontSize: 14,
        fontWeight: 700
    },

    short:{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'inline-block',
        width: '100%'
    },

    firstCol:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'color .5s',
        '&:hover': {
            color: '#FC3868',
            cursor: 'pointer',
        }
    },
    
    delBtn:{
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },

    explorer: {
        verticalAlign: 'middle',
        lineHeight: '100%',
        fontSize: 30,
        color: '#4b5168'
    },

    addIMP:{
        height: '100px',
        width: '100px',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        marginLeft: 5,
        borderRadius: '8px',
        overflow: 'hidden', 
        backgroundColor: '#b1b4bd',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
        '@media (max-width: 600px)':{
            marginRight: 0
        }
    },

    addIMPLink:{
        display: 'block',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#d8d9dd',
        height: '56px',
        width: '56px',
        margin: '14px auto 4px',
        position: 'relative',
        transition: 'boxShadow .5s',
        '&:hover': {
            boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.1)',
        },
        '&:before': {
            content: '\'\'',
            position: 'absolute',
            left: '8px',
            top: '50%',
            width: '40px',
            height: '5px',
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: '#506880',   
            transform: 'translateY(-50%)' 
        },

        '&:after':{
            content: '\'\'',
            position: 'absolute',
            left: '50%',
            top: '8px',
            height: '40px',
            width: '5px',
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: '#506880',   
            transform: 'translateX(-50%)' 
        }
    },

    addIMPTitle: {
        textAlign: 'center'
    },

    menuBtn:{
        color: 'white',
    },

    link:{
        color: 'white'
    },

    busi:{
        display: 'inline-block',
        paddingLeft: '20px'
    },
    
    dropdown:{
//        marginTop: '40px !important',
        width: '200px',
        borderRadius: '8px'
    },

    textarea:{
        width: '100%',
        height: '112px'
    },

    formInput:{
        width: '100%',
        '&:after, &:hover:before': {
            borderBottomColor: '#FC3868 !important'
        },
    },

    formField:{
        display: 'block',
        width: 480,
        maxWidth: '88%',
        '&:after': {
            borderBottomColor: '#FC3868',
        },
    },

    nopadding: {
        padding: 0
    },

    textAreaWrappper: {
        position: 'relative'
    },

    copyEmbedCode:{
        position: 'absolute',
        top: 0,
        right: 0
    }
})

const themeAnalytics = createMuiTheme( Object.assign(themeObject, {
    typography: {
        ...themeObject.typography,
        display4: {
             ...themeObject.typography.display4,
            fontSize: '14px',
        },
        body1: {
             ...themeObject.typography.body1,
            fontSize: '14px',
        },
        display1:{
             ...themeObject.typography.display1,
            fontSize: '14px',
        }
    }
}));

// Analytics
@withStyles(stylesAnalytics)
@observer
export class Analytics extends React.Component{

    constructor(props){
        super(props);
        this.getAnalytics();
    }

    @observable analitics = {};
    @observable balanceIncome = 0;
    @observable processingIframe = {};
    @observable anchorEl = {};


    @action.bound
    getAnalytics = async _ => {
    
        let that = this;
        let user = await new Promise(r => Api.auth().onAuthStateChanged(r)).catch(function(error) {
            console.trace(error.stack);
            console.log('User token is outdated. Relogin is required.')
        });

        if (user) {

            let idToken = await user.getIdToken();

            let fetchBody = {token: idToken};
            let analitics = await Api.ourApi('getAnalytics', fetchBody);

            console.log(analitics)

            that.balanceIncome = await Api.ourApi('getbalance', fetchBody);

            that.analitics = analitics;
        }
      
    }

    textareaRef = null;
    @action.bound
    handleMenuClick = idx => event => {
        this.anchorEl[idx] = event.currentTarget;
        this.textareaRef = React.createRef();
    };

    @action.bound
    handleMenuClose = idx => () => {
        this.anchorEl[idx] = null;
        this.textareaRef = null;
    };


    @computed
    get balance(){
        return this.balanceIncome - this.paid;
    }

    @computed
    get paid(){
        return Object.entries(this.analitics).reduce((allpayoutsIMP ,[path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount}]) => {
            return allpayoutsIMP + payoutsIMP + sharedReward * sharedPaidCount
        }, 0)
    }

    @computed
    get blocked(){
        return Object.entries(this.analitics).reduce((allblocked ,[path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount, blockedIMP}]) => {
            return allblocked + blockedIMP
        }, 0)
    }

    @computed
    get available(){
        let available = this.balance - this.blocked;
        Object.values(this.analitics).map(({entry_path, entry_id}) => {
           Api.setValueInCatalog('blockedEntity', available < 0, entry_path, entry_id);
        });
        return available;
    }

    makeVisibleInOnlyIframe = (path, id, idx = 0) => async ({target}) => {
        if(this.processingIframe[idx]) return
        
        this.processingIframe[idx] = true;
        await Api.setValueInCatalog('onlyIframe', target.checked, path, id);
        await this.getAnalytics();
        this.processingIframe[idx] = false;
    }

    makeOnOff = (path, id, idx = 0) => async ({target}) => {
        if(this.processingIframe[idx]) return

        this.processingIframe[idx] = true;
        await Api.setValueInCatalog('blockedByUser', !target.checked, path, id);
        await this.getAnalytics();
        this.processingIframe[idx] = false;
    }

    getBalanceInfo(){

        let {classes} = this.props;

        return (
                <div className={classes.card}>
                    <div ref='header' className={classes.header}>
                        <div className={classes.row} style={{padding: '0 10px'}}>
                            <div style={{ width: '100px'}} className={classes.col}>
                                <Typography  align="left" variant="display1" className={classes.bold}>
                                    Available
                                </Typography>
                            </div>
                            <span className={classes.delimeter}></span>
                            <div style={{ alignItems: 'center', width: '100px'}} className={classes.col}>
                                <Typography variant="display1" className={classes.bold}>
                                    Blocked
                                </Typography>
                            </div>
                            <span className={classes.delimeter}></span>
                            <div style={{ width: '100px'}} className={classes.col}>
                                <Typography variant="display1" className={classes.bold}>
                                    Balance
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.cardBodyResult}>
                        <div className={classes.analitics}>
                            <div className={classes.row} style={{padding: '0 10px'}}>

                                <div style={{ width: '100px'}} className={classes.col}>
                                    <Typography variant="display4" >
                                        {roundeWithDec(this.available)} {Api.getCoinName()}      
                                    </Typography>
                                </div>

                                <div style={{width: '100px'}} className={classes.col}>
                                    <Typography variant="display4" >
                                        {roundeWithDec(this.blocked)} {Api.getCoinName()}      
                                    </Typography>
                                </div>

                                <div style={{ width: '100px'}} className={classes.col}>
                                    <Typography variant="display4" >
                                        {roundeWithDec(this.balance)} {Api.getCoinName()}      
                                    </Typography>
                                </div>
                            </div>    
                        </div>
                    </div>
                 </div>
        )
    }

    @observable modalEmbedOpened = {};
    @action.bound
    openEmbedModal = (idx) => _ => {
        this.modalEmbedOpened[idx] = true;
    };

    @action.bound
    closeEmbedModal = (idx) => _ => {
        this.modalEmbedOpened[idx] = false;
    };

    @action.bound
    copyEmbedCode = (code) => _ => {
        
        copy(this.textareaRef);
    }

    render(){
        let that = this;
        let {classes} = this.props;

        const Textarea = React.forwardRef((props, ref) => ( 
            <TextField
                inputRef={ref}
                defaultValue={props.value}
                className={classes.formField}
                type="text"
                margin="normal"
                InputProps={{
                    className: classes.formInput
                }}
            />
        ));

        return(

        <MuiThemeProvider theme={themeAnalytics}>
            <div className={classes.cardWrapper} >
            <div className={cn(classes.row, classes.nopadding)}>
                { this.getBalanceInfo() }

                <div className={classes.addIMP}>
                    <Link className={classes.addIMPLink} to='/contact'></Link>
                    <Typography  variant="body1" className={classes.addIMPTitle}>
                        Add {Api.getCoinName()}
                    </Typography>
                </div>
            </div>
            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <div className={classes.row}>
                        <div style={{ alignItems: 'flex-start', width: '180px'}} className={classes.col}>
                            <Typography  align="left" variant="display1" className={classes.bold}>
                                Title
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                On/Off
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '80px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Embed only
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '120px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Reward / Share Reward
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Responses / Shares
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Payouts / with shares
                            </Typography>
                        </div> 
                        
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Blocked
                            </Typography>
                        </div>

                        <span className={classes.delimeter}></span>

                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Spend
                            </Typography>
                        </div>

                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                More
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.cardBodyResult}>
                    <div className={classes.analitics}>
                            { Object.entries(this.analitics).map(([path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount, blockedIMP , entry_path, entry_id, onlyIframe, blockedEntity, blockedByUser}], idx, analitics) => {
                                return [<div key={`history-${idx}`} className={classes.row}>

                                    <div style={{ alignItems: 'flex-start', width: '180px'}} className={classes.col}>
                                        <Typography className={cn({[classes.short]:true, [classes.firstCol]: true})} variant="display4" >
                                            <Link to={entry_path.replace('v1','')} className={classes.link} style={{textDecoration: 'none'}}>
                                                <span style={{ paddingRight: '10px'}}> {title} </span>
                                            </Link>
                                            <Icon className={classes.link}>link</Icon>
                                            {this.processingIframe[idx] && <div className={classes.busi}> <CircularProgress size={15} color="secondary" /></div>}
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Switch
                                            checked={ (blockedEntity ? false : !blockedByUser ) }
                                            onChange={this.makeOnOff(entry_path, entry_id, idx)}
                                            disabled={blockedEntity}
                                        />
                                    </div>
                                    <div style={{width: '80px'}} className={classes.col}>
                                        <Switch
                                            checked={onlyIframe}
                                            onChange={this.makeVisibleInOnlyIframe(entry_path, entry_id, idx)}
                                        />
                                    </div>

                                    <div style={{width: '120px'}} className={classes.col}>
                                        <Typography variant="display4" >
                                            {roundeWithDec(reward)} / {roundeWithDec(sharedReward)} {Api.getCoinName()}                                        
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="display4" >
                                            {responses} / {sharedCount}
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="display4" >
                                            {roundeWithDec(payoutsIMP)} / {roundeWithDec(payoutsIMP + sharedReward * sharedPaidCount)} {Api.getCoinName()}        
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="display4" >
                                            {roundeWithDec(blockedIMP)} {Api.getCoinName()}    
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="display4" >
                                            {roundeWithDec(payoutsIMP + sharedReward * sharedPaidCount + blockedIMP)} {Api.getCoinName()}         
                                        </Typography>
                                    </div> 

                                    <div style={{width: '100px'}} className={classes.col}>
                                       <IconButton
                                            aria-label="More"
                                            aria-haspopup="true"
                                            aria-owns={that.anchorEl[idx] ? `menu#${idx}` : null}
                                            onClick={that.handleMenuClick(idx)}>
                                            <Icon className={classes.menuBtn}>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id={`menu#${idx}`}
                                            anchorEl={that.anchorEl[idx]}
                                            open={Boolean(that.anchorEl[idx])}
                                            onClose={that.handleMenuClose(idx)}
                                            placement="bottom"
                                            classes={{paper: classes.dropdown}}
                                            PaperProps={{
                                                style: {width: 200},
                                            }}
                                        >

                                            <SModal width="100%" 
                                                title={<div dangerouslySetInnerHTML={{__html:'Embed code'}} />} 
                                                body={
                                                    <div className={classes.textAreaWrappper}>
                                                        <Textarea ref={that.textareaRef} value={`${window.location.protocol}//${window.location.host}/embed${entry_path.replace('/v1','')}`} />
                                                        <IconButton className={classes.copyEmbedCode} style={{height: 36, width: 36}} size='small' onClick={this.copyEmbedCode(`${window.location.protocol}//${window.location.host}/embed${entry_path.replace('/v1','')}`)}>
                                                            <Icon>file_copy</Icon>
                                                        </IconButton>
                                                    </div>
                                                    } 
                                                open={that.modalEmbedOpened[idx] || false} 
                                                close={that.closeEmbedModal(idx)} 
                                                full={false} zoom={false} 
                                            />  

                                            <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={that.openEmbedModal(idx)}>
                                                <Typography variant="subheading" >
                                                    Embed code
                                                </Typography>
                                            </MenuItem>

                                            <Share link={`${window.location.protocol}//${window.location.host}${entry_path.replace('/v1','')}`} >
                                                <MenuItem selected={false} className={classes.menuMobileItemSpacings} >
                                                    <Typography variant="subheading" >
                                                        Share
                                                    </Typography>
                                                </MenuItem>  
                                             </Share>
                                        </Menu>
                                    </div>
                                   
                                </div>,
                                analitics.length - 1 !=  idx ? <Divider key={`historydiv-${idx}`} className={classes.divider} /> : <div key={`historydiv-${idx}`}/> ]
                                })
                            }

                            { Object.entries(this.analitics).length == 0 && <div className={classes.center}> <CircularProgress color="secondary" /></div>}
                    </div>

                </div>
            </div>
        </div> </MuiThemeProvider>)
    }
}
