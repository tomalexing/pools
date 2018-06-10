import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import Menu, { MenuList, MenuItem } from '@material-ui/core/Menu';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';

import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { listener } from './utils';

import Api from './services/Api'

const styles = theme => ({

    subscribepage: {
        height: '100%',
        display: 'flex'
    },

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto'
    },

    card:{
        maxHeight: '100%',
        zIndex: '100',
        position: 'relative',
        marginBottom: 40,
        marginRight: 40,
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '690px',
        height: '100%',
        boxShadow:  '0px 2px 20px 0px rgba(0, 0, 0, 0.5)',
        '@media (max-width: 600px)':{
            marginRight: 0,
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
        '& $impNum':{
            padding: '0 10px'
        }
    },
    delimeter:{},
    impNum:{},

    cardBodyResult: {
        padding: '23px 30px',
        backgroundColor: 'white',
        overflow: 'hidden'
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        '&:first-child':{
            marginTop: 22
        }
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
    title: {
        padding: '0 30px',
    },
    column:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    
    headerResult: {
        paddingBottom: '1rem'
    },

    noWrap:{
        whiteSpace: 'nowrap',
        textAlign: 'center'
    },

    divider: {
        backgroundColor: "#bbc2d8",
    },

    formField:{
        display: 'block',
        width: '100%',
        '&:after': {
            borderBottomColor: '#FC3868',
        },
    },

    formInput:{
        width: '100%',
        '&:after, &:hover:before': {
            borderBottomColor: '#FC3868 !important'
        },  
    },

    headerField:{
        fontSize: 16,
        fontWeight: 600,
        margin: '0 0 12px',
    },

    submitBtn:{
        float: 'right',
        borderRadius: 74,
    },
    
    agree: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },

    formEmail: {
        width: '100%'
    },

    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        '& #Subscribe-modal-title': {
            margin: `${-1 * theme.spacing.unit * 2}px ${-1 * theme.spacing.unit * 2}px 0 ${-1 * theme.spacing.unit * 2}px`,
            padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #Subscribe-modal-description': {
            minHeight: 50,
            padding: `${theme.spacing.unit * 2}px 0 0`,
        }
    },
    closeModal:{
        float: 'right',
        borderRadius: 15,
        lineHeight: '19px'
    }
});


const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


@withStyles(styles)
@observer
class Subscribe extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];
    }

    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }


    @observable subscribeValue = '';
    @observable open = false;
    @observable title = '';
    @observable description = '';

    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    @action.bound
    handleOpen = () => {
        this.open = true;
    };

    @action.bound
    handleClose = () => {
        this.open = false;
    };
      
    @action.bound
    onChangeSubscribeValue = e => {
        this.subscribeValue = e.target.value;
    }

    @action.bound
    onSubmit = async e => {
        e.preventDefault();
        if(EMAIL_RE.test(this.subscribeValue)){
            let exist = await Api.subscription(this.subscribeValue);
            
            this.open = true;
            if(!exist){ 
                this.title = "Success!!!";
                this.description = "Your subscription was accepted.";
                
                setTimeout(() => {
                    this.subscribeValue = '';
                }, 100);
            }else{
                this.title = "Denied";
                this.description = "You have already subscribed.";
            }
        }else{
            this.open = true;
            this.title = "Denied";
            this.description = "Check email and try again.";
        }


    }

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    @observable confirmEmail = false;
    comfirm = name => event => {
        this[name] = event.target.checked;
    }

    render() {
        const { classes } = this.props;
        return (
            <div ref='body' className={classes.subscribepage} >
                <div className={classes.cardWrapper} >
        
                    <div className={classes.card}>
                        <div ref='header' className={classes.header}>
                            <Typography variant="display1" className={classes.title}>
                                Subscribe
                            </Typography>
                            <span className={classes.delimeter}></span>

                        </div>
                        <div className={classes.cardBodyResult}>
                            <Typography variant="body1" className={classes.headerField} >We sent only news, no span.
                            </Typography>

                            <form className={classes.form} onSubmit={this.onSubmit} noValidate autoComplete="off">
                                <TextField
                                    id="email"
                                    required
                                    label="Email"
                                    className={classes.formEmail}
                                    type="email"
                                    margin="normal"
                                    value={this.subscribeValue}
                                    onChange={this.onChangeSubscribeValue}
                                    InputProps={{
                                        className: classes.formInput
                                    }}
                                />
                                <div className={classes.agree}>
                                
                                        <Checkbox
                                        checked={this.confirmEmail}
                                        value="email"
                                        onChange={this.comfirm('confirmEmail')}

                                        />
                                        <Typography variant="body1" className={classes.font12  + ' ' + classes.paddingTop1}>
                                            I agree to receive emails from Quizi
                                        </Typography>

                                </div>
                                <Button type="submit"  color="secondary" variant="raised" disabled={!this.confirmEmail} className={classes.submitBtn}>
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <Modal
                    aria-labelledby="Subscribe-modal-title"
                    aria-describedby="Subscribe-modal-description"
                    open={this.open}
                    onClose={this.handleClose}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="display1" id="Subscribe-modal-title">
                        {this.title}
                    </Typography>
                    <Typography variant="body1" id="Subscribe-modal-description">
                        {this.description}
                    </Typography>
                    <Button size="small" variant="raised" color="secondary" className={classes.closeModal} onClick={this.handleClose}>close</Button>
                    </div>
                </Modal>
             </div>
        );
    }

}





export default Subscribe