import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./app-context-provider";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

export default function AdminComponent() {
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

    // need to show a list of displays with name and edit button
    // have create button that goes to edit/create form with null id


    const contents = displays ?
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Display Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displays.map((display) => (
                            <TableRow
                                key={display.name}>
                                <TableCell component="th" scope="row">
                                    {display.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={'/editcreatedisplay/' + display.id}>
                                        <Button size="small">Edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: '10px'}}>
                <Link sx={{ display: 'flex' }} to={'/editcreatedisplay/0'}>
                    <Button sx={{ display: 'flex' }}  variant='contained' size="small">Create new display</Button>
                </Link>
            </Box>
        </Box>
        :
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>;

    return contents;
}