import {Box, IconButton, Menu, MenuItem, TableCell, TableRow, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {MoreVert} from '@material-ui/icons';
import {weightManageTranslations} from '../constants/translations';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        fontSize: 14,
    },
});

export function AppWeightTableRow(props) {
    const {
        childWeight,
        weightDate,
    } = props;
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const onMoreActionsClick = (ev) => {
        setMenuAnchor(ev.currentTarget);
    };
    const closeMoreActions = () => {
        setMenuAnchor(null);
    };
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell align="left">{weightDate}</TableCell>
            <TableCell align="left">{Number(childWeight).toFixed(2)} kg</TableCell>
            <TableCell align="right">
                <Box>
                    <IconButton onClick={onMoreActionsClick}>
                        <MoreVert/>
                    </IconButton>
                    <Menu
                        id="weight_actions"
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
                        onClose={closeMoreActions}
                        keepMounted
                    >
                        <MenuItem>
                            <Typography className={classes.text}>{weightManageTranslations.en.MenuActionEdit}</Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography className={classes.text}>{weightManageTranslations.en.MenuActionDelete}</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </TableCell>
        </TableRow>
    );
}

AppWeightTableRow.propTypes = {
    weightDate: PropTypes.string.isRequired,
    childWeight: PropTypes.string.isRequired,
};
