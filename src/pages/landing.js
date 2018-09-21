import React from 'react';

import Button from '@material-ui/core/Button';
import cx from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { NavLink } from './../components/NavLink';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';

import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { Link, Redirect } from 'react-router-dom';

import Api from './../services/Api'
import Auth from './../models/Auth';
import Grid from '@material-ui/core/Grid';


import main from './../assets/landing/Main@2x.png'
import main2x from './../assets/landing/Main@3x.png'

import mainP from './../assets/landing/MainP.png'
import mainP2x from './../assets/landing/MainP@2x.png'

import mainM from './../assets/landing/MainM.png'
import mainM2x from './../assets/landing/MainM@2x.png'

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

import Oval from './../assets/landing/Oval.png'
import Oval2x from './../assets/landing/Oval@2x.png'

import Oval2 from './../assets/landing/Oval2.png'
import Oval22x from './../assets/landing/Oval2@2x.png'

import Oval3 from './../assets/landing/Oval3.png'
import Oval32x from './../assets/landing/Oval3@2x.png'

import logo from './../assets/quiz-logo.png';
import logo2x from './../assets/quiz-logo2x.png';

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

import InstaIcon from './../assets/insta.svg'

const styles = theme => ({
  
    page:{
        overflow: 'auto',
        width: '100%',
        height: '100%',
        background: '#fff',
        lineHeight: 1.4,
        overflowX: 'hidden',
        touchAction: 'pan-y'
    },
    
    root: {
        flexGrow: 1,
    },

    cardWrapper:{
        display: 'flex',
    },


    slide: {
        position: 'relative',
        padding: '15px',
        width: '100%'
    },

    img: {
        width: '100%'
    },

    imgMob: { 
        '@media (max-width: 769px)': {
             width: '100%'
        }
    },

    centerOnMobile: { 
        '@media (max-width: 769px)': {
            textAlign: 'center'
        }
    },

    displayOffOnMobile: { 
        '@media (max-width: 769px)': {
            display: 'none'
        }
    },

    displayOnlyOnMobile: { 
        '@media (min-width: 768px)': {
            display: 'none'
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
        zIndex: 9
    },

    zIndex10: {
        zIndex: 10
    },

    // 1 Slides

    topSlide: {
        position: 'relative',
        height: '0',
        padding: '15px',
        paddingBottom: '68%',
        width: '100%',
        '@media (max-width: 768px) and (min-width: 414px)': {
            paddingBottom: '160%',
        },
        '@media (max-width: 414px)': {
            paddingBottom: '200%',
        }
    },

    slideBgD : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'none',
        '@media (min-width: 769px)': {
            display: 'block'
        }
    },

    slideBgP : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'none',
        '@media (max-width: 768px) and (min-width: 414px)': {
            display: 'block'
        }
    },

    slideBgM : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'none',
        '@media (max-width: 414px)': {
            display: 'block'
        }
    },

    exploreTopBtn: {
        backgroundColor: theme.palette.common.white,
        margin: 2 * theme.spacing.unit,
        marginRight: 0,
        borderRadius: 74,
        marginLeft: 23,
        '@media (max-width: 768px)': {
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
        '@media (max-width: 768px)': {
            marginLeft: 0,
            marginTop: 100,
        }
    },
    
    topdescription: {
        opacity: '0.9',
        color: '#ffffff',
        fontSize: '16px',
        marginLeft: 23,
        lineHeight: '24px',
        userSelect: 'text',
        '@media (max-width: 768px)': {
            marginLeft: 0
        }
    },

    ovalContainer: {
        position: 'absolute',
        top: '450px',
        left: 0,
        '@media (max-width: 768px)': {
            display: 'none' 
        },
    },

    oval: {
        opacity: 0,
        transition: 'opacity 0.5s ease-in-out'
    },

    ovalEndState: {
        opacity: 1
    },

    ovalContainer1: {
        position: 'absolute',
        bottom: '13%',
        right: '10%',
        '@media (max-width: 768px)': {
            display: 'none' 
        },
    },

    oval1:{
        boxShadow: '0 12px 120px 0 rgba(206, 0, 0, .2)',
        borderRadius: '50%',
        overflow: 'hidden',
        transition: 'transform 0.1s ease-in-out',
    },

    // 2 Slides

    exploreImg:{
        position: 'relative',
        boxShadow: '0px 12px 120px rgba(206, 0, 0, 0.2)',
        transition: 'box-shadow 0.5s cubic-bezier(.38,-0.3,.41,1.83), transform 0.5s cubic-bezier(.38,-0.3,.41,1.83)',
        transform: 'scale(1) translateZ(0)',
        willChange: 'transform',
        borderRadius: 5,
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        width: 200,
        height: 307,
        '&:hover':{
            boxShadow: '0 12px 120px 20px rgba(206, 0, 0, .2)',
            transform: 'scale(1.5) translateZ(0)'
        },
    },

    toLeft: {
        '@media (min-width: 768px)': {
            alignItems: 'flex-start',
        }
    },

    toRight: {
        '@media (min-width: 768px)': {
            alignItems: 'flex-end',
        }
    },

    textCenter: {
        textAlign: 'center',
    },

    space120: {
        height: 120
    },

    ovalContainer2: {
        position: 'absolute',
        bottom: '44%',
        right: '35%'
    },

    oval2:{
        boxShadow: '0 12px 120px 0 rgba(206, 0, 0, .2)',
        borderRadius: '50%',
        overflow: 'hidden',
        transition: 'transform 0.1s ease-in-out',
    },

    ovalContainer3: {
        position: 'absolute',
        bottom: '34%',
        right: '20%',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },

    oval3:{
        boxShadow: '0 12px 120px 0 rgba(206, 0, 0, .2)',
        borderRadius: '50%',
        overflow: 'hidden',
        transition: 'transform 0.1s ease-in-out',
    },

    enlargeWrapper:{
        position: 'relative',
        cursor: 'crosshair',
        touchAction: 'none',
        boxShadow: '0 12px 120px 0 rgba(0,0,0, .2)',
        overflow: 'hidden',
        borderRadius: 8,
        '&:hover $enlargeRange':{
            visibility: 'visible'
        }
    },

    enlarge:{
        position: 'absolute',
        zIndex: 10,
        top: 30,
        width: 300,
        height: 300,
        border: '2px solid #fc3868',
        overflow: 'hidden',
        boxShadow: '0 20px 60px 0 rgba(0,0,0, .2)',
        borderRadius: '50%',
        backgroundColor: '#fff',
        zIndex: 10,
        '& img': {
            position: 'absolute'
        },
        '@media (max-width: 768px)': {
            width: 100,
            height: 100,
        },
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },

    enlargeRange:{
 
        top: '0',
        left: '0',
        position: 'absolute',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '1px solid #fc3868',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },


    // 3 Slides

    cardFeature:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 40px',
        borderRadius: '10px',
        transition: 'box-shadow 0.5s cubic-bezier(.38,-0.3,.41,1.83), transform 0.5s cubic-bezier(.38,-0.3,.41,1.83)',

        transform: 'scale(1) translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',

        '&:hover':{
            transform: 'scale(1.05) translateZ(0)'
        },

        '@media (max-width: 768px)': {
            flexDirection: 'column',
        }

    },

    cardFeature1:{
        boxShadow: ' 0 12px 120px rgba(206, 0, 0, .2)',
        '&:hover':{
            boxShadow: ' 0 12px 120px 20px rgba(206, 0, 0, .2)',
        }
    },

    cardFeature2:{
        boxShadow: ' 0 12px 120px rgba(148, 0, 206, .2)',
        '&:hover':{
            boxShadow: ' 0 12px 120px 20px rgba(148, 0, 206, .2)',
        }
    },

    cardFeature3:{
        boxShadow: ' 0 12px 120px rgba(0, 13, 206, .2)',
        '&:hover':{
            boxShadow: ' 0 12px 120px 20px rgba(0, 13, 206, .2)',
        }
    },

    cardFeature4:{
        boxShadow: ' 0 12px 120px rgba(206, 59, 0, .2)',
        '&:hover':{
            boxShadow: ' 0 12px 120px 20px rgba(206, 59, 0, .2)',
        }
    },

    contentFeature:{
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 768px)': {
            paddingLeft: '40px'
        }
    },

    spac40: {
        height: 40
    },


    // 4 Slides

    slideSubscribe: {
        padding: '80px 0',
        background: `url(${radius_pink}) rgba(252, 56, 104, .1)   94% 127% / auto no-repeat fixed padding-box border-box`,
        width: '100%',
        overflowX: 'hidden'
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
    logo:{
        width: 'auto',
        height: '38px'
    },
    slideFooter:{
        position: 'relative',
        padding: '15px',
        background: '#474E65',
        overflow: 'hidden',
        width: '100%'
    },
    
    footerMenu:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            flexDirection: 'column'
        }
    },

    footerMenuInlineOnMobile:{
        '@media (max-width: 768px)': {
            flexDirection: 'row'
        }
    },

    footerMenuLink: {
        textDecoration: 'none'
    },

    footerMenuItem:{

    },

    footerIcon: {
        margin: 15,
        width: '30px',
        '& img': {
            width: '100%',
            verticalAlign: 'middle'
        },
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
        this.parallexRef = React.createRef();

    }

    componentDidMount(){
        if(window.innerWidth > 768){
            window.Pace.once('done', this.animateOval)

            this.initParallax();
        }

    }



    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    i = 1;
    @observable oval1 = false;
    @observable oval2 = false;
    @observable oval3 = false;

    @action.bound
    animateOval = _  => {

        if(this.i > 3) return
        setTimeout(_ => {
            this[`oval${this.i++}`] = true; 
            this.animateOval()
        } , 1500/ this.i)
    }

    @action.bound
    initParallax = _ => {
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }
        var observer = new IntersectionObserver(entries =>  {
            entries.forEach(entry => {
                this.allowParallax = entry.isIntersecting
            });
          }, options);
        if(this.parallexRef.current instanceof Element)
        observer.observe(this.parallexRef.current);
    }

    @observable subscribeValue = '';
    @observable open = false;
    @observable title = '';
    @observable description = '';
    @observable parallaxY = 0;
    @observable allowParallax = false;
    startParallaxY = -1;

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
    @action.bound
    onScroll = e => {
        if(e.target.scrollTop > 140){
            document.querySelector('header').style = '';
        }else{
            document.querySelector('header').style.boxShadow = 'none';
        }

        if(this.allowParallax){
            if(this.startParallaxY == -1) this.startParallaxY = e.target.scrollTop;
            this.parallaxY = (e.target.scrollTop - this.startParallaxY) / 10
            
        }
    };


    @observable cX = 0;
    @observable cY = 0;

    @action.bound
    onMouseMove = e => {
        if(window.innerWidth > 768){

            this.cX = e.clientX - window.innerWidth/2;
            this.cY = e.clientY - window.innerHeight/2;

        }
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

    onMouseMoveFeature = e => {

        let  {left, top, width, height} = e.currentTarget.firstElementChild.getBoundingClientRect();
        let enlargeRange = document.getElementById('enlargeRange');
        enlargeRange.style.top =  Math.max(Math.min(e.clientY - top - 30 , height - 60), 0)   + 'px';
        enlargeRange.style.left =  Math.max(Math.min(e.clientX - left - 30, width - 60), 0) + 'px';

        let enlargeCover = document.getElementById('enlarge');
        let enlarge = document.getElementById('enlarge').firstElementChild;
        
        let {width:widthZoomed, height:heightZoomed} = enlarge.getBoundingClientRect();
        let {width:widthCoverZoomed, height:heightCoverZoomed} = enlargeCover.getBoundingClientRect();

        let koef1 = heightZoomed/height,
            koef2 = widthZoomed/width;
            console.log(koef2)

        enlarge.style.top =  Math.max( Math.min(-(e.clientY - top) * koef1 + heightCoverZoomed/2 , 0), -(heightZoomed) + heightCoverZoomed/2) + 'px';
        enlarge.style.left = Math.max( Math.min(-(e.clientX - left ) * koef2, 0) + widthCoverZoomed/2 , -(widthZoomed) + widthCoverZoomed/2) + 'px';

    }

    onMouseEnterFeature = () => {
        let enlargeWrapper = document.getElementById('enlarge')
        enlargeWrapper.style.visibility = 'visible';
        enlargeWrapper.style.zIndex = '10';
    }

    onMouseLeaveFeature = () => {
        let enlargeWrapper = document.getElementById('enlarge')
        //enlargeWrapper.style.visibility = 'hidden';
        //enlargeWrapper.style.zIndex = '-1';
    }

    render() {
        const { classes } = this.props;
        if(Auth.isAuthenticated){
            return <Redirect to={'/categories'}/>
        }
        
        return (
        <div id="landingpage" onMouseMove={this.onMouseMove} onScroll={this.onScroll} className={classes.page}>
            <div className={classes.topSlide}>

                <div className={classes.slideBgD}><img  className={classes.img} srcSet={`${main2x} 2x, ${main} 1x`} src={main} alt="Quizi" /></div>
                <div className={cx(classes.slideBgP)}><img className={classes.img} srcSet={`${mainP2x} 2x, ${mainP} 1x`} src={mainP} alt="Quizi" /></div>
                <div className={cx(classes.slideBgM)}><img className={classes.img} srcSet={`${mainM2x} 2x, ${mainM} 1x`} src={mainM} alt="Quizi" /></div>
                <div className={classes.ovalContainer}>
                    <svg width="156px" height="300px" viewBox="0 0 156 300" version="1.1" xmlns="http://www.w3.org/2000/svg" >

                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.2">
                            <g transform="translate(0.000000, -458.000000)" fill="#FFFFFF" id="radius">
                                <g transform="translate(-144.000000, 458.000000)">
                                    <circle className={cx(classes.oval, {[classes.ovalEndState]: this.oval3})} cx="150" cy="150" r="150"></circle>
                                    <circle className={cx(classes.oval, {[classes.ovalEndState]: this.oval2})}  cx="149.5" cy="150.5" r="107.5"></circle>
                                    <circle className={cx(classes.oval, {[classes.ovalEndState]: this.oval1})}  cx="149" cy="151" r="61"></circle>
                                </g>
                            </g>
                        </g>

                    </svg>
                </div>
                <div className={classes.ovalContainer1}>
                    <img style={{transform: `translate3d(${-this.cX / 30}px, ${-this.cY / 60}px, 0)`}} className={classes.oval1} srcSet={`${Oval2x} 2x, ${Oval} 1x`} src={Oval} alt="Quizi" />
                </div>
               
                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <h1 className={classes.topheader}>Quizi.io</h1>
                            <p className={classes.topdescription}>Quizi is a powerful marketing tool. It is a service of convenient and informative quizzes and polls.</p>
                            <Button variant="raised" className={classes.exploreTopBtn} href={'/categories'}>Explore</Button> 
                        </Grid>
                
                    </Grid>
                </div>

              
            </div>

            <div className={classes.slide}>
                <div className={classes.slideInto}>
                    <div className={classes.space120} />
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <Link style={{textDecoration: 'none'}} to={'/categories/quizzes'}> 
                                <div className={classes.center}>
                                    <svg className={classes.exploreImg}  viewBox="0 0 300 460" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <defs>
                                            <rect id="path-1" x="0" y="0" width="240" height="150" rx="8"></rect>
                                            <filter x="-12.9%" y="-19.3%" width="125.8%" height="141.3%" filterUnits="objectBoundingBox" id="filter-2">
                                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                                <feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                                            </filter>
                                        </defs>
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g>
                                                <rect fill="#FFFFFF" x="0" y="0" width="300" height="460" rx="8"></rect>
                                                <path d="M0,7.99464702 C0,3.57932539 3.57813388,0 8.0049239,0 L291.995076,0 C296.416073,0 300,3.57762838 300,7.99464702 L300,200 L0,200 L0,7.99464702 Z" id="BG-Card" fill="#FC3868"></path>
                                                <g  transform="translate(30.000000, 25.000000)">
                                                    <g>
                                                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                                                    </g>
                                                    <rect fill="#474E65" x="20" y="20" width="200" height="12" rx="6"></rect>
                                                    <rect fill="#474E65" x="20" y="42" width="170" height="12" rx="6"></rect>
                                                    <rect fill="#BCC2D9" x="20" y="84" width="40" height="12" rx="6"></rect>
                                                    <rect fill="#BCC2D9" x="20" y="107" width="40" height="12" rx="6"></rect>
                                                    <rect fill="#34E8C0" x="120" y="84" width="40" height="12" rx="6"></rect>
                                                    <rect fill="#BCC2D9" x="120" y="107" width="40" height="12" rx="6"></rect>
                                                </g>
                                                <path d="M133,272 L167,272" id="Line" stroke="#474E65" strokeWidth="2" strokeLinecap="square"></path>
                                                <text id="Quizes" fontFamily="Montserrat-Bold, Montserrat" fontSize="22" fontWeight="bold" letterSpacing="1" fill="#474E65">
                                                    <tspan x="109.55" y="249">Quizes</tspan>
                                                </text>
                                                <text id="On-this-page,-you-wi" fontFamily="OpenSans, Open Sans" fontSize="18" fontWeight="normal" fill="#474E65">
                                                    <tspan x="42.1098633" y="312">On this page, you will find </tspan>
                                                    <tspan x="48.5610352" y="336">different online tests for </tspan>
                                                    <tspan x="107.794922" y="360">you to try.</tspan>
                                                </text>
                                                <g id="BN_Follow-Copy-18" transform="translate(88.000000, 393.000000)">
                                                    <path d="M1,18 C1,27.3902508 8.61045613,35 18.0001623,35 L109.999838,35 C119.391021,35 127,27.3900723 127,18 C127,8.60974918 119.389544,1 109.999838,1 L18.0001623,1 C8.60897872,1 1,8.60992771 1,18 Z" id="BG" stroke="#FC3868" strokeWidth="2" fill="#FC3868"></path>
                                                    <text id="Choose-test" fontFamily="Montserrat-Bold, Montserrat" fontSize="14" fontWeight="bold" letterSpacing="0.875" fill="#FFFFFF">
                                                        <tspan x="16.6275" y="22">Choose test</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.center}>
                            <h2 className={classes.header}>Quizzes or Polls</h2>
                            <p className={cx(classes.description, classes.textCenter)}>Different online tests for you to try or discover answers to the most provocative questions.</p>
                            <Button variant="raised" color="secondary"  className={classes.btn} href={'/categories'}>Explore</Button> 
                        </Grid>
                        <Grid item xs={12} sm={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <Link style={{textDecoration: 'none'}} to={'/categories/polls'}> 
                                <div className={classes.center}>
                                <svg className={classes.exploreImg} width="300px" height="460px" viewBox="0 0 300 460" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g >
                                                <rect fill="#FFFFFF" x="0" y="0" width="300" height="460" rx="8"></rect>
                                                <path d="M0,7.99464702 C0,3.57932539 3.57813388,0 8.0049239,0 L291.995076,0 C296.416073,0 300,3.57762838 300,7.99464702 L300,200 L0,200 L0,7.99464702 Z" id="BG-Card" fill="#FC3868"></path>
                                                <g transform="translate(30.000000, 25.000000)">
                                                    <g>
                                                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                                                    </g>
                                                    <rect id="Rectangle-7" fill="#BCC2D9" x="20" y="40" width="90" height="70" rx="8"></rect>
                                                    <rect id="Rectangle-7-Copy" fill="#BCC2D9" x="130" y="40" width="90" height="70" rx="8"></rect>
                                                    <rect id="Rectangle-6" fill="#474E65" x="20" y="20" width="200" height="12" rx="6"></rect>
                                                    <rect id="Rectangle-6-Copy-4" fill="#FC3868" x="180" y="118" width="40" height="13" rx="6.5"></rect>
                                                </g>
                                                <path d="M133,272 L167,272" id="Line" stroke="#474E65" strokeWidth="2" strokeLinecap="square"></path>
                                                <text id="Polls" fontFamily="Montserrat-Bold, Montserrat" fontSize="22" fontWeight="bold" letterSpacing="1" fill="#474E65">
                                                    <tspan x="121.347" y="249">Polls</tspan>
                                                </text>
                                                <text fontFamily="OpenSans, Open Sans" fontSize="18" fontWeight="normal" fill="#474E65">
                                                    <tspan x="49.8793945" y="312">Discover answers to the </tspan>
                                                    <tspan x="77.8725586" y="336">most provocative </tspan>
                                                    <tspan x="110.80957" y="360">question.</tspan>
                                                </text>
                                                <g transform="translate(88.000000, 393.000000)">
                                                    <path d="M1,18 C1,27.3902508 8.61045613,35 18.0001623,35 L109.999838,35 C119.391021,35 127,27.3900723 127,18 C127,8.60974918 119.389544,1 109.999838,1 L18.0001623,1 C8.60897872,1 1,8.60992771 1,18 Z" id="BG" stroke="#FC3868" strokeWidth="2" fill="#FC3868"></path>
                                                    <text id="Discover" fontFamily="Montserrat-Bold, Montserrat" fontSize="14" fontWeight="bold" letterSpacing="0.875" fill="#FFFFFF">
                                                        <tspan x="29.7" y="22">Discover</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                    <div className={classes.space120} />
                </div>
            </div>
            <div className={cx(classes.space120, classes.displayOffOnMobile)} />
            <div className={cx(classes.space120, classes.displayOffOnMobile)} />

            <div className={classes.slide}>
                
                <div className={classes.slideBg}><img className={classes.img} srcSet={`${bg22x} 2x, ${bg2} 1x`} src={bg2} alt="Quizi" /></div>
                <div className={classes.ovalContainer2}>
                    <img style={{transform: `translate3d(${-this.cX / 10}px, ${-this.cY / 30}px, 0)`}} className={classes.oval2} srcSet={`${Oval22x} 2x, ${Oval2} 1x`} src={Oval2} alt="Quizi" />
                </div>
                <div className={classes.ovalContainer3}>
                    <img style={{transform: `translate3d(${this.cX / 40}px, ${this.cY / 80}px, 0)`}} className={classes.oval3} srcSet={`${Oval32x} 2x, ${Oval3} 1x`} src={Oval3} alt="Quizi" />
                </div>
                <div className={classes.slideInto}>
                    <div className={cx(classes.space40, classes.displayOffOnMobile)} />
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item xs={12} sm={3}  ></Grid>

                        <Grid item xs={12} sm={5}  className={cx(classes.center, classes.toRight, classes.zIndex10)} >
                            <div className={classes.enlargeWrapper} onMouseMove={
                                this.onMouseMoveFeature} onMouseEnter={this.onMouseEnterFeature} onMouseLeave={this.onMouseLeaveFeature}>
                                <div className={classes.center}><img  className={classes.imgMob} srcSet={`${zoom2x} 2x, ${zoom} 1x`} src={zoom} alt="zoom" />
                                </div>
                                <div id="enlargeRange"  style={{top: '263px', left: '518px'}} className={classes.enlargeRange}></div>
                                <div id="enlarge" className={classes.enlarge}><img style={{top: '-436px', left: '-947px'}} src={zoom2x} alt="zoom" /> </div>

                            </div>    
                        </Grid>
                        <Grid item xs={12} sm={1}  ></Grid>
                        <Grid item xs={12} sm={3}  className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <h2 className={classes.header}>More than…</h2>
                            <p className={classes.description}>Solving tests and answering questionnaires  and get reward in cryptocurrency</p>
                            <Button variant="raised" color="secondary"  className={classes.btn}  href={'/categories'}>Explore</Button> 
                        </Grid>
                
                    </Grid>
                </div>

                <div className={classes.space120} />
                <div className={cx(classes.space120, classes.displayOffOnMobile)} />
                <div className={cx(classes.space120, classes.displayOffOnMobile)} />

                <div className={classes.slideInto}>
                    <Grid container className={classes.root} spacing={40} >

                        <Grid item xs={12} sm={4}  className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.centerOnMobile)} >
                                <h2 className={classes.header}>Easy control</h2>
                                <p className={classes.description}>Useful dashboard allows you to control  rewards and make fast withdraw.</p>
                                <Button variant="raised" color="secondary"  className={classes.btn}  href={'/categories'}>Explore</Button> 
                            </div>
                        </Grid>
                        
                        <Grid item xs={12} sm={1} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                        </Grid>

                        <Grid item xs={12} sm={7} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div ref={this.parallexRef} style={{transform: `translate3d(0, ${this.parallaxY}px, 0)`}} className={classes.center}><img  className={classes.imgMob} srcSet={`${EasyControl2x} 2x, ${EasyControl} 1x`} src={EasyControl} alt="EasyControl" /></div>
                        </Grid>
                
                    </Grid>
                </div>

            </div>

            <div className={cx(classes.space120, classes.displayOffOnMobile)} />

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

                        <Grid item xs={12} sm={12} md={6} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature1)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Unchangeble2x} 2x, ${Unchangeble} 1x`} src={Unchangeble} alt="Unchangeble" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={cx(classes.subHeader, classes.centerOnMobile)}>Unchangeble</h3>
                                    <p className={classes.description}>The results of quizzes and polls are being saved in the blockchain. They stay reliable and unchangeable forever. </p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature2)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Customer_Acquisition2x} 2x, ${Customer_Acquisition} 1x`} src={Customer_Acquisition} alt="Customer_Acquisition" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={cx(classes.subHeader, classes.centerOnMobile)}>Customer acquisition</h3>
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

                        <Grid item xs={12} sm={12} md={6} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature3)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Promotion2x} 2x, ${Promotion} 1x`} src={Promotion} alt="Promotion" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={cx(classes.subHeader, classes.centerOnMobile)}>Promotion</h3>
                                    <p className={classes.description}>Users can pass the test and share it with your friends. For this they will receive reward in the cryptocurrency.</p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.cardFeature, classes.cardFeature4)}>
                                <div className={classes.imageFeature}> <img srcSet={`${Embed2x} 2x, ${Embed} 1x`} src={Embed} alt="Embed" /> </div>
                                <div className={classes.contentFeature}> 
                                    <h3 className={cx(classes.subHeader, classes.centerOnMobile)}>Embed</h3>
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

                        <Grid item xs={12} sm={12} md={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}  className={cx(classes.center, classes.textCenter, classes.zIndex10)}>
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

                        <Grid item xs={12} sm={12} md={4} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                        </Grid>

                    </Grid>
                </div>
            </div>

            <div className={classes.slideFooter}>
                <div className={classes.slideInto}>
            
                    <Grid container className={classes.root} spacing={40} >
                        
                        <Grid item xs={12} sm={1} className={cx(classes.displayOnlyOnMobile)}>
                        
                            <div className={cx(classes.spac40)} />

                        </Grid>

                        <Grid item xs={12} sm={1} className={cx(classes.center, classes.toLeft, classes.zIndex10)}>
                            <a href="/">
                                <img className={classes.logo} srcSet={`${logo2x} 2x, ${logo} 1x`} src={logo} />
                            </a>
                        </Grid>

                        <Grid item xs={12} sm={8} className={cx(classes.center, classes.zIndex10)}>
                            <div className={cx(classes.footerMenu)}>
                                <NavLink tabIndex='1' to={'/term-of-use'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Terms of Use
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                                <NavLink tabIndex='1' to={'/privacy-policy'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Privacy policy  
                                        </Typography>
                                        </MenuItem>
                                </NavLink> 
                                <NavLink tabIndex='1' to={'/create'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Create  
                                        </Typography>
                                        </MenuItem>
                                </NavLink> 
                                <NavLink tabIndex='1' to={'/contact'} className={classes.footerMenuLink} >
                                    <MenuItem selected={false} className={classes.footerMenuItem}>
                                        <Typography variant="display1" >
                                            Contact us  
                                        </Typography>
                                        </MenuItem>
                                </NavLink>  
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={3} className={cx(classes.center, classes.toRight, classes.zIndex10)}>
                            <div className={cx(classes.footerMenu, classes.footerMenuInlineOnMobile)}> 
                                <a target="_blank" className={cx(classes.footerIcon)} href="https://www.instagram.com/quizi.io/"> 
                                    <img  src={InstaIcon} />
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
            <Button size="small" variant="raised" color="secondary" onClick={this.handleClose} className={classes.closeModal}>close</Button>
            </div>
        </Modal>
    </div>

        );
    }
}





export default Landing