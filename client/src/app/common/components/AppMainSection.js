import React from 'react';
import {Box} from '@material-ui/core';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';

export function AppMainSection() {
    return (
        <Box height={1} component="main">
            <Switch>
                {
                    routes.map(route => (
                        <Route path={route.path} key={route.path}>
                            <route.Component/>
                        </Route>
                    ))
                }
            </Switch>
        </Box>
    );
}
