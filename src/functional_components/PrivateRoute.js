import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, session, path, ...rest }) => {
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
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
