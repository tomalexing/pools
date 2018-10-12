import React, { PropTypes } from 'react';
import {observable, action, computed, when} from 'mobx';
import { observer }  from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { requestAnimationFramePromise, 
        transitionEndPromise, 
        parallel, 
        wait, 
        listener, isTouchDevice} from './../utils';
import * as cn  from 'classnames'; 
import { LazyImage } from './../utils';
import Auth from './../models/Auth';

const styles = theme => ({
    pollBody:{
        padding: '23px 30px',
        backgroundColor: 'white',
        margin: '-1px 0',
        height: 'calc(100% - 40px - 76px)',
        overflow: 'hidden',
        '-webkit-overflow-scrolling': 'touch',
        '@media (max-width: 600px)':{
            height: 'auto',
        }
  
    },
    question:{
        fontSize: '18px',
        fontWeight: '400',
        color: '#474e65',
        marginBottom: 15
    },
    answers:{
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        font: 'normal 600 18px/1 Montserrat',
        '@media (max-width: 600px)':{
            flexWrap: 'wrap',
            flexDirection: 'column'
        }
    },
    answer:{
        width: '300px',
        height: '240px',
        overflow: 'hidden',
        flex: '0 1 auto',
        zIndex: 2,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        '&:before':{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,.3), rgba(0,0,0,0) 40%)',
            zIndex: 10
        },
        '&:hover':{
            boxShadow: '0 2px 20px rgba(0,0,0, .5)'
        },
        '@media (max-width: 600px)':{
            width: '100%',
            height: 100,
        }
    },
    answerText: {
        position: 'absolute',
        bottom: '25px',
        left: 0,
        right: 0,
        height: 'auto',
        textAlign: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize: '18px',
        zIndex: 10
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& img': {
            verticalAlign: 'middle',
            overflow: 'hidden',
            objectFit: 'cover',
            zIndex: 1,
            width: '100%',
            '@media (max-width: 600px)':{
                height: '100%'
            }
        }
    },
    info: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        userSelect: 'none',

        display: 'none',
        '&$infoVisible':{
            display: 'block',
        },

        zIndex: 15,
        background: 'rgba(252,56,104,.9)',
        opacity: 1
    },
    infoVisible:{},
    ripple: {
        display: 'block',
        position: 'absolute',
        zIndex: 10,
        background: 'rgba(252, 56, 104, 0.9)',
        transform: 'scale(0)',
        borderRadius: '100%',
        height: 2,
        width: 2
    },

    scores:{
        opacity: 1,
        transition: 'opacity .5s'
    },
    check: {
        position: 'absolute',
        top: '20px',
        left: '30px',
        '@media (max-width: 600px)':{
            top: '14px',
        }
    },
    votes:{
        textAlign: 'center',
        color: 'white',
        font: 'normal 300 18px/1 Montserrat',
        margin: '20px 0 20px',
        '@media (max-width: 600px)':{
            margin: '18px 0 8px',
        }
    },
    progress:{
        position: 'relative',
        width: '80%',
        height: '2px',
        margin: '12px auto 0',
        background: 'hsla(0,0%,100%,.3)',
        '@media (max-width: 600px)':{
            display: 'none'
        }
    },
    progressBar:{
        position: 'absolute',
        left: '0',
        top: '0',
        height: '2px',
        appearance: 'none',
        background: 'hsla(0,0%,100%,.7)',
       
    },
    result:{
        textAlign: 'center',
        color: '#fff',
        marginTop: '18px',
        fontSize: '18px',
        '@media (max-width: 600px)':{
            position: 'absolute',
            top: '0px',
            right: '30px',

        }
    },
    resultNum:{
        display: 'inline-block',
        font: 'normal 100 120px/.8 Montserrat',
        '@media (max-width: 600px)':{
            font: 'normal 300 18px/.8 Montserrat'
        }
    },
    resultAddon:{
        font: 'normal 200 60px/.8 Montserrat',
        '@media (max-width: 600px)':{
            font: 'normal 300 16px/.8 Montserrat'
        }
    },
    divider: {
        display: 'flex',
        flex: 1,
        width: 30,
        height: 20
    },
    questionsInner: {
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        opacity: 0
    },
    footer:{
        position: 'relative',
        backgroundColor: 'white',
        padding: '10px 30px 30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '& .space': {
            display: 'flex',
            flex: 1,
            width: 30
        },
        '@media (max-width: 600px)':{
            padding: '0px 30px 30px',
            // background: 'transparent',
            // position: 'absolute',
            // width: '100%',
            // bottom: 0
        }
    },
    footerBtn:{
        zIndex: 1000,
        borderRadius: 74,
        '&:hover $rightIcon': {
            transition: 'transform 1s',
            transform: 'translateX(3px)'
        },
        '&:hover $leftIcon': {
            transition: 'transform 1s',
            transform: 'translateX(-3px)'
        }
    },
    leftIcon:{},
    rightIcon:{},
    space:{},
    powered: {
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        textDecoration: 'none',
        color: '#474e65',
        fontSize: '12px'
    }
    
})

