import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';
import Card from './Card';
import { listener } from './../utils';
import noPullToRefresh from './../no-pull-to-refresh.js';
import Auth from './../models/Auth';
// noPullToRefresh();

const styles = theme => ({

    cardWrapper:{
        display: 'flex',
        margin: 'auto',
        height: '100%',
        // position: 'relative',
        width: '100%',
    }
})

@withStyles(styles)
@observer
class CardWrapper extends React.Component {

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
        when(() => !Auth.logging && !Auth.loadingUserData , () => {
            this.props.store && this.props.store.load().then(current => {
                
                that.current = current + 1;
                that.next = current + 2;
            })
        })

        // window.addEventListener("beforeunload", function (event) {
        //     that.props.store.save();
        // })

    }

    componentWillUnmount(){
        if(!window.isMobileDevice){
            this.listeners.forEach(func => func());
        }

        // this.props.store.save();
    }

    render() {
        
        let {classes} = this.props;

        if(!this.props.store || this.props.store.allCardsNumber == 0 ){
             return(<div/>)
        }
        return (
            <div className={classes.cardWrapper}>
                <Card startCard={this.current} cardPlace='currentCard' store={this.props.store}/>
                <Card startCard={this.next} cardPlace='nextCard' store={this.props.store}/>
            </div>
        )
    }
}

export default CardWrapper;
