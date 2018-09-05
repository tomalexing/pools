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
import Modal from '@material-ui/core/Modal';

import { observable, action, when } from "mobx";
import { observer } from "mobx-react";

import { listener } from './../utils';

import { Link } from 'react-router-dom';

import BottomBar from './text.ts';

const styles = theme => ({

    footer: {
        position: 'relative',
        //bottom: 0,
        width: '100%',
        lineHeight: '1em',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
            display: 'none',
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
    bar: {
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            marginTop: 6
        }
    },
    divider: {
        backgroundColor: "#6C7184"
    },
    delimiter: {
        color: "#ffffff",
        fontSize: 20
    },

    space: {
        flex: 1
    }

});
@withStyles(styles)
@observer
class Footer extends React.Component {

    constructor(props) {
        super(props)
        this.listeners = [];
    }

    componentDidMount(){
        let that = this;
        this._mounted = true;
        this.adjustStyle();
        this.listeners.push(listener(window, 'resize' , _ => {
            that.adjustStyle();
        }, false))
    }
    
    componentWillUnmount(){
        this._mounted = false;
    }

    componentDidUpdate(){
        this.adjustStyle();
    }

    adjustStyle = _ => {
        if(!this._mounted) return
        if(window.innerWidth <  600){
            let { height } =  this.refs.footer.getBoundingClientRect();
            this.refs.footer.style.bottom = `-${height  - 60}px` ;
        }else{
            this.refs.footer.style.bottom = 0;
        }
    }

    render() {
        const { classes } = this.props;
        return ( <footer ref='footer' className={classes.footer} >

                <Divider className={classes.divider} />
                <Toolbar className={classes.bar}>
                                        
                    <Link to={'/term-of-use'} className={classes.menuBtnSpacings}>
                        <Typography variant="body1"  className={classes.footerText}  > Terms of service </Typography>
                    </Link>

                    <span className={classes.delimiter}>·</span>
                    
                    <Link to={'/privacy-policy'} className={classes.menuBtnSpacings}>
                        <Typography variant="body1"  className={classes.footerText}  > Privacy Policy </Typography>
                    </Link>
                    
                    <span className={classes.delimiter}>·</span>
                    
                    <Link to={'/subscribe'} className={classes.menuBtnSpacings}>
                        <Typography variant="body1"  className={classes.footerText}  > 
                        Subscribe </Typography>
                    </Link>

                    <span className={classes.delimiter}>·</span>
                    
                    <Typography ref='copyright' variant="body1" className={classes.menuBtnSpacings + ' ' + classes.footerText}>
                    </Typography>

                    <span className={classes.space} ></span>

                    <Typography ref='copyright' variant="body1" className={classes.menuBtnSpacings + ' ' + classes.footerText} >
                        Copyright © 2018. Quizi. All Rights Reserved
                    </Typography>
                    
                </Toolbar>
             </footer>
        );
    }

}





export default Footer