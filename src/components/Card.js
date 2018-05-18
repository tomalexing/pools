import React, { PropTypes } from 'react';
import {observable, action, computed, when} from 'mobx';
import { observer }  from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {requestAnimationFramePromise, transitionEndPromise, parallel, wait , transitionEndWithStrictPromise} from './../utils';
import * as cn  from 'classnames'; 
import Divider from 'material-ui/Divider';

import { LazyImage, lerp, listener } from './../utils';

import Quiz from './Quiz'
import Pool from './Pool'

import Share from './Share'

const styles = theme => ({
    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        margin: 'auto',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '690px',
        height: 'auto',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
        willChange: 'transform',
        '@media (max-width: 600px)':{
            maxWidth: '400px'
        },
        '&.currentCard':{
            zIndex: 1001
        },
        '&.nextCard': {
            zIndex: 1000,
            display: 'none',
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
        '& $prog':{
            padding: '0 10px'
        }
    },
    delimeter:{},
    prog:{},
    question:{
        fontSize: '18px',
        fontWeight: '400',
        color: '#474e65',
        marginBottom: 15,
    },


    quizBodyResult: {
        display: 'flex',
        flexDirection: 'column',
        padding: '23px 30px',
        backgroundColor: 'white',
        margin: '-1px 0',
        height: 'calc(100% - 40px - 76px)',
        overflow: 'auto',
        '@media (max-width: 600px)':{
            height: '350px',
      
        }
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
    divider: {
        margin: '30px 0 ',
    },
    column:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerResult: {
        paddingBottom: '1rem'
    },
    noWrap:{
        whiteSpace: 'nowrap'
    }
})

@withStyles(styles)
@observer
class Card extends React.Component {

    constructor(props) {
        super(props);

        let cardPlace = this.props.cardPlace;
        
        if(cardPlace == 'currentCard' && props.startCard)
            props.store.current = props.startCard - 1;

        if(cardPlace == 'nextCard'){
            props.store.isStack = true;
        }

        if(cardPlace == 'nextCard' && props.startCard){ // set from props
            props.store.next = props.startCard - 1;
        }
        
        if(cardPlace == 'nextCard' && !(props.store.next > 0)){ /// set from current
            props.store.next = props.store.current + 1 || 1;
        }

        this.draggableSettingsIfNeeded();

        this.startDrag  = this.startDrag.bind(this)
        this.drag  = this.drag.bind(this)
        this.stopDrag  = this.stopDrag.bind(this)

    }

    listeners = [];
    eliminateCycle = true;
    startAgain = false;
    @observable setInfoVisible = false;
    @observable progress = null;

    picking = false;

    componentDidMount(){
        let cardPlace = this.props.cardPlace;
        if(this.props.store[cardPlace]) { 
            this.props.store[cardPlace].ref = this.refs.quiz;
            this.props.store[cardPlace].reactClass = this;
        }


        let that = this;
        if(this.props.store.currentCard){
            if(typeof this.props.store.currentCard.then == 'function'){
                this.props.store.currentCard.then( card => {
                    when(() => card.isImageLoaded, () => {
                        that.adjustStyle();
                        that.registerEvents();
                    });
                })

            }
            else{
                when(() => that.props.store.currentCard.isImageLoaded,() => {
                    that.adjustStyle();
                    that.registerEvents();
                });
            }
        }

    }

    registerEvents = () => {

        this.listeners.forEach(func => func());
        let cardPlace = this.props.cardPlace, that = this;
        
        if( cardPlace == 'currentCard' && that.refs && that.refs.header){
            that.listeners.push(listener(that.refs.header, 'mousedown', that.startDrag, false));
            that.listeners.push(listener(document, 'mouseup', that.stopDrag, false));
            that.listeners.push(listener(document, 'mousemove', that.drag, false));
            that.listeners.push(listener(that.refs.header, 'touchstart', that.startDrag, false));
            that.listeners.push(listener(document, 'touchend', that.stopDrag, false));
            that.listeners.push(listener(document, 'touchmove', that.drag, false));
        }
    }

    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    draggableSettingsIfNeeded = () => {
        let cardPlace = this.props.cardPlace;
        if(cardPlace == 'nextCard' && this.props.store.nextCard){
            this.props.store.nextCard.inmovable = true
        }

        if(cardPlace == 'currentCard' &&  this.props.store.currentCard &&  this.props.store.currentCard.cardType == 'Quiz'){
                this.props.store.currentCard.inmovable = false
        }
    }

    componentDidUpdate(){
        let cardPlace = this.props.cardPlace;
        if(this.props.store[cardPlace]) { 
            this.props.store[cardPlace].ref = this.refs.quiz;
            this.props.store[cardPlace].reactClass = this;
        }

        this.draggableSettingsIfNeeded();

        if( this.props.store.IsEnd && this.eliminateCycle){
            this.eliminateCycle = false;
            this.adjustStyle();
        }

        if( this.startAgain ){
            this.startAgain = false; 
            when(() => this.props.store.currentCard.isImageLoaded, this.adjustStyle);
            this.registerEvents();
        }

    }


    get adjustStyleDebounced(){
        return this.debounce(this.adjustStyle, 1000);
    }


    debounce = (func, time) => {
        var timeOut = null;

        return _ => {
            let context = this, args = arguments;
            let letter = _ => {
                timeOut = null;
                func.apply(context, args)
            } 
            clearTimeout(timeOut);
            timeOut = setTimeout(letter, time);
        }

    }

    cleanPosition = _ => {

        return new Promise(requestAnimationFrame).then(_ => {
            this.props.store.positionStyles = {}
        })
    }


    @action.bound
    adjustStyle = () => {

       let that = this;
       if(this.props.cardPlace == 'currentCard' && that.props.store.isStack){
           
           new Promise(requestAnimationFrame).then(async _ => {
                await wait(300);
                that.props.store.positionStyles = {};
                if ( that.props.store['nextCard']  && that.props.store['nextCard'].ref){
                    that.props.store['nextCard'].ref.style.display = 'none';
                }
                return new Promise(requestAnimationFrame);
            }).then( _ => {
                return new Promise(requestAnimationFrame);
            })
            .then( async _ => {
                if(!that.refs.quiz) return

                let {left, top, width, height} = that.refs.quiz.getBoundingClientRect();
                
                if(width == 0 || height == 0){
                    setTimeout(this.adjustStyle, 1000);
                }

                if(that.refs.quiz.parentElement.style.position == "relative"){
                    let {top: parentTop} = that.refs.quiz.parentElement.getBoundingClientRect();
                }else{
                    var parentTop = 0;
                }

                that.setPosition({left, top: top - parentTop, width, height});

                if(that.props.store['nextCard']  && that.props.store['nextCard'].ref){
                    that.props.store['nextCard'].ref.style.display = 'block';
                }
            })
        }
    }

    _animate = (target, opt) => {
        let that = this;

        if( !that.props.store.isStack ){
            that.props.store.current = that.props.store.current + 1;
            return
        }

        this.refs.quiz.style.transition = 'transform .35s ease-in-out';
        this.props.store.canMakeAction = false;

        return requestAnimationFramePromise()
            .then( async _ => {
                that.refs.quiz.style.transform = target;
                return transitionEndWithStrictPromise(that.refs.quiz, 'transform');
            })
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                if( opt.action == 'none') return
                that.props.store.nextCard.ref.style.transition = 'transform 0.2s cubic-bezier(0.49, .7, .1, 1.4)';
            })
            .then(_ => requestAnimationFramePromise())
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                if( opt.action == 'none') return
                that.props.store.nextCard.ref.style.transform = '';
                return transitionEndPromise(that.props.store.nextCard.ref);
            })
            .then(_ =>  {
                if( opt.action == 'none') return
                that.props.store.nextCard.ref.style.transition = ''
            }) // pull next card it back
            .then( async _ => {
                if( opt.action == 'none') {
                    that.refs.quiz.style.transition = ''; // set current card back
                    return
                }
                // change current card
                that.refs.quiz.style.transition = 'initial';
                that.props.store.current = that.props.store.current + 1;
                that.refs.quiz.style.opacity = 0;
            })
            .then( async _ => requestAnimationFramePromise())
            .then( async _ => requestAnimationFramePromise())
            .then(async _ => {
                
                that.refs.quiz.style.transform = ''; // set current card back
                    // change next cart to eliminate flicker efect on photos
            })
            .then( async _ => requestAnimationFramePromise())
            .then( async _ => requestAnimationFramePromise())
            .then( async _ => {
                if( opt.action == 'none') return
                that.refs.quiz.style.opacity = 1;
                if(!that.props.store.nextIsEnd){
                    that.props.store.next = that.props.store.next + 1;
                }else{
                    that.props.store.next = -1;
                }

            })
            .then(_ => {
                if( opt.action == 'none') return
                // animate next card
                
                if( !that.props.store.nextCard || !that.props.store.nextCard.ref) return
                that.props.store.nextCard.ref.style.transition = 'transform 0.2s cubic-bezier(0.49, .7, .1, 1.4)';
            })
            .then(_ => requestAnimationFramePromise())
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                if( opt.action == 'none') return

                // finish animate next card
                if( ! that.props.store.nextCard || ! that.props.store.nextCard.ref) return
                that.props.store.nextCard.ref.style.transform = 'translate3d(0,-35px,0) scale(.9)';
                return transitionEndWithStrictPromise(that.props.store.nextCard.ref, 'transform');
            })  
            .then(_ =>  {
                this.props.store.canMakeAction = true;
                if( opt.action == 'none') return
                if( ! that.props.store.nextCard ) return
                that.props.store.nextCard.ref.style.transition = ''
            });
    }

    @action.bound
    setPosition = position => {
        this.props.store.positionStyles = position;
    }

    @action.bound
    next = e => {
        if(!this.props.store.canMakeAction) return

        let that = this;

        return this._animate('translateX(200%)', {action: 'next'});

    }

    @action.bound
    prev = e => {
        let that = this;
        this.setInfoVisible = false;
        that.props.store.current = that.props.store.current - 1;
        if(that.props.store.next < 0 ){
            that.props.store.next = that.props.store.current + 1;
            requestAnimationFramePromise()
                .then(_ => {

                    // finish animate next card
                    that.props.store.nextCard.ref.style.transition = 'transform 0.2s cubic-bezier(0.49, .7, .1, 1.4)';
                }) 
                .then(_ => requestAnimationFramePromise())
                .then(_ => {

                    // finish animate next card
                    that.props.store.nextCard.ref.style.transform = 'translate3d(0,-35px,0) scale(.9)';
                    return transitionEndPromise(that.props.store.nextCard.ref);
                })  
                .then(_ =>  {
                    that.props.store.nextCard.ref.style.transition = ''
                });
        }else{

            that.props.store.next = that.props.store.next - 1 || this.props.store.allCardsNumber;
        }
    }

    @action.bound
    finish = e => {
        this.props.store.IsEnd = true;
        this.props.store.saveFinalCard();
    }

    _dragging = false
    
    startDrag = (event) => {
        let cardPlace = this.props.cardPlace;
        if ((this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) || this.props.store.currentIsEnd) return;

        event.preventDefault();
        this._dragging = true;
        this.startX = event.clientX || event.touches[0].clientX;
        this.startY = event.clientY || event.touches[0].clientY;
    }
    
    stopDrag = (event) => {
        let cardPlace = this.props.cardPlace;
        if (this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) return;
        if (!this._dragging) return;
        event.preventDefault();
        this._dragging = false;
        const deltaX = (event.clientX || event.changedTouches[0].clientX) - this.startX;
        const deltaY = (event.clientY || event.changedTouches[0].clientY) - this.startY;

        
        if (this.props.store._leftSwipe(deltaX) >= 1){
            return this._animate('translateX(-200%)', {action: 'next'});
        }

        if (this.props.store._rightSwipe(deltaX) >= 1) {
            return this._animate('translateX(200%)', {action: 'next'}); 
        }

        return this._animate('initial', {action: 'none'});
    }
    
    drag = (event) => {
        let cardPlace = this.props.cardPlace;

        if (this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) return;
        if (!this._dragging) return;

        const deltaX = (event.clientX || event.touches[0].clientX) - this.startX;
        const deltaY = (event.clientY || event.touches[0].clientY) - this.startY;
      
        this.refs.quiz.style.transform = `rotate(${this.props.store._rotationLerp(deltaX)}deg) translate(${deltaX}px, ${deltaY}px)`;
        

        event.preventDefault();
    }

    @action.bound
    again = () => {
        this.props.store.IsEnd = false;
        this.startAgain = true; 
        this.eliminateCycle = true;
        this.props.store.current = 0;
        this.props.store.next = 1;
        this.props.store.clearProgress();
        this.progress = null;

        this.registerEvents()
    }

    loadProgress = () => {
        if(!this.progress)
        this.props.store.allProgress.then(progress => this.progress = progress)
    }

    render() {

        let {classes, cardPlace} = this.props;
        let card = this.props.store[cardPlace];

        let scale = {};
        if(cardPlace == 'nextCard'){
            scale = {transform: 'translate3d(0,-35px,0) scale(.9)'};
        }
        
        if(!card || typeof card.then == 'function'){
            return(<div ref='quiz'/>);
        }

        if(this.props.store.IsEnd){
            this.loadProgress();
            return(
                <div ref='quiz'
                className={[classes.card, cardPlace].join(' ')} style={{ ...this.props.store.getPositionStyles, ...scale}}>
                    
                    { card.cardType == 'Quiz' && 
                    <div>
                        <div  ref='header' className={classes.header}>
                            <Typography variant="display1">
                                Congratulations!
                            </Typography>
                        </div>
                        <div className={classes.quizBodyResult}>
                            <div className={classes.row + ' ' + classes.responseRow}>
                                <div className={classes.col}>
                                    <Typography variant="body1" >
                                         You answered  {this.progress && this.progress.number} of {this.props.store.allCardsNumber} polls
                                    </Typography>
                                    <Typography variant="display2" className={classes.noWrap}>
                                        {this.progress && Math.floor(this.progress.number * 100 / this.props.store.allCardsNumber)}%
                                    </Typography>
                                </div>
                                <div className={classes.col}>
                                    <Typography variant="body1" >
                                        Want to try again?
                                    </Typography>
                                    <Button className={classes.btnResult} variant="raised" color="secondary"  side="small" onClick={this.again} >Take again
                                    </Button>
                                </div>
                            </div>
                            <Divider className={classes.divider} />
                            <div className={classes.row + ' ' + classes.column}>
                                <Typography variant="body1" className={classes.headerResult} gutterBottom>
                                    Recommend the Test to Your Friends:
                                </Typography>
                                <Share/>
                            </div>
                        </div>
                    </div>}

                { card.cardType == 'Pool' && 
                    <div>
                        <div ref='header' className={classes.header}>
                            <Typography variant="display1">
                                Congratulations!
                            </Typography>
                        </div>
                        <div className={classes.quizBodyResult}>
                            <div className={classes.row + ' ' + classes.responseRow}>
                                <div className={classes.col}>
                                    <Typography variant="body1" >
                                         You have an IQ of  {this.progress && this.progress.iqValue} 🎉
                                    </Typography>
                                    <Typography variant="display2" >
                                        { this.progress && this.progress.iqValue }
                                    </Typography>
                                </div>
                                <div className={classes.col}>
                                    <Typography variant="body1" >
                                        Want to try again?
                                    </Typography>
                                    <Button className={classes.btnResult} variant="raised" color="secondary"  side="small" onClick={this.again} >Take again
                                    </Button>
                                </div>
                            </div>
                            <Divider className={classes.divider} />
                            <div className={classes.row + ' ' + classes.column}>
                                <Typography variant="body1" className={classes.headerResult} gutterBottom>
                                    Recommend the Test to Your Friends:
                                </Typography>
                                <Share/>
                            </div>
                        </div>
                    </div>}

                </div>
            )
        }

        return (
            <div ref='quiz' className={[classes.card, cardPlace].join(' ')} style={{ ...this.props.store.getPositionStyles, ...scale}}>
                 {/*onMouseDown = {this.startDrag} 
                 onTouchStart = {this.startDrag} */}
                <div
                 ref='header' className={classes.header}>
                    <span className={classes.delimeter}></span>
                    <Typography variant="display1" className={classes.prog}>  
                        {card.number} /  {this.props.store.allCardsNumber}
                    </Typography>
                    
                </div>

                { card.cardType == 'Quiz' && <Quiz store={this.props.store} quiz={card} next={this.next} prev={this.prev} finish={this.finish}/> }
                { card.cardType == 'Pool' && <Pool store={this.props.store} pool={card} next={this.next} prev={this.prev} finish={this.finish} currentIsEnd={this.props.store.currentIsEnd} /> }

            </div>
        )
    }
}

export default Card;
