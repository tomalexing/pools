import React, { PropTypes } from 'react';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {requestAnimationFramePromise, transitionEndPromise, parallel, 
        wait, listener, LazyImage} from './../utils';
import * as cn  from 'classnames'; 

import Radio from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    quizBody:{
        padding: '23px 30px',
        backgroundColor: 'white',
        margin: '-1px 0',
        overflow: 'auto',
        height: '100%',
        '@media (max-width: 600px)':{
            height: '350px',
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
            '@media (max-width: 840px)':{
                height: '100%'
            }
        },
        '@media (max-width: 600px)': {
            marginBottom: '20px'
        }
    },
    answerText: {
        zIndex: 10,
        border: '6px solid transparent',
        borderRadius: 74,
        color: '#353846',
        font: 'normal 400 14px/1 Open Sans',
        paddingRight: 10,
        height: 42
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
class Pool extends React.Component {

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
        this.input = document.querySelectorAll('.inputIQ-current');

        if(this.input){
            
            this.listeners.push(Array.from(this.input).map( target => {
                return listener(target, 'mouseup', this.pick, false)
            }))

            this.listeners.push(Array.from(this.input).map( target => {
                return listener(target, 'keyup', this.pick, false)
            }))

            this.listeners.push(Array.from(this.input).map( target => {
                return listener(target, 'touchend', this.pick, false)
            }))
            
            this.listeners = Array.prototype.concat.apply([], this.listeners);
        }
    }



    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    @action.bound
    pick = async e => {
        //e.preventDefault();
        if(e.type == 'keyup'){
            let  code = e.keyCode || e.which;
            console.log(code)
            if(code != 13 && code != 32)
                return
        }
        if(this.picking ||
            ( !this.props.pool.isCurrent(this.props.store.current) &&
              !this.props.currentIsEnd )
           ) return

        this.picking = true;
        this.props.pool.selectedValue = e.target.value;
        
        this.props.pool.setProgress();

        await wait(300);
        this.props.pool.showCorrectAnswer = true;
        await wait(1000);
        
        if(this.props.currentIsEnd){
            this.props.finish(e);
        }else{
            this.props.next(e);
        }

        await wait(1000);
        this.picking = false;
    }

    loadedL = () => {
        this.props.pool.setImageLoaded();
    }

    render() {

        let {classes, pool} = this.props;

        if(!pool || typeof pool.then == 'function'){
            return(<div ref='quiz'/>);
        }

        return (
            <div className={classes.quizBody}>
                <Typography variant="headline" gutterBottom  className={classes.question}>
                    <div dangerouslySetInnerHTML={{__html:pool.question}} />
                </Typography>
                <div className={classes.answersWrapper}>

                    {pool.questionSrcImg && <LazyImage className={classes.image} loaded={this.loadedL} load={pool.questionSrcImg}/>}
                    <div className={classes.divider}> </div>
                    <RadioGroup className={classes.answers} >
                        { pool.answers.map((answer, idx) => {
                        return  <FormControlLabel  
                                    key={`answer-${idx}`}
                                    className={cn(
                                            classes.answerText,
                                            {[classes.answerIncorrect]: this.props.pool.selectedValue == idx && idx != this.props.pool.answerCorrect},
                                            {[classes.answerCorrect]: this.props.pool.showCorrectAnswer && idx == this.props.pool.answerCorrect
                                            },
                                            {[classes.answerCorrect]: this.props.pool.selectedValue == idx && idx == this.props.pool.answerCorrect
                                            }
                                            )}
                                    control={
                                        <Radio 
                                        checked={this.props.pool.selectedValue == ''+idx}
                                        value={''+idx}
                                        color="secondary"
                                        style={{color: '#FC3868'}}
                                        className={cn(
                                            {'inputIQ-current': this.props.pool.isCurrent(this.props.store.current)},
                                            {'inputIQ-next': !this.props.pool.isCurrent(this.props.store.current)},
                                         )}
                                        />
                                    }
                                    label={answer}
                                    
                                />
                        }) }
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default Pool;
