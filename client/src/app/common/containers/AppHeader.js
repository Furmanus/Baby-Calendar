import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppBar, IconButton, Toolbar, Typography, Box, Menu, withStyles, MenuItem} from '@material-ui/core';
import {AccountCircle, Menu as MenuIcon} from '@material-ui/icons';
import {dashboardTranslations} from '../constants/translations';
import {toggleExpandMenuAction} from '../actions/app_actions';
import {isMenuExpandedSelector} from '../selectors/mainSelectors';
import {logoutApi} from '../../../api/api';

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
    icon: {
        width: 32,
        height: 32,
        color: 'white',
    },
    heading: {
        fontSize: 18,
    },
    menuItem: {
        fontSize: 14,
    },
    menuButton: {
        '@media (min-width: 480px)': {
            marginLeft: -24,
        },
    },
};

class AppHeaderClass extends React.PureComponent {
    static propTypes = {
        isMenuExpanded: PropTypes.bool,
        toggleExpandMenu: PropTypes.func,
    };

    state = {
        settingsMenuAnchor: null,
    };

    onSettingsMenuClick = (ev) => {
        this.setState({
            settingsMenuAnchor: ev.currentTarget,
        });
    };

    onMenuClick = () => {
        this.props.toggleExpandMenu();
    };

    closeSettings = () => {
        this.setState({
            settingsMenuAnchor: null,
        });
    };

    onLogoutClick = async () => {
        try {
            await logoutApi();

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {
            classes,
            isMenuExpanded,
        } = this.props;
        const {
            settingsMenuAnchor,
        } = this.state;

        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    {
                        !isMenuExpanded && (
                            <IconButton className={classes.menuButton} onClick={this.onMenuClick} edge="start" disableRipple>
                                <MenuIcon className={classes.icon}/>
                            </IconButton>
                        )
                    }
                    <Typography className={classes.heading} variant="h6">{dashboardTranslations.en.HeaderText}</Typography>
                    <Box marginLeft="auto">
                        <IconButton
                            aria-haspopup="true"
                            aria-label="user account"
                            aria-controls="settings-appbar"
                            edge="end"
                            onClick={this.onSettingsMenuClick}
                        >
                            <AccountCircle className={classes.icon}/>
                        </IconButton>
                        <Menu
                            id="settings-appbar"
                            className={classes.settingsMenu}
                            anchorEl={settingsMenuAnchor}
                            open={!!settingsMenuAnchor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={this.closeSettings}
                            keepMounted
                        >
                            <MenuItem onClick={this.onLogoutClick}>
                                <Typography className={classes.menuItem}>{dashboardTranslations.en.SettingsMenuLogout}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppHeaderClass));
