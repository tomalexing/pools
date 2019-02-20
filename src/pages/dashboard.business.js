import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { listener, getMonthName, roundeWithDec, loadScript, copy, formatedTime } from './../utils';

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

import IconButton from '@material-ui/core/IconButton';
import {loadFromStore , saveToStore, clearAll} from "./../services/localDb";


import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardsModel from './../models/Cards'

import Share from './../components/Share';
import SModal from './../components/Modal';

import Checkbox from '@material-ui/core/Checkbox';

import TableRow from '@material-ui/core/TableRow';
import EnhancedTable from './../components/Table/TableWrapper';
import EnhancedTableCell from './../components/Table/Table.cell';
import EnhancedSwitch from './../components/Switch';

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

// Profile
@withStyles(stylesProfile)
@observer
export class Profile extends React.Component{

    constructor(props){
        super(props);
        this.user = null;
        this.walletRef = React.createRef();


        this.init();


    }

    @observable analitics = {};
    @observable loaded = false;
    @observable wallet = '';


    init = async () =>{
        await this.getUser();
        this.getWallet();
        this.getAnalytics();
    }

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
            
            let {list:analitics, debug} = await Api.ourApi('getAnalytic', fetchBody);

            that.analitics = analitics;
            this.loaded = true;
        }else{
            await this.getUser();
            this.getAnalytics();
        }
      
    }


    @computed
    get balance(){
        return this.balanceIncome;
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
                            <Typography  align="left" variant="h4" className={classes.bold}>
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
                                <Typography  align="left" variant="h1" >
                                    Available:
                                </Typography>
                            </div>
                            <div style={{ alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="h1" className={classes.bold} >
                                    {roundeWithDec(this.available)} {Api.getCoinName()}      
                                </Typography>
                            </div>
            
                        </div>  

                        <div className={classes.row} >
                           
                            <div style={{ alignItems: 'flex-start', width: '100px'}} className={classes.col}>
                                <Typography variant="h1" >
                                    Blocked:
                                </Typography>
                            </div>
                            <div style={{alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="h1" className={classes.bold} >
                                    {roundeWithDec(this.blocked)} {Api.getCoinName()}      
                                </Typography>
                            </div>

                        </div>  

                        <div className={classes.row} >
   
                            <div style={{ alignItems: 'flex-start', width: '100px'}} className={classes.col}>
                                <Typography variant="h1" >
                                    Balance:
                                </Typography>
                            </div>

                            <div style={{ alignItems: 'flex-end', width: '100px'}} className={classes.col}>
                                <Typography variant="h1" className={classes.bold}>
                                    {roundeWithDec(this.balance)} {Api.getCoinName()}      
                                </Typography>
                            </div>
        
                        </div>  
                    </div>
                    <div className={classes.row} >
                        <Button variant="contained" color="secondary" className={classes.submitBtn} href={'/dashboard/profile'}>
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
                <div className={classes.cardWrapper} >
        
                    <div className={classes.card}>
                        <div ref='header' className={classes.header}>
                            <Typography variant="h4" className={classes.title}>
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
                                    <Typography className={classes.accountName} variant="h1" gutterBottom>
                                            {Auth.displayName}
                                    </Typography>
                        
                                    <Typography className={classes.accountEmail} variant="h1" gutterBottom>
                                            {Auth.email}
                                    </Typography>
                                </div>
                            </div>
                            <Divider className={classes.divider} />

                            <Typography variant="h1" className={classes.headerField + ' ' + classes.bold} >Your Impleum wallet address:
                            </Typography>
                            
                            <Textarea ref={this.walletRef} value={this.wallet} />

                            <Button variant="contained" color="secondary" className={classes.submitBtn} onClick={this.copy}>
                                <Typography variant="button" >Copy</Typography>
                            </Button>
                        </div>
                    </div>

                    {this.getBalanceInfo()}

                </div>
            )
    }
}


const stylesDashboard = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: '100%'
    },

    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'auto',
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


    formInput:{
        width: 'calc(100% - 66px)',
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
        '@media (max-width: 600px)':{
            width: 300,
        }
    },

    submitBtn:{
        float: 'right',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },

    addIMPTitle: {
        textAlign: 'center'
    },

    link:{
        color: 'white',
        textDecoration: 'none',
    },

    busy:{
        display: 'inline-block',
        paddingLeft: '20px',
        width: '20px'
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
    },

    menuItem: {
        textDecoration: 'none'
    },

    menuLink: {
        textDecoration: 'none'
    },

    menuBtn:{
        width: 36,
        height: 36
    },

    menuBtnIcon:{
        color: 'white'
    },

    noWrap: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    },

    cell: {
        padding: '0 10px',
        textAlign: 'center'
    },

    borderOff: {
        border: 'none'
    },

    center: {
        textAlign: 'center',
    }
})


