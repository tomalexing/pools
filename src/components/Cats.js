import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, autorun} from 'mobx';
import { observer }  from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { listener, roundeWithDec } from './../utils';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import quizzesSVG from './../assets/quizzes.svg';
import pollsSVG from './../assets/polls.svg';
import Api from './../services/Api';
import Icon from '@material-ui/core/Icon';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as cn from 'classnames'
import { NavLink } from './NavLink';
import { LazyImage } from './../utils';
import {loadFromStore , saveToStore, clearAll} from "./../services/localDb";

const styles = theme => ({

    catsWraper: {
        display: 'flex',
        margin: 'auto',
        height: '100%',
        // position: 'relative',
        width: '100%',
        '@media (max-width: 767px)':{
            flexDirection: 'column'
        }
    },

    center: {
        height: '100%',
        width: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    },

    catsTitle:{
        display: 'none',
        '@media (max-width: 767px)':{
            display: 'block',
            width: '100%',
            borderBottom: '1px solid #6b7183',
            padding: '30px 15px 15px'
        }
    },
    
    catsMenu: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRight: '1px solid #6b7183',
        width: 200,
        '@media (max-width: 767px)':{
            border: 'none',
            width: '100%',
            flex: '0 1 auto',
            height: 65,
            overflow: 'hidden'
        },
        '&$catsMenuOpen':{
            flex: '1 0 auto',
            height: '100%',
            overflow: 'hidden'
        }
    },

    catsMenuOpen:{},
    catsCard:{
        width: '100%',
        overflow: 'auto',
        flex: 1,
        '-webkit-overflow-scrolling': 'touch',
    },
    
    catsMenuInner: {
        width: '100%'
    },

    nested: {
        '&.nested-1':{
            paddingLeft: 36
        },
        '&.nested-2':{
            paddingLeft: 54
        }
    },

    linkmenu:{
        textDecoration: 'none',
        display: 'block',
        '.navmenu.active &': {
            backgroundColor: 'rgba(0, 0, 0, 0.14)'
        }
    },

    header: {
        height: '100%',
        maxWidth: '300px',
        overflow: 'hidden',
        display: 'flex',
        flex: '1 0 300px',
        position: 'relative',
        '@media (max-width: 767px)':{
            width: '100%',
            height: 'auto',
            flex: '1 0 auto',
            maxWidth: '100%',
        }
    },

    card:{
        display: 'flex',
        overflow: 'hidden',
        margin: 20,
        maxWidth: 750,
        height: 200,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        '@media (max-width: 767px)':{
            flexDirection: 'column',
            height: 'auto'
        }
    },

    image: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    },

    article: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: '20px 30px',
        flex: 1
    },

    title: {
        marginBottom: 5,
        position: 'relative',
        color: '#474e65',
        fontWeight: 700,
        fontSize: 22,
    },
    
    link: {
        color: '#fc3868',
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 5,
        userSelect: 'text',
        '-webkit-touch-callout': 'text'
    },

    description: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 400,
        display: 'block',
        display: '-webkit-box',
        height: '50px',
        lineHeight: '1.4',
        '-webkitLineClamp': '2',
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    
    param: {
        color: '#474e65',
        fontSize: 13,
        fontWeight: 600,
        marginRight: 5
    },

    paramIcon: {
        color: '#fc3868',
        fontSize: 15,
        marginRight: 2
    },  
    
    btn: {
        borderRadius: 74,
        backgroundColor: '#fc3868',
        minWidth: 125,
        color: 'white !important',
    },
    
    btnlink: {
        textDecoration: 'none',
        marginLeft: 'auto',
        '@media (max-width: 767px)':{
            display: 'flex',
            marginTop: '20px',
            width: '100%',
            justifyContent: 'center'
        }
    },
    
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        '@media (max-width: 767px)':{
            flexFlow: 'row wrap',
            height: 'auto',
            paddingTop: '10px',
        }
    },

    progressBar:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#BCC2D9',
        height: 4
    },

    progressLine:{
        backgroundColor: '#FC3868',
        display: 'block',
        height: 4
    },

    progressStatus:{
        width: '100%',
        height: '100%',
        display: 'flex',
        zIndex: 10,
        overflow: 'hidden',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '15px',
        background: 'linear-gradient(to top, rgba(0,0,0,.3), rgba(0,0,0,0) 40%)',

    },

    footerParamRow:{
        display: 'flex'
    }

})

@withStyles(styles)
@withRouter
@observer
class Explore extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){

