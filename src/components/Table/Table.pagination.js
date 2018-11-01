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
        color: theme.palette.white.color,
        marginLeft: theme.spacing.unit * 2.5,
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
            aria-label="First Page"
          >
            <Icon>first_page</Icon>
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            <Icon>keyboard_arrow_left</Icon> 
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
           <Icon>keyboard_arrow_right</Icon>
          </IconButton>
          <IconButton
            color="secondary"
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            <Icon>last_page</Icon> 
          </IconButton>
        </div>
      );
    }
}
