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

import BTC from './../assets/BTC.svg';
import IMP from './../assets/IMP.svg';

import info from './../assets/info.svg';

import TableRow from '@material-ui/core/TableRow';
import EnhancedTable from './../components/Table/TableWrapper';
import EnhancedTableCell from './../components/Table/Table.cell';
import EnhancedTableToolbar from './../components/Table/Table.toolbar';
import EnhancedSwitch from './../components/Switch';
import { async } from '@firebase/util';

  

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



const stylesAnalytics = theme => ({

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

    busi:{
        display: 'inline-block',
        paddingLeft: '20px'
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
            console.log('User token is outdated. Relogin is required.')
        });

        if (user) {

            let idToken = await user.getIdToken();

            let fetchBody = {token: idToken};

            let {list:analitics, d} = await Api.ourApi('getAnalytics', fetchBody);
            this.analiticsLoaded = true;
            console.log(analitics, d)

            that.balanceIncome = await Api.ourApi('getallbalance', fetchBody);

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

    @action.bound
    makeVisibleInOnlyIframe = (path, id, idx = 0) => async ({target}) => {
        if(this.processingIframe[idx]) return
        
        this.processingIframe[idx] = true;
        await Api.setValueInCatalog('onlyIframe', target.checked, path, id);
        await this.getAnalytics();
        this.processingIframe[idx] = false;

    }

    @action.bound
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
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} component="th" scope="row" >
                                        <Typography  variant="h1">
                                            {row.r0}
                                        </Typography>
                                    </EnhancedTableCell>   
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} > 
                                        <Typography variant="h1" >
                                            {row.r1}
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} > 
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
                    <Typography  variant="body1" className={classes.addIMPTitle}>
                        Add {Api.getCoinName()}
                    </Typography>
                </div>

            </div>
            <div className={classes.card}>

                <EnhancedTable
                    orderBy = {'title'}
                    loaded= {this.analiticsLoaded}
                    rowsPerPage = {10}
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
                        { id: 'sharesSpend',center: true,  padding: 'checkbox', label: ' Sharing' },
                        { id: 'blockedIMP', center: true, padding: 'checkbox', label: 'Blocked ' },
                        { id: 'spent', center: true, padding: 'checkbox', label: 'Spent'},
                        { id: 'more', center: true, notAbleSort: true, padding: 'checkbox', label: 'More' },
                    ]]}
                    innerTable = {(row, idx) => {
                        return(
                            <TableRow hover key={idx}>
                                <EnhancedTableCell className={classes.cell} component="th" scope="row">
                                    <Typography className={classes.noWrap} variant="h1" >
                                        <Link to={row.entry_path.replace('v1','')} className={classes.link} >
                                            <span style={{ paddingRight: '10px'}}> {row.title} </span>
                                        </Link>
                                        <Icon className={classes.link}>link</Icon>
                                        {that.processingIframe[idx] && <div className={classes.busi}> <CircularProgress size={15} color="secondary" /></div>}
                                    </Typography>
                                </EnhancedTableCell>   
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)} >
                                    <Typography className={classes.noWrap} variant="h1">
                                        <EnhancedSwitch
                                            checked={row.enable}
                                            onChange={that.makeOnOff(row.entry_path, row.entry_id, idx)}
                                            disabled={row.blockedEntity}
                                        />
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                    <Typography className={classes.noWrap} variant="h1">
                                        <EnhancedSwitch
                                            checked={row.onlyIframe}
                                            onChange={that.makeVisibleInOnlyIframe(row.entry_path, row.entry_id, idx)}
                                        />
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.reward}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.sharedReward}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.responses}                             
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.sharedCount}                                    
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.payoutsIMP}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.sharesSpend}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.blockedIMP}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                    <Typography variant="h1" >
                                        {row.spent}                                     
                                    </Typography>
                                </EnhancedTableCell>
                                <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
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
                                        }}
                                    >

                                        <SModal width="auto" 
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
        </div>)
    }
}




const stylesRequests = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
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

    nopadding: {
        padding: 0
    },

    titleTopBtn: {
        marginBottom: '30px',  
    },

    titleTop: {
        fontWeight: 700,
        letterSpacing: 1,
        opacity: .6,
        transition: 'opacity .5s',      
        '&.activeTab':{
            opacity: 1,
        },
        '&:hover':{
            opacity: .9
        }
    },

    container:{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    additionalTable: {
        marginRight: 0,
        alignSelf: 'flex-start'
    },

    tableBackground: {
        backgroundColor: theme.background.default
    },

    noWrap: {
        whiteSpace: 'nowrap'
    },

    center: {
        textAlign: 'center',
    }

})


