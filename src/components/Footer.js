/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import cx from 'classnames';
import Menu, { MenuList, MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types'; // ES6
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Modal from 'material-ui/Modal';

import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { listener } from './../utils';

import { Link } from 'react-router-dom';


const styles = theme => ({

    footer: {
        position: 'relative',
        //bottom: 0,
        width: '100%',
        lineHeight: '1em',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
            height: '30px',
        }
    },
    footerText: {
        color: 'white',
        fontSize: '0.875rem',
    },
    menuBtnSpacings: {
        padding: '10px 10px',
        textDecoration: 'none',
        '@media (max-width: 600px)': {
            padding: '1px',
        }
    },
    form: {
        border: '1px solid #6C7184',
        borderRadius: 34,
        padding: '0 0px 0 23px',
        marginTop: 5,
        marginBottom: 5,
        '@media (min-width: 600px)': {
            marginLeft: 'auto',
        }
        
    },
    bar: {
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            marginTop: 6
        }
    },
    formEmail:{
        marginTop: -6,
        marginBottom: 0,
        '@media (max-width: 997px)': {
            width: '50%'
        },
        '@media (max-width: 820px)': {
            width: '30%'
        },
        '@media (max-width: 600px)': {
            width: '100%'
        }
    },
    divider: {
        backgroundColor: "#6C7184"
    },
    delimiter: {
        color: "#ffffff",
        fontSize: 20
    },
    formEmailInput:{

        color: '#fff',
        '& input::placeholder':{
            color: '#cecece'
        },
	    '& input:focus::placeholder':{
            color: 'rgba(170, 170, 170, .8)'
        },
        '& input:-webkit-autofill': {
            boxShadow: '0 0 0px 1000px rgb(240, 240, 240) inset',
            '-webkitTextFillColor': '#6f6f6f'
        },
        '& input:focus:-webkit-autofill':{
            '-webkitTextFillColor': 'rgba(black, .7)',
            boxShadow: '0 0 0px 1000px #fff inset' 
        }
    },
    subscribeBtn: {
        float: 'right',
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing.unit,
        borderRadius: 74,
        '@media (max-width: 997px)': {
            margin: 6
        }
    },
    InputLabel:{
        display: 'none'
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
        '& #footer-modal-title': {
            margin: `${-1 * theme.spacing.unit * 2}px ${-1 * theme.spacing.unit * 2}px 0 ${-1 * theme.spacing.unit * 2}px`,
            padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #footer-modal-description': {
            minHeight: 50,
            padding: `${theme.spacing.unit * 2}px 0 0`,
        }
    },
    closeModal:{
        float: 'right',
        marginBottom: `${-1 * theme.spacing.unit }px`,
        borderRadius: 15
    }
});


const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


@withStyles(styles)
@observer
class Footer extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];
    }

    componentDidMount(){
        let that = this;
        this.adjustStyle();
        this.listeners.push(listener(window, 'resize' , _ => {
            that.adjustStyle();
        }, false))
    }

    componentWillUnmount(){
        this.listeners.forEach(func => func());
    }

    componentDidUpdate(){
        this.adjustStyle();
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

    adjustStyle = _ => {
        if(window.innerWidth <  600){
            let { height } =  this.refs.footer.getBoundingClientRect();
            this.refs.footer.style.bottom = `-${height  - 60}px` ;
        }else{
            this.refs.footer.style.bottom = 0;
        }
    }

    @action.bound
    onSubmit = e => {
        e.preventDefault();
        if(EMAIL_RE.test(this.subscribeValue)){
            this.open = true;
            this.title = "Success!!!";
            this.description = "Your subscription was accepted.";
            setTimeout(() => {
                this.subscribeValue = '';
            }, 100);
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

    render() {
        const { classes } = this.props;
        return (
            <footer ref='footer' className={classes.footer} >
                <Divider className={classes.divider} />
                <Toolbar className={classes.bar}>
                    <Typography ref='copyright' variant="body1" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                        © 2018 Quizion
                    </Typography>
                    
                    <span className={classes.delimiter}>·</span>
                    
                    <Link to={'/term-of-use'} className={classes.menuBtnSpacings}>
                        <Typography variant="body1"  className={classes.footerText}  > Terms of service </Typography>
                    </Link>

                    
                    <form className={classes.form} onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <TextField
                        id="email"
                        required
                        label="Email"
                        placeholder="Email"
                        className={classes.formEmail}
                        type="email"
                        margin="normal"
                        value={this.subscribeValue}
                        onChange={this.onChangeSubscribeValue}
                        InputProps={{
                            className: classes.formEmailInput,
                            disableUnderline: true
                        }}
                        InputLabelProps={{
                            shrink: true,
                            classes:{
                                root: classes.InputLabel
                            }
                        }}
                    />
                    <Button type="submit" variant="raised" className={classes.subscribeBtn}>
                        Subscribe
                    </Button>
                    </form>
                    
                </Toolbar>
                <Modal
                    aria-labelledby="footer-modal-title"
                    aria-describedby="footer-modal-description"
                    open={this.open}
                    onClose={this.handleClose}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="display1" id="footer-modal-title">
                        {this.title}
                    </Typography>
                    <Typography variant="subheading" id="footer-modal-description">
                        {this.description}
                    </Typography>
                    <Button size="small" variant="raised" color="secondary" className={classes.closeModal} onClick={this.handleClose}>Close</Button>
                    </div>
                </Modal>
             </footer>
        );
    }

}





export default Footer