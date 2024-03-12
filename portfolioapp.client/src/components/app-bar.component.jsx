import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';
import { AppContext } from "./app-context-provider";


export default function AppBarComponent() {
    const appContext = useContext(AppContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="brand icon"
                        sx={{ mr: 2 }}
                        component={Link}
                        to="/"
                    >
                        <Icon>home</Icon>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Isaac&apos;s Apps
                    </Typography>
                    { appContext.isLoggedIn ? <Button color="inherit">Log out</Button> : '' }
                </Toolbar>
            </AppBar>
        </Box>
    );
}