// Requests
@withStyles(stylesRequests, { withTheme: true })
@observer
export class Requests extends React.Component{

    constructor(props){
        super(props);
        this.getData();
    }

    @observable contacts = [];
    @observable creates = [];
    @observable subscriptions = [];
    @observable count = 0;

    @observable tabs =  
    {    
        'showTab-0': {
            name: 'Contacts',
            show: true,
            data: [],
            contactDetails: []

        },
        'showTab-1': {
            name: 'Create New',
            show: false,
            data: []
        },
        'showTab-2': {
            name: 'Subscriptions',
            shaw: false,
            data: []
        }
    };


    @action.bound
    getData = async _ => {
        let body = {
            uid: Auth.uid
        };

        this.tabs['showTab-0'].data = await Api.getRequestsContact(body);
        this.tabs['showTab-1'].data = await Api.getRequestsCreateNew(body);
        this.tabs['showTab-2'].data = await Api.getRequestsSubscriptions(body);
        
        this.showContact()();
    }


    @action.bound
    changeTab = matchIndex => _ => {
        Object.entries(this.tabs).map(([tabName, _], indexCollection) => {
            this.tabs[tabName].show = indexCollection == matchIndex;
        });
    }

    filterByTime = (arr) => {
        return arr.sort((body1, body2)=> {
            return new Date(Object.keys(body2[0].data.body).sort((d1, d2)=>{
                    return new Date(d2) - new Date(d1) 
                })[0]) - new Date(Object.keys(body1[0].data.body).sort((d1, d2)=>{
                    return new Date(d2) - new Date(d1) 
                })[0]); });
    }

    @action.bound
    showContact = id => e => {
        e && e.preventDefault();

        if(id){
            var chosenContact = this.tabs['showTab-0'].data.filter(d => d[0].id == id);
        }else{
            var chosenContact = this.filterByTime(this.tabs['showTab-0'].data)
        }
        
        if(chosenContact.length > 0)
            this.tabs['showTab-0'].contactDetails = chosenContact[0][0].data.body;
    }

    @observable questionModal = {};

    @action.bound
    closeQuestionModal = id => () => {
        this.questionModal[id] = false;
    };

    @action.bound
    showQuestionModal = id => () => {
        this.questionModal[id] = true;
    };

