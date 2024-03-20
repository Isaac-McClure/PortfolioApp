import { useCallback, useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AppContext } from './app-context-provider';
import { Link } from 'react-router-dom';

export default function DisplayTilesComponent() {
    const appContext = useContext(AppContext);
    const displayService = appContext.displayService;
    const [displays, setDisplays] = useState();
    
    const populateDisplays = useCallback(async () => {
        const data = await displayService.getAllAsync();
        setDisplays(data);
    }, [displayService]);

    useEffect(() => {
        populateDisplays();
    }, [populateDisplays]);

    const contents = displays ?
        <Box sx={{ justifyContent: 'center'}}>
            <Grid container spacing={2} className="grid">
                {displays.map(display =>
                    <Grid xs={12} s={6} md={4} l={3} key={display.name} display="flex" justifyContent="center" alignItems="center">
                        <Card className='display-card' sx={{ width: '100%' }}>
                            <CardActionArea component={Link} to={'/appdisplay/' + display.id}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={"https://res.cloudinary.com/" + appContext?.cloudinary.cloudinaryConfig?.cloud?.cloudName +"/" + display.tileImageUrl}
                                    alt="project image"
                                />
                                <CardContent height='100px'>
                                    <Typography variant="h5" component="div">
                                        {display.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {display.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    )}
            </Grid>
        </Box>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    return (
        contents
    );
}