@withStyles(styles)
@observer
class Poll extends React.Component {

    constructor(props) {
        super(props);
        this.drag = this.drag.bind(this)
        this.rememberPoints = this.rememberPoints.bind(this)
        this.pickCart = this.pickCart.bind(this)
        this.loadedR = this.loadedR.bind(this)
        this.loadedL = this.loadedL.bind(this)

    }

    componentDidMount(){

        this.registerEvents();
        this.setCurrentVote();
        this.props.passRef(this.refs.body);
    }

    listeners = [];

    registerEvents = () => {
       if(!this.refs.left && !this.refs.left ) return

       if( isTouchDevice() ){
            
            this.listeners.push(listener(this.refs.left,'touchstart', this.rememberPoints, false));
            this.listeners.push(listener(this.refs.left, 'touchend', this.pickCart('1').bind(this), false)); 
            this.listeners.push(listener(this.refs.left, 'touchmove', this.drag, false));
            this.listeners.push(listener(this.refs.left, 'mousedown', this.rememberPoints, false));
            this.listeners.push(listener(this.refs.left, 'mouseup', this.pickCart('1').bind(this), false)); 
            this.listeners.push(listener(this.refs.left, 'mousemove', this.drag, false)); 

            this.listeners.push(listener(this.refs.right, 'touchstart', this.rememberPoints, false));
            this.listeners.push(listener(this.refs.right, 'touchend', this.pickCart('2').bind(this), false));
            this.listeners.push(listener(this.refs.right, 'touchmove', this.drag, false));
            this.listeners.push(listener(this.refs.right, 'mousedown', this.rememberPoints, false));
            this.listeners.push(listener(this.refs.right, 'mouseup', this.pickCart('2').bind(this), false)); 
            this.listeners.push(listener(this.refs.right, 'mousemove', this.drag, false)); 
            
        }else{
            this.listeners.push(listener(this.refs.left, 'mousedown', this.rememberPoints, false));
            this.listeners.push(listener(this.refs.right, 'mousedown', this.rememberPoints, false));

            this.listeners.push(listener(this.refs.left, 'click', this.pickCart('1').bind(this), false)); 
            this.listeners.push(listener(this.refs.right, 'click', this.pickCart('2').bind(this), false)); 
        }
        
        this.listeners.push(listener(this.refs.footer, 'touchstart', this.prevent, false));
        this.listeners.push(listener(this.refs.footer, 'touchend', this.prevent, false));
        this.listeners.push(listener(this.refs.footer, 'touchmove', this.prevent, false));
        this.listeners.push(listener(this.refs.footer, 'mousedown', this.prevent, false));
        this.listeners.push(listener(this.refs.footer, 'mouseup', this.prevent, false)); 
        this.listeners.push(listener(this.refs.footer, 'mousemove', this.prevent, false)); 
    }

    componentDidUpdate(){

        this.setCurrentVote();
    }

