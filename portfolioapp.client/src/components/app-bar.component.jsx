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
import { LOGGED_IN_COOKIE } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function AppBarComponent() {
    const appContext = useContext(AppContext);
    const loginService = appContext.loginService;
    const navigate = useNavigate();

    function logout() {
        loginService.logout();
        sessionStorage.setItem(LOGGED_IN_COOKIE, false);
        appContext.setIsLoggedIn(false)
        navigate('/');
    }

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
                    {appContext.isLoggedIn ? <Button color="inherit" component={Link} to="admin" >Admin</Button> : ''}
                    {appContext.isLoggedIn ? <Button color="inherit" onClick={() => logout()}>Log out</Button> : '' }
                </Toolbar>
            </AppBar>
        </Box>
    );
}