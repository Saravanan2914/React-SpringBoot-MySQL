import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/auth.service';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (roles && !roles.includes(currentUser.role)) {
                // role not authorised so redirect to appropriate home page
                if (currentUser.role === 'ROLE_ADMIN') {
                    return <Redirect to={{ pathname: '/admin' }} />
                } else {
                    return <Redirect to={{ pathname: '/user' }} />
                }
            }

            // authorised so return component
            return <Component {...props} />
        }}
    />
);

export default PrivateRoute;
