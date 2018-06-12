import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { listener, getMonthName, roundeWithDec } from './../utils';

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
import IMP from './../assets/IMP.svg';


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
        color: 'white',
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },

    footerImageCover:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },

    footerImage:{
        width: 20
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
        open: window.innerWidth > 600 
    }

    componentWillMount(){
        let that = this;

        let open = loadFromStore('userOpenMenu').then(val => {
            if(that.mounted)
                that.setState({open: val});
        }, _ => {})

    }

    componentDidMount(){
        this.mounted = true

    }

    componentWillUnmount(){
        this.mounted = false
    }

      
    toogle = () => {
        this.setState({ open: !this.state.open }, _ => saveToStore('userOpenMenu', this.state.open))
    };

    render() {
        
        let {classes} = this.props;

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
                    <NavLink tabIndex='1' to={'/dashboard/account'} className={classes.link} >
                        <MenuItem selected={/dashboard\/account/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon  className={classes.mainMenuIcon} >account_box</Icon>
                            </ListItemIcon>
                            <Typography variant="display1" >
                                Account
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <NavLink tabIndex='1' to={'/dashboard/history'} className={classes.link} >
                        <MenuItem selected={/dashboard\/history/.test(this.props.location.pathname)} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>
                                <Icon   className={classes.mainMenuIcon} >access_time</Icon>
                            </ListItemIcon>
                            <Typography variant="display1" >
                                History
                            </Typography>
                        </MenuItem>
                    </NavLink>
                </MenuList>
                <div className={classes.footer}>

                <IconButton onClick={this.toogle}>
                    { !this.state.open ? <Icon className={classes.mainMenuIcon} >chevron_right</Icon> : <Icon   className={classes.mainMenuIcon} >chevron_left</Icon>}
                </IconButton>
                

                {this.state.open && <Typography variant="body1"  className={classes.footerText + ' ' + classes.footerImageCover}> 
                    <img className={classes.footerImage} src={IMP} /> 1IMP  =  <img className={classes.footerImage} style={{margin: '0 3px'}} src={BTC}/> 0.00013 BTC 
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
                <Switch>
                    <PrivateRoute role={['user']} exact path="/dashboard" component={Common} /> 
                    <PrivateRoute role={['user']} path="/dashboard/account" component={Account} /> 
                    <PrivateRoute role={['user']} path="/dashboard/history" component={History} />
                </Switch>
            </div>
            </div>
        )
    }
}
const stylesCommon = theme => ({

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap'
    },

    catWrapper:{
        width: '100%'
    },

    catTitle: {
        fontWeight: 700,
        letterSpacing: 1,
        paddingBottom: '20px'
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
            marginRight: 0
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
    },

    responseRow:{
        '@media (max-width: 600px)':{
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1 0 66%'
        }
    },
    progressBar:{
        marginTop: 20,
        marginBottom: 20,
        width: '210px',
        height: '4px',
        borderRadius: '3px',
        backgroundColor: '#bbc2d8',
        position: 'relative',
        overflow: 'hidden'
    },
    progress:{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '4px',
        backgroundColor: '#fc3868'
    },
    col:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 250,
    },
    btnResult: {
        marginTop: 30,
        borderRadius: 74
    },
    title: {
        padding: '0 30px',
        display: 'flex',
        lineHeight: '24px'
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


})
// AKA Dashboard itself
@withStyles(stylesCommon)
@observer
class Common extends React.Component{

    @observable cardsInProcessAndFinished = [];
    @observable totalIMP;
    catsAvailable = new Set();

    componentWillMount(){
        this.getProgress();
    }
    
    @action
    getProgress = () => {
        let that = this;
        when(() => !Auth.logging && !Auth.loadingUserData , () => {
            
            loadFromStore('SlugsCardsInProcess').then(slugs => {
            
                Promise.all(slugs.map(slug => {
                        return CardsModel.allProgress(slug).then((progress , idx) => {
                            Object.assign(that.cardsInProcessAndFinished, {[slug]:{progress:progress}})
                        });
                    })
                ).then(_ => {
                    return Promise.all( slugs.map(slug => {
                        return Api.getAdditionlCardInfo(slug).then(info => {
                            if(!info || !info.cat) return
                            that.catsAvailable.add(info.cat);

                            Object.assign(that.cardsInProcessAndFinished, {[slug]:Object.assign({},that.cardsInProcessAndFinished[slug],{info:info},{slug: slug})})
                            

                            return CardsModel.isLiked(slug);

                            }).then(isLiked => {

                                Object.assign(that.cardsInProcessAndFinished, {[slug]:Object.assign({},that.cardsInProcessAndFinished[slug],{isLiked: isLiked})})
                            })
                    }))
                }).then(_ => {
                    that.forceUpdate();
                    
                    that.totalIMP = Object.values(that.cardsInProcessAndFinished).reduce((acc, prog) => acc+=prog['info'] ? prog['progress'].number * prog['info'].reward : 0,0)
                })
            }, _ => {
                // Api.loadUserData({forceLoad: true}).then(data => {
                //     if(!data || !data['SlugsCardsInProcess']) return
                //     let reload = prompt('Error has happened. Reload page?', 'yes');
                //     if( reload == 'yes' )
                //     window.location.reload();
                // })
            })
        });
    }

    render(){
        let {classes} = this.props;
        let that = this;
        console.log(this.cardsInProcessAndFinished);
        
        return( 
            <div className={classes.cardWrapper} >
            {Array.from(this.catsAvailable).length == 0 && <CircularProgress color="secondary" />}
            { Array.from(this.catsAvailable).map(cat => {
                return <div key={`${cat}`} className={classes.catWrapper}>
                    <Typography variant="display4" className={classes.catTitle}>{cat}:</Typography>
                    <div className={classes.cardWrapper} >
                        { Object.values(that.cardsInProcessAndFinished).filter(o => o['info'] && o['info'].cat == cat).map(({progress, info, slug, isLiked}, idx) => {
                                return  info ? (<div key={`card-${idx}`} className={classes.card}>
                                        <div ref='header' className={classes.header}>
                                            <Link style={{textDecoration: 'none'}} to={slug.replace('/v1','')} ><Typography variant="display1" className={classes.title}>{info.title}<Icon>navigate_next</Icon></Typography> </Link>
                                            <span className={classes.delimeter}></span>
                                            <Typography variant="display1" className={classes.impNum}>  
                                                {progress && roundeWithDec(progress.number * info.reward)} {Api.getCoinName()}
                                            </Typography>
                                        </div>
                                        <div className={classes.cardBodyResult}>
                                            <Typography variant="body1" gutterBottom>
                                                {info.dashTitle}
                                            </Typography>
                                            
                                            {info && info.allCardsNumber > 0  &&  <Typography variant="display2" className={classes.noWrap}>
                                                {info.dashOutput === 'number' && `${Math.floor( progress[info.dashOutput] * 100/ info.allCardsNumber)}%`}
                
                                                {info.dashOutput === 'iqValue' && `${Math.floor(progress[info.dashOutput] )}`}
                                            </Typography>}
                                            { progress && <div className={classes.progressBar}>
                                            <div style={{width: `${progress.number * 100/ info.allCardsNumber}%`}} className={classes.progress}></div>
                                            </div>}
                                            <div className={classes.share}>
                                                {!isLiked &&
                                                <Typography variant="body1" gutterBottom className={classes.resHeader}>
                                                    Share and get +0.5 {Api.getCoinName()}:
                                                </Typography>}
                                                {isLiked &&
                                                <Typography gutterBottom variant="body1" className={classes.resHeader}>
                                                    Share with your friends:
                                                </Typography>}
                                                <Share update={this.getProgress} cardSlug={slug}/>
                                            </div>
                                        </div>
                                    </div>) : <div key={`common-${idx}`} />
                            }) }
                        </div>
                    </div>
                })
            }
            </div>
            )
    }
}
const stylesAccount = theme => ({

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

})

// Account
@withStyles(stylesAccount)
@observer
class Account extends React.Component{

    constructor(props){
        super(props);

        this.getProgress();
        let that = this;
        Api.getWallet(Auth.uid).then(wallet => {
            if(!wallet) return

            that.enteder = true;
            that.wallet = wallet;
        });

    }

    @observable cardsInProcessAndFinished = [];
    @observable totalIMP  = 0;
    @observable enteder = false; 
    @observable wallet = '';
    

    calculatingProgress = false
    @action
    getProgress = async () => {
        let that = this;
        if(this.calculatingProgress) return

        when(() => !Auth.logging && !Auth.loadingUserData , async () => {

            this.calculatingProgress = true;
            await loadFromStore('SlugsCardsInProcess').then(slugs => {
            
                Promise.all(slugs.map(slug => {
                        return CardsModel.allProgress(slug).then((progress, idx) => {
                            Object.assign(that.cardsInProcessAndFinished, {[slug]:{progress:progress}})
                        });
                    })
                ).then(_ => {
                    return Promise.all( slugs.map(slug => {
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
                    that.totalIMP = Math.max(0, Object.values(that.cardsInProcessAndFinished).reduce((acc, prog) => acc+=prog['info'] ? prog['progress'].number * prog['info'].reward + (prog['isLiked'] ? .5000 : 0) : 0, -amountWithdrawn)) 
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

    @observable
    paying = false;

    @action.bound
    payoff = _ => {
        let that = this;
        if(that.paying) return
        if(that.totalIMP <= 0) return
        that.paying = true;

        Api.auth().onAuthStateChanged(function(user) {
            
            if (user) {

                user.getIdToken().then(function(idToken) {

                    fetch(`http://quizi.io/api/getUser/${Auth.uid}`,{
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
                            placeholder="Your impleum wallet adress"
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

                    { this.enteder && <Button variant="raised" disabled={this.totalIMP <= 0} color="secondary" className={classes.submitBtn} onClick={this.payoff}>
                        <Typography variant="button" >Payoff</Typography>
                    </Button>}

                    <SModal title="Something went wrong" body="Maybe is being problems with conection. Try again later." open={this.isErrorModalOpened} close={this.closeErrorModal}/>  
                    
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



const stylesHistory = theme => ({

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

    history:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 22
    },
    historyPic:{
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
    historyDetails:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20, 
    },
    historyName:{
        fontSize: 16,
        fontWeight: 600
    },
    historyEmail:{
        fontSize: 14,
        fontWeight: 400
    },
    historyImp:{
        marginLeft: 'auto',
        flexWrap: 'nowrap',
        display: 'flex',
        alignItems: 'baseline'
    },
    historyImpVal:{
        textTransform: 'uppercase',
        fontSize: 60,
        fontWeight: 200,
        letterSpacing: -1,
        color: '#506980'
    },
    historyImpAddon:{
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

})

// History
@withStyles(stylesHistory)
@observer
class History extends React.Component{

    constructor(props){
        super(props);
        this.getHistory();
    }



    @observable histories = [];

    @action.bound
    getHistory = _ => {
        Api.getHistory(Auth.uid).then(histories => this.histories = histories)
    }

    render(){
        let {classes} = this.props;

        return( 
            <div className={classes.cardWrapper} >

            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <Typography variant="display1" className={classes.title}>
                        History
                    </Typography>
                    <span className={classes.delimeter}></span>

                </div>
                <div className={classes.cardBodyResult}>
                    <div className={classes.history}>
                        <div className={classes.row}>
                            <div className={classes.col}>
                                <Typography  variant="body1" className={classes.bold} gutterBottom>
                                        Wallet
                                </Typography>
                            </div>
                            <div className={classes.col}>
                                <Typography variant="body1" className={classes.bold} gutterBottom>
                                        Amount, {Api.getCoinName()}
                                </Typography>
                            </div>
                            <div className={classes.col}>
                                <Typography variant="body1" className={classes.bold} gutterBottom>
                                        Date
                                </Typography>
                            </div>
                            </div>
                            
                            <Divider className={classes.divider} />

                            {this.histories.map((history, idx) => (
                                <div key={`history-${idx}`} className={classes.row}>

                                    <div className={classes.col}>
                                        <Tooltip  title={history.wallet} placement="top">
                                            <Typography className={classes.short} variant="body1" gutterBottom>
                                                    {history.wallet}
                                            </Typography>
                                        </Tooltip>
                                    </div>

                                    <div className={classes.col}>
                                        <Typography variant="body1" gutterBottom>
                                                {history.amount}
                                        </Typography>
                                    </div>

                                    <div className={classes.col}>
                                        <Typography variant="body1" gutterBottom>
                                                {(new Date(history.date)).getDate()} {getMonthName((new Date(history.date)).getMonth())}, {(new Date(history.date)).getFullYear()}, {(new Date(history.date)).getHours()}: {(new Date(history.date)).getMinutes()}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        </div>)
    }
}


export default Dashboard;