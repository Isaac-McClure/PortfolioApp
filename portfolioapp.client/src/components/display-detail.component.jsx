import { useCallback, useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { DisplayServiceContext } from "./display-service-provider";
import CircularProgress from '@mui/material/CircularProgress';

export default function DisplayDetailComponent() {
    const displayService = useContext(DisplayServiceContext)
    const { id } = useParams();
    const [display, setDisplay] = useState();

    const getDisplay = useCallback(async (displayId) => {
        var display = await displayService.getByIdAsync(displayId);
        console.log('display');
        console.log(display);

        setDisplay(display);
    }, [displayService]);

    useEffect(() => {
        getDisplay(id);
    }, [getDisplay, id]);

    const contents = display ? 
        <div>
            <h2>{display.name}</h2>
            <div className='detail-box'>
                <div className='detail-image'>{display.imageUrl}</div>
                <div>{display.detailDescription}</div>
            </div>        
        </div>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    return contents;

}