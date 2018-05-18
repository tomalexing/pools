import React, { PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import Card from './Card';
import { listener } from './../utils';
import Cards from "./../models/Cards";
import { withRouter } from 'react-router'

const styles = theme => ({

    quizWrapper:{
        display: 'flex',
        margin: 'auto',
        // height: '100%',
        // position: 'relative',
        width: '100%'
    }
})
@withRouter
@withStyles(styles)
@observer
class OneCard extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];

        this.model = new Cards({getIds: () =>{
            return new Promise(resolve => { resolve([props.match.params.id]) })
        }, cardSlug: 'quizzes'})
    }

    componentDidMount(){
        let that = this;
        if(!window.isMobileDevice){
            this.listeners.push(listener(window, 'resize' , e => {
                this.model.currentCard && 
                this.model.currentCard.reactClass &&
                this.model.currentCard.reactClass.adjustStyle();
            }, false))
        }
    }

    componentWillUnmount(){
        if(!window.isMobileDevice){
            this.listeners.forEach(func => func());
        }
    }

    render() {
        
        let {classes} = this.props;

        if(!this.model || this.model.allCardsNumber == 0 ){
             return(<div/>)
        }

        return (
            <div className={classes.quizWrapper}>
                <Card cardPlace='currentCard' store={this.model}/>
            </div>
        )
    }
}

export default OneCard;
