import React from 'react'
import { observer } from 'mobx-react';
import {observable, action } from 'mobx';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Login from './Login'
import Share from './Share'
import Typography from '@material-ui/core/Typography';
import Auth from './../models/Auth';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';

import { LazyImage, lerp, listener, getCoinName, roundeWithDec } from './../utils';
import CardsModel from './../models/Cards'
import Api from './../services/Api';

const styles = theme => ({
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
        '& $prog':{
            padding: '0 10px'
        }
    },
    delimeter:{},
    prog:{},

    cardBodyResult: {
        display: 'flex',
        flexDirection: 'column',
        padding: '23px 30px 30px',
        backgroundColor: 'white',
        margin: '-1px 0',
        height: 'calc(100% - 40px - 76px)',
        overflow: 'auto',
        overflowX: 'hidden',
        '@media (max-width: 600px)':{
            height: '350px',
            display: 'block'
      
        }
    },
    row: {
        display: 'flex',
        alignItems: 'stretch',
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
        '@media (max-width: 600px)':{
            marginBottom: 20
        }
    },
    col1:{
        flex: 1,
        padding: '0 12px', 
        '@media (max-width: 600px)':{
            marginBottom: 20
        }
    },
    col2:{
        padding: '0 12px', 
        flex: 2,
        '@media (max-width: 600px)':{
            marginBottom: 20
        }
    },

    resImage: {
        width: 216,
        height: 144,
        borderRadius: 8,
        overflow: 'hidden',
        '& img': {
            width: '100%',
            height: 'auto',
        }
    },

    resTitle:{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: 7
    },
    
    linksite: {
        fontSize: 14,
        fontWeight: 600,
        color: '#fc3868',
        textDecoration: 'none',
        marginBottom: 5
    },

    resBtn: {
        borderRadius: 74,
        marginTop: 'auto'
    },

    space:{
        height: 20
    },

    btnResultSmaller:{
        marginTop: 6,
        borderRadius: 74,
        borderColor: '#fc3868'
    },

    divider: {
        margin: '30px 0 ',
    },

    column:{
        flexDirection: 'column',
        display: 'flex',
        width: '100%'
    },
    
    center:{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    flex: {
        display: 'flex'
    },

    resHeader: {
        letterSpacing: 1,
        fontWeight: 700,
        whiteSpace: 'nowrap',
    },

    noWrap:{
        display: 'flex',
        whiteSpace: 'nowrap',
    },
    
    share: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        '@media (max-width: 600px)':{
            marginTop: '32px',
            flexWrap: 'wrap',
            marginBottom: '8px',
            '& > *':{
                marginBottom: '10px'
            }
        }
    },

    Imp:{
        flexWrap: 'nowrap',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: 20,
        '@media (min-width: 600px)':{
            borderLeft: '1px solid rgba(188,194,217,.6)'
        }
    },
    ImpAddon:{
        textTransform: 'uppercase',
        fontWeight: 600,
        color: '#506980',
        paddingLeft: 15
    },
})

@withStyles(styles)
@observer
class ResultCard extends React.Component {

    componentDidMount(){

        this.loadFinal();
    }

    @observable finalCard = null;
    @observable isLiked = true;

    @action.bound
    loadFinal = () => {
        let that = this;
        Api.getAdditionlCardInfo(this.props.cardSlug).then(info => {
            return CardsModel.allProgress(this.props.cardSlug).then(progress => {
                that.finalCard = {progress, info};
            })
        }).then(_=>{
            this.props.adjustStyle();
        })

        CardsModel.isLiked(this.props.cardSlug).then(val => that.isLiked = val);
    }

    // Login stuff
    logout = () => {}
    getLogOut = f => this.logout = f; 
    
    @observable open = false
    @action.bound
    openLoginModal = () => {
        this.open = true;
    };
    
    @action.bound
    closeLoginModal = () => {
        this.open = false;
    };
    // Login stuff end

