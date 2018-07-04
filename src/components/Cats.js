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

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as cn from 'classnames'
import { NavLink } from './NavLink';
import { LazyImage } from './../utils';


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
        width: '300px',
        overflow: 'hidden',
        display: 'flex',
        flex: '1 0 300px',
        '@media (max-width: 767px)':{
            width: '100%',
            height: 'auto',
            flex: '1 0 auto',
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
        padding: '20px 30px'
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
        fontSize: 18,
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
    
    number: {
        color: '#474e65',
        fontSize: 16,
        fontWeight: 600,
        marginRight: 25
    },
    
    reward:{
        color: '#474e65',
        fontSize: 16,
        fontWeight: 600,
        marginRight: 25
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
        Api.getCatsMenu().then(menu =>  this.Menu = menu)
        Api.getCatsCards(this.slug).then(cards =>  {

            this.Cards = showCats 
                ?  cards
                :  cards.filter(card => card.type === 'term');
        })
    }

    
    @observable Menu = {};
    @observable slug = {};
    @observable Cards = [];
    @observable openMenu = false;
    

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
                            <Typography variant="display1">
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
        return (
            <div className={classes.catsWraper}>
                <aside className={cn(classes.catsMenu, {[`${classes.catsMenuOpen}`]: this.openMenu})}>
                    <Typography variant="display1" onClick={this.toogleMenu} className={classes.catsTitle}>Categories</Typography>
                    <MenuList className={classes.catsMenuInner}>
                        { Object.values(this.Menu).map(menuItem => {
                            return that.catHTML([menuItem])
                        })}
                    </MenuList>
                </aside>
                <div className={classes.catsCard}>
                    {this.Cards.length == 0 && <div className={classes.center}><CircularProgress color="secondary" /></div>}
                    {this.Cards.map((card, idx) => (<div key={`cats-${idx}`} className={classes.card}>
                        <header className={classes.header}>

                            { card.link && <Link style={{textDecoration: 'none'}} to={card.link}>                   {!card.img && card.cardtype == 'Poll' && <LazyImage className={classes.image} load={'./assets/polls.png'}/>}
                                {!card.img && card.cardtype == 'Quiz' && <LazyImage className={classes.image} load={'./assets/quiz.png'}/>}
                                {card.img && <LazyImage className={classes.image} load={card.img}/>}
                            </Link> }

                            { !card.link && !card.img && card.cardtype == 'Poll' && <LazyImage className={classes.image} load={'./assets/polls.png'}/>}
                            {!card.link &&!card.img && card.cardtype == 'Quiz' && <LazyImage className={classes.image} load={'./assets/quiz.png'}/>}
                            { !card.link && card.img && <LazyImage className={classes.image} load={card.img}/>}

                        </header>
                        <article className={classes.article}>

                            { card.link && <Link style={{textDecoration: 'none'}} to={card.link}><Typography variant="title" className={classes.title}>{card.title}</Typography></Link> }

                            { !card.link && <Typography variant="title" className={classes.title}>{card.title}</Typography> }


                            <a style={{textDecoration: 'none'}} href={`http://${card.linksite}`} target="_blank" ><Typography variant="display1" className={classes.link}>{card.linksite}</Typography></a>

                            <Typography variant="body1" className={classes.description}>{card.desc}</Typography>
                            <div className={classes.footer}>
                                {card.number && <Typography variant="display1" className={classes.number}>{card.number} cards</Typography>}
                                {card.number && <Typography variant="display1" className={classes.reward}>up to {roundeWithDec(card.reward * card.number)} {Api.getCoinName()}</Typography>}
                            
                               { card.link && <Link className={classes.btnlink} to={card.link.startsWith('/') ?  card.link : window.location.pathname + '/' + card.link }><Button className={classes.btn} variant="raised" color="secondary" side="small" >{card.btn}</Button></Link>}
                               { !card.link && <div className={classes.btnlink} ><Button  to={card.link} className={classes.btn} variant="raised" disabled color="secondary" side="small" >Coming Soon</Button></div>}
                            </div>
                        </article>
                        </div>))}
                </div>
            </div>
        )
    }
}

export default Explore;
