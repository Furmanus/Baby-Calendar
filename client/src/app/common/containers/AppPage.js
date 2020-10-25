import React from 'react';
import {Box, Container, IconButton, withStyles} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppHeader} from './AppHeader';
import {AppSideMenu} from '../components/AppSideMenu';
import {toggleExpandMenuAction} from '../actions/app_actions';
import {isMenuExpandedSelector} from '../selectors/mainSelectors';
import {AppMainSection} from '../components/AppMainSection';

const MENU_CONTAINER_WIDTH = 184;
const COLLAPSED_MENU_WIDTH = 60;

function mapStateToProps(state) {
    return {
        isMenuExpanded: isMenuExpandedSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleExpandMenu: () => dispatch(toggleExpandMenuAction()),
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
    menuContainer: {
        transition: 'max-width 0.2s ease-in-out',
        width: MENU_CONTAINER_WIDTH,
        maxWidth: COLLAPSED_MENU_WIDTH,
        borderRight: '1px solid #CAC7C7',
        overflowX: 'hidden',
    },
    menuContainerOpen: {
        maxWidth: MENU_CONTAINER_WIDTH,
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
    };

    onHideMenuClick = () => {
        this.props.toggleExpandMenu();
    };

    render() {
        const {
            classes,
            isMenuExpanded,
        } = this.props;

        return (
            <Container
                className={classes.container}
                maxWidth={false}
            >
                <Box display="flex" flexDirection="row" height={64} width="100%">
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
                <Box display="flex" flexDirection="row" flexGrow={1} width="100%">
                    <Box
                        className={`${classes.menuContainer} ${isMenuExpanded ? classes.menuContainerOpen : ''}`}
                    >
                        <AppSideMenu/>
                    </Box>
                    <Box flexGrow={1}>
                        <AppMainSection/>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export const AppPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppPageClass));
