import { useCallback, useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { DisplayServiceContext } from './display-service-provider';
import { Link } from 'react-router-dom';

export default function DisplayTilesComponent() {
    const displayService = useContext(DisplayServiceContext)
    const [displays, setDisplays] = useState();

    const populateDisplays = useCallback(async () => {
        const data = await displayService.getAllAsync();
        setDisplays(data);
    }, [displayService]);

    useEffect(() => {
        populateDisplays();
    }, [populateDisplays]);

    const contents = displays ?    
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className="grid">
                {displays.map(display =>
                    <Grid xs={12} s={6} md={4} l={3} key={display.name} display="flex" justifyContent="center" alignItems="center">
                        <Card className='display-card' sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {display.name}
                                </Typography>
                                <Typography variant="body2">
                                    {display.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={'/appdisplay/' + display.id}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
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