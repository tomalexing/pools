import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import cn from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import {LightenDarkenColor} from './../../utils';



const EnhancedTableCellStyles = theme => ({
    border:{
        borderColor: LightenDarkenColor("#474E65", 20),
    }
});

@withStyles(EnhancedTableCellStyles, { withTheme: true })
@observer
export default class EnhancedTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    
    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

    render() {
      const { classes, children, className, theme, ...other } = this.props;

        if (this.state.hasError) {
            return <p>.</p>;
        }

        return ( 
            <TableCell {...other} className={cn(classes.border, className)}>
                { children }
            </TableCell>  
        );
    }
}
