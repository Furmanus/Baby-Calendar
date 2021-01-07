import React from 'react';
import PropTypes from 'prop-types';
import {Box, IconButton, Menu, MenuItem, TableCell, TableRow, Typography} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {materialDataTableCellStyles} from '../../../styles/materialStyles';
import {dashboardTranslations as translations} from '../../constants/translations';
import {dataDashboardColumnsPropTypes} from '../AppDataDashboard';

const useStyles = makeStyles({
    text: {
        fontSize: 14,
    },
    tableCell: materialDataTableCellStyles,
});

export function AppDataDashboardRow(props) {
    const {
        data,
        onDeleteClick,
        onEditClick,
        columns,
    } = props;
    const classes = useStyles();
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const onMoreActionsClick = (ev) => {
        setMenuAnchor(ev.currentTarget);
    };
    const closeMenuActions = () => {
        setMenuAnchor(null);
    };
    const handleDeleteClick = () => {
        closeMenuActions();
        onDeleteClick(data);
    };
    const handleEditClick = () => {
        closeMenuActions();
        onEditClick(data);
    };

    return (
        <TableRow>
            {
                columns.map(column => (
                    <TableCell
                        key={Math.random()}
                        className={classes.tableCell}
                        align="left"
                    >
                        {data[column.key]}
                    </TableCell>
                ))
            }
            <TableCell className={classes.tableCell} align="right">
                <Box>
                    <IconButton onClick={onMoreActionsClick}>
                        <MoreVert/>
                    </IconButton>
                    <Menu
                        id="inoculations_actions"
                        anchorEl={menuAnchor}
                        open={!!menuAnchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={closeMenuActions}
                        keepMounted
                    >
                        <MenuItem onClick={handleEditClick}>
                            <Typography className={classes.text}>{translations.en.ActionsEdit}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <Typography className={classes.text}>{translations.en.ActionsDelete}</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </TableCell>
        </TableRow>
    );
}

AppDataDashboardRow.propTypes = {
    data: PropTypes.object.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    columns: dataDashboardColumnsPropTypes,
};
