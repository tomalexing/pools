import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action, when, computed} from 'mobx';
import { observer }  from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import * as cn from 'classnames';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.light,
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});
  
@withStyles(toolbarStyles, { withTheme: true })
@observer
export default class EnhancedTableToolbar extends React.Component {

    render() {
        const { numSelected, classes } = this.props;
    
        return (
            <Toolbar
                className={cn(classes.root, {
                [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                    {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                    Nutrition
                    </Typography>
                )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                {numSelected > 0 && (
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="Delete"
                        >
                            <Icon className={classes.menuBtnIcon}>delete</Icon>
                        </IconButton>
                    </Tooltip>
                )}
                </div>
            </Toolbar>
        );
    }
}

