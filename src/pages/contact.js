import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';

import { listener, getMonthName, roundeWithDec } from './../utils';

import Typography from '@material-ui/core/Typography';
import Auth from './../models/Auth';
import Api from './../services/Api';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grow from '@material-ui/core/Grow';
import Checkbox from '@material-ui/core/Checkbox';

const stylesContact = theme => ({

    page: {
        height: '100%',
        display: 'flex',
        '@media (max-width: 600px)':{
            padding: '10px'
        }
    },

    cardWrapper:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
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
            marginBottom: 0,
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
        fontWeight: 700,
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
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 74,
    },
    
    agree: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

})

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Account
@withStyles(stylesContact)
@observer
class Contact extends React.Component{

    componentWillMount(){
    }

    @action.bound
    send = e => {
        e.preventDefault();
        let that = this;
        if(!this.confirmEmail) return
        if(!(this.name.length > 0)) {
            that.entername = true;
            setTimeout(() => {
                that.entername = false;
            }, 1500);
            return
        }

        if(!(this.question.length > 0)) {
            that.enterquestion = true;
            setTimeout(() => {
                that.enterquestion = false;
            }, 1500);
            return
        }

        if(!EMAIL_RE.test(this.email)) {
            that.enteremail = true;
            setTimeout(() => {
                that.enteremail = false;
            }, 1500);
            return
        }
        
        Api.addReview(this.name, this.question, this.email).then(_ => {
            that.name = '';
            that.question = '';
            that.email = '';
            that.sent = true;
            setTimeout(() => {
                that.sent = false;
            }, 5000);
        })
    }   

    @observable sent = false;
    @observable entername = false;
    @observable enteremail = false;
    @observable enterquestion = false;

    @observable name = Auth.isAuthenticated ? Auth.displayName : '';
    @action
    setName = ({target}) => this.name = target.value
    @observable question = '';
    @action
    setQuestion = ({target}) => this.question = target.value
    @observable email = Auth.isAuthenticated ? Auth.email : '';
    @action
    setEmail = ({target}) => this.email = target.value

    @observable confirmEmail = false;
    comfirm = name => event => {
        this[name] = event.target.checked;
    }

    render(){
        let {classes} = this.props;
        return( <div className={classes.page} >
            <div className={classes.cardWrapper} >
       
            <div className={classes.card}>
                <div ref='header' className={classes.header}>
                    <Typography variant="h4" className={classes.title}>
                        Contact us
                    </Typography>
                    <span className={classes.delimeter}></span>

                </div>
                <div className={classes.cardBodyResult}>
                    
                    <Typography variant="body2" className={classes.headerField} >Don't hesitate to contact us if you have any questions
                    </Typography>

                    <form  onSubmit={this.send} noValidate autoComplete="off"> 
                        <TextField
                            id="name"
                            required
                            label="Your name"
                            className={classes.formField}
                            type="text"
                            margin="normal"
                            value={this.name}
                            onChange={this.setName}
                            name="name"
                            InputProps={{
                                className: classes.formInput
                            }}
                        /> 

                        <TextField
                            id="email"
                            label="Your email"
                            required
                            type="email"
                            value={this.email}
                            className={classes.formField}
                            onChange={this.setEmail}
                            margin="normal"
                            name="email"
                            InputProps={{
                                className: classes.formInput
                            }}
                        />

                        <TextField
                            id="question"
                            label="Your question"
                            required
                            multiline
                            type="text"
                            rowsMax="20"
                            value={this.question}
                            className={classes.formField}
                            onChange={this.setQuestion}
                            margin="normal"
                            name="question"
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
                            <Typography variant="body2" className={classes.font12  + ' ' + classes.paddingTop1}>
                                I agree to receive emails from Quizi
                            </Typography>

                        </div>
                        <Button type="submit" variant="raised" color="secondary" className={classes.submitBtn} onClick={this.send} disabled={!this.confirmEmail}>
                            <Typography variant="button">Send</Typography>
                        </Button>
                    </form>
                    
                    <Grow in={this.sent} timeout={1000}>
                        <Typography color="secondary" variant="body2">Your question has been sent, we will get in touch with you soon.</Typography>
                    </Grow>
                    <Grow in={this.entername} timeout={1000}>
                        <Typography color="secondary" variant="body2">Please, enter name.</Typography>
                    </Grow>
                    <Grow in={this.enteremail} timeout={1000}>
                        <Typography color="secondary" variant="body2">Please, enter correct email.</Typography>
                    </Grow>
                    <Grow in={this.enterquestion} timeout={1000}>
                        <Typography color="secondary" variant="body2">Please, enter your question.</Typography>
                    </Grow>
                </div>
            </div>
        </div>
        </div>)
    }
}


export default Contact;