// Dashboard
@withStyles(stylesDashboard)
@observer
export class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.getAnalytics();
    }

    @observable analitics = {};
    @observable analiticsLoaded = false;
    @observable balanceIncome = 0;
    @observable processingIframe = {};
    @observable anchorEl = {};


    @action.bound
    getAnalytics = async _ => {
    
        let that = this;
        let user = await new Promise(r => Api.auth().onAuthStateChanged(r)).catch(function(error) {
            console.trace(error.stack);
            console.log('User token is outdated. Re-login is required.')
        });

        if (user) {

            let idToken = await user.getIdToken();

            let fetchBody = {token: idToken, uid: Auth.uid};
            let {list:analitics, d} = await Api.ourApi('getAnalytic', fetchBody);
            this.analiticsLoaded = true;

            //console.log(analitics, d)

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
        return this.balanceIncome;
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
        Object.values(this.analitics).map(({entry_path, entry_id, blockedByUser}) => {
           Api.setValueInCatalog('blockedEntity', available < 0, entry_path, entry_id);
           Api.setValueInCatalog('blockedByUser', blockedByUser, entry_path, entry_id);
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
                    <EnhancedTable
                        rowsPerPage = {1}
                        notShowPagination = {true}
                        data = {
                            [{
                                'r0' : roundeWithDec(this.available),
                                'r1' : roundeWithDec(this.blocked),
                                'r2' : roundeWithDec(this.balance)
                            }]
                        }
                        rowsHeader = {[[
                            { id: 'r0', center: true, notAbleSort: true, padding: 'dense', label: 'Available' },
                            { id: 'r1', center: true, notAbleSort: true, padding: 'dense', label: 'Blocked' },
                            { id: 'r2', center: true, notAbleSort: true, padding: 'dense', label: 'Balance' },
                        ]]}
                        innerTable = {(row, idx) => {   
                            return(
                                <TableRow key={idx}>
                                    <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)}  component="th" scope="row" >
                                        <Typography  variant="h1">
                                            {row.r0}
                                        </Typography>
                                    </EnhancedTableCell>   
                                    <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)} > 
                                        <Typography variant="h1">
                                            {row.r1}
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.r2}
                                        </Typography>
                                    </EnhancedTableCell>
                                </TableRow>
                            )
                        }}
                    />
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

            <div className={classes.cardWrapper} >
                <div className={cn(classes.cardWrapper, classes.nopadding)}>
                    { this.getBalanceInfo() }

                    <div className={classes.addIMP}>
                        <Link className={classes.addIMPLink} to='/contact'></Link>
                        <Typography  variant="body2" className={classes.addIMPTitle}>
                            Add {Api.getCoinName()}
                        </Typography>
                    </div>

                </div>
                <div className={classes.card}>
                    <EnhancedTable
                        orderBy = {'title'}
                        loaded= {this.analiticsLoaded}
                        data = {Object.entries(this.analitics).map(([path, {overall, payoutsIMP, responses, title, reward, sharedReward, sharedCount, sharedPaidCount, blockedIMP , entry_path, entry_id, onlyIframe, blockedEntity, blockedByUser}], idx, analitics) => {
                            return {
                                'title': title,
                                'entry_path': entry_path,
                                'entry_id': entry_id,
                                'enable': (blockedEntity ? false : !blockedByUser ),
                                'onlyIframe': onlyIframe,
                                'blockedEntity': blockedEntity,
                                'reward': roundeWithDec(reward),
                                'sharedReward': roundeWithDec(sharedReward),        
                                'responses': responses,    
                                'sharedCount': sharedCount,
                                'payoutsIMP': roundeWithDec(payoutsIMP),
                                'sharesSpend': roundeWithDec(sharedReward * sharedPaidCount),
                                'blockedIMP': roundeWithDec(blockedIMP),
                                'spent': roundeWithDec(payoutsIMP + sharedReward * sharedPaidCount + blockedIMP),
                                'more': ''
                            }
                        })}
                        rowsHeader = {[[
                            { id: 'a', notAbleSort: true, padding: 'checkbox', label: '', colSpan: 1},
                            { id: 'aa', notAbleSort: true, center: true, padding: 'checkbox', label: 'Controls', colSpan: 2},
                            { id: 'b', notAbleSort: true, center: true, padding: 'checkbox', label: 'Reward, ' + Api.getCoinName(), colSpan: 2 },
                            { id: 'c', notAbleSort: true, center: true, padding: 'checkbox', label: 'Number Of', colSpan: 2},
                            { id: 'd', notAbleSort: true, center: true, padding: 'checkbox', label: 'Spent For, ' + Api.getCoinName(), colSpan: 3 },
                            { id: 'f', notAbleSort: true, center: true, padding: 'checkbox', label: 'Σ, ' + Api.getCoinName(), colSpan: 1 },
                            { id: 'g', notAbleSort: true, center: true, padding: 'checkbox', label: '', colSpan: 1},
                        ],[
                            { id: 'title', numeric: false, padding: 'dense', label: 'Title' },
                            { id: 'enable', notAbleSort: true, center: true, padding: 'checkbox', label: 'On/Off' },
                            { id: 'iframe', notAbleSort: true, center: true, padding: 'checkbox', label: 'Embed only' },
                            { id: 'reward', center: true, padding: 'checkbox', label: 'Entity' },
                            { id: 'sharedReward', center: true, padding: 'checkbox', label: 'Sharing' },
                            { id: 'responses', center: true, padding: 'checkbox', label: 'Responses' },
                            { id: 'sharedCount', center: true, padding: 'checkbox', label: 'Shares' },
                            { id: 'payoutsIMP', center: true, padding: 'checkbox', label: 'Answers' },
                            { id: 'sharesSpend', center: true, padding: 'checkbox', label: ' Sharing' },
                            { id: 'blockedIMP', center: true, padding: 'checkbox', label: 'Blocked ' },
                            { id: 'spent', center: true, padding: 'checkbox', label: 'Spent'},
                            { id: 'more', center: true, notAbleSort: true, padding: 'checkbox', label: 'More' },
                        ]]}
                        innerTable = {(row, idx) => {
                            return(
                                <TableRow key={idx}>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)} component="th" scope="row">
                                        <Typography className={classes.noWrap} variant="h1" >
                                            <Link to={row.entry_path.replace('v1','')} className={classes.link} >
                                                <span style={{ paddingRight: '10px'}}> {row.title} </span>
                                            </Link>
                                            <Icon className={classes.link}>link</Icon>
                                            <div className={classes.busy}>
                                                {that.processingIframe[idx] && <CircularProgress size={15} color="secondary" />}
                                            </div>
                                        </Typography>
                                    </EnhancedTableCell>   
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)} >
                                        <Typography className={classes.noWrap} variant="h1">
                                            <EnhancedSwitch
                                                checked={row.enable}
                                                onChange={that.makeOnOff(row.entry_path, row.entry_id, idx)}
                                                disabled={row.blockedEntity}
                                            />
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}>
                                        <Typography className={classes.noWrap} variant="h1">
                                            <EnhancedSwitch
                                                checked={row.onlyIframe}
                                                onChange={that.makeVisibleInOnlyIframe(row.entry_path, row.entry_id, idx)}
                                            />
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.reward}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.sharedReward}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.responses}                             
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.sharedCount}                                    
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.payoutsIMP}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.sharesSpend}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.blockedIMP}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <Typography variant="h1" >
                                            {row.spent}                                     
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}> 
                                        <IconButton
                                            aria-label="More"
                                            aria-haspopup="true"
                                            aria-owns={that.anchorEl[idx] ? `menu#${idx}` : null}
                                            className={classes.menuBtn}
                                            onClick={that.handleMenuClick(idx)}>
                                            <Icon className={classes.menuBtnIcon}>more_horiz</Icon>
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
                                            }}v
                                        >

                                            <SModal
                                                title={<div dangerouslySetInnerHTML={{__html:'Embed code'}} />} 
                                                body={
                                                    <div className={classes.textAreaWrappper}>
                                                        <Textarea ref={that.textareaRef} value={`${window.location.protocol}//${window.location.host}/embed${row.entry_path.replace('/v1','')}`} />
                                                        <IconButton className={classes.copyEmbedCode} style={{height: 36, width: 36}} size='small' onClick={this.copyEmbedCode(`${window.location.protocol}//${window.location.host}/embed${row.entry_path.replace('/v1','')}`)}>
                                                            <Icon>file_copy</Icon>
                                                        </IconButton>
                                                    </div>
                                                    } 
                                                open={that.modalEmbedOpened[idx] || false} 
                                                close={that.closeEmbedModal(idx)} 
                                                full={false} zoom={false} 
                                                width="auto" 
                                            />  

                                            <MenuItem selected={false} className={classes.menuMobileItemSpacings} onClick={that.openEmbedModal(idx)}>
                                                <Typography variant="subtitle1" >
                                                    Embed code
                                                </Typography>
                                            </MenuItem>

                                            <NavLink tabIndex='1' to={`/dashboard/analytics${row.entry_path.replace('v1','')}`} className={classes.menuLink}>
                                                <MenuItem selected={false} className={classes.menuItem}>
                                                    <Typography variant="subtitle1" >
                                                        Analytics
                                                    </Typography>
                                                </MenuItem>
                                            </NavLink>

                                            <Share link={`${window.location.protocol}//${window.location.host}${row.entry_path.replace('/v1','')}`} >
                                                <MenuItem selected={false} className={classes.menuMobileItemSpacings} >
                                                    <Typography variant="subtitle1" >
                                                        Share
                                                    </Typography>
                                                </MenuItem>  
                                            </Share>
                                        </Menu>
                                    </EnhancedTableCell>
                                </TableRow>
                            )
                        }}
                    />
                </div>
            </div> 
        )
    }
}




