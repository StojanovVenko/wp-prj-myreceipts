import React from "react";
import {Redirect, Route, withRouter} from "react-router";
import {ACCESS_TOKEN} from "../../constants";

const PrivateRoute = ({ component: Component, logout, ...rest }) => {

    const user = localStorage.getItem(ACCESS_TOKEN);

    return <Route {...rest} render={(props) => (
        user !== null
            ? <Component {...props} user={user} logout={logout} />
            : <Redirect to='/login' />
    )}
    />

};

export default withRouter(PrivateRoute);
