import { createContext } from "react";
import { DisplayService } from "../httpServices/display-service";
import PropTypes from "prop-types";
import { Cloudinary } from "@cloudinary/url-gen";

export const AppContext = createContext(null);
AppContextProvider.propTypes = { children: PropTypes.any }

export default function AppContextProvider({ children }) {
    const displayService = new DisplayService;

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'depueonjp'
        }
    });

    const context = {
        displayService: displayService,
        cloudinary: cld
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}