    prevent = (e) => {
       e.stopImmediatePropagation();
    } 

    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    @computed
    get getRefs(){
        return !!this.refs.check1;
    }

    setCurrentVote = () => {
        let that = this;
        when(() => !this.props.store.currentCard.updating && !Auth.loadingUserData, () => {

            this.props.poll.getUserVote().then(choosen => {
                
                if(choosen && choosen.position  ? choosen.position === 'right' : choosen === 'right'){
                    that.props.poll.isInfoVisible = true;
                    when(() => that.getRefs, () => { // may cause flick when switch between pollzes/polls 
                        that.refs.check1.style.display = 'none';
                        that.refs.check2.style.display = 'none';
                        that.refs.check2.style.display = 'block';
                        
                    });
                    that.props.poll.voteSetted = 'right';

                }
                if(choosen && choosen.position  ? choosen.position === 'left' : choosen === 'left'){
                    that.props.poll.isInfoVisible = true;
                    when(() => that.getRefs, () => {
                        that.refs.check1.style.display = 'none';
                        that.refs.check2.style.display = 'none';
                        that.refs.check1.style.display = 'block';
                    })
                    that.props.poll.voteSetted = 'left';
                }
                if(choosen == null)
                    that.props.poll.isInfoVisible = false;

                
            });
        });
    }
    
    picking = false;
    startX = 0;
    startY = 0;

    rememberPoints = (e) => {
        //e.stopPropagation();
        e.preventDefault(); // todo should be implemented cusom scroll

        this._dragging = true;

        this.startX = e.clientX || e.touches[0].clientX;
        this.startY = e.clientY || e.touches[0].clientY;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    drag = (e) => {
        e.preventDefault(); // todo should be implemented cusom scroll
       // e.stopPropagation();
        if (!this._dragging) return;

        this.deltaX = (e.clientX || e.touches[0].clientX) - this.startX;
        this.deltaY = (e.clientY || e.touches[0].clientY) - this.startY;

    }

    @action.bound
    pickCart = (thisCardNumber) => async e => {

        e.preventDefault();

        if (!this._dragging) return;

        if(this.picking || !this.props.store.canMakeAction ) return
        if(window.innerWidth < 600 ){
            if((this.deltaX && Math.abs(this.deltaX) > 10) || (this.deltaY && Math.abs(this.deltaY)  > 10) ) {
                return;
            }
        }

        this.props.store.currentCard.updating = true;
        this.picking = true;
        //e.stopImmediatePropagation();

        let that = this;
        let {top, left} = e.currentTarget.getBoundingClientRect();
        let thisCard = `ripple${thisCardNumber}`;
        let thisCheck = `check${thisCardNumber}`;

        let eClientX = (e.clientX || e.touches.length && e.touches[0].clientX || e.changedTouches.length && e.changedTouches[0].clientX );
        let eClientY = (e.clientY || e.touches.length && e.touches[0].clientY || e.changedTouches.length && e.changedTouches[0].clientY );

        this.refs[thisCard].style.top = `${eClientY - top}px`;
        this.refs[thisCard].style.left = `${eClientX - left}px`;
        

        await requestAnimationFramePromise()
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                that.refs[thisCard].style.transition = 'transform 1s ease-in-out';
                that.refs[thisCard].style.transform = 'scale(300)';
                that.props.poll.isInfoVisible = false;
                return transitionEndPromise(that.refs[thisCard]);
            })
            .then(_ => that.updateScore(thisCardNumber))
            .then(_ => {

                that.props.poll.isInfoVisible = true;
                that.refs.check1.style.display = 'none';
                that.refs.check2.style.display = 'none';
                that.refs[thisCheck].style.display = 'block';
                that.refs[thisCard].style.transform = '';
                that.refs[thisCard].style.transition = '';
                that.refs[thisCard].style.transformOrigin = '';

                return requestAnimationFramePromise()
                    .then(async _ => {

                        const width1 = that.props.poll.leftPercentage; 
                        const width2 = that.props.poll.rightPercentage; 

                        let i = 0;
                        parallel( async _ => {
                            while(i <= width1){
                                await requestAnimationFramePromise().then(_ => {
                                    if( that.refs.progressBar1)
                                        that.refs.progressBar1.style.width = `${i}%`;
                                    });
                                    i = Math.min(width1 + 1 , i+4);
                            }
                            that.refs.progressBar1.style.width = `${width1}%`;
                        })

                        let j = 0;
                        parallel( async _ => {
                            while(j <= width2){
                                await requestAnimationFramePromise().then(_ => {
                                    if( that.refs.progressBar2)
                                        that.refs.progressBar2.style.width = `${j}%`;
                                });
                                j = Math.min(width2 + 1 , j+4);
                            }
                            that.refs.progressBar2.style.width = `${width2}%`;
                        })

                        const result1 = that.props.poll.leftPercentage;
                        const result2 = that.props.poll.rightPercentage;

                        let k = 0;
                        parallel(async _ => {
                            while(k <= result1){
                                await requestAnimationFramePromise().then(_ => {
                                    if( that.refs.result1 )
                                        that.refs.result1.innerText = `${k}`;
                                });
                                k = Math.min(result1 + 1 , k+4);
                            }
                            that.refs.result1.innerText = `${result1}`;
                        })

                        let l = 0;
                        parallel(async _ => {
                            while(l <= result2){
                                await requestAnimationFramePromise().then(_ => {
                                    if( that.refs.result2 )
                                        that.refs.result2.innerText = `${l}`;
                                });
                                l = Math.min(result2 + 1, l+4);
                            }
                            that.refs.result2.innerText = `${result2}`;
                        })
                    
                    })

            })

