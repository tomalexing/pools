import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const EnhancedTableHeadStyles = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main
    },

    height: {
        height: '40px'
    },

    borderOff: {
        border: 'none'
    }
});

@withStyles(EnhancedTableHeadStyles, { withTheme: true })
export default class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };

    render() {
      const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

      return (
        <TableHead classes={{ root: classes.root }} >
          <TableRow classes={{ root: classes.height }}>
            {this.props.columns.map(row => {
              return (
                <TableCell
                  key={row.id}
                  numeric={row.numeric}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                  className={classes.borderOff}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                      style={{color: 'white'}}
                    >
                      <Typography  variant="display1" style={{weight: 'bold'}}> 
                            {row.label}
                      </Typography>
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }