import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./app-context-provider";

PrivateRouteComponent.propTypes = { component: PropTypes.any }
export default function PrivateRouteComponent({ component: Component, ...rest }) {
    const appContext = useContext(AppContext);

    return appContext.isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
}