    render(){
        let that = this;
        let {classes} = this.props;

        return( 
            <div className={classes.container}>

            <div className={classes.cardWrapper}> {Object.values(this.tabs).map((tab, idx) => {
                return <Button className={classes.titleTopBtn} color="primary" key={`${tab.name}Title`} onClick={that.changeTab(idx)} ><Typography variant="h1" className={cn(classes.titleTop, {'activeTab': that.tabs[`showTab-${idx}`].show})} >{tab.name}</Typography></Button>
            })}</div>

            { that.tabs['showTab-0'].show &&
                <div className={classes.cardWrapper} >
                    <div className={classes.card}>

                        <EnhancedTable
                            orderBy = {'last'}
                            data = {that.tabs['showTab-0'].data.map(row =>  {
                                return {
                                    'email': row[0].id,
                                    'name': Object.entries(row[0].data.body).sort(([d1, _], [d2, __])=>{
                                                return d1 < d2
                                            })[0][1].name,
                                    'last': formatedTime(Object.keys(row[0].data.body).sort((d1, d2)=>{
                                                return new Date(d2) - new Date(d1)
                                            })[0]),
                                    'number': Object.values(row[0].data.body).length
                                }
                            })}
                            rowsHeader = {[[
                                { id: 'email', numeric: false, label: 'Email' },
                                { id: 'name', numeric: false, label: 'Name' },
                                { id: 'last', numeric: true, label: 'Last' },
                                { id: 'number', center: true, notAbleSort: true, label: '#' },
                            ]]}
                            innerTable = {(row) => {
                                return(
                                    <TableRow hover key={row.email}>
                                        <EnhancedTableCell component="th" scope="row">
                                            <Typography  variant="h1">
                                                {row.email}
                                            </Typography>
                                        </EnhancedTableCell>   
                                        <EnhancedTableCell>
                                            <Typography className={classes.noWrap} variant="h1">
                                                {row.name}
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell numeric>
                                            <Typography className={classes.noWrap} variant="h1">
                                                {row.last}
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell numeric > 
                                            <Button style={{width: '34px', 'minWidth': '34px'}} color="primary" variant="contained" onClick={that.showContact(row.email)}>
                                                <Typography style={{color: '#FC3868'}} variant="button"  >
                                                    {row.number}
                                                </Typography>
                                            </Button>
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
          
                    </div>
                    <div className={cn(classes.card, classes.additionalTable)}>

                         <EnhancedTable
                            orderBy = {'date'}
                            rowsPerPage = {5}
                            data = {Object.entries(that.tabs['showTab-0'].contactDetails).map(([date, {question, name}]) =>  {
                                return {
                                    'date': date,
                                    'preview': question.substr(0, 15),
                                    'full': question,
                                }
                            })}
                            rowsHeader = {[[
                                { id: 'date', numeric: false, label: 'Date' },
                                { id: 'preview', numeric: false, label: 'Preview Msg' },
                                { id: 'full', numeric: false, label: 'Full' },
           
                            ]]}
                            innerTable = {(row, idx) => {
                                return(
                                    <TableRow key={idx}>
                                        <EnhancedTableCell component="th" scope="row" >
                                            <Typography className={classes.noWrap} variant="h1">
                                                {formatedTime(row.date)}
                                            </Typography>
                                        </EnhancedTableCell>                          
                                        <EnhancedTableCell >
                                            <Typography className={classes.noWrap} variant="h1">
                                                { row.preview }...
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell>
                                            <Button style={{width: '34px', 'minWidth': '34px'}} color="primary" variant="contained" onClick={that.showQuestionModal(idx)}>
                                                <Icon>fullscreen</Icon>
                                            </Button>
                                            <SModal title="Question" body={
                                                <Typography ariant="h1">{row.full}</Typography>
                                            } open={that.questionModal[idx] || false} close={that.closeQuestionModal(idx)} width={'auto'}/>
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </div>
                </div>
            }
            { that.tabs['showTab-1'].show &&
                <div className={classes.cardWrapper} >
                    <div className={classes.card}>
                        <EnhancedTable
                            orderBy = {'last'}
                            data = {that.tabs['showTab-1'].data.map(row =>  {
                                return {
                                    'email': row[0].id,
                                    'name': Object.entries(row[0].data.body).sort(([d1, _], [d2, __])=>{
                                                return new Date(d2) - new Date(d1)
                                            })[0][1].name,
                                    'last': formatedTime(Object.keys(row[0].data.body).sort((d1, d2)=>{
                                                return new Date(d2) - new Date(d1)
                                            })[0]),
                                    'number': Object.values(row[0].data.body).length        
                    
                                }
                            })}
                            rowsHeader = {[[
                                { id: 'email', numeric: false, label: 'Email' },
                                { id: 'name', numeric: false, label: 'Name' },
                                { id: 'last', numeric: true, label: 'Last' },
                                { id: 'number', numeric: true, label: '#' },
                            ]]}
                            innerTable = {(row) => {
                                return(
                                    <TableRow hover key={row.email}>
                                        <EnhancedTableCell component="th" scope="row">
                                            <Typography  variant="h1">
                                                {row.email}
                                            </Typography>
                                        </EnhancedTableCell>   
                                        <EnhancedTableCell>
                                            <Typography className={classes.noWrap} variant="h1">
                                                {row.name}
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell numeric>
                                            <Typography className={classes.noWrap} variant="h1">
                                                {row.last}
                                            </Typography>
                                        </EnhancedTableCell>
                                        <EnhancedTableCell numeric > 
                                            <Typography style={{color: '#FC3868'}} variant="button"  >
                                                {row.number}
                                            </Typography>
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </div>
                </div>
            }
            { that.tabs['showTab-2'].show &&
                <div className={classes.cardWrapper} >
                    <div className={classes.card}>
                        <EnhancedTable
                            orderBy = {'date'}
                            rowsPerPage = {10}
                            data = {that.tabs['showTab-2'].data.map(row =>  {
                                return {
                                    'email': row[0].data.email,
                                    'date' : row[0].data.date && formatedTime(row[0].data.date)
                                }
                            })}
                            rowsHeader = {[[
                                { id: 'email', numeric: false, label: 'Email' },
                                { id: 'date', numeric: true, label: 'Date' },
                            ]]}
                            innerTable = {(row) => {
                                return(
                                    <TableRow hover key={row.email}>
                                        <EnhancedTableCell component="th" scope="row">
                                            <Typography  variant="h1">
                                                {row.email}
                                            </Typography>
                                        </EnhancedTableCell>   
                                        <EnhancedTableCell numeric > 
                                            <Typography variant="h1" >
                                                {row.date}
                                            </Typography>
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </div>
                </div>
            }
        </div>)
    }
}




const stylesAnalyticsClick = theme => ({

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

// AnalyticsClick
@withStyles(stylesAnalyticsClick)
@observer
export class AnalyticsClick extends React.Component{

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
                            { id: 'r0', center: true, padding:'checkbox', notAbleSort: true, label: 'Catalog(site)' },
                            { id: 'r1', center: true, padding:'checkbox', notAbleSort: true, label: 'Results(site)' },
                            { id: 'r2', center: true, padding:'checkbox', notAbleSort: true, label: 'Results(app)' },
                        ]]}
                        innerTable = {(row, idx) => {   
                            return(
                                <TableRow hover key={idx}>
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} component="th" scope="row" >
                                        <Typography  variant="h1">
                                            {row.r0}
                                        </Typography>
                                    </EnhancedTableCell>   
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} > 
                                        <Typography variant="h1" >
                                            {row.r1}
                                        </Typography>
                                    </EnhancedTableCell>
                                    <EnhancedTableCell className={cn(classes.borderOff, classes.center)} > 
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
        </div>)
    }
}


const stylesPayouts = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
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

    nopadding: {
        padding: 0
    },

    titleTopBtn: {
        marginBottom: '30px',  
    },

    titleTop: {
        fontWeight: 700,
        letterSpacing: 1,
        opacity: .6,
        transition: 'opacity .5s',      
        '&.activeTab':{
            opacity: 1,
        },
        '&:hover':{
            opacity: .9
        }
    },

    container:{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    additionalTable: {
        marginRight: 0,
        alignSelf: 'flex-start'
    },

    pagination: {
        color: 'white'
    },

    tableBackground: {
        backgroundColor: theme.background.default
    },

    noWrap: {
        whiteSpace: 'nowrap'
    },

    center: {
        textAlign: 'center',
    },

    busy:{
        display: 'inline-block',
        paddingLeft: '20px',
        width: '20px'
    },


})


// Payouts
@withStyles(stylesPayouts, { withTheme: true })
@observer
export class Payouts extends React.Component{

    constructor(props){
        super(props);
        this.getData();
    }

    @observable data = [];
    @observable details = null;
    @observable busy = null;


    @observable selected = [];

    @action.bound
    showDetails = id => e => {
        e && e.preventDefault();

        if(this.details && this.details.id == id){
            this.details = null;
            return;
        }

        if(this.data.filter(d => d[0].id == id)[0][0]){
            this.details = {
                id: this.data.filter(d => d[0].id == id)[0][0]['id'],
                body: this.data.filter(d => d[0].id == id)[0][0]['data']['body']
            };
        }
    }

    @action.bound
    showAllRequests = id => e => {
        e && e.preventDefault();

    }

    @action.bound
    payout = async id => {

        let o = this.data.filter(row => {return row[0].id == id});
        if(o){
            let body = Object.entries(o[0][0]['data']['body']);

            let user = await new Promise(r => Api.auth().onAuthStateChanged(r)).catch(function(error) {
                console.trace(error.stack);
                console.log('User token is outdated. Relogin is required.')
            });
            let idToken = await user.getIdToken();

            let {diffWithdrawDetail, token, totalIMP, wallet, ip} = body.sort(([d1, _], [d2, __]) => {
                return new Date(d2) - new Date(d1)
            })[0][1];

            let that = this,
                fetchBody = {
                    token: idToken,
                    totalIMP,   
                    wallet,
                    diffWithdrawDetail,
                    id,
                    ip
                };
            
            console.log(fetchBody);
            
            let resp = await Api.ourApi(`transaction`, fetchBody);

            console.log(resp);


            if(resp.status){
                return Api.withdraw(id, totalIMP, wallet, token, resp, diffWithdrawDetail);
            }else{
                return Promise.reject(resp)
            }

        }

       
    }

    @action.bound
    payoutClick = id => async e => {
        e && e.preventDefault();
        if(this.busy){
            return 
        }
        this.busy = id;
        try {   
            await this.payout(id).then(async _ => {

                await this.delete(id);
                await this.getData();
                if(this.details && this.details.id === id){
                    this.details = null;
                }

            }, async resp => {

                this.notifyMassage = resp.message + ' \n Check console for errors (Inspect elements => Console).';
                this.isNotifyModalOpened = true;
                this.getData();

            })

        } finally {
            this.busy = null;
        }

    }

    @action.bound
    delete = async id => {

        await Api.delPayoutsRequests(id);
        let index = this.selected.findIndex(sid => sid === id);

        if( index !== -1){
            this.selected.splice(index, 1)
        }
    }

    @action.bound
    deleteClick = id => async e => {
        e && e.preventDefault();

        if(this.busy){
            return 
        }
        this.busy = id;

        try {   

            await this.delete(id);
            await this.getData();
            if(this.details && this.details.id === id){
                this.details = null;
            }
        } finally {
            this.busy = null;
        }
    }

    @action.bound
    payoutAll = async e => {
        e && e.preventDefault();
        if(this.busy){
            return 
        }
        try {

            await this.selected.reduce(async (p, id) => {
                await p;
                if(this.canceled) return Promise.resolve();
                this.busy = id;
                return await this.payout(id).then(async _ => {

                    await this.delete(id);
                    await this.getData();
                    if(this.details && this.details.id === id){
                        this.details = null;
                    }
        
                }, async resp => {
        
                    this.notifyMassage = resp.message + ' \n Check console for errors (Inspect elements => Console).';
                    this.isNotifyModalOpened = true;
                    this.getData();
        
                });
            }, Promise.resolve());

        } finally {
            this.busy = null;
            this.canceled = false;
        }
    }

    @action.bound
    deleteAll = async e => {
        e && e.preventDefault();
        if(this.busy){
            return 
        }

        try {
            
            this.selected.reduce(async (p, id) => {
                await p;
                this.busy = id;
                if(this.details && this.details.id === id){
                    this.details = null;
                }
                return await this.delete(id);
            }, Promise.resolve())

            await this.getData();
            

        } finally {
            this.busy = null;
        }

    }

    @observable canceled = false;
    @action     
    cancel = e => {
        e && e.preventDefault();
        this.canceled = !this.canceled;
    };

    @action
    selectRow = id => _ => {
        const selectedIndex = this.selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(this.selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(this.selected.slice(1));
        } else if (selectedIndex === this.selected.length - 1) {
          newSelected = newSelected.concat(this.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            this.selected.slice(0, selectedIndex),
            this.selected.slice(selectedIndex + 1),
          );
        }

        this.selected = newSelected;
    };

    isSelected = id => {
        return this.selected.indexOf(id) >= 0;
    }

    isBusy = id => {
        return this.busy === id;
    }
   
    @action     
    selectAll = event => {
        if (event.target.checked) {
          this.selected = this.data.map(n => n[0].id);
          return;
        }   
        this.selected = [];
    };


    @action
    getData = async _ => {
  
        this.data = await Api.getPayoutsRequests();
        
    }

    @observable notifyMassage = '';

    @observable isNotifyModalOpened = false    
    @action.bound
    closeNotifyModal = () => {
        this.isNotifyModalOpened = false;
    };

    render(){
        let that = this;
        let {classes} = this.props;

        return( 
            <div className={classes.container}>
                
                <SModal title="Notification" body={this.notifyMassage} open={this.isNotifyModalOpened} close={this.closeNotifyModal}/>  

                <div className={classes.cardWrapper} >
                    <div className={classes.card}>

                        <EnhancedTable
                            selected={this.selected}
                            selectAll={this.selectAll}
                            orderBy = {'last'}
                            data = {that.data.map(row =>  {
                                let body = Object.entries(row[0].data.body).sort(([d1, _], [d2, __]) => {
                                    return d1 - d2
                                })[0][1];

                                return {
                                    'uid': row[0].id,
                                    'coins': roundeWithDec( body['totalIMP'] ),
                                    'wallet': body['wallet'],
                                    'ip': body['ip'],
                                    'last': formatedTime(Object.keys(row[0].data.body).sort((d1, d2) => {
                                                return new Date(d2) - new Date(d1)
                                            })[0]),
                                    'number': Object.values(row[0].data.body).length
                                }
                            })}

                            rowsHeader = {[[
                                { id: 'checkbox', type: "checkbox", padding: 'checkbox' },
                                { id: 'uid', numeric: false, padding: 'dense', label: 'Id' },
                                { id: 'coins', center: true, padding: 'dense',label: 'Coins to payout, ' + Api.getCoinName() },
                                { id: 'wallet', center: true, padding: 'dense',label: 'Wallet' },
                                { id: 'ip', center: true, padding: 'dense',label: 'Ip' },
                                { id: 'last', numeric: true, padding: 'dense', label: 'Date' },
                                { id: 'number', center: true, notAbleSort: true, label: '#' },
                            ]]}

                            footerData = {[{
                                'uid': '',
                                'coins': '',
                                'wallet': 'cancel',
                                'ip': 'delete',
                                'last': 'payout',
                                'number': ''
                            }]}

                            innerTable = {(row) => {
                                let isSelected = this.isSelected(row.uid);
                                let idBusy  = this.isBusy(row.uid);
                                return(
                                    <TableRow 
                                        hover
                                        key={row.uid}
                                        tabIndex={-1}
                                        selected={isSelected}>
                                       <EnhancedTableCell padding={'checkbox'} component="th" scope="row">
                                            {row.uid && <Checkbox
                                                style={{color: 'white'}}
                                                checked={isSelected}
                                                onClick={this.selectRow(row.uid)}
                                            />}
                                        </EnhancedTableCell>  
                                        <EnhancedTableCell component="th" scope="row">
                                            <Typography variant="h1" className={classes.noWrap}>
                                                {row.uid}
                                                <div className={classes.busy}>
                                                    {idBusy && <CircularProgress size={15} color="secondary" />}
                                                </div>
                                            </Typography>
                                        </EnhancedTableCell>   
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.uid && <Button style={{width: '34px', 'minWidth': '34px'}} color="primary" variant="contained" onClick={that.showDetails(row.uid)}>
                                                <Typography className={classes.noWrap} variant="h1">
                                                    {row.coins}
                                                </Typography>
                                            </Button>}
                                        </EnhancedTableCell>
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.wallet != 'cancel' && <Typography className={classes.noWrap} variant="h1">
                                                {row.wallet}
                                            </Typography>}
                                            {row.wallet === 'cancel' && this.selected.length > 0 && this.data.length != 0 && <div> 
                                            
                                              <Button color="secondary" variant={`${this.canceled ? 'contained' : 'outlined'}`} size="small" onClick={that.cancel}>
                                                    <Typography variant="button"  >
                                                        {row.wallet}
                                                    </Typography>
                                                </Button>
                                        
                                            </div>}
                                        </EnhancedTableCell>
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.ip != 'delete' && <Typography className={classes.noWrap} variant="h1">
                                                {row.ip}
                                            </Typography>}

                                            {row.ip === 'delete' && this.selected.length > 0 && this.data.length != 0 && <div> 
                                            
                                              <Button color="secondary" variant="outlined" size="small" onClick={that.deleteAll}>
                                                    <Typography variant="button"  >
                                                        {row.ip}
                                                    </Typography>
                                                </Button>
                                        
                                            </div>}
                                        </EnhancedTableCell>
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.last != 'payout' && <Typography className={classes.noWrap} variant="h1">
                                                {row.last}
                                            </Typography>}

                                            {row.last === 'payout' &&  this.selected.length > 0 && this.data.length != 0 && <div> 
                                              
                                              <Button color="secondary" variant="contained" size="small" onClick={that.payoutAll}>
                                                  <Typography variant="button"  >
                                                      {row.last}
                                                  </Typography>
                                              </Button>

                                            </div>}
                                        </EnhancedTableCell>
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}> 
                                            {row.uid && <Button style={{width: '34px', 'minWidth': '34px'}} color="primary" variant="contained" onClick={that.showAllRequests(row.uid)}>
                                                <Typography style={{color: '#FC3868'}} variant="button"  >
                                                    {row.number}
                                                </Typography>
                                            </Button>}
                                        </EnhancedTableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </div>

                    {this.details && <div>
                        <div className={cn(classes.card, classes.additionalTable)}>

                        <EnhancedTable
                            orderBy = {'date'}
                            rowsPerPage = {5}
                            data = {Object.entries(this.details.body)
                                .sort(([d1, _], [d2, __]) => {
                                    return new Date(d2) - new Date(d1)
                                })
                                .map(([date, {diffWithdrawDetail}]) =>  {
                                return Object.entries(diffWithdrawDetail).map(([entityId, {addr, amount, isLiked, reward, sharedReward}]) => {
                                    return {
                                        'entityId': entityId,
                                        'amount': roundeWithDec( amount ),
                                        'isLiked': isLiked ? 'TRUE' : 'FALSE',
                                        'reward': roundeWithDec( reward ),
                                        'sharedReward': roundeWithDec( sharedReward ),
                                    }
                                });
                            })[0]}

                            rowsHeader = {[[
                                { id: 'a', notAbleSort: true, padding: 'checkbox', center: true, label: this.details.id, colSpan: 6},  
                                ]
                                ,[
                                { id: 'entityId', numeric: false, label: 'Entity Id'},
                                { id: 'amount', center: true, padding: 'dense', center: true, label: 'Amount For Answers, ' + Api.getCoinName() },
                                { id: 'reward', center: true, padding: 'dense', label: 'Reward, ' + Api.getCoinName() },
                                { id: 'sharedReward', center: true, padding: 'dense', label: 'SharedReward, ' + Api.getCoinName() },
                                { id: 'isLiked', numeric: false, padding: 'dense', center: true, label: 'Is Liked?' },

                            ]]}

                            footerData = {
                                
                                (function(){
                                    let calc = Object.entries(this.details.body)
                                                .sort(([d1, _], [d2, __]) => {
                                                    return new Date(d2) - new Date(d1)
                                                }).slice(0, 1)
                                                .map(([date, {diffWithdrawDetail}]) =>  {
                         
                                                    return Object.values(diffWithdrawDetail).reduce((acc, next) => {
                                                  
                                                        return {
                                                            'amount':  acc.amount + next.amount ,
                                                            'sharedReward': +acc.sharedReward + (next.isLiked ? next.sharedReward : 0)
                                                        }
                                                    },{amount: 0, sharedReward: 0});
                                                });
                                    return [{
                                        'entityId': '',
                                        'amount': '',
                                        'isLiked': '',
                                        'reward': '',
                                        'sharedReward': '',
                                    },{
                                        'entityId': 'Σ',
                                        'amount': roundeWithDec( calc[0].amount ),
                                        'isLiked': roundeWithDec( calc[0].amount + calc[0].sharedReward ),
                                        'reward': '',
                                        'sharedReward': roundeWithDec( calc[0].sharedReward ),
                                    },{
                                        'entityId': '',
                                        'amount': '',
                                        'isLiked': 'payout',
                                        'reward': '',
                                        'sharedReward': 'delete', // crunch
                                    }]
                                }).call(this)
                            
                            }

                            innerTable = {(row, idx) => {
                               
                                return(
                                    <TableRow hover key={idx}>
                                        <EnhancedTableCell component="th" scope="row" >
                                            <Typography className={classes.noWrap} variant="h1">
                                                {row.entityId}
                                            </Typography>
                                        </EnhancedTableCell>    

                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            <Typography className={classes.noWrap} variant="h1">
                                                { row.amount }
                                            </Typography>
                                        </EnhancedTableCell>
             
                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            <Typography className={classes.noWrap} variant="h1">
                                                { row.reward }
                                            </Typography>
                                        </EnhancedTableCell>

                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.sharedReward === 'delete' && <div> 
                                            
                                                <Button color="secondary" variant="outlined" size="small"  onClick={that.deleteClick(that.details.id)}>
                                                    <Typography variant="button"  >
                                                        {row.sharedReward}
                                                    </Typography>
                                                </Button>
                                        
                                            </div>}

                                            {row.sharedReward != 'delete' && <Typography className={classes.noWrap} variant="h1">
                                                { row.sharedReward }
                                            </Typography>}
                                        </EnhancedTableCell>

                                        <EnhancedTableCell padding={'dense'} className={cn(classes.center)}>
                                            {row.isLiked === 'payout'  && <div> 
                                              
                                                <Button color="secondary" variant="contained" size="small" onClick={that.payoutClick(that.details.id)}>
                                                    <Typography variant="button"  >
                                                        {row.isLiked}
                                                    </Typography>
                                                </Button>

                                            </div>}

                                            {row.isLiked != 'payout' && <Typography className={classes.noWrap} variant="h1">
                                                { row.isLiked }
                                            </Typography> }
                                        </EnhancedTableCell>
                                      
                                    </TableRow>
                                )
                            }}
                        />
                        </div>
                    </div>}

                </div>
            

        </div>)
    }
}