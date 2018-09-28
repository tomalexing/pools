import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cx from 'classnames';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { listener, getMonthName, roundeWithDec, loadScript } from './../utils';

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
        backgroundColor: 'white',
        overflow: 'hidden'
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        '&:nth-of-type(2)': {
            marginTop: 20
        }
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
    accountImp:{
        marginLeft: 'auto',
        flexWrap: 'nowrap',
        display: 'flex',
        alignItems: 'baseline'
    },
    accountImpVal:{
        textTransform: 'uppercase',
        fontSize: 60,
        fontWeight: 200,
        letterSpacing: -1,
        color: '#506980'
    },
    accountImpAddon:{
        textTransform: 'uppercase',
        fontweight: 400,
        color: '#506980',
        paddingLeft: 15
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
        backgroundColor: "#bbc2d8"
    },
    headerField:{
        margin: '20px 0 12px',
        fontSize: 16,
    },
    bold:{
        fontWeight: 600
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



})

// Profile
@withStyles(stylesProfile)
@observer
export  class Profile extends React.Component{

    constructor(props){
        super(props);

        this.getProgress();
        let that = this;
        Api.getWallet(Auth.uid).then(wallet => {
            if(!wallet) return

            that.enteder = true;
            that.wallet = wallet;
        });

        window.onloadCaptchaCallback = () => {
            this.grecaptcha = true;
        }

    }

    @observable cardsInProcessAndFinished = {};
    @observable totalIMP  = 0;
    @observable enteder = false; 
    @observable wallet = '';
    @observable grecaptcha;
    

    calculatingProgress = false
    @action
    getProgress = async () => {
        let that = this;
        if(this.calculatingProgress) return

        when(() => !Auth.logging && !Auth.loadingUserData , async () => {

            this.calculatingProgress = true;
            await loadFromStore('commonSlugs').then(slugs => {
            
                Promise.all(Object.entries(slugs).map(([slug, {Progress} ]) => {
                        return CardsModel.allProgress(slug).then((progress, idx) => {
                            Object.assign(that.cardsInProcessAndFinished, {[slug]:{progress: {...progress,...Progress}}})
                        });
                    })
                ).then(_ => {
                    return Promise.all( Object.entries(slugs).map(([slug, _ ]) => {
                        return Api.getAdditionlCardInfo(slug).then(info => {
                            if(!info || !info.reward) return

                            Object.assign(that.cardsInProcessAndFinished, {[slug]:Object.assign({},that.cardsInProcessAndFinished[slug],{info:info})})
                            
                            return CardsModel.isLiked(slug);

                            }).then(isLiked => {
                                
                                Object.assign(that.cardsInProcessAndFinished, {[slug]:Object.assign({},that.cardsInProcessAndFinished[slug],{isLiked: isLiked})})
                            })
                    }))
                })
                .then( _ => {
                    return Api.getWithdrawn(Auth.uid)
                }).then( amountWithdrawn => {
                    that.totalIMP = Math.max(0, Object.values(that.cardsInProcessAndFinished).reduce((acc, prog) => {
                    
                    if(!prog['info']){
                        return acc
                    }

                    let addToTotal = 0;
                    if(prog['info'].cat == 'Quizzes' && prog['progress'].final || prog['info'].cat == 'Polls') {
                        addToTotal = Math.min(( prog['progress'].number ), prog['info'].allCardsNumber) * prog['info'].reward;
                    }

                    return acc += addToTotal + (prog['isLiked'] ? .5000 : 0);
                    

                    }, -amountWithdrawn)) 
                })

            }, _ => {})

            this.calculatingProgress = false;
        });
    }

    @action.bound
    setEntered = _ => {
        if(this.wallet == '') return 
        this.enteder = true;
    }

    setWallet = e => {
        this.wallet = e.target.value;
        Api.saveWallet(Auth.uid, this.wallet);
    }

    @action.bound
    edit = _ => {
        this.enteder = false;
    }

