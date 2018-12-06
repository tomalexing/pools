import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';
import {IsBright} from './../../utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import EnhancedTableHead from './Table.header';
import TableCell from '@material-ui/core/TableCell';
import EnhancedTableCell from './Table.cell';
import EnhancedTablePagination from './Table.pagination';
import CircularProgress from '@material-ui/core/CircularProgress';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const EnhancedTableStyles = theme => ({

    paginationWhite: {
        color: 'white'
    },

    paginationBlack: {
        color: theme.background.default
    },

    tableBackground: {
        backgroundColor: theme.background.default
    },

    noWrap: {
        whiteSpace: 'nowrap'
    },

    center:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:  '50%',
        left: '50%',
        transform: 'translateX(-50%)'
    },

    borderNone: {
        border: 'none'
    },


})

@withStyles(EnhancedTableStyles, { withTheme: true })
@observer
export default class EnhancedTable extends React.Component {

    state = {
        order: this.props.order || 'desc',
        orderBy: this.props.orderBy,
        selected: [],
        page: 0,
        rowsPerPage: this.props.rowsPerPage || 5,
    };

    firstChild(children) {
        const childrenArray = React.Children.toArray(children);
        return childrenArray[0] || null;
    }
      
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
    };

    getStyleBackground(props, defaultClassName){
        if(props.backgroundColor){
            return {'style': {'backgroundColor': props.backgroundColor}};
        }else{
            return {'className': defaultClassName};
        }
    }

    classForPagination(props) {
        return IsBright(props.backgroundColor) ? props.classes.paginationBlack : props.classes.paginationWhite
    }
    
    render() {
        const {order, orderBy, rowsPerPage, page } = this.state;

        const {data, classes, selected, selectAll} = this.props;
        let {loaded} = this.props;

        if(typeof this.props.loaded == 'undefined'){
            loaded = true;
        }
        
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        let backgroundProps = this.getStyleBackground(this.props, classes.tableBackground);
        if(!loaded)
            return (
                <Table {...backgroundProps}>

                    <EnhancedTableHead
                        numSelected={selected ? selected.length : 0}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={selectAll ? selectAll : null}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                        rows={this.props.rowsHeader}
                    />
                    <TableBody {...backgroundProps}>
                        <TableRow style={{ height: 200 }}>
                            <EnhancedTableCell className={cn(classes.borderNone)}> <div className={classes.center} > <CircularProgress color="secondary" /></div> </EnhancedTableCell>
                        </TableRow>
                    </TableBody>

                </Table>
                );

        return(
            <Table {...backgroundProps}>

                <EnhancedTableHead
                    numSelected={selected ? selected.length : 0}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={selectAll ? selectAll : null}
                    onRequestSort={this.handleRequestSort}
                    rowCount={data.length}
                    rows={this.props.rowsHeader}
                />

                <TableBody {...backgroundProps}>
                    {stableSort(data, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(this.props.innerTable)}
                    
                    { emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                            <EnhancedTableCell colSpan={14} />
                        </TableRow>
                    )}

                    {this.props.footerData && this.props.footerData.map(this.props.innerTable)}
                </TableBody>

                {!this.props.notShowPagination && <TableFooter>
                        <TableRow >
                            <TablePagination
                                classes={{
                                    input: this.classForPagination( this.props ),
                                    select: this.classForPagination( this.props ),
                                    selectIcon: this.classForPagination( this.props ),
                                    caption: this.classForPagination( this.props )
                                }}
                                className={this.classForPagination( this.props )}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={EnhancedTablePagination}
                            />
                        </TableRow>
                </TableFooter> }
            </Table>)
    }

}

EnhancedTable.propTypes = {
    backgroundColor: PropTypes.string,
    rowsPerPage: PropTypes.number,
    loaded: PropTypes.bool,
    orderBy: PropTypes.string,
    data: PropTypes.array.isRequired,
    rowsHeader: PropTypes.array.isRequired,
    innerTable: PropTypes.func.isRequired
};

EnhancedTable.defaultProps = {
    backgroundColor: '#474E65'
};