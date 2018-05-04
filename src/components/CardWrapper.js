import React, { PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import Card from './Card';
import { listener } from './../utils';

const styles = theme => ({

    quizWrapper:{
        display: 'flex',
        margin: 'auto',
        
    }
})

@withStyles(styles)
@observer
class QuizWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];
        this.current = 1;
        this.next = 2;
    }

    componentDidMount(){
        let that = this;
        if(!window.isMobileDevice){
            this.listeners.push(listener(window, 'resize' , e => {

                that.props.store.currentCard && 
                that.props.store.currentCard.reactClass &&
                that.props.store.currentCard.reactClass.adjustStyle();
            }, false))
        }

        // this.props.store.load().then(current => {
        //     that.current = current;
        //     that.next = current + 1;
        // })
        window.addEventListener("beforeunload", function (event) {
            //that.props.store.save()
        })
    }

    componentWillUnmount(){
        if(!window.isMobileDevice){
            this.listeners.forEach(func => func());
        }

        //this.props.store.save()
    }

    render() {
        
        let {classes} = this.props;

        if(this.props.store.allQuizNumber == 0 ){
             return(<div/>)
        }

        return (
            <div className={classes.quizWrapper}>
                <Card startCard={this.current} cardPlace='currentCard' store={this.props.store}/>
                <Card startCard={this.next} cardPlace='nextCard' store={this.props.store}/>
            </div>
        )
    }
}

export default QuizWrapper;
