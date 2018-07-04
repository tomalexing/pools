import React, { PropTypes } from 'react';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {requestAnimationFramePromise, transitionEndPromise, parallel, 
        wait, listener, LazyImage, transitionEndWithStrictPromise, isTouchDevice} from './../utils';
import * as cn  from 'classnames'; 

import Radio from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import SModal from './Modal';

const styles = theme => ({
    quizBody:{
        padding: '23px 30px',
        backgroundColor: 'white',
        margin: '-1px 0',
        overflow: 'hidden',
        height: '100%',
        maxHeight: '400px',
        '-webkit-overflow-scrolling': 'touch',
        '@media (min-width: 768px)':{
            overflowY: 'auto'
        }
    
    },
    question:{
        fontSize: '18px',
        fontWeight: '400',
        color: '#474e65',
        marginBottom: 15,
    },
    answersWrapper:{
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        font: 'normal 600 18px/1 Montserrat',
        paddingBottom: '30px',
        '@media (max-width: 600px)':{
            flexWrap: 'wrap',
            flexDirection: 'column'
        }
    },
    image:{
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10px',
        marginRight: 20,
        '& img': {
            verticalAlign: 'middle',
            overflow: 'hidden',
            objectFit: 'cover',
            zIndex: 1,
            height: '100%',
            objectFit: 'contain',
            '@media (max-width: 840px)':{
                height: '100%'
            }
        },
        '@media (max-width: 600px)': {
            marginBottom: '20px'
        }
    },

    imageModal:{
        display: 'flex',
        padding: '10px',
        '& img': {
            maxWidth: '100%',
            objectFit: 'contain',
            margin: 'auto',
            width: '100%',
            height: 'auto',
            '@media (min-width: 600px)': {
                maxHeight: 'calc(100vh - 200px)',
                width: 'auto'
            }
        },
    },

    answerText: {
        zIndex: 10,
        border: '6px solid transparent',
        borderRadius: 74,
        color: '#353846',
        font: 'normal 400 14px/1 Open Sans',
        paddingRight: 10,
        height: 'auto'
    },
    answerIncorrect:{
        border: '6px solid rgba(252, 56, 104, 0.5)'
    },
    answerCorrect:{
        border: '6px solid rgba(80, 227, 194, 0.8)'
    },
    divider: {
        width: 0
    },
})