const stylesHistory = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '100%'
    },

    container:{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'auto',
        maxWidth: '100%',
        width: 'auto',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
    },

    explorer: {
        verticalAlign: 'middle',
        lineHeight: '100%',
        fontSize: 30,
        color: 'white'
    },

    unconfirmed:{
        background: '#FC3868'
    },

    received:{
        background: '#34E8C0'
    },

    processing:{
        background: '#329CF4'
    },

    status:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    label:{
        padding: '3px 5px',
        borderRadius: '6px',
        textAlign: 'center',
        margin: '3px 10px 0',
        width: '10px',
        height: '10px'
    },

    titleTop: {
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: '30px'
    },

    cell: {
        padding: '0 10px',
        textAlign: 'center'
    },

    center: {
        textAlign: 'center',
    }

})

// History
@withStyles(stylesHistory)
@observer
export class History extends React.Component{

    constructor(props){
        super(props);
        this.getHistory();
    }

    @observable histories = [];
    @observable historyLoaded = false;
    @observable count = 0;

    @action
    getHistory = async _ => {
        let body = {
            uid: Auth.uid
        };

        let listtransactions = await Api.ourApi('listtransactions', body);

        if(listtransactions && listtransactions.status){
            this.histories = listtransactions.transactions;
        }

        let getblockcount = await Api.ourApi('getblockcount', {});
        if(getblockcount && getblockcount.status){
            this.count = getblockcount.count;
        }

        this.historyLoaded = true;
    }

