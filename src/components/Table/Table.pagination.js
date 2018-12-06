import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';


import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


const EnhancedTablePaginationStyles = theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing.unit * 2.5,
    },
    menuBtn:{
      width: 48,
      height: 48
    },

    inherit: {
      color: 'inherit !important'
    },

});

@withStyles(EnhancedTablePaginationStyles, { withTheme: true })
export default class EnhancedTablePagination extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };

  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <IconButton
            color="secondary"
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            className={classes.menuBtn}
            aria-label="First Page"
            classes={{
              disabled: classes.inherit
            }}
          >
            <Icon>first_page</Icon>
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
            className={classes.menuBtn}
            classes={{
              disabled: classes.inherit
            }}
          >
            <Icon>keyboard_arrow_left</Icon> 
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
            className={classes.menuBtn}
            classes={{
              disabled: classes.inherit
            }}
          >
           <Icon>keyboard_arrow_right</Icon>
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
            className={classes.menuBtn}
            classes={{
              disabled: classes.inherit
            }}
          >
            <Icon>last_page</Icon> 
          </IconButton>
        </div>
      );
    }
}
