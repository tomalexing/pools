
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {observable, action, computed, when} from 'mobx';
import { observer }  from 'mobx-react';
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from './../services/Api';
import Auth from './../models/Auth';
import {requestAnimationFramePromise, transitionEndPromise, parallel, wait, listener} from './../utils';
import { HashLink as Link } from 'react-router-hash-link';


const styles = theme => ({

    cover: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: -10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(5, 6, 6, 0.8)',
        height: 80,
        transform: 'translateY(100%)',
        '@media (max-width: 767px)':{
            height: 120,
            flexDirection: 'column',
            justifyContent: 'space-around',
        }
    },

    closeModal:{
        float: 'right',
        marginBottom: `${-1 * theme.spacing.unit }px`,
        borderRadius: 15
    },



    disclaimer: {
        color: 'white',
        padding: '0 5px'
    },

    ctrlArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        
    },

    btn: {
        borderRadius: 74,
        color: 'white',
        margin: 'auto 10px'
    }
});

@withStyles(styles)
@observer
class Cookies extends React.Component {

  constructor(props){
      super(props);
      this.closeModal = props.close
  }

  componentDidMount(){
    
    let that = this;
    when(() => !Auth.loadingUserData , () => {
        loadFromStore('cookies').then(_ => {
            that.isCookiesSet = true;
        }, _ => {
            that.isCookiesSet = false;
            when(() => that.refs.body ,  async () => {
                await requestAnimationFramePromise()
                    .then(_ => requestAnimationFramePromise())
                    .then(_ => {
                        that.refs.body.style.transition = 'transform 1s ease-in-out';
                        that.refs.body.style.transform = 'translateY(0)';
                        return transitionEndPromise(that.refs.body);
                    })
            });
        })
    });
  }

  @observable
  isCookiesSet = true;

  open = () => {
    let that = this;
    when(() => that.refs.body ,  async () => {
        await requestAnimationFramePromise()
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                that.refs.body.style.transition = 'transform .5s ease-in-out';
                that.refs.body.style.transform = 'translateY(0)';
                return transitionEndPromise(that.refs.body);
            })
    });
  }
  
  close = () => {
    let that = this;
    when(() => that.refs.body ,  async () => {
        await requestAnimationFramePromise()
            .then(_ => requestAnimationFramePromise())
            .then(_ => {
                that.refs.body.style.transition = 'transform 1s ease-in-out';
                that.refs.body.style.transform = 'translateY(100%)';
                return transitionEndPromise(that.refs.body);
            })
    });
  }

  saveIt = () => {
    let that = this;
    saveToStore('cookies', true)
        .then(Api.saveUserData)
        .then(that.close)
  }

  render() {

    const {classes} = this.props;

    return (this.isCookiesSet ? <div className={classes.cover}/> :
      <div ref='body' className={classes.cover} style={{zIndex: 10000}}>
            <div className={classes.disclaimer}> 
            <Typography variant="display4" style={{fontSize: 14}}>Our website uses cookies to make your browsing experience better. By using our website you agree to our use of cookies. <Link style={{color: '#FD819F'}} to="/privacy-policy#cookies">Learn more</Link></Typography></div>
        <div className={classes.ctrlArea}> 
            <Button color="primary" style={{minWidth: 150}} variant="outlined" className={classes.btn} onClick={this.close}> Deny cookies</Button>
            <Button color="secondary" variant="raised" onClick={this.saveIt} className={classes.btn}> Got it </Button>
        </div>
      </div>
    );
  }
}

export default Cookies