    render(){
        let that = this;
        let {classes} = this.props;

        return( 
            <div className={classes.container} >

            <Typography variant="h1" className={classes.titleTop}>Deposits</Typography>

            <div className={classes.cardWrapper} >
                <div className={classes.card}>
                    <EnhancedTable
                        rowsPerPage = {5}
                        loaded= {this.historyLoaded}
                        data = { this.histories.filter(history => {
                                    return history.category == 'receive'
                                    
                                }).map(history => {
                                    
                                let stamptime = new Date(history.timereceived * 1000);
                               
                                return {
                                    'block' : that.count - history.confirmations,
                                    'amount' : roundeWithDec(history.amount),
                                    'date' : formatedTime(stamptime),
                                    'confirmations' : history.confirmations,
                                    'explorer' : history.txid
                                }
                            })
                        }
                        rowsHeader = {[[
                            { id: 'block', numeric: false, center: true, padding: 'dense', label: 'Block' },
                            { id: 'amount', numeric: true, center: true, padding: 'dense', label: 'Amount, ' + Api.getCoinName()},
                            { id: 'date', numeric: true, center: true, padding: 'dense',  label: 'Date' },
                            { id: 'confirmations', numeric: false, center: true, padding: 'dense',  label: 'Status' },
                            { id: 'explorer', numeric: false, center: true, padding: 'dense',  label: 'Explorer' },
                        ]]}
                        innerTable = {(row, idx) => {   
                            return(
                                <TableRow key={idx}>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}   component="th" scope="row" >
                                        <Typography  variant="h1">
                                            {row.block}
                                        </Typography>
                                    </EnhancedTableCell>   
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}  > 
                                        <Typography  variant="h1" >
                                            {row.amount}
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}   > 
                                        <Typography  variant="h1" >
                                            {row.date}
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}  > 
                                        <div className={cn(classes.status)}>
                                            <div className={cn(classes.label, {
                                            [classes.received]: row.confirmations >= 10,
                                            [classes.unconfirmed]: row.confirmations <= 1,
                                            [classes.processing]: row.confirmations > 1 && row.confirmations < 10
                                            })}></div>
                                            <Typography variant="h1">
                                                {row.confirmations >= 10 && 'received' }
                                                {row.confirmations <= 1  && 'unconfirmed' }
                                                {row.confirmations > 1 && row.confirmations < 10 && 'processing' } 
                                            </Typography>
                                        </div>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell padding="dense" className={cn(classes.center)}  > 
                                        <Typography  variant="h1" >
                                            { row.explorer && <a href={`https://explorer.impleum.com/tx/${row.explorer}`}
                                                    target="_blank" className={classes.explorer}><Icon>link</Icon>
                                             </a>}
                                        </Typography>
                                    </EnhancedTableCell>
                                </TableRow>
                            )
                        }}
                    />

                </div>
            </div>
        </div>)
    }
}

