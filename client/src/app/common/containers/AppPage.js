import React from 'react';
import {Box, Container, IconButton, withStyles} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppHeader} from './AppHeader';
import {AppSideMenu} from '../components/AppSideMenu';
import {
    closeConfirm,
    hideSnackBarDialog,
    resetSnackBarDialogState,
    toggleExpandMenuAction,
} from '../actions/app_actions';
import {
    getConfirmModalConfig,
    getSnackBarMenuModeSelector,
    getSnackBarMenuTextSelector,
    getSnackBarPopupExitCallback,
    getSnackBarPopupHideDuration,
    isMenuExpandedSelector,
    isSnackBarPopupOpenSelector
} from '../selectors/mainSelectors';
import {AppMainSection} from '../components/AppMainSection';
import {AppSnackBarPopup} from '../components/AppSnackBarPopup';
import {AppConfirmModal} from '../components/AppConfirmModal';

const MENU_CONTAINER_WIDTH = 184;
const COLLAPSED_MENU_WIDTH = 60;

function mapStateToProps(state) {
    return {
        isMenuExpanded: isMenuExpandedSelector(state),
        isSnackBarMenuOpen: isSnackBarPopupOpenSelector(state),
        snackBarPopupMode: getSnackBarMenuModeSelector(state),
        snackBarPopupText: getSnackBarMenuTextSelector(state),
        snackBarPopupExitCallback: getSnackBarPopupExitCallback(state),
        snackBarPopupHideDuration: getSnackBarPopupHideDuration(state),
        confirmModalConfig: getConfirmModalConfig(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleExpandMenu: () => dispatch(toggleExpandMenuAction()),
        hideSnackBarPopup: () => dispatch(hideSnackBarDialog()),
        resetSnackBar: () => dispatch(resetSnackBarDialogState()),
        closeConfirm: () => dispatch(closeConfirm()),
    };
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
    },
    menuHeadContainer: {
        transition: 'max-width 0.2s ease-in-out',
        width: MENU_CONTAINER_WIDTH,
        maxWidth: 0,
        borderBottom: '1px solid #CAC7C7',
    },
    menuHeadContainerOpen: {
        maxWidth: MENU_CONTAINER_WIDTH,
    },
    mainContent: {
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        overflowX: 'hidden',
    },
    menuContainer: {
        transition: 'max-width 0.2s ease-in-out, min-width 0.2s ease-in-out',
        width: MENU_CONTAINER_WIDTH,
        maxWidth: COLLAPSED_MENU_WIDTH,
        borderRight: '1px solid #CAC7C7',
        overflowX: 'hidden',
        '@media (max-width: 480px)': {
            maxWidth: 0,
            width: '100%',
            borderRight: 'none',
            minWidth: 0,
        },
    },
    menuContainerOpen: {
        maxWidth: MENU_CONTAINER_WIDTH,
        '@media (max-width: 480px)': {
            maxWidth: '100%',
            minWidth: '100%',
        },
    },
    icon: {
        width: 24,
        height: 24,
    },
};

class AppPageClass extends React.PureComponent {
    static propTypes = {
        isMenuExpanded: PropTypes.bool,
        toggleExpandMenu: PropTypes.func,
        isSnackBarMenuOpen: PropTypes.bool,
        snackBarPopupMode: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
        snackBarPopupText: PropTypes.string,
        snackBarPopupExitCallback: PropTypes.func,
        snackBarPopupHideDuration: PropTypes.number,
        resetSnackBar: PropTypes.func,
        hideSnackBarPopup: PropTypes.func,
        confirmModalConfig: PropTypes.object,
        showConfirm: PropTypes.func,
        closeConfirm: PropTypes.func,
    };

    onHideMenuClick = () => {
        this.props.toggleExpandMenu();
    };

    onCloseDialogClick = () => {
        this.props.hideSnackBarPopup();
    };

    closeConfirmDialog = () => {
        this.props.closeConfirm();
    };

    render() {
        const {
            classes,
            isMenuExpanded,
            hideSnackBarPopup,
            confirmModalConfig,
            isSnackBarMenuOpen,
            snackBarPopupMode,
            snackBarPopupText,
            snackBarPopupExitCallback,
            snackBarPopupHideDuration,
            resetSnackBar,
        } = this.props;

        return (
            <Container
                className={classes.container}
                maxWidth={false}
            >
                <Box display="flex" flexDirection="row" width="100%">
                    <Box
                        className={`${classes.menuHeadContainer} ${isMenuExpanded ? classes.menuHeadContainerOpen : ''}`}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                    >
                        <IconButton onClick={this.onHideMenuClick}>
                            <ArrowBackIos className={classes.icon}/>
                        </IconButton>
                    </Box>
                    <Box flexGrow={1}>
                        <AppHeader/>
                    </Box>
                </Box>
                <Box className={classes.mainContent}>
                    <Box
                        className={`${classes.menuContainer} ${isMenuExpanded ? classes.menuContainerOpen : ''}`}
                    >
                        <AppSideMenu onMenuItemClick={this.onHideMenuClick}/>
                    </Box>
                    <Box flexGrow={1}>
                        <AppMainSection/>
                    </Box>
                </Box>
                <AppSnackBarPopup
                    text={snackBarPopupText}
                    mode={snackBarPopupMode}
                    onClose={hideSnackBarPopup}
                    isOpen={isSnackBarMenuOpen}
                    hideDuration={snackBarPopupHideDuration}
                    callback={snackBarPopupExitCallback}
                    resetState={resetSnackBar}
                />
                <AppConfirmModal
                    isOpen={!!confirmModalConfig}
                    title={confirmModalConfig && confirmModalConfig.title}
                    content={confirmModalConfig && confirmModalConfig.content}
                    cancelButton={confirmModalConfig && confirmModalConfig.cancelText}
                    confirmButton={confirmModalConfig && confirmModalConfig.confirmText}
                    onConfirm={confirmModalConfig && confirmModalConfig.onConfirm}
                    onClose={this.closeConfirmDialog}
                />
            </Container>
        );
    }
}

export const AppPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppPageClass));