            this.props.store.currentCard.updating = false;
            this._dragging = false;
            this.picking = false;

       
    }
    
    @action.bound
    prev = e => { 
        this.refs.body.scrollTop = 0; 
        if(!this.props.store.currentCard.updating)
            this.props.prev(e) 
    }

    @action.bound
    next = e => { 
        this.refs.body.scrollTop = 0; 
        if(!this.props.store.currentCard.updating)
            this.props.next(e) 
    }

    finish = e => { this.props.finish(e) }

    @action.bound
    async updateScore(thisCardNumber){


        if(thisCardNumber == 1 && !this.props.store.currentCard.voteSetted){
            
            await this.props.store.currentCard.setUserVote({
                l: 1,
                r: 0
            })

            this.props.store.currentCard.voteSetted = 'left';
            
        }

        if(thisCardNumber == 2 &&  !this.props.store.currentCard.voteSetted){

            await this.props.store.currentCard.setUserVote({
                l: 0,
                r: 1               
           })

            this.props.store.currentCard.voteSetted = 'right';
        }

        if(thisCardNumber == 1 && this.props.store.currentCard.voteSetted == 'right'){

            await this.props.store.currentCard.setUserVote({
                l:  1,
                r: -1 
            });
            
            this.props.store.currentCard.voteSetted = 'left';

        }
        
        if(thisCardNumber == 2 &&  this.props.store.currentCard.voteSetted == 'left'){

            await this.props.store.currentCard.setUserVote({
                l: -1,
                r:  1,
            });
            
            this.props.store.currentCard.voteSetted = 'right';

        }
    }

    loadedR = () => {
        this.props.poll.setRImageLoaded();
    }

    loadedL = () => {
        this.props.poll.setLImageLoaded();
    }

    render() {

        
        let {classes, poll} = this.props;
        if(!poll || typeof poll.then == 'function'){
            return(<div key="body" ref="body" className={classes.pollBody}>
            
            </div>)
        }
        return (
            [<div key="body" ref="body" className={classes.pollBody}>
                <Typography variant="headline" gutterBottom  className={classes.question}>
                    {poll.question}
                </Typography>
                <div className={classes.answers}>
                    <div ref='left' className={classes.answer}>
                        <span ref='ripple1' className={classes.ripple} ></span>
                        <div className={cn(classes.info, {[classes.infoVisible]: this.props.poll.isInfoVisible})} >
                            <div className={classes.scores} >
                                <div ref='check1' className={classes.check}>
                                    <svg width="30px" height="21px" viewBox="68 132 30 21" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M69,141 L78,151 L97,133" stroke="#FFFFFF" strokeWidth="2" fill="none"></path>
                                    </svg>
                                </div>
                                <div className={classes.votes} >
                                    <span className={classes.votesNum}>{poll.answers.l.quantity}</span>
                                    <span className={classes.votesAddon}> votes</span>
                                </div>
                                <div className={classes.progress} > 
                                    <div ref='progressBar1' className={classes.progressBar} style={{ 'width': `${poll.leftPercentage}%` }} ></div>
                                </div>
                                <div className={classes.result} >
                                    <div ref='result1' className={classes.resultNum} >{poll.leftPercentage}</div> 
                                    <span className={classes.resultAddon} >%</span>
                                </div>
                            </div>
                            <div className={classes.answerText}>{poll.answers.l.value}</div>
                        </div>
                        <LazyImage className={classes.image} loaded={this.loadedL} load={poll.answers.l.srcImg}/>
                        <div className={classes.answerText}>{poll.answers.l.value}</div>
                    </div>
                    <div className={classes.divider}> </div>
                    <div ref='right' className={classes.answer}>
                        <span ref='ripple2' className={classes.ripple}></span>
                        <div className={cn(classes.info, {[classes.infoVisible]: this.props.poll.isInfoVisible})}>
                            <div className={classes.scores} >
                                <div ref='check2' className={classes.check}>
                                    <svg width="30px" height="21px" viewBox="68 132 30 21" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M69,141 L78,151 L97,133" stroke="#FFFFFF" strokeWidth="2" fill="none"></path>
                                    </svg>
                                </div>
                                <div className={classes.votes} >
                                    <span className={classes.votesNum}>{poll.answers.r.quantity}</span>
                                    <span className={classes.votesAddon}> votes</span>
                                </div>
                                <div className={classes.progress} > 
                                    <div  ref='progressBar2'  className={classes.progressBar} style={{ 'width': `${poll.rightPercentage}%` }} ></div>
                                </div>
                                <div className={classes.result} >
                                    <div ref='result2' className={classes.resultNum} >{poll.rightPercentage}</div> 
                                    <span className={classes.resultAddon} >%</span>
                                </div>
                            </div>
                            <div className={classes.answerText}>{poll.answers.r.value}</div>
                        </div>
                        <LazyImage className={classes.image} loaded={this.loadedR} load={poll.answers.r.srcImg}/>
                        <div className={classes.answerText}>{poll.answers.r.value}</div>
                    </div>
                </div>
            </div>,
            <div key="footer" ref="footer" className={classes.footer}>
                    {poll.number > 1 &&  <Button className={classes.footerBtn} variant="raised" color="secondary" side="small" onClick={this.prev} >
                        <Icon className={classes.leftIcon}>navigate_before</Icon>
                        Prev
                    </Button>}

                    <div className={classes.space}> </div>
                    
                    {poll.number < this.props.store.allCardsNumber && <Button className={classes.footerBtn + ' ' + classes.footerLeft} variant="raised" color="secondary"  side="small" onClick={this.next} >Next
                        <Icon className={classes.rightIcon}>navigate_next</Icon>
                    </Button>}

                    {poll.number === this.props.store.allCardsNumber && <Button  className={classes.footerBtn + ' ' + classes.footerRight} variant="raised" color="secondary"  side="small" onClick={this.finish} >
                        Finish 
                        <Icon className={classes.rightIcon}>done</Icon>
                    </Button>}

                    {this.props.embed && <a target="_blank" className={classes.powered} href="https://quizi.io">Powered by Quizi.io</a>} 
            </div>]

        )
    }
}

export default Poll;
