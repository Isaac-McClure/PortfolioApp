import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

export default function NoMatch() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Icon>sentiment_sad</Icon>
            <hr></hr>
            <h1>Sorry, page not found</h1>
        </Box>
    );

}