import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DisplayService } from '../httpServices/display-service';

export default function DisplayDetail() {
    const [display, setDisplay] = useState();

    useEffect(() => {
        getDisplay();
    }, []);

    const contents = display ? <p>display here</p>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    async function getDisplay() {
        var display = disp
    }
}