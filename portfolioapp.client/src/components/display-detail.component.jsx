import { useCallback, useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { AppContext } from "./app-context-provider";
import CircularProgress from '@mui/material/CircularProgress';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function DisplayDetailComponent() {
    const appContext = useContext(AppContext);
    const displayService = appContext.displayService;
    const { id } = useParams();
    const [display, setDisplay] = useState();
    const [image, setImage] = useState();

    const getDisplay = useCallback(async (displayId) => {
        var display = await displayService.getByIdAsync(displayId);
        console.log('display');
        console.log(display);

        setDisplay(display);
    }, [displayService]);

    useEffect(() => {
        getDisplay(id);
    }, [getDisplay, id]);

    useEffect(() => getImage(display), [getImage, display])

    const getImage = useCallback((display) => {
        const displayImage = appContext.cloundinary.image(display.imageUrl);

        // Resize to 250 x 250 pixels using the 'fill' crop mode.
        displayImage.resize(fill().width(250).height(250));

        setImage(displayImage);
    }, [appContext.cloundinary]);

    const contents = display ? 
        <div>
            <h2>{display.name}</h2>
            <div className='detail-box'>
                <AdvancedImage cldImg={image} alt="A screenshot of the project" />
                <div>{display.detailDescription}</div>
                (display.gitHubLink ? <div>To see the source code and more details, visit {display.gitHubLink}</div> : <div></div>)
            </div>        
        </div>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    return contents;

}