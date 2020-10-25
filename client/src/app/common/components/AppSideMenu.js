import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {routes} from '../../routes';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 16
    },
    link: {
        color: 'initial',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover': {
            color: 'initial',
            textDecoration: 'none',
        },
    },
});

export function AppSideMenu() {
    const classes = useStyles();

    return (
        <List component="nav" aria-label="sections" disablePadding>
            {
                routes.map(route => (
                    <ListItem key={route.path}>
                        <Link className={classes.link} to={route.path}>
                            <ListItemIcon>
                                <route.MenuIcon className={classes.icon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={route.menuText}
                                classes={{
                                    primary: classes.text,
                                }}
                            />
                        </Link>
                    </ListItem>
                ))
            }
        </List>
    );
}
