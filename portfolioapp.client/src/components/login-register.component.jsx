import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AppContext } from './app-context-provider';
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from '../../node_modules/@mui/material/index';
import { LOGGED_IN_COOKIE } from '../constants';


export default function LoginRegisterComponent() {
    const appContext = useContext(AppContext);

    const navigate = useNavigate();

    const loginService = appContext.loginService;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    
    // parse server response
        // On OK, redirect user to the admin page
        // On other result, ask them to try again

    function validate() {
        var valid = true;
        if (!username) {
            setUsernameError(true);
            valid = false;
        }
        else {
            setUsernameError(false)
        }

        if (!password) {
            setPasswordError(true)
            valid = false;
        }
        else {
            setPasswordError(false)
        }

        return valid;
    }

    async function login() {
        var valid = validate();
        if (!valid) {
            return;
        }

        var loginResponse = await loginService.login({ username: username, password: password });

        if (loginResponse.ok) {
            appContext.setIsLoggedIn(true);
            sessionStorage.setItem(LOGGED_IN_COOKIE, 'true');
            navigate("/admin");
        } else {
            setTryAgain(true);
        }
    }
    async function register() {
        var valid = validate();
        if (!valid) {
            return;
        }

        var registerRepsonse = await loginService.register({ username: username, password: password });
        if (registerRepsonse.ok) {
            setRegisterSuccess(true);
            setTryAgain(false);
        } else {
            setTryAgain(true);
        }
    }

    const contents =
        <Box sx={{ flexGrow: 1, flexDirection: 'column' }}>
            <Box sx={{ margin: '10px' }}>
                <TextField id="username"
                    label="username"
                    variant="outlined"
                    value={username}
                    onChange={event => { setUsername(event.target.value) }}
                    error={usernameError}
                    helperText={usernameError ? "This is required" : ""}
                />
            </Box>
            <Box sx={{ margin: '10px' }}>
                <TextField id="password"
                    label="password"
                    type='password'
                    variant="outlined"
                    value={password}
                    onChange={event => { setPassword(event.target.value) }}
                    error={passwordError}
                    helperText={passwordError ? "This is required" : ""}

                />
            </Box>
            {tryAgain ?
                <Box sx={{ margin: '5px' }}>
                    <Alert severity="error">
                        Action unsuccessful, please try again.
                    </Alert>
                </Box>
                :
                <div></div>}
            {registerSuccess ?
                <Box sx={{ margin: '5px' }}>
                    <Alert severity="success">
                        You have registered successfully, please try logging in.
                    </Alert>
                </Box>
                :
                <div></div>}
            <Box sx={{ margin: '10px' }}>
                <ButtonGroup variant='contained' aria-label='login and register button group'></ButtonGroup>
                <Button onClick={() => login()}>Login</Button>
                <Button onClick={() => register()}>Register</Button>
            </Box>           
        </Box>;

    return (
        contents
    );
}