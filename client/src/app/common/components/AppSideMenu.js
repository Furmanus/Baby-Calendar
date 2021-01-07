import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {routes} from '../../routes';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        '@media (max-width: 480px)': {
            width: '100vw',
        },
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconContainer: {
        '@media (max-width: 480px)': {
            position: 'absolute',
            left: 16,
        },
    },
    text: {
        fontSize: 16,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    textContainer: {
        flex: 'initial',
    },
    link: {
        color: 'initial',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        '&:hover': {
            color: 'initial',
            textDecoration: 'none',
        },
        '@media (max-width: 480px)': {
            justifyContent: 'center',
        },
    },
    listItem: {
        boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.5)',
        transition: 'box-shadow 0.3s ease-in-out',
        position: 'relative',
        '&:hover': {
            boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.75)',
        },
    },
});

export function AppSideMenu(props) {
    const classes = useStyles();

    const onMenuItemClick = useCallback(() => {
        if (window.innerWidth < 480) {
            props.onMenuItemClick();
        }
    }, []);

    return (
        <List className={classes.container} component="nav" aria-label="sections" disablePadding>
            {
                routes.reduce((result, route) => {
                    if (route.MenuIcon) {
                        result.push(
                            <ListItem key={route.path} className={classes.listItem} onClick={onMenuItemClick}>
                                <Link className={classes.link} to={route.path}>
                                    <ListItemIcon className={classes.iconContainer}>
                                        <route.MenuIcon className={classes.icon}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={route.menuText}
                                        classes={{
                                            primary: classes.text,
                                            root: classes.textContainer,
                                        }}
                                    />
                                </Link>
                            </ListItem>
                        );
                    }

                    return result;
                }, [])
            }
        </List>
    );
}

AppSideMenu.propTypes = {
    onMenuItemClick: PropTypes.func,
};
