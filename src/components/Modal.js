
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import {PinchView} from 'react-pinch-zoom-pan'
import { action } from 'mobx';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '270px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        borderRadius: 5,
        overflow: 'hidden',
        '& #simple-modal-title': {
            margin: `${-1 * theme.spacing.unit * 4}px ${-1 * theme.spacing.unit * 4}px 0 ${-1 * theme.spacing.unit * 4}px`,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
            backgroundColor: theme.palette.secondary.main 
        },
        '& #simple-modal-description': {
            minHeight: 50,
            margin: `${theme.spacing.unit}px 0`,
        },

        '&$full':{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            '@media (max-width: 600px)': {
                overflow: 'hidden'
            }
        }
    },

    full:{},

    closeModal:{
        float: 'right',
        marginBottom: `${-1 * theme.spacing.unit }px`,
        borderRadius: 15
    },

    paddingTop1: {
        paddingTop: theme.spacing.unit * 1
    },
    paddingTop2: {
        paddingTop: theme.spacing.unit * 2
    },
    paddingTop3: {
        paddingTop: theme.spacing.unit * 3
    },
    paddingTop4: {
        paddingTop: theme.spacing.unit * 4
    },
    paddingBottom1: {
        paddingBottom: theme.spacing.unit * 1
    },
    paddingBottom2: {
        paddingBottom: theme.spacing.unit * 2
    },
    paddingBottom3: {
        paddingBottom: theme.spacing.unit * 3
    },
    paddingBottom4: {
        paddingBottom: theme.spacing.unit * 4
    }
});

class SimpleModal extends React.Component {

  constructor(props){
      super(props);
      this.closeModal = this.proxyCloseModal

      this.registerEvents();
  }


  proxyCloseModal = e => {
    this.touches = 0;
    this.scaleStateXOld = 0;
    this.scaleStateYOld = 0;
    this.scaleStateX = 0;
    this.scaleStateY = 0;
    this.scrollStateX = 0;
    this.scrollStateY = 0;
    this.scrollStateXOld = 0;
    this.scrollStateYOld = 0;
    this.scaleState = 1;
    this.scaleStateOld = 0;
    this.distanceOld = 0;
    this.distance = 0;
    this.distanceAcc = 0;
    this.distanceLast = 0;
    this.props.close(e);
  } 

  state = {
    open: false,
  };
 
  registerEvents = _ => {

  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps){
    this.setState({open:nextProps.open});
  }

  touches = 0;
  scaleStateXOld = 0;
  scaleStateYOld = 0;
  scaleStateX = 0;
  scaleStateY = 0;
  scrollStateX = 0;
  scrollStateY = 0;
  scrollStateXOld = 0;
  scrollStateYOld = 0;
  scaleState = 1;
  scaleStateOld = 0;
  distanceOld = 0;
  distance = 0;
  distanceAcc = 0;
  distanceLast = 0;
  scaleScale = 0;
  scaleScaleOld = 0;
  tpCache = new Array();
  /** 
   *
   *
   * @param {*} e
   */
  rememberPoints = (e) => {
    e.preventDefault(); // todo should be implemented cusom scroll
 
    this._dragging = true;
    this.startX = e.clientX || e.touches[0].clientX;
    this.startY = e.clientY || e.touches[0].clientY;
    this.deltaX = 0;
    this.deltaY = 0;
    this.scaleStateXOld = this.scaleStateX;
    this.scaleStateYOld = this.scaleStateY;
    this.scrollStateXOld = this.scrollStateX;
    this.scrollStateYOld = this.scrollStateY;
    this.scaleStateOld = this.scaleState;
    this.distanceOld = this.distance;
    this.distanceLast = 0;
    
    this.scaleScale = this.scaleScaleOld;
    //console.log(this.startX, this.startY);
 
    // Cache the touch points for later processing of 2-touch pinch/zoom
    if (e.targetTouches.length == 2) {
      for (var i=0; i < e.targetTouches.length; i++) {
        this.tpCache.push(e.targetTouches[i]);
      }
    }

  }

  drag = (e) => {
    e.preventDefault();

    this.deltaX = (e.clientX || e.touches[0].clientX) - this.startX;
    this.deltaY = (e.clientY || e.touches[0].clientY) - this.startY;

    if (!(e.touches.length == 2 && e.targetTouches.length == 2)){
        this.scrollStateX = this.deltaX + this.scrollStateXOld
        this.scrollStateY = this.deltaY + this.scrollStateYOld
        
        //this.refs.body.style.transform = `scale(${this.scaleScale}) translate(${this.scrollStateX}px, ${this.scrollStateY}px)`;

    }
    
    if (e.targetTouches.length == 2 && e.changedTouches.length == 2){
        var point1=-1, point2=-1;
        for (var i=0; i < this.tpCache.length; i++) {
            if (this.tpCache[i].identifier == e.targetTouches[0].identifier) point1 = i;
            if (this.tpCache[i].identifier == e.targetTouches[1].identifier) point2 = i;
        }
        if (point1 >=0 && point2 >= 0) {

            // Calculate the difference between the start and move coordinates
            var diff1 = Math.abs(this.tpCache[point1].clientX - e.targetTouches[0].clientX);
            var diff2 = Math.abs(this.tpCache[point2].clientX - e.targetTouches[1].clientX);
            
            var swing = Math.abs(e.targetTouches[0].clientX - e.targetTouches[1].clientX);


            if( this.oldSwing ){
                if(swing - this.oldSwing > 0){
                    this.scaleScale = this.scaleScale +  (diff1 + diff2)/500;
                }else{
                    this.scaleScale = this.scaleScale - (diff1 + diff2)/500;
                }
                console.log(this.scaleScale, ' this.scaleScale')
                this.scaleScale = Math.min(3, Math.max(1, this.scaleScale));
            }
            
            this.refs.body.style.transform = `scale(${this.scaleScale}) translate(${0}px, ${0}px)`;
            // This threshold is device dependent as well as application specific
            var PINCH_THRESHHOLD = e.target.clientWidth / 10;
            if (diff1 >= PINCH_THRESHHOLD && diff2 >= PINCH_THRESHHOLD)
                e.target.style.background = "green";

        }
        else {
          // empty tpCache
          this.tpCache = new Array();
        }

        return
    }
  }


  @action
  pinchStopped = p => {
    this.needRealise = true
  }

  render() {
    const { classes, full } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.closeModal}
        >
          <div style={getModalStyle()} className={cx(classes.paper, classes.paddingBottom3,{[classes.full]: this.props.full})}>
            <Typography variant="display1" id="simple-modal-title">
                {this.props.title}
            </Typography>
            {this.props.zoom ? 
                window.innerWidth <= 600 ? <div><PinchView backgroundColor='#fff' maxScale={4} onPinchStop={this.pinchStopped}>
                    {this.props.body}
                    </PinchView></div>
                    : 
                    <div>
                        {this.props.body}
                    </div>
                :
                <div>
                    <Typography variant="subheading" id="simple-modal-description">
                        {this.props.body}
                    </Typography>
                </div>
            }
            <div style={{height: '12px'}} />
            <Button size="large" color="primary" className={classes.closeModal} onClick={this.closeModal}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SModal = withStyles(styles)(SimpleModal);

export default SModal;