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
import { listener } from './../utils';
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
        height: 36
    },
    paper: {
        position: 'absolute',
        maxWidth: theme.spacing.unit * 50,
        width: '85%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        '& #share-modal-title': {
            margin: `${-1 * theme.spacing.unit * 2}px ${-1 * theme.spacing.unit * 2}px 0 ${-1 * theme.spacing.unit * 2}px`,
            padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
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
    shareUrl = window.location.href;
    title = document.title;
    state= {open: false};

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
        CardsModel.saveLike(this.props.cardSlug).then(_ => {
            this.props.update();
        })
    }

    render(){
        let {classes} = this.props;
        let {open} = this.state;
        return(
            <div className={classes.socialNetworks} onClick={this.socClicked} >
                <div className={classes.socialNetwork}>
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

                <IconButton style={{height: 36, width: 36}} size='small' onClick={this.handleOpen}>
                    <Icon>more_horiz</Icon>
                </IconButton>

                <Modal
                    aria-labelledby="share-modal-title"
                    aria-describedby="share-modal-description"
                    open={open}
                    onClose={this.handleClose}
                    >
                    <div style={this.getModalStyle()} className={classes.paper}>
                    <Typography variant="display1" id="share-modal-title">
                        Share
                    </Typography>
                    <div className={classes.socialNetworksModal}  id="share-modal-description">
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

                        <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <PinterestShareButton
                                url={String(window.location)}
                                media={`${String(window.location)}/${logo}`}
                                windowWidth={1000}
                                windowHeight={730}
                                className={classes.socialNetworkBtn}>
                                <PinterestIcon size={36} round />
                            </PinterestShareButton>

                        
                        </div>

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

                            <div className={classes.socialNetworkModal} onClick={this.socClicked}>
                            <EmailShareButton
                                url={this.shareUrl}
                                subject={this.title}
                                body="body"
                                className={classes.socialNetworkBtn}>
                                <EmailIcon
                                size={36}
                                round />
                            </EmailShareButton>
                            </div>
                    </div>
                    <Button size="small" variant="raised" color="secondary" className={classes.modalBtn} onClick={this.handleClose}>Close</Button>
                    </div>
                </Modal>
             </div>
        )
    }

}

export default Share