    @observable paying = false;
    @observable captchaVerified = false;
    @observable openCaptcha = false;

    @action.bound
    closeCaptchaModal = () => {
        this.openCaptcha = false;
        for( let el of this.refs.captcha.childNodes){
            this.refs.captcha.removeChild(el);
        }
    };

    @action.bound
    verifyCallback = (resp) => {
        let that = this;
        Api.checkCaptcha(resp).then(resp => resp.json()).then(ans => {
            that.captchaVerified = ans.success;
            that.openCaptcha = false;
            that.payoff();
        }, _ => {
            that.openCaptcha = false;
            that.isErrorModalOpened = true;
        })
    }

    @action.bound
    loadCaptcha = () => {
        let that = this;

        return loadScript('https://www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback', false ).then(_ =>{
            when(() => that.grecaptcha, () => {
                window.grecaptcha.render(that.refs.captcha || "captcha", {
                    'sitekey' : '6LdJP2AUAAAAAHxPTd_XPBXrfH9S5-wfTwpxd_Oc',
                    'callback' : that.verifyCallback,
                    'theme' : 'light'
                });
            });

        }, _ => {
            that.isErrorModalOpened = true;
        })
    }

    @action.bound
    payoff = _ => {
        let that = this;
        if(that.paying) return
        if(that.totalIMP <= 0) return

        if(!this.captchaVerified){
            this.openCaptcha = true;
            this.loadCaptcha()
            return
        }
        
        that.paying = true;
        Api.auth().onAuthStateChanged(function(user) {
            
            if (user) {

                user.getIdToken().then(function(idToken) {

                    fetch(`https://quizi.io/api/getUser/${Auth.uid}`,{
                        method: 'post',
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                            'Accept': 'application/json'},
                        mode: 'cors',
                        body: 'token=' + idToken + '&totalIMP=' + that.totalIMP + '&wallet=' + that.wallet
                    }).then(resp => {
                        return resp.json()}).then(resp => {

                            if(resp.status == false) {
                                that.paying = false;
                                return that.isErrorModalOpened = true;
                            }

                            Api.withdraw(Auth.uid, that.totalIMP, that.wallet, idToken, resp ).then( amount => {
                                that.getProgress();
                                that.paying = false;
                            })
                        })
                        
                  }).catch(function(error) {
                    console.trace(error.stack);
                    that.paying = false;
                  });
        
            } 
            
            else{
              console.error("user not logged in");
            }
        
        });
    }

    @observable isErrorModalOpened = false    
    @action.bound
    closeErrorModal = () => {
        this.isErrorModalOpened = false;
    };

    @observable conformModal = false
    @action.bound
    closeConformModal = () => {
        this.conformModal = false;
    };

    render(){
        let {classes} = this.props;


        return( 
            <div className={classes.cardWrapper} >
       
            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <Typography variant="display1" className={classes.title}>
                        Profile
                    </Typography>
                    <span className={classes.delimeter}></span>

                </div>
                <div className={classes.cardBodyResult}>
                    <div className={classes.account}>
                        <div className={classes.accountPic}>
                            <img src={Auth.photoURL} />
                        </div>
                        <div className={classes.accountDetails}>
                            <Typography className={classes.accountName} variant="body1" gutterBottom>
                                    {Auth.displayName}
                            </Typography>
                   
                            <Typography className={classes.accountEmail} variant="body1" gutterBottom>
                                    {Auth.email}
                            </Typography>
                        </div>
                        <div className={classes.accountImp}>
                            <Typography variant="display1" className={classes.accountImpVal} > { roundeWithDec(this.totalIMP) } </Typography>
                            <Typography variant="display1" className={classes.accountImpAddon} >{Api.getCoinName()}</Typography>
                        </div>
                    </div>
                    <Divider className={classes.divider} />

                    <Typography variant="body1" className={classes.headerField + ' ' + classes.bold} >Your Impleum wallet adress:
                    </Typography>
                    { !this.enteder && <form onSubmit={this.setEntered} noValidate autoComplete="off"> 
                        <TextField
                            id="wallet"
                            required
                            label="wallet"
                            placeholder="Your impleum wallet address"
                            className={classes.formField}
                            type="text"
                            margin="normal"
                            value={this.wallet}
                            onChange={this.setWallet}
                            InputProps={{
                                className: classes.formInput
                            }}
                        />
                    </form> }
                    { !this.enteder && 
                        <Button variant="raised" color="secondary" className={classes.submitBtn} onClick={this.setEntered}>
                            <Typography variant="button">Enter</Typography>
                        </Button>}

                    { this.enteder &&  <div className={classes.walletSetWrapper} >
                            <Typography variant="body1" className={classes.walletSet} >{this.wallet}</Typography>
                            <Button color="primary" size="small" className={classes.editBtn} onClick={this.edit}>
                                <Icon>create</Icon>    
                                <Typography  className={classes.editBtnTypo}  variant="body1">Edit</Typography>
                            </Button>
                        </div>}

                    {this.paying && <CircularProgress size={30} color="secondary"/>}

                    { this.enteder && <Button variant="raised" disabled={this.totalIMP <= 0} color="secondary" className={classes.submitBtn} onClick={this.payoff}>
                        <Typography variant="button" >Payout</Typography>
                    </Button>}

                    <a href="https://impleum.com/wallet/" target="_blank" className={classes.getIMP}>
                        <img className={classes.getIMPmark} src={info} />  
                        <Typography className={classes.getIMPtext} variant="body1">
                                Get Impleum wallet here
                        </Typography>
                    </a>

                    <SModal title="Something went wrong" body="Maybe is being problems with connection. Try again later." open={this.isErrorModalOpened} close={this.closeErrorModal}/>  
                    
                    <SModal title="Verification" width="auto" body={<div className={classes.captcha} ref="captcha" id="captcha"></div>} open={this.openCaptcha} close={this.closeCaptchaModal}/> 

                </div>
            </div>
            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <Typography variant="display1" className={classes.title}>
                        My Data
                    </Typography>
                    <span className={classes.delimeter}></span>
                </div>
                <div className={classes.cardBodyResult}>
                    <Button color="secondary" variant="raised" className={classes.delBtn} onClick={() => {this.conformModal = true;}}>
                            <Icon>delete</Icon>
                            <Typography  className={classes.editBtnTypo}  variant="button">Delete My Progress Data</Typography>
                    </Button>
                    <SModal title="Are you sure?" body={<div>
                        <Button color="secondary" variant="raised" className={classes.delBtn} onClick={() => {clearAll().then(Api.deleteUserData).then(this.closeConformModal)}}>
                            <Icon>delete</Icon>    
                            <Typography  className={classes.editBtnTypo}  variant="button">Yes, Delete My Progress Data</Typography>
                        </Button>
                        </div>} open={this.conformModal} close={this.closeConformModal}/>
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
        height: '100%',
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
        backgroundColor: 'white',
        overflow: 'hidden'
    },

    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 30px',
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
        fontWeight: 600
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

})

