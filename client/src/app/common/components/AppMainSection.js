import React from 'react';
import {Box} from '@material-ui/core';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        '@media (max-width: 480px)': {
            height: '100%',
        }
    },
});

export function AppMainSection() {
    const classes = useStyles();

    return (
        <Box className={classes.container} display="flex" component="main">
            <Switch>
                {
                    routes.map(route => (
                        <Route exact={route.exact} path={route.path} key={route.path}>
                            <route.Component/>
                        </Route>
                    ))
                }
            </Switch>
        </Box>
    );
}
