import { createContext } from "react";
import { DisplayService } from "../httpServices/display-service";
import PropTypes from "prop-types";

export const DisplayServiceContext = createContext(null);
DisplayServiceProvider.propTypes = { children: PropTypes.any }

export default function DisplayServiceProvider({ children }) {
    const displayService = new DisplayService;

    return (
        <DisplayServiceContext.Provider value={displayService}>
            {children}
        </DisplayServiceContext.Provider>
    );
}