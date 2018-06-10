
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
        }
    },

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
      this.closeModal = props.close
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps){
    this.setState({open:nextProps.open});
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.closeModal}
        >
          <div style={getModalStyle()} className={classes.paper + ' ' + classes.paddingBottom3}>
            <Typography variant="display1" id="simple-modal-title">
                {this.props.title}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
                {this.props.body}
            </Typography>
            <div style={{height: '12px'}} />
            <Button size="small" color="primary" className={classes.closeModal} onClick={this.closeModal}>Close</Button>
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