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

import logo from './../assets/quiz-logo.png';
import {NavLink} from './NavLink';

// const isActive = (match, location,to) => {
//   return ['/quizzes','/pools'].some(str => location.pathname.includes(str))
// }

const styles = theme => ({
    loginBtn: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing.unit,
        borderRadius: 74
    },
    startMenu: {
        display: 'flex',
        marginLeft: 'auto',
        '& li': {
            position: 'relative',
            listStyle: 'none',
            margin: `0 ${theme.spacing.unit}px`
        },
        '& li.active:hover:after': {
            opacity: .5
        },
        '& li.active:after': {
            content: '\"\"',
            position: 'absolute',
            bottom: -15,
            left: 0,
            listStyle: 'none',
            height: 2,
            width: '100%',
            backgroundColor: 'white',
            transition: 'opacity .3s ease-in-out'
        },

    },
    menuBtnSpacings: {
        display: 'block',
        textDecoration: 'none',
        transition: theme.transitions.create('opacity'),
        '&:hover':{
            opacity: .7
        },
    },
    logo: {
        marginTop: 3,
        marginRight: 20,
        width: 47,
        height: 50,
        '@media (max-width: 600px)': {
            width: 'auto',
            height: '30px'
        }
    },
    header: {
        '@media (max-width: 600px)': {
            minHeight: 48,
        }
    }
});

@withStyles(styles)
class Header extends React.Component {

  constructor(props) {
    super(props)

  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }
  

  render() {
    const { classes } = this.props;
    return (
     <AppBar position="static" color="primary">
        <Toolbar className={classes.header}>
            <a href="/">
                <img className={classes.logo} src={logo} />
            </a>
            <ul className={[classes.ul, classes.startMenu].join(" ")}>
            <NavLink tabIndex='1' to={'/quizzes'} className={classes.menuBtnSpacings} >
                 <Typography variant="button" >
                    Quizzes
                </Typography>
            </NavLink>  
            <NavLink tabIndex='1' to={'/pools'} className={classes.menuBtnSpacings}>
                <Typography variant="button" >
                    Pools
                </Typography>
            </NavLink>
            </ul>

             { /* <Button variant="raised" className={classes.loginBtn}>
                Sign Up
            </Button> */}
        </Toolbar>
      </AppBar>
    );
  }

}

export default Header