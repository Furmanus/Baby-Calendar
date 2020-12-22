import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableCell, Menu, MenuItem, Box, IconButton, Typography} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        fontSize: 14,
    },
});

export function AppInoculationsTableRow(props) {
    const {
        inoculationDate,
        inoculationDescription,
        inoculationSideEffects,
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
        onDeleteClick(inoculationDate, inoculationDescription, inoculationSideEffects);
    };
    const handleEditClick = () => {
        closeMenuActions();
        onEditClick(inoculationDate, inoculationDescription, inoculationSideEffects);
    };

    return (
        <TableRow>
            <TableCell align="left">{inoculationDate}</TableCell>
            <TableCell align="left">{inoculationDescription}</TableCell>
            <TableCell align="left">{inoculationSideEffects}</TableCell>
            <TableCell align="right">
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
    inoculationSideEffects: PropTypes.string,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
};
