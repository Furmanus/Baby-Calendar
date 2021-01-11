import React from 'react';
import PropTypes from 'prop-types';
import {Grow, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    alert: {
        fontSize: 14,
    },
});

export function AppSnackBarPopup(props) {
    const {
        isOpen,
        mode,
        onClose,
        text,
        resetState,
        hideDuration,
        callback,
    } = props;
    const classes = useStyles();

    const onExit = () => {
        callback();
        resetState();
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={hideDuration} onClose={onClose} TransitionComponent={Grow} onExited={onExit}>
            <Alert className={classes.alert} onClose={onClose} severity={mode}>
                {text}
            </Alert>
        </Snackbar>
    );
}

AppSnackBarPopup.propTypes = {
    mode: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    text: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    hideDuration: PropTypes.number,
    callback: PropTypes.func,
    onClose: PropTypes.func,
    resetState: PropTypes.func,
}

AppSnackBarPopup.defaultProps = {
    callback: () => {},
    resetState: () => {},
    hideDuration: 2000,
};
