import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableCell, Menu, MenuItem, Box, IconButton, Typography} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {makeStyles} from '@material-ui/core/styles';
import {materialDataTableCellStyles} from '../../../styles/materialStyles';

const useStyles = makeStyles({
    text: {
        fontSize: 14,
    },
    tableCell: materialDataTableCellStyles,
});

export function AppInoculationsTableRow(props) {
    const {
        inoculationDate,
        inoculationDescription,
        onDeleteClick,
        onEditClick,
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
        onDeleteClick(inoculationDate, inoculationDescription);
    };
    const handleEditClick = () => {
        closeMenuActions();
        onEditClick(inoculationDate, inoculationDescription);
    };

    return (
        <TableRow>
            <TableCell className={classes.tableCell} align="left">{inoculationDate}</TableCell>
            <TableCell className={classes.tableCell} align="left">{inoculationDescription}</TableCell>
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
                            <Typography className={classes.text}>{translations.en.TableActionsEditMenuItem}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <Typography className={classes.text}>{translations.en.TableActionsDeleteMenuItem}</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </TableCell>
        </TableRow>
    );
}

AppInoculationsTableRow.propTypes = {
    inoculationDate: PropTypes.string,
    inoculationDescription: PropTypes.string,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
};
