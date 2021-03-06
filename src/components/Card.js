import React, { PropTypes } from 'react';
import {observable, action, computed, when} from 'mobx';
import { observer }  from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {requestAnimationFramePromise, transitionEndPromise, parallel, wait , transitionEndWithStrictPromise, isTouchDevice} from './../utils';
import * as cn  from 'classnames'; 

import { lerp, listener } from './../utils';

import Poll from './Poll'
import Quiz from './Quiz'

import ResultCard from './ResultCard';

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
        width: '100%',
        backgroundColor: 'white',
        '@media (max-width: 600px)':{
            maxWidth: '400px',
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
        position: 'relative',
        zIndex: 10,
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
    cardInner:{
        position: 'relative',
        height: '100%'
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
    startAgain = false;
    @observable setInfoVisible = false;

    picking = false;

    componentDidMount(){
      
        let cardPlace = this.props.cardPlace;
        if(this.props.store[cardPlace]) { 
            this.props.store[cardPlace].ref = this.refs.card;
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

        if(!isTouchDevice()) return

        this.listeners.forEach(func => func());
        let cardPlace = this.props.cardPlace, that = this;
        
        if( cardPlace == 'currentCard' && that.refs && that.refs.header){
            // that.listeners.push(listener(that.refs.card, 'mousedown', that.startDrag, false));
            // that.listeners.push(listener(document, 'mouseup', that.stopDrag, false));
            // that.listeners.push(listener(document, 'mousemove', that.drag, false));
            that.listeners.push(listener(that.refs.card, 'touchstart', that.startDrag, false));
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

        if(cardPlace == 'currentCard' &&  this.props.store.currentCard &&  this.props.store.currentCard.cardType == 'poll'){
            this.props.store.currentCard.inmovable = false
        }
    }

    componentDidUpdate(){
        let cardPlace = this.props.cardPlace;
        if(this.props.store[cardPlace]) { 
            this.props.store[cardPlace].ref = this.refs.card;
            this.props.store[cardPlace].reactClass = this;
        }

        this.draggableSettingsIfNeeded();

        if( this.startAgain ){
            this.startAgain = false; 
            when(() => this.props.store.currentCard.isImageLoaded, () => {
                this.adjustStyle();
                this.registerEvents();
            })
            
        }

    }


    get adjustStyleDebounced(){
        return this.debounce(this.adjustStyle, 1000);
    }

    debounce = (func, time) => {
        var timeOut = null;

        return ( ...args ) => {
            let context = this;
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
                if(!that.refs.card) return

                let {left, top, width, height} = that.refs.card.getBoundingClientRect();
                
                if(width == 0 || height == 0){
                    setTimeout(this.adjustStyle, 1000);
                }

                if(that.refs.card.parentElement.style.position == "relative"){
                    let {top: parentTop} = that.refs.card.parentElement.getBoundingClientRect();
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

        if(!this.refs.card) return

        this.refs.card.style.transition = 'transform .2s ease-in-out';
        if( opt.action != 'none') this.props.store.canMakeAction = false;

        return requestAnimationFramePromise()
            .then( async _ => {
                that.refs.card.style.transform = target;
                return transitionEndWithStrictPromise(that.refs.card, 'transform');
            })
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                if( opt.action == 'none') return
                
                that.props.store.nextCard.ref.style.transition = 'transform 0.15s cubic-bezier(0.49, .7, .1, 1.4)';
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
            .then( _ => {
                if( opt.action == 'none') {
                    that.refs.card.style.transition = ''; // set current card back
                    return
                }
                // change current card
                that.props.store.current = that.props.store.current + 1;
                that.refs.card.style.opacity = 0;
                that.refs.card.style.transition = 'initial';
            })
            .then( _ => requestAnimationFramePromise())
            .then( _ => requestAnimationFramePromise())
            .then( _ => {
                if( opt.action == 'none') return
                that.refs.card.style.transform = ''; // set current card back
                    // change next cart to eliminate flicker efect on photos
            })
            .then( _ => requestAnimationFramePromise())
            .then( _ => requestAnimationFramePromise())
            .then( _ => {
                if( opt.action == 'none') return
                

                that.refs.card.style.opacity = 1;
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
                that.props.store.nextCard.ref.style.transition = 'transform 0.15s cubic-bezier(0.49, .7, .1, 1.4)';
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
                that.props.store.canMakeAction = true;
                if( opt.action == 'none') return
                
                that.props.store.save();
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
        // save later
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
        that.props.store.save();
    }
    
    @action.bound
    finish = e => {
        this.props.store.IsEnd = true;
        this.props.store.saveFinalCard();
        this.listeners.forEach(func => func()); 
    }

    _dragging = false;
    _allowDrag;
    
    startDrag = (event) => {
        let cardPlace = this.props.cardPlace;
        if ((this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) || this.props.store.currentIsEnd) return;
        event.preventDefault();
        this._dragging = true;
        this.startX = event.clientX || event.touches[0].clientX;
        this.startY = event.clientY || event.touches[0].clientY;
    }
    
    stopDrag = (event) => {
        // we catch event from all page so do no prevent Defalut it break whole btns
        let cardPlace = this.props.cardPlace;
        if (this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) return;
        
        if (!this._dragging || !this._allowDrag) {
            this._allowDrag = undefined;
            return;
        }
        this._allowDrag = undefined;
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
        
        event.preventDefault();
        
        let cardPlace = this.props.cardPlace;
        
        if (this.props.store[cardPlace] && this.props.store[cardPlace].inmovable) return;
        if (!this._dragging) return;

        const deltaX = (event.clientX || event.touches[0].clientX) - this.startX;
        const deltaY = (event.clientY || event.touches[0].clientY) - this.startY;
        
        
        if( this._allowDrag == undefined) {
            if( Math.abs(deltaX) < Math.abs(deltaY) ){
                return
                this._allowDrag  = false;
            }else{
                this._allowDrag = true
            }
        }
        
      
        this.refs.card.style.transform = `rotate(${this.props.store._rotationLerp(deltaX)}deg) translate(${deltaX}px, ${0}px)`;
            
        
    }


    // Todo: redo into forwardRef id this Needed
    getRef = (ref)  => {
        this.innerContainerRef = ref;
    }

    @action.bound
    again = (e) => {
        e.preventDefault();
        //e.stopImmediatePropagation();
        this.props.store.IsEnd = false;
        this.startAgain = true; 
        this.props.store.current = 0;
        this.props.store.next = 1;
        this.props.store.clearProgress();
    }

    render() {

        let {classes, cardPlace} = this.props;
        let card = this.props.store[cardPlace];

        let scale = {};
        if(cardPlace == 'nextCard'){
            scale = {transform: 'translate3d(0,-35px,0) scale(.9)'};
        }
        
        if(!card || typeof card.then == 'function'){
            return(<div ref='card'/>);
        }


        if(this.props.store.IsEnd){
            return (
                <div ref='card'
                className={[classes.card, cardPlace].join(' ')} style={{ ...this.props.store.getPositionStyles}}>
                    <ResultCard adjustStyle={this.adjustStyle} again={this.again} cardSlug={this.props.store.cardSlug} embed={this.props.store.embed} />
                </div>
            )
        }

        return (
            <div ref='card' className={[classes.card, cardPlace].join(' ')} style={{ ...this.props.store.getPositionStyles, ...scale}}>
                <div className={classes.cardInner} >
                    <div
                        ref='header'
                        className={classes.header}>
                        <span className={classes.delimeter}></span>
                        <Typography variant="h4" className={classes.prog}>  
                            {card.number} /  {this.props.store.allCardsNumber}
                        </Typography>
                        
                    </div>

                    { card.cardType == 'poll' && <Poll passRef={this.getRef} store={this.props.store} poll={card} next={this.next} prev={this.prev} finish={this.finish} embed={this.props.store.embed}/> }
                    { card.cardType == 'quiz' && <Quiz store={this.props.store} Quiz={card} next={this.next} prev={this.prev} finish={this.finish} currentIsEnd={this.props.store.currentIsEnd} embed={this.props.store.embed}/> }
                </div>
            </div>
        )
    }
}

export default Card;