const theme = createMuiTheme( Object.assign(themeObject, { 
    typography: {
        ...themeObject.typography,
        body1: {
            fontSize: '14px',
            fontWeight: 400,
            color: '#474e65',
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
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

            let analitics = await fetch(`http://localhost/api/getAnalytics/${Auth.uid}`,{
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'},
                mode: 'cors',
                body: JSON.stringify(fetchBody)
            }).then(resp => resp.json())
            .catch(error =>  {
                console.trace(error.stack);
            });


            that.balanceIncome = await Api.getBalance();
            that.analitics = analitics;
        }
      
    }

    @computed
    get balance(){
        return this.balanceIncome - this.paid;
    }

    @computed
    get paid(){
        return Object.entries(this.analitics).reduce((allpayouts ,[path, {overall, payouts, responses, title, reward, sharedReward, sharedCount, sharedPayoutsCount}]) => {
            return allpayouts + payouts + sharedReward * sharedPayoutsCount
        }, 0)
    }

    @computed
    get blocked(){
        return Object.entries(this.analitics).reduce((allblocked ,[path, {overall, payouts, responses, title, reward, sharedReward, sharedCount, sharedPayoutsCount}]) => {
            return allblocked + overall + sharedReward * sharedCount - payouts - sharedReward * sharedPayoutsCount
        }, 0)
    }

    @computed
    get available(){
        return this.balance - this.blocked
    }


    makeVisibleInIframeOnly(){

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
                                <Typography variant="body1" >
                                    {roundeWithDec(this.available)} {Api.getCoinName()}      
                                </Typography>
                            </div>

                            <div style={{width: '100px'}} className={classes.col}>
                                <Typography variant="body1" >
                                    {roundeWithDec(this.blocked)} {Api.getCoinName()}      
                                </Typography>
                            </div>

                            <div style={{ width: '100px'}} className={classes.col}>
                                <Typography variant="body1" >
                                    {roundeWithDec(this.balance)} {Api.getCoinName()}      
                                </Typography>
                            </div>
                        </div>
                                
                    </div>

                </div>
            </div>
        )
    }

    render(){
        let {classes} = this.props;

        return(

        <MuiThemeProvider theme={theme}>
            <div className={classes.cardWrapper} >

            { this.getBalanceInfo() }

            <div className={classes.addIMP}>
                <Link className={classes.addIMPLink} to='/contact'></Link>
                <Typography  variant="body1" className={classes.addIMPTitle}>
                    Add IMP
                </Typography>
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
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Iframe only
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Reward
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Responses
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Payouts
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '250px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Payouts(counting shares)
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
                        <div style={{width: '100px'}} className={classes.col}>
                            <Typography variant="display1" className={classes.bold}>
                                Blocked
                            </Typography>
                        </div>
                        <span className={classes.delimeter}></span>
            
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
                            { Object.entries(this.analitics).map(([path, {overall, payouts, responses, title, reward, sharedReward, sharedCount, sharedPayoutsCount}], idx, analitics) => {
                                return [<div key={`history-${idx}`} className={classes.row}>

                                    <div style={{ alignItems: 'flex-start', width: '180px'}} className={classes.col}>
                                        <Typography className={classes.short} variant="body1" >
                                            {title}
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Switch
                                            checked={false}
                                            value="checkedA"
                                        />
                                    </div>
                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Switch
                                            checked={true}
                                            onChange={this.makeVisibleInIframeOnly()}
                                            value="checkedA"
                                        />
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="body1" >
                                            {roundeWithDec(reward)} {Api.getCoinName()}                                        
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="body1" >
                                            {responses}
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="body1" >
                                            {roundeWithDec(payouts)} {Api.getCoinName()}         
                                        </Typography>
                                    </div>

                                    <div style={{width: '250px'}} className={classes.col}>
                                        <Typography variant="body1" >
                                            {roundeWithDec(payouts + sharedReward * sharedPayoutsCount)} {Api.getCoinName()}         
                                        </Typography>
                                    </div>

                                    <div style={{width: '100px'}} className={classes.col}>
                                        <Typography variant="body1" >
                                            {roundeWithDec(overall + sharedReward * sharedCount - payouts - sharedReward * sharedPayoutsCount)} {Api.getCoinName()}         
                                        </Typography>
                                    </div>
                                    <div style={{width: '100px'}} className={classes.col}>
                                       
                                    </div>
                                   
                                </div>,
                                analitics.length - 1 !=  idx ? <Divider key={`historydiv-${idx}`} className={classes.divider} /> : <div key={`historydiv-${idx}`}/> ]
                                })
                            }
                    </div>

                </div>
            </div>
        </div> </MuiThemeProvider>)
    }
}