    render(){
        let {classes} = this.props;
        
        return (this.finalCard ? <div>
                    <div ref='header' className={classes.header}>
                        <Typography variant="display1">
                            Congratulations!
                        </Typography>
                    </div>
                    <div className={classes.cardBodyResult}>
                        <Login open={this.open} logout={this.getLogOut} close={this.closeLoginModal}/>
                            <div className={classes.row + ' ' + classes.responseRow}>
                                <div className={classes.col1}>
                                    { !this.finalCard.info.img && this.finalCard.info.cat == 'Polls' && <LazyImage className={classes.resImage} load={'./assets/polls.png'}/>}
                                    { !this.finalCard.info.img && this.finalCard.info.cat == 'Quizzes' && <LazyImage className={classes.resImage} load={'./assets/quiz.png'}/>}
                                    { this.finalCard.info.img && <LazyImage className={classes.resImage} load={this.finalCard.info.img}/>}
                                </div>
                                <div className={classes.col2}>
                                    <Typography variant="title" className={classes.resTitle}>{this.finalCard.info.title}</Typography>
                                    <a className={classes.linksite} href={`http://${this.finalCard.info.linksite}`} target="_blank" ><Typography variant="display1" className={classes.linksite}>{this.finalCard.info.linksite}</Typography></a>
                                    <Typography variant="body1" className={classes.description}>{this.finalCard.info.desc}</Typography>
                                    <Button className={classes.btnResultSmaller} variant="outlined" color="secondary"  side="small" onTouchEnd={this.props.again} onClick={this.props.again} >Take again
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.space}/>
                            <div className={classes.row + ' ' + classes.responseRow}>
                                <div className={classes.col2 + ' ' + classes.column}>
                                    <Typography variant="body1" gutterBottom className={classes.resHeader}>
                                        Results:
                                    </Typography>
                                    <div>
                                        <Typography variant="body1" >
                                        {this.finalCard.info.result.replace(`{{${this.finalCard.info.dashOutput}}}`,this.finalCard.progress[this.finalCard.info.dashOutput])}
                                        </Typography>
                                    </div>
                                    <div className={classes.share}>
                                        {!this.isLiked &&
                                        <Typography variant="body1" className={classes.resHeader}>
                                            Share and get +0.5 {Api.getCoinName()}:
                                        </Typography>}
                                        {this.isLiked &&
                                        <Typography variant="body1" className={classes.resHeader}>
                                            Share with your friends:
                                        </Typography>}
                                        <Share update={this.loadFinal} cardSlug={this.props.cardSlug}/>
                                    </div>
                                </div>
                                <div className={classes.vertdevider} />
                                <div className={classes.col1  + ' ' + classes.column}>
                                    <Typography variant="body1" gutterBottom className={classes.resHeader + " " + classes.center}>
                                        Your reward:
                                    </Typography>
                                    <div className={classes.Imp}>
                                        <Typography variant="display2" > { this.finalCard.progress &&  roundeWithDec(this.finalCard.progress.number * this.finalCard.info.reward) }  </Typography>
                                        <Typography variant="display1" className={classes.ImpAddon} >{ this.finalCard.progress && Api.getCoinName()}</Typography>
                                    </div>
                                    { !Auth.isAuthenticated && <div className={classes.col}>
                                        
                                        <Button className={classes.resBtn} variant="raised" color="secondary"  side="small" onClick={this.openLoginModal} >Withdrawal
                                        </Button>
                                    </div> }
                                    { Auth.isAuthenticated && <div className={classes.col}>
                                       
                                        <Link style={{textDecoration: 'none'}} to="/dashboard"><Button className={classes.resBtn} variant="raised" color="secondary"  side="small" >dashboard</Button></Link>
                                    </div> }
                                </div>
                            </div>
                    </div>
                </div>
                :
                <div>
                <div className={classes.header}>
                        <Typography variant="display1">
                            Congratulations!
                        </Typography>
                    </div>
                    <div className={classes.cardBodyResult}>
                    </div>
                </div>
            )
    }
}


export default ResultCard;