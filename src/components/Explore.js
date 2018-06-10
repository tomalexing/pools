import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import { Link } from 'react-router-dom';
import { listener } from './../utils';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import quizzesSVG from './../assets/quizzes.svg';
import pollsSVG from './../assets/polls.svg';
import Api from './../services/Api';

const styles = theme => ({

    cardsWraper:{
        display: 'flex',
        margin: 'auto',
        // position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        overflow: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        '@media (max-width: 767px)':{
        },
    },
    cards:{
        display: 'flex',
        margin: 'auto',
        // height: '100%',
        // position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 767px)':{
            flexDirection: 'column'
        }
    },
    header: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px 8px 0 0',
        backgroundColor: '#fc3868'
    },

    card:{
        width: 300,
        height: 460,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        margin: 15
    },

    figure: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        height: 'auto',
        width: '100%',
    },

    article: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 40px'
    },

    title: {
        marginTop: 28,
        marginBottom: 35,
        position: 'relative',
        color: '#474e65',
        fontWeight: 700,
        fontSize: 22,
        '&:after': {
            content: '\'\'',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '35px',
            width: 34,
            height: 2,
            backgroundColor: '#474e65'
        }
    },

    description: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 18,
        fontWeight: 400
    },

    btn: {
        borderRadius: 74,
        border: '2px solid #fc3868',
        backgroundColor: '#fc3868'
    }

})

@withStyles(styles)
@observer
class Explore extends React.Component {

    constructor(props) {
        super(props);
    }

    @observable explore = [{
        title: 'Quizes',
        description: 'On this page, you will find different online tests for you to try.',
        to:'/cats/quizzes',
        btn: 'Choose test',
        img: quizzesSVG
    },{
        title: 'Polls',
        description: 'Discover answers to the most provocative question.',
        to:'/cats/polls',
        btn: 'Discover',
        img: pollsSVG
    }]

    componentDidMount(){
        Api.getCatsCards('polls').then(console.log)
        Api.getCatsCards('quizzes').then(console.log)

    }

    componentWillUnmount(){
     

    }

    render() {
        
        let {classes} = this.props;

        return (
            <div className={classes.cardsWraper}>
                <div className={classes.cards}>
                    {this.explore.map((card, idx) => (<div key={`explore-${idx}`} className={classes.card}>
                        <header className={classes.header}>
                            <figure className={classes.figure} >
                                <Link style={{textDecoration: 'none'}} to={card.to}><img src={card.img} className={classes.image} /></Link>
                            </figure>
                        </header>
                        <article className={classes.article}>
                            <Link style={{textDecoration: 'none'}} to={card.to}>
                                <Typography variant="title" className={classes.title}>{card.title}</Typography>
                            </Link>
                            <Typography variant="body1" className={classes.description}>{card.description}</Typography>
                            <Link style={{textDecoration: 'none'}} to={card.to}><Button className={classes.btn} variant="raised" color="secondary"  side="small" >{card.btn}</Button></Link>
                        </article>
                        </div>))}
                </div>
            </div>
        )
    }
}

export default Explore;
