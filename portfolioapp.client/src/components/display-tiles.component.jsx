import { useEffect, useState } from 'react';
import { DisplayService } from '../httpServices/display-service';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DisplayTilesComponent() {
    const [displays, setDisplays] = useState();

    useEffect(() => {
        populateDisplays();
    }, []);

    const contents = displays ?
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>ImageUrl</th>
                </tr>
            </thead>
            <tbody>
                {displays.map(forecast =>
                    <tr key={forecast.name}>
                        <td>{forecast.name}</td>
                        <td>{forecast.description}</td>
                        <td>{forecast.imageUrl}</td>
                    </tr>
                )}
            </tbody>
        </table>
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