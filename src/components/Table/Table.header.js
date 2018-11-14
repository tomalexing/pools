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
import Checkbox from '@material-ui/core/Checkbox';
import * as cn from 'classnames';

const EnhancedTableHeadStyles = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main
    },

    height: {
        height: '40px'
    },

    borderOff: {
        border: 'none'
    },

    center: {
      textAlign: 'center', 
    },

    dilimiter: {
      '&:not(:last-child)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.1)'
      },
      position: 'relative',
      '&:after':{
        content: '\"\"',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '1px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }
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
          {this.props.rows.map((columns, idx) => (
            <TableRow key={idx} classes={{ root: classes.height }}>
              {columns.map(row => {
                return (
                  <TableCell
                    key={row.id}
                    numeric={row.numeric}
                    padding={row.padding || 'default'}
                    sortDirection={orderBy === row.id ? order : false}
                    className={cn(classes.dilimiter, classes.borderOff, {[classes.center]: row.center})}
                    colSpan={row.colSpan || 1}
                  > 

                  {row.type != "checkbox" ? 

                    !row.notAbleSort ? 
                      (<Tooltip
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
                          <Typography  variant="h4" style={{weight: 'bold'}}> 
                                {row.label}
                          </Typography>
                        </TableSortLabel>
                      </Tooltip>)
                      :(
                        <Typography  variant="h4" style={{weight: 'bold'}}> 
                          {row.label}
                        </Typography>
                      )
                    :

                    <Checkbox
                      style={{color: 'white'}}
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount && rowCount != 0}
                      onChange={onSelectAllClick}
                    />
                  }

                  </TableCell>
                );
              }, this)}
            </TableRow>))}
        </TableHead>
      );
    }
  }