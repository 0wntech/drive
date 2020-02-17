import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, session, location, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                session ? (
                    Component
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
