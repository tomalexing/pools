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

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';

import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { listener } from './../utils';

import Api from './../services/Api'

import Grid from '@material-ui/core/Grid';



import Path from './../assets/landing/Path.png'
import Path2x from './../assets/landing/Path@2x.png'
import main2x from './../assets/landing/main@2x.png'
import main from './../assets/landing/main.png'
import Oval from './../assets/landing/Oval.png'
import Oval2x from './../assets/landing/Oval@2x.png'

import bg2 from './../assets/landing/bg2.png'
import bg22x from './../assets/landing/bg2@2x.png'

import explorer_1_dark from './../assets/landing/explorer_1_dark.png'
import explorer_1_dark2x from './../assets/landing/explorer_1_dark@2x.png'

import explorer_2_dark from './../assets/landing/explorer_2_dark.png'
import explorer_2_dark2x from './../assets/landing/explorer_2_dark@2x.png'

import Group9 from './../assets/landing/Group 9.png'

import Promotion from './../assets/landing/Promotion.png'
import Promotion2x from './../assets/landing/Promotion@2x.png'

import radius_pink from './../assets/landing/radius-pink.png'
import radius from './../assets/landing/radius.png'
import radius2x from './../assets/landing/radius@2x.png'

import Unchangeble from './../assets/landing/Unchangeble.png'
import Unchangeble2x from './../assets/landing/Unchangeble@2x.png'

import zoom from './../assets/landing/zoom.png'
import zoom2x from './../assets/landing/zoom@2x.png'

import Customer_Acquisition from './../assets/landing/Customer acquisition.png'
import Customer_Acquisition2x from './../assets/landing/Customer acquisition@2x.png'

import Embed from './../assets/landing/Embed.png'
import Embed2x from './../assets/landing/Embed@2x.png'




const styles = theme => ({
  
    page:{
        overflow: 'auto',
        width: '100%',
        height: '100%',
    },

    cardWrapper:{
        display: 'flex',
    },

    topSlide: {
        
    },
    topSlideBall: {

    },
    cards: {

    },

    topheader: {
        opacity: '0.9',
        color: '#ffffff',
        fontSize: '60px',
        fontWeight: '700',
        letterSpacing: '1',
    },

    topdescription: {
        opacity: '0.9',
        color: '#ffffff',
        fontSize: '16px',
        lineHeight: '24px',
    },

    topSlideBack:{
        backgroundImage: 'linear-gradient(-20deg, rgba(255, 0, 62, 0.8) 0%, rgba(158, 0, 249, 0.8) 100%)',
        width:'100%',
        height: '100%',
    },
    topSlideBackImg:{
        backgroundImage: 'linear-gradient(-20deg, rgba(255, 0, 62, 0.8) 0%, rgba(158, 0, 249, 0.8) 100%)',
        width:'100%',
        height: '100%',
    },
    topSlideRadius:{

    },
    topSlideRadius_pink:{

    },
    topSlideCustomer_Acquisition:{


    },
    topSlideEmbed:{

    },
    topSlideCards:{

    },
    topSlideView:{
        
    },  
    topSlideZoom:{


    },
    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '690px',
        height: '100%',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
        '@media (max-width: 600px)':{
            margin: '10px'
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
        '&:first-child':{
            marginTop: 22
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
        width: 250,
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

    divider: {
        backgroundColor: "#bbc2d8",
    },

    formField:{
        display: 'block',
        width: '100%',
        '&:after': {
            borderBottomColor: '#FC3868',
        },
    },

    formInput:{
        width: '100%',
        fontWeight: 700,
        '&:after, &:hover:before': {
            borderBottomColor: '#FC3868 !important'
        },  
    },

    headerField:{
        fontSize: 16,
        fontWeight: 600,
    },

    submitBtn:{
        float: 'right',
        borderRadius: 74,
    },
    
    agree: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },

    formEmail: {
        width: '100%'
    },

    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        '& #Subscribe-modal-title': {
            margin: `${-1 * theme.spacing.unit * 2}px ${-1 * theme.spacing.unit * 2}px 0 ${-1 * theme.spacing.unit * 2}px`,
            padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #Subscribe-modal-description': {
            minHeight: 50,
            padding: `${theme.spacing.unit * 2}px 0 0`,
        }
    },
    closeModal:{
        float: 'right',
        borderRadius: 15,
        lineHeight: '19px'
    }
});


const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


@withStyles(styles)
@observer
class Landing extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];
    }

    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }


    @observable subscribeValue = '';
    @observable open = false;
    @observable title = '';
    @observable description = '';

    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    @action.bound
    handleOpen = () => {
        this.open = true;
    };

    @action.bound
    handleClose = () => {
        this.open = false;
    };
      
    @action.bound
    onChangeSubscribeValue = e => {
        this.subscribeValue = e.target.value;
    }

    @action.bound
    onSubmit = async e => {
        e.preventDefault();
        if(EMAIL_RE.test(this.subscribeValue)){
            let exist = await Api.subscription(this.subscribeValue);
            
            this.open = true;
            if(!exist){ 
                this.title = "Success!!!";
                this.description = "Your subscription was accepted.";
                
                setTimeout(() => {
                    this.subscribeValue = '';
                }, 100);
            }else{
                this.title = "Denied";
                this.description = "You have already subscribed.";
            }
        }else{
            this.open = true;
            this.title = "Denied";
            this.description = "Check email and try again.";
        }


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

    @observable confirmEmail = false;
    comfirm = name => event => {
        this[name] = event.target.checked;
    } 

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.page}>
            <div className={classes.topSlideBack}>
                    <h1 className={classes.topheader}>Quizi.io</h1>
                    <p className={classes.topdescription}>Quizi is a powerful marketing tool. It is a service of convenient and informative quizzes and polls.</p>
                    <div className={classes.topSlideBack}><img srcSet={`${Path2x} 2x, ${Path} 1x`} src={Path} alt="Quizi" /></div>
                    <div className={classes.topSlideView}><img srcSet={`${main2x} 2x, ${main} 1x`} src={main} alt="Quizi" /></div>
                    <div className={classes.topSlideBall}><img srcSet={`${Oval2x} 2x, ${Oval} 1x`} src={Oval} alt="Quizi" /></div>

                    <div className={classes.topSlideBack}><img srcSet={`${bg22x} 2x, ${bg2} 1x`} src={bg2} alt="Quizi" /></div>

                    <div className={classes.topSlideCards}><img srcSet={`${explorer_1_dark2x} 2x, ${explorer_1_dark} 1x`} src={explorer_1_dark} alt="Quizi" /></div>

                    <div className={classes.topSlideCards}><img srcSet={`${explorer_2_dark2x} 2x, ${explorer_2_dark} 1x`} src={explorer_2_dark} alt="Quizi" /></div>

                    <div className={classes.topSlideZoom}><img srcSet={`${zoom2x} 2x, ${zoom} 1x`} src={zoom} alt="Quizi" /></div>

                    <div className={classes.topSlideGroup}><img srcSet={`${Group9} 1x`} src={Group9} alt="Quizi" /></div>

                    <div className={classes.topSlidePromotion}><img srcSet={`${Promotion2x} 2x, ${Promotion} 1x`} src={Promotion} alt="Quizi" /></div>
                    <div className={classes.topSlideEmbed}><img srcSet={`${Embed2x} 2x, ${Embed} 1x`} src={Embed} alt="Quizi" /></div>
                    <div className={classes.topSlideRadius}><img srcSet={`${radius2x} 2x, ${radius} 1x`} src={radius} alt="Quizi" /></div>

                    <div className={classes.topSlideRadius_pink}><img srcSet={`${radius_pink} 1x`} src={radius_pink} alt="Quizi" /></div>

                    <div className={classes.topSlideUnchangeble}><img srcSet={`${Unchangeble2x} 2x, ${Unchangeble} 1x`} src={Unchangeble} alt="Quizi" /></div>
                    <div className={classes.topSlideCustomer_Acquisition}><img srcSet={`${Customer_Acquisition2x} 2x, ${Customer_Acquisition} 1x`} src={Customer_Acquisition} alt="Quizi" /></div>
            </div>
            
            
            
            
                
                {/* <div className={classes.cardWrapper} >
        
                    <div className={classes.card}>
                        <div ref='header' className={classes.header}>
                            <Typography variant="display1" className={classes.title}>
                                Subscribe
                            </Typography>
                            <span className={classes.delimeter}></span>

                        </div>
                        <div className={classes.cardBodyResult}>
                            <Typography variant="body1" className={classes.headerField} >We sent only news, no spam.
                            </Typography>

                            <form className={classes.form} onSubmit={this.onSubmit} noValidate autoComplete="off">
                                <TextField
                                    id="email"
                                    required
                                    label="Email"
                                    className={classes.formEmail}
                                    type="email"
                                    margin="normal"
                                    value={this.subscribeValue}
                                    onChange={this.onChangeSubscribeValue}
                                    InputProps={{
                                        className: classes.formInput
                                    }}
                                />
                                <div className={classes.agree}>
                                
                                        <Checkbox
                                        checked={this.confirmEmail}
                                        value="email"
                                        onChange={this.comfirm('confirmEmail')}

                                        />
                                        <Typography variant="body1" className={classes.font12  + ' ' + classes.paddingTop1}>
                                            I agree to receive emails from Quizi
                                        </Typography>

                                </div>
                                <Button type="submit"  color="secondary" variant="raised" disabled={!this.confirmEmail} className={classes.submitBtn}>
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div> */}

                <Modal
                    aria-labelledby="Subscribe-modal-title"
                    aria-describedby="Subscribe-modal-description"
                    open={this.open}
                    onClose={this.handleClose}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="display1" id="Subscribe-modal-title">
                        {this.title}
                    </Typography>
                    <Typography variant="body1" id="Subscribe-modal-description">
                        {this.description}
                    </Typography>
                    <Button size="small" variant="raised" color="secondary" className={classes.closeModal} onClick={this.handleClose}>close</Button>
                    </div>
                </Modal>
                </div>
        );
    }
}





export default Landing