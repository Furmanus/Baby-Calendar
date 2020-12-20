import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, DialogContent, Box, Button} from '@material-ui/core';
import {dashboardTranslations} from '../constants/translations';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        width: 480,
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonsContainer: {
        padding: '16px 24px',
        alignSelf: 'flex-end',
    },
    cancelButton: {
        marginRight: 10,
    },
});

export function AppConfirmModal(props) {
    const {
        isOpen,
        title,
        confirmButton,
        cancelButton,
        content,
        onClose,
        onConfirm,
    } = props;
    const classes = useStyles();

    return (
        <Dialog onClose={onClose} aria-labelledby="confirm-dialog" open={isOpen}>
            <Box className={classes.container}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <Box className={classes.buttonsContainer}>
                    <Button onClick={onClose} className={classes.cancelButton}>{cancelButton}</Button>
                    <Button onClick={onConfirm} variant="contained" color="primary">{confirmButton}</Button>
                </Box>
            </Box>
        </Dialog>
    );
}

AppConfirmModal.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    confirmButton: PropTypes.string,
    cancelButton: PropTypes.string,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
};

AppConfirmModal.defaultProps = {
    isOpen: false,
    title: dashboardTranslations.en.ConfirmDialogDefaultTitle,
    content: dashboardTranslations.en.ConfirmDialogDefaultContent,
    confirmButton: dashboardTranslations.en.ConfirmDialogDefaultOkButton,
    cancelButton: dashboardTranslations.en.ConfirmDialogDefaultCancelButton,
    onConfirm: () => {},
    onClose: () => {},
};
