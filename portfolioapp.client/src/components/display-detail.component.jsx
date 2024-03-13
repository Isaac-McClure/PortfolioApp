import { useCallback, useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { AppContext } from "./app-context-provider";
import CircularProgress from '@mui/material/CircularProgress';
import { AdvancedImage } from '@cloudinary/react';

export default function DisplayDetailComponent() {
    const appContext = useContext(AppContext);
    const displayService = appContext.displayService;
    const { id } = useParams();
    const [display, setDisplay] = useState();
    const [image, setImage] = useState();

    const getDisplay = useCallback(async (displayId) => {
        var display = await displayService.getByIdAsync(displayId);

        setDisplay(display);
    }, [displayService]);

    useEffect(() => {
        getDisplay(id);
    }, [getDisplay, id]);

    const getImage = useCallback((display) => {
        if (!appContext.cloudinary || !display) { return }
        const displayImage = appContext.cloudinary.image(display.imageUrl);

        // Resize to 250 x 250 pixels using the 'fill' crop mode.
        // displayImage.resize(fill().width(250).height(250));

        setImage(displayImage);
    }, [appContext.cloudinary]);

    useEffect(() => getImage(display), [getImage, display])

    const contents = display ? 
        <div>
            <h2>{display.name}</h2>
            <div className='detail-box'>
                {image ? <AdvancedImage className='detail-image' cldImg={image} alt="A screenshot of the project" /> : <div className='detail-image'></div> }
                <div className='detail-box-text'>
                    <div>
                        {display.detailDescription}
                    </div>
                    <div className='mt-10'>
                        {display.gitHubLink ? <div>To see the source code and more details, visit {display.gitHubLink}</div> : <div></div>}
                    </div>
                    <div className='mt-10'>
                        {display.gitHubLink ? <div>To see the live app, visit {display.productionLink}</div> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    return contents;

}