        this.slug = this.props.location.pathname;
        if(this.slug[this.slug.length-1] == '/'){
            this.slug = this.slug.substring(0, this.slug.length-1);
        } 
        if(this.slug[0] == '/'){
            this.slug = this.slug.substr(1);
        }
        
        let showCats = this.slug == this.props.match.path.substr(1);

        let that = this;

        Api.getCatsMenu().then(menu => this.Menu = menu);

        loadFromStore('commonSlugs').then(slugs => {
            that.cardsProgress = slugs;
        });

        Api.getCatsCards(this.slug).then(async cards =>  {
            let cardsFiltered = showCats
                ?  cards
                :  cards.filter(card => {
                    return card.type === 'term' && !card.onlyIframe && !card.blockedByUser && !card.blockedEntity
                });

            that.Cards = cardsFiltered;
            that.loading = false;

            return  cards.filter(card => {
                        return card.type === 'term'
                    });

        }).then(cats => {
            cats.map(async item => {
                try{
                    let blockSomeOf = await Api.ourApi('checkentity', {id: item.id, path: item.link + '/v1'});
                    if(blockSomeOf.actions){
                        Object.values(blockSomeOf.values).map(block => {
                            Api.setValueInCatalog('blockedEntity', block.value, block.entry_path, block.entry_id);
                        })
                    }else{
                        console.log(blockSomeOf)
                    }
                }catch(e) { console.trace(e.stack)}
                 
            })
        }).catch(_ => {
             that.loading = false;
        })
    }

    
    @observable Menu = {};
    @observable slug = {};
    @observable Cards = [];
    @observable openMenu = false;
    @observable loading = true;
    @observable cardsProgress = {};
    

    componentWillUnmount(){
    }

    @action
    toogleMenu = () => {
        this.openMenu = !this.openMenu;
    }

    catHTML = (menuItem, opt = {nested: false, level: 0, pathname:`${this.props.match.url}`}) => {
        let that = this, {classes, match} = this.props, newOpt = Object.assign({}, opt);

        if(!menuItem) return null

        return menuItem.map(menuItem => {
            if(menuItem.sub){
                newOpt.level++;
                newOpt.nested = true;
                newOpt.pathname = `${opt.pathname}/${menuItem.slug}`;

                if(newOpt.pathname[newOpt.pathname.length-1] == '/'){
                    newOpt.pathname = newOpt.pathname.substring(0, newOpt.pathname.length-1);
                } 
            }
            return( [
                    <NavLink tabIndex='1' to={`${opt.pathname}/${menuItem.slug}`} className={classes.linkmenu} >
                        <MenuItem className={cn({[classes.nested] : opt.nested, [`nested-${opt.level}`]: opt.nested})}>
                            <Typography variant="h4">
                                {menuItem.name}
                            </Typography>
                        </MenuItem>
                    </NavLink>,
                    that.catHTML(menuItem.sub, newOpt)
                ])
        })
    }

    render() {
        
        let {classes} = this.props, that = this;

        let locationStrip = window.location.pathname.endsWith('/') ? window.location.pathname.substring(0, window.location.pathname.length - 1) : window.location.pathname;

        return (
            <div className={classes.catsWraper}>
                <aside className={cn(classes.catsMenu, {[`${classes.catsMenuOpen}`]: this.openMenu})}>
                    <Typography variant="h4" onClick={this.toogleMenu} className={classes.catsTitle}>Categories</Typography>
                    <MenuList className={classes.catsMenuInner}>
                        { Object.values(this.Menu).map(menuItem => {
                            return that.catHTML([menuItem])
                        })}
                    </MenuList>
                </aside>
                <div className={classes.catsCard}>
                    {this.Cards.length == 0 && this.loading && <div className={classes.center}><CircularProgress color="secondary" /></div>}
                    {this.Cards.length == 0 && !this.loading && <div className={classes.center}>
                        <Typography variant="h4" >There are no quizzes or polles</Typography></div>}
                    {this.Cards.map((card, idx) => (<div key={`cats-${idx}`} className={classes.card}>
                        <header className={classes.header}>

                            { card.link && <Link style={{textDecoration: 'none'}} to={card.link.startsWith('/') ?  card.link : locationStrip + '/' + card.link}>   {!card.img && card.cardtype == 'Poll' && <LazyImage className={classes.image} load={'./assets/polls.png'}/>}
                                {!card.img && card.cardtype == 'Quiz' && <LazyImage className={classes.image} load={'./assets/quiz.png'}/>}
                                {card.img && <LazyImage className={classes.image} load={card.img}/>}
                            </Link> }

                            { !card.link && !card.img && card.cardtype == 'Poll' && <LazyImage className={classes.image} load={'./assets/polls.png'}/>}
                            { !card.link && !card.img && card.cardtype == 'Quiz' && <LazyImage className={classes.image} load={'./assets/quiz.png'}/>}
                            { !card.link && card.img && <LazyImage className={classes.image} load={card.img}/>}

                            { that.cardsProgress[card.link + '/v1'] && that.cardsProgress[card.link + '/v1']['Progress'].number>0 && <div className={classes.progressBar} > <span className={classes.progressLine} style={{width: that.cardsProgress[card.link + '/v1']['Progress'].number * 100 / card.number + '%' }}> </span>  </div>}
                            
                            { card.link && <Link className={classes.progressStatus} style={{textDecoration: 'none'}} to={card.link.startsWith('/') ?  card.link : locationStrip + '/' + card.link}> 
                                
                                { card.cardtype == 'Quiz' && that.cardsProgress[card.link + '/v1'] && that.cardsProgress[card.link + '/v1']['Progress'].final &&  <Typography variant="h1">Completed</Typography> }
                                { card.cardtype == 'Quiz' && that.cardsProgress[card.link + '/v1'] && !that.cardsProgress[card.link + '/v1']['Progress'].final &&  <Typography variant="h1">Not finished</Typography> }
                                { card.cardtype == 'Poll' && that.cardsProgress[card.link + '/v1'] && that.cardsProgress[card.link + '/v1']['Progress'].final &&  <Typography variant="h1">Completed 100%</Typography> }
                                { card.cardtype == 'Poll' && that.cardsProgress[card.link + '/v1'] && !that.cardsProgress[card.link + '/v1']['Progress'].final &&  <Typography variant="h1">In progress {that.cardsProgress[card.link + '/v1']['Progress'].number * 100 / card.number}%</Typography> }

                            </Link> }

                        </header>
                        <article className={classes.article}>

                            { card.link && <Link style={{textDecoration: 'none'}}  to={card.link.startsWith('/') ? card.link : locationStrip + '/' + card.link}><Typography variant="h6" className={classes.title}>{card.title}</Typography></Link> }

                            { !card.link && <Typography variant="h6" className={classes.title}>{card.title}</Typography> }

                            <a style={{textDecoration: 'none'}} onClick={Api.saveReferral('catalog',card.slug,card.id)} href={`http://${card.linksite}`} target="_blank" ><Typography variant="h4" className={classes.link}>{card.linksite}</Typography></a>

                            <Typography variant="body2" className={classes.description}>{card.desc}</Typography>
                            <div className={classes.footer}>

                                {card.number && <div className={classes.footerParamRow} >
                                    <Icon className={classes.paramIcon}>layers</Icon>  <Typography variant="h4" className={classes.param}>{card.number} cards</Typography>
                                    <Icon className={classes.paramIcon}>offline_bolt</Icon> <Typography variant="h4" className={classes.param}>{roundeWithDec(card.number * card.reward)} {Api.getCoinName()}</Typography>
                                    <Icon className={classes.paramIcon}>share</Icon> <Typography variant="h4" className={classes.param}>{roundeWithDec(card.sharedReward)} {Api.getCoinName()}</Typography>
                                </div>}

                               { card.link && (!that.cardsProgress[card.link + '/v1'] || !that.cardsProgress[card.link + '/v1']['Progress'].final) && <Link className={classes.btnlink} to={card.link.startsWith('/') ? card.link : locationStrip + '/' + card.link }><Button className={classes.btn} variant="contained" color="secondary" side="small" >{card.btn}</Button></Link>}
                               { card.link && that.cardsProgress[card.link + '/v1'] && that.cardsProgress[card.link + '/v1']['Progress'].final && <Link className={classes.btnlink} to={card.link.startsWith('/') ? card.link : locationStrip + '/' + card.link }><Button className={classes.btn} variant="contained" color="secondary" side="small" >Take again</Button></Link>}
                               { !card.link && <div className={classes.btnlink} ><Button to={card.link} className={classes.btn} variant="contained" disabled color="secondary" side="small" >Coming Soon</Button></div>}
                            </div>
                        </article>
                        </div>))}
                </div>
            </div>
        )
    }
}

export default Explore;