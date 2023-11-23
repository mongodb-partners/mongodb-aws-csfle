import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSessionContext } from "./session";

function AuthenticatedRoute({ children, ...rest }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useSessionContext();
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect to={
                    `/sign-in?redirect=${pathname}${search}`
                } />
            )}
        </Route>
    );
}

export default AuthenticatedRoute;