const stylesAnalytics = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap'
    },

    container:{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'auto',
        maxWidth: '100%',
        width: 'auto',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
    },

 
    label:{
        padding: '3px 5px',
        borderRadius: '6px',
        textAlign: 'center',
        margin: '3px 10px 0',
        width: '10px',
        height: '10px'
    },

    titleTop: {
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: '30px'
    },

    borderOff: {
        border: 'none'
    },

    center: {
        textAlign: 'center',
    }

})



// Analytics
@withStyles(stylesAnalytics)
@observer
export class Analytics extends React.Component{

    constructor(props){
        super(props);
        this.getReferal();
    }

    @observable referrals;

    @action.bound
    getReferal = async _ => {
        let body = {
            uid: Auth.uid
        };
        let {match: {params: {slug, id}}} = this.props;
        let referrals  = await Api.loadReferral(slug, id);
        if(referrals){
            this.referrals = referrals;
        }

    }

    render(){
        let {classes} = this.props;

        return( 
            <div className={classes.container} >

                <Typography variant="h1" className={classes.titleTop}>Responses</Typography>

                <div className={classes.cardWrapper} >
                    <div className={classes.card}>
                        <EnhancedTable
                            rowsPerPage = {1}
                            notShowPagination = {true}
                            data = {
                                [{
                                    'r0' : this.referrals && this.referrals.catalog || 0,
                                    'r1' : this.referrals && this.referrals.congratulations || 0,
                                    'r2' : this.referrals && this.referrals.appleStore || 0
                                }]
                            }
                            rowsHeader = {[[
                                { id: 'r0', center: true, padding:'dense', notAbleSort: true, label: 'Catalog(site)' },
                                { id: 'r1', center: true, padding:'dense', notAbleSort: true, label: 'Results(site)' },
                                { id: 'r2', center: true, padding:'dense', notAbleSort: true, label: 'Results(app)' },
                            ]]}
                            innerTable = {(row, idx) => {   
                                return(
                                    <TableRow key={idx}>
                                        <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)} component="th" scope="row" >
                                            <Typography  variant="h1">
                                                {row.r0}
                                            </Typography>
                                        </EnhancedTableCell>   
                                        <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)} > 
                                            <Typography variant="h1" >
                                                {row.r1}
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell padding="dense" className={cn(classes.borderOff, classes.center)} > 
                                            <Typography variant="h1" >
                                                {row.r2}
                                            </Typography>
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
       )
    }
}

