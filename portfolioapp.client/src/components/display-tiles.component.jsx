import { useEffect, useState } from 'react';
import { DisplayService } from '../httpServices/display-service';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

export default function DisplayTilesComponent() {
    const [displays, setDisplays] = useState();

    useEffect(() => {
        populateDisplays();
    }, []);

    const contents = displays ?    
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
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
                                <Button size="small">Learn More</Button>
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

    async function populateDisplays() {
        const displayService = new DisplayService();
        const data = await displayService.get_async();
        console.log('data');
        console.log(data);
        setDisplays(data);
    }
}