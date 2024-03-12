import { createContext, useState } from "react";
import { DisplayService } from "../httpServices/display-service";
import { LoginService } from "../httpServices/login-service";
import PropTypes from "prop-types";
import { Cloudinary } from "@cloudinary/url-gen";
import { LOGGED_IN_COOKIE } from "../constants";

export const AppContext = createContext(null);
AppContextProvider.propTypes = { children: PropTypes.any }

export default function AppContextProvider({ children }) {
    const displayService = new DisplayService();
    const loginService = new LoginService();

    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem(LOGGED_IN_COOKIE) === 'true');    

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'depueonjp'
        }
    });

    const context = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        loginService: loginService,
        displayService: displayService,
        cloudinary: cld
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}