@withStyles(styles)
@observer
class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.loadedL = this.loadedL.bind(this)
    }

    listeners = [];
    input = [];
    picking = false;

    componentDidMount(){
        this.registerEvents();
    }

    componentDidUpdate(){
        this.listeners.forEach(func => func());
        this.registerEvents();
    }

    registerEvents = () => {

        if(!isTouchDevice()) return

        this.listeners.push(listener(this.refs.body,'touchstart', this.rememberPoints, false));
        this.listeners.push(listener(this.refs.body, 'touchmove', this.drag, false));
        this.listeners.push(listener(this.refs.body, 'touchend', this.finishScroll, false));
        // this.listeners.push(listener(this.refs.body, 'mousedown', this.rememberPoints, false));
        // this.listeners.push(listener(this.refs.body, 'mousemove', this.drag, false)); 
        // this.listeners.push(listener(this.refs.body, 'mouseup', this.finishScroll, false)); 

    }



    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    rememberPoints = (e) => {
        e.preventDefault(); // todo should be implemented cusom scroll
     
        this._dragging = true;
        this.startX = e.clientX || e.touches[0].clientX;
        this.startY = e.clientY || e.touches[0].clientY;
        this.deltaX = 0;
        this.deltaY = 0;
        this.scrollStateOld = this.scrollState;
    }

    scrollStateOld = 0
    scrollState = 0;



    drag = (e) => {
        e.preventDefault(); // todo should be implemented cusom scroll
        if (!this._dragging) return;

        this.deltaX = (e.clientX || e.touches[0].clientX) - this.startX;
        this.deltaY = (e.clientY || e.touches[0].clientY) - this.startY;
        
        this.scrollState = this.deltaY + this.scrollStateOld
        
        
        this.refs.body.style.transform = `translate(${0}px, ${this.scrollState}px)`;
    }


    @action.bound
    finishScroll = e => {
        
        if (!this._dragging) return;
        
        if(window.innerWidth < 600 ){
            if(this.deltaY && Math.abs(this.deltaY) < 2) {
                this._dragging = false
                return;
            }
        }
        
        e.preventDefault();

        let {height} = this.refs.body.getBoundingClientRect();

        this.scrollState = Math.min(0, Math.max(-(height - (this.props.store.positionStyles.height - 40)), this.scrollState + this.deltaY/2));
        let that = this;

        that.refs.body.style.transition = 'transform .2s ease-out';
        that._dragging = false;
        return requestAnimationFramePromise()
            .then( async _ => {
                that.refs.body.style.transform = `translate(${0}px, ${this.scrollState}px)`;
                return transitionEndWithStrictPromise(that.refs.body, 'transform');
            })
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                that.refs.body.style.transition = '';
            })
           
    }

    @action.bound
    pick = idx => async e => { 

    
        if( !this.props.store.canMakeAction) return
        
        if(this.deltaY && Math.abs(this.deltaY)  > 5) {
            return;
        }   

        if(e.type == 'keyup'){
            let  code = e.keyCode || e.which;
            console.log(code)
            if(code != 13 && code != 32)
                return
        }
        if(this.picking ||
            ( !this.props.Quiz.isCurrent(this.props.store.current) &&
              !this.props.currentIsEnd )
           ) return

        this.picking = true;
        this.props.Quiz.selectedValue = idx;
        
        await this.props.Quiz.setProgress();

        await wait(300);
        this.props.Quiz.showCorrectAnswer = true;
        await wait(1000);
        
        this.scrollStateOld = 0
        this.refs.body.style.transform = `translate(${0}px, ${0}px)`;

        if(this.props.currentIsEnd){
            this.props.finish(e);
        }else{
            this.props.next(e);
        }

        await wait(1000);
        this.picking = false;
        this.scrollStateOld = 0
        this.scrollState = 0;
    }

    loadedL = () => {
        this.props.Quiz.setImageLoaded();
    }

    modalLoaded = () => {

    }

    @observable modalOpened = false;
    @action.bound
    openModal = () => {
        if(this.deltaY && Math.abs(this.deltaY)  > 10) {
            return;
        }   
        this.modalOpened = true;
    };
    @action.bound
    closeModal = () => {
        this.modalOpened = false;
    };

    render() {

        let {classes, Quiz} = this.props;

        if(!Quiz || typeof Quiz.then == 'function'){
            return(<div ref='body'/>);
        }

        return (
        <div ref="container" className={classes.quizBody}>
            <div ref="body" >
                <Typography variant="headline" gutterBottom  className={classes.question}>
                    <div ref="title" dangerouslySetInnerHTML={{__html:Quiz.question}} />
                </Typography>
                <div ref="answer" className={classes.answersWrapper}>
                
                    {Quiz.questionSrcImg && <div onMouseUp={this.openModal} onTouchEnd={this.openModal}><LazyImage className={classes.image} loaded={this.loadedL} load={Quiz.questionSrcImg}/></div>}

                    <SModal width="100%" title={<div dangerouslySetInnerHTML={{__html:Quiz.question}} />} body={<LazyImage className={classes.imageModal} loaded={this.modalLoaded} load={Quiz.questionSrcImg}/>} open={this.modalOpened} close={this.closeModal} full={true} zoom={true} />  

                    <div className={classes.divider}> </div>
                    <RadioGroup className={classes.answers} >
                        { Quiz.answers.map((answer, idx) => {
                        return  <FormControlLabel  
                                    key={`answer-${idx}`}
                                    className={cn(
                                        classes.answerText,
                                        {[classes.answerIncorrect]: this.props.Quiz.selectedValue == idx && idx != this.props.Quiz.answerCorrect},
                                            {[classes.answerCorrect]: this.props.Quiz.showCorrectAnswer && idx == this.props.Quiz.answerCorrect
                                            },
                                            {[classes.answerCorrect]: this.props.Quiz.selectedValue == idx && idx == this.props.Quiz.answerCorrect
                                            },
                                            {'inputIQ-current': this.props.Quiz.isCurrent(this.props.store.current)},
                                            {'inputIQ-next': !this.props.Quiz.isCurrent(this.props.store.current)},
                                        )}
                                    value={''+idx}
                                    onMouseUp={this.pick(idx)}
                                    onTouchEnd={this.pick(idx)}
                                    onKeyUp={this.pick(idx)}
                                    control={
                                        <Radio 
                                        checked={this.props.Quiz.selectedValue == ''+idx}
                                        color="secondary"
                                        style={{color: '#FC3868'}}
                                        />
                                    }
                                    label={answer}
                                    
                                />
                        }) }
                    </RadioGroup>
                </div>
            </div>
        </div>
        )
    }
}

export default Quiz;
