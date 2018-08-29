import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from './../components/NavLink';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';

import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { listener } from './../utils';

import Api from './../services/Api'

import Grid from '@material-ui/core/Grid';


import main from './../assets/landing/Main@2x.png'
import main2x from './../assets/landing/Main@3x.png'

import zoom from './../assets/landing/zoom.png'
import zoom2x from './../assets/landing/zoom@2x.png'


import EasyControl from './../assets/landing/EasyControl.png'
import EasyControl2x from './../assets/landing/EasyControl2x.png'

import bg2 from './../assets/landing/bg2.png'   
import bg22x from './../assets/landing/bg2@2x.png'

import Unchangeble from './../assets/landing/Unchangeble.png'
import Unchangeble2x from './../assets/landing/Unchangeble@2x.png'

import Customer_Acquisition from './../assets/landing/Custome_acquisition.png'
import Customer_Acquisition2x from './../assets/landing/Customer_acquisition@2x.png'

import explorer_1_dark from './../assets/landing/explorer_1_dark.png'
import explorer_1_dark2x from './../assets/landing/explorer_1_dark@2x.png'

import explorer_2_dark from './../assets/landing/explorer_2_dark.png'
import explorer_2_dark2x from './../assets/landing/explorer_2_dark@2x.png'

import Promotion from './../assets/landing/Promotion.png'
import Promotion2x from './../assets/landing/Promotion@2x.png'

import radius_pink from './../assets/landing/radius-pink.png'
import radius from './../assets/landing/radius.png'
import radius2x from './../assets/landing/radius@2x.png'

import Embed from './../assets/landing/Embed.png'
import Embed2x from './../assets/landing/Embed@2x.png'

import logo from './../assets/quiz-logo.png';

import {
FacebookIcon,
TwitterIcon,
GooglePlusIcon,
LinkedinIcon,
PinterestIcon,
VKIcon,
OKIcon,
TelegramIcon,
WhatsappIcon,
RedditIcon,
TumblrIcon,
MailruIcon,
EmailIcon,
LivejournalIcon,
} from 'react-share';

const styles = theme => ({
  
    page:{
        overflow: 'auto',
        width: '100%',
        height: '100%',
        background: '#fff',
        lineHeight: 1.4
    },
    
    root: {
        flexGrow: 1,
    },

    cardWrapper:{
        display: 'flex',
    },

    topSlide: {
        position: 'relative',
        height: '0',
        padding: '15px',
        paddingBottom: '68%'
    },

    slide: {
        position: 'relative',
        padding: '15px'
    },

    img: {
        width: '100%'
    },

    imgMob: { 
        '@media (max-width: 600px)': {
             width: '100%'
        }
    },


    slideBg : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },

    slideInto:{
        zIndex: 10,
        width: '1140px',
        maxWidth: '100%',
        margin: '0 auto'
    },

    header:{
        color: '#474E65',
        userSelect: 'text',
        fontSize: '36px',
    },

    subHeader:{
        color: '#474E65',
        userSelect: 'text',
        fontSize: '28px',
    },

    description: {
        color: '#474E65',
        zIndex: 10,
        userSelect: 'text'
    },

    btn: {
        borderRadius: 74,
        border: '2px solid #fc3868',
        backgroundColor: '#fc3868'
    },

    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },

    zIndex10: {
        zIndex: 10
    },

    // 1 Slides
    exploreTopBtn: {
        backgroundColor: theme.palette.common.white,
        margin: 2 * theme.spacing.unit,
        marginRight: 0,
        borderRadius: 74,
        marginLeft: 23,
        '@media (max-width: 600px)': {
            margin: theme.spacing.unit,
            marginRight: 0,
            marginLeft: 0
        }
    },

    topheader: {
        opacity: '0.9',
        color: '#ffffff',
        fontSize: '60px',
        fontWeight: '700',
        letterSpacing: '1px',
        marginTop: 160,
        marginLeft: 23,
        userSelect: 'text',
        '@media (max-width: 600px)': {
            marginLeft: 0
        }
    },
    
    topdescription: {
        opacity: '0.9',
        color: '#ffffff',
        fontSize: '16px',
        marginLeft: 23,
        lineHeight: '24px',
        userSelect: 'text',
        '@media (max-width: 600px)': {
            marginLeft: 0
        }
    },

    // 2 Slides


    exploreImg:{
        boxShadow: '0px 12px 120px rgba(206, 0, 0, 0.2)'
    },

    toLeft: {
        '@media (min-width: 600px)': {
            alignItems: 'flex-start',
        }
    },

    toRight: {
        '@media (min-width: 600px)': {
            alignItems: 'flex-end',
        }
    },

    textCenter: {
        textAlign: 'center',
    },

    space120: {
        height: 120
    },

    // 3 Slides

    cardFeature:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 40px',
        borderRadius: '10px',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
        }
    },


    cardFeature1:{
        boxShadow: ' 0 12px 120px rgba(206, 0, 0, .2)'
    },
    cardFeature2:{
        boxShadow: ' 0 12px 120px rgba(148, 0, 206, .2)'
    },
    cardFeature3:{
        boxShadow: ' 0 12px 120px rgba(0, 13, 206, .2)'
    },
    cardFeature4:{
        boxShadow: ' 0 12px 120px rgba(206, 59, 0, .2)'
    },

    contentFeature:{
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 600px)': {
            paddingLeft: '40px'
        }
    },

    spac40: {
        height: 40
    },


    // 4 Slides

    slideSubscribe: {
        padding: '80px 0',
        background: `url(${radius_pink}) rgba(252, 56, 104, .1)   94% 83% / auto no-repeat fixed padding-box border-box`
    },

    subsHeader:{
        color: '#474E65',
        userSelect: 'text',
        fontSize: '40px',
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
    },

    // Footer

    slideFooter:{
        position: 'relative',
        padding: '15px',
        background: '#474E65'
    },
    
    footerMenu:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            flexDirection: 'column'
        }
    },

    footerMenuLink: {
        textDecoration: 'none'
    },

    footerMenuItem:{

    },

    footerIcon: {
        margin: 15,
       // filter: 'grayscale(100%)'
        '& path': {
            fill:  '#474E65'
        },
        '& *:not(path)': {
            fill:  '#81879F'
        }
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
        document.querySelector('header').style.boxShadow = 'none';
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
    onScroll = (e) => {
        if(e.target.scrollTop > 40){
            document.querySelector('header').style = '';
        }else{
            document.querySelector('header').style.boxShadow = 'none';
        }
    };

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
        <div id="landingpage" onScroll={this.onScroll} className={classes.page}>
            <div className={classes.topSlide}>

                <div className={classes.slideBg}><img  className={classes.img} srcSet={`${main2x} 2x, ${main} 1x`} src={main} alt="Quizi" /></div>
                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={3}>
                            <h1 className={classes.topheader}>Quizi.io</h1>
                            <p className={classes.topdescription}>Quizi is a powerful marketing tool. It is a service of convenient and informative quizzes and polls.</p>
                            <Button variant="raised" className={classes.exploreTopBtn} onClick={this.openLoginModal}>Explore</Button> 
                        </Grid>
                
                    </Grid>
                </div>

              
            </div>

            <div className={classes.slide}>
                <div className={classes.slideInto}>
                    <div className={classes.space120} />
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toRight)}>
                            <div className={classes.center}><img  className={classes.exploreImg} srcSet={`${explorer_1_dark2x} 2x, ${explorer_1_dark} 1x`} src={explorer_1_dark} alt="explorer_1" /></div>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.center}>
                            <h2 className={classes.header}>Quizzes or Polls</h2>
                            <p className={cx(classes.description, classes.textCenter)}>Different online tests for you to try or discover answers to the most provocative questions.</p>
                            <Button variant="raised" color="secondary" className={classes.btn} onClick={this.openLoginModal}>Explore</Button> 
                        </Grid>
                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft)}>
                            <div className={classes.center}><img  className={classes.exploreImg} srcSet={`${explorer_2_dark2x} 2x, ${explorer_2_dark} 1x`} src={explorer_2_dark} alt="explorer_2" /></div>
                        </Grid>
                    </Grid>
                    <div className={classes.space120} />
                </div>
            </div>

            <div className={classes.slide}>
                
                <div className={classes.slideBg}><img className={classes.img} srcSet={`${bg22x} 2x, ${bg2} 1x`} src={bg2} alt="Quizi" /></div>
                
                <div className={classes.slideInto}>
                    <div className={classes.space40} />
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={7} className={cx(classes.center, classes.toRight, classes.zIndex10)} >
                            <div className={classes.center}><img  className={classes.imgMob} srcSet={`${zoom2x} 2x, ${zoom} 1x`} src={zoom} alt="zoom" /></div>
                        </Grid>

                        <Grid item xs={12} sm={3} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <h2 className={classes.header}>More than…</h2>
                            <p className={classes.description}>Solving tests and answering questionnaires  and get reward in cryptocurrency</p>
                            <Button variant="raised" color="secondary"  className={classes.btn} onClick={this.openLoginModal}>Explore</Button> 
                        </Grid>
                
                    </Grid>
                </div>

                <div className={classes.space120} />
                <div className={classes.space120} />

                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={3} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div>
                                <h2 className={classes.header}>Easy control</h2>
                                <p className={classes.description}>Useful dashboard allows you to control  rewards and make fast withdraw.</p>
                                <Button variant="raised" color="secondary"  className={classes.btn} onClick={this.openLoginModal}>Explore</Button> 
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={7} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div className={classes.center}><img  className={classes.imgMob} srcSet={`${EasyControl2x} 2x, ${EasyControl} 1x`} src={EasyControl} alt="EasyControl" /></div>
                        </Grid>
                
                    </Grid>
                </div>

            </div>

            <div className={classes.space120} />

            <div className={classes.slide}>
                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.textCenter , classes.toRight, classes.zIndex10)}>
                            <div>
                                <h2 className={classes.header}>Features</h2>
                                <p className={classes.description}>Useful dashboard allows you to control rewards and make fast withdraw.</p>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>
                
                    </Grid>
            
                </div>
            </div>


            <div className={classes.slide}>
                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={6} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature1)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Unchangeble2x} 2x, ${Unchangeble} 1x`} src={Unchangeble} alt="Unchangeble" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={classes.subHeader}>Unchangeble</h3>
                                    <p className={classes.description}>The results of quizzes and polls are being saved in the blockchain. They stay reliable and unchangeable forever. </p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature2)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Customer_Acquisition2x} 2x, ${Customer_Acquisition} 1x`} src={Customer_Acquisition} alt="Customer_Acquisition" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={classes.subHeader}>Customer acquisition</h3>
                                    <p className={classes.description}>The service allows you to attract new users, increase their level of awareness about the brand. </p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className={classes.spac40} />
            
            <div className={classes.slide}>
                <div className={classes.slideInto}>
            
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={6} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature3)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Promotion2x} 2x, ${Promotion} 1x`} src={Promotion} alt="Promotion" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={classes.subHeader}>Promotion</h3>
                                    <p className={classes.description}>Users can pass the test and share it with your friends. For this they will receive reward in the cryptocurrency.</p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature4)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Embed2x} 2x, ${Embed} 1x`} src={Embed} alt="Embed" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={classes.subHeader}>Embed</h3>
                                    <p className={classes.description}>Embedding of polls and quizzes cards allows you to fully control traffic. Work with your own users. </p>
                                </div>
                            </div>
                        </Grid>
                        
                    </Grid>

                </div>
            </div>
            
            <div className={classes.spac40} />

            <div className={cx(classes.slide, classes.slideSubscribe)}>
                <div className={classes.slideInto}>

                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.textCenter , classes.toRight, classes.zIndex10)}>
                            <div>
                                <h2 className={classes.subsHeader}>Subscription</h2>
                                <p className={classes.description}>Subscribe to our news and updates. <br/> No spam, only useful information.</p>
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
                        </Grid>

                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>

                    </Grid>
                </div>
            </div>

            <div className={classes.slideFooter}>
                <div className={classes.slideInto}>
            
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={1} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <a href="/">
                                <img className={classes.logo} src={logo} />
                            </a>
                        </Grid>

                        <Grid item xs={12} sm={8} className={cx(classes.center, classes.zIndex10)}>
                            <div className={cx(classes.footerMenu)}>
                                <NavLink tabIndex='1' to={'/term-of-use'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Features
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                                <NavLink tabIndex='1' to={'/term-of-use'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Tesms of services  
                                        </Typography>
                                        </MenuItem>
                                </NavLink> 
                                <NavLink tabIndex='1' to={'/term-of-use'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Privacy Policy  
                                        </Typography>
                                        </MenuItem>
                                </NavLink> 
                                <NavLink tabIndex='1' to={'/term-of-use'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Contacts  
                                        </Typography>
                                        </MenuItem>
                                </NavLink>  
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={3} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.footerMenu)}> 
                                <a target="_blank" className={cx(classes.footerIcon)} href="/"> 
                                    <TelegramIcon
                                    size={36}
                                    round />
                                </a>
                                <a target="_blank" className={cx(classes.footerIcon)} href="/"> 
                                    <TwitterIcon
                                    size={36}
                                    round />
                                 </a>
                                <a target="_blank" className={cx(classes.footerIcon)} href="/"> 
                                    <FacebookIcon
                                    size={36}
                                    round />
                                 </a>
                            </div>
                        </Grid>
                        
                    </Grid>

                </div>
            </div>
              

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
            <Button size="small" variant="raised" color="secondary" className={classes.closeModal}>close</Button>
            </div>
        </Modal>
    </div>

        );
    }
}





export default Landing