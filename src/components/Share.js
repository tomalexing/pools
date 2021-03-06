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

import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton'
import Icon  from '@material-ui/core/Icon'
import { listener, metaContent } from './../utils';
import CardsModel from './../models/Cards'

import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
} from 'react-share';

import logo from './../assets/quiz-logo.png'

const styles = theme => ({
    socialNetworks:{
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'flex-start',
       flexWrap: 'noWrap'
    },
    socialNetworksModal:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
     },
    socialNetwork:{
        margin: '0 6px'
    },
    socialNetworkModal:{
        margin: '0px 10px 10px'
    },
    socialNetworkBtn:{
        cursor: 'pointer',
        height: 36
    },
    paper: {
        position: 'absolute',
        maxWidth: 'calc(100% - 20px)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        maxHeight: '80%',
        display: 'flex',
        flexDirection: 'column',
        '& #share-modal-title': {
            margin: `${-1 * theme.spacing.unit * 4}px ${-1 * theme.spacing.unit * 4}px 0 ${-1 * theme.spacing.unit * 4}px`,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #share-modal-description': {
            minHeight: 50,
            padding: `${theme.spacing.unit * 2}px 0 0`,
        }
    },
    modalBtn:{
        float: 'right',
        borderRadius: 74,
        margin: '0 10px'
    }
});

@withStyles(styles)
class Share extends React.Component {

    open = false;
    title = this.props.title || document.title;
    state= {open: false};
    
    constructor(p){
        super(p);
        this.shareUrl = this.props.link ? this.props.link : (/embed/.test(window.location.href) ? window.location.href.replace('/embed','') : window.location.href);
        
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

    socClicked = _ => {
        if(!this.props.cardSlug) return
        CardsModel.saveLike(this.props.cardSlug).then(_ => {
            this.props.update(this.props.cardSlug);
        })
    }

    render(){
        let {classes} = this.props;
        let {open} = this.state;
        if(this.props.image && this.props.description && this.title) {
            metaContent([
                {
                    propertyName: '[property="og:title"]',
                    content: this.title
                },
                {
                    propertyName: '[property="og:description"]',
                    content: this.props.description
                },
                {
                    propertyName: '[property="og:image"]',
                    content: this.props.image
                },
                {
                    propertyName: '[property="og:url"]',
                    content: this.shareUrl
                },
                {
                    propertyName: '[name="twitter:title"]',
                    content: this.title
                },
                {
                    propertyName: '[name="twitter:description"]',
                    content: this.props.description
                },
                {
                    propertyName: '[name="twitter:image"]',
                    content: this.props.image
                }
            ]);
        }

        return(
            <div className={classes.socialNetworks} >
                {   React.Children.count(this.props.children) > 0 ? 
                    <div style={{width: '100%'}} onClick={this.handleOpen} >{React.cloneElement( this.props.children )}</div>
                :
                    [<div key="fbshare" className={classes.socialNetwork} onClick={this.socClicked} >
                        <FacebookShareButton
                            url={this.shareUrl}
                            quote={this.title}
                            className={classes.socialNetworkBtn}>
                            <FacebookIcon
                            size={36}
                            round />
                        </FacebookShareButton>

                    </div>,

                    <div key="twshare" className={classes.socialNetwork} onClick={this.socClicked}>
                        <TwitterShareButton
                            url={this.shareUrl}
                            title={this.title}
                            className={classes.socialNetworkBtn}>
                            <TwitterIcon
                            size={36}
                            round />
                        </TwitterShareButton>
                    </div>,

                    <IconButton key="moreshare" style={{height: 36, width: 36}} size='small' onClick={this.handleOpen}>
                        <Icon>more_horiz</Icon>
                    </IconButton>]
                }

                <Modal
                    id="modal"
                    aria-labelledby="share-modal-title"
                    aria-describedby="share-modal-description"
                    open={open}
                    onClose={this.handleClose}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="h4" id="share-modal-title">
                        Share
                    </Typography>
                    <div className={classes.socialNetworksModal}  id="share-modal-description">

                        <div className={classes.socialNetwork} onClick={this.socClicked} >
                            <FacebookShareButton
                                url={this.shareUrl}
                                quote={this.title}
                                className={classes.socialNetworkBtn}>
                                <FacebookIcon
                                size={36}
                                round />
                            </FacebookShareButton>

                        </div>

                        <div className={classes.socialNetwork} onClick={this.socClicked}>
                            <TwitterShareButton
                                url={this.shareUrl}
                                title={this.title}
                                className={classes.socialNetworkBtn}>
                                <TwitterIcon
                                size={36}
                                round />
                            </TwitterShareButton>
                        </div>

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                  
                            <TelegramShareButton
                                url={this.shareUrl}
                                title={this.title}
                                className={classes.socialNetworkBtn}>
                                <TelegramIcon size={36} round />
                            </TelegramShareButton>

                        </div>

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <WhatsappShareButton
                                url={this.shareUrl}
                                title={this.title}
                                separator=":: "
                                className={classes.socialNetworkBtn}>
                                <WhatsappIcon size={36} round />
                            </WhatsappShareButton>

                        </div>

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <GooglePlusShareButton
                                url={this.shareUrl}
                                className={classes.socialNetworkBtn}>
                                <GooglePlusIcon
                                size={36}
                                round />
                            </GooglePlusShareButton>

                        </div>

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <LinkedinShareButton
                                url={this.shareUrl}
                                title={this.title}
                                windowWidth={750}
                                windowHeight={600}
                                className={classes.socialNetworkBtn}>
                                <LinkedinIcon
                                size={36}
                                round />
                            </LinkedinShareButton>
                       </div>

                        {/*<div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <PinterestShareButton
                                url={String(window.location)}
                                media={`${String(window.location)}/${logo}`}
                                windowWidth={1000}
                                windowHeight={730}
                                className={classes.socialNetworkBtn}>
                                <PinterestIcon size={36} round />
                            </PinterestShareButton>

                        
                        </div> */}

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <RedditShareButton
                                url={this.shareUrl}
                                title={this.title}
                                windowWidth={660}
                                windowHeight={460}
                                className={classes.socialNetworkBtn}>
                                <RedditIcon
                                size={36}
                                round />
                            </RedditShareButton>

                            </div>

                            <div className={classes.socialNetworkModal } onClick={this.socClicked}>
                            <TumblrShareButton
                                url={this.shareUrl}
                                title={this.title}
                                windowWidth={660}
                                windowHeight={460}
                                className={classes.socialNetworkBtn}>
                                <TumblrIcon
                                size={36}
                                round />
                            </TumblrShareButton>

                            </div>

                            {/*<div className={classes.socialNetworkModal} onClick={this.socClicked}>
                                <EmailShareButton
                                    url={this.shareUrl}
                                    subject={this.title}
                                    body="body"
                                    className={classes.socialNetworkBtn}>
                                    <EmailIcon
                                    size={36}
                                    round />
                                </EmailShareButton>
                            </div> */}
                    </div>
                    <div style={{height: '12px'}} />
                    <div className={classes.footer}>
                        <Button size="small" variant="contained" color="secondary" className={classes.modalBtn} onClick={this.handleClose}>Close</Button>
                    </div>
                    </div>
                </Modal>
             </div>
        )
    }

}

export default Share