import '../App.css';
import { Outlet } from 'react-router-dom'
import AppBarComponent from './app-bar.component.jsx';
import { AppContext } from './app-context-provider';
import { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { defaultThemeOptions, funThemeOptions } from '../constants';
import CssBaseline from '@mui/material/CssBaseline';
import BackgroundAnimationComponent from './background-animation.component';

export default function LayoutComponent() {
    var appContext = useContext(AppContext);

    const defaultTheme = createTheme(defaultThemeOptions);
    const funTheme = createTheme(funThemeOptions)

    const contents =
        <div>
            <ThemeProvider theme={appContext.isFunMode ? funTheme : defaultTheme}>
                <CssBaseline />
                <AppBarComponent></AppBarComponent>
                {appContext.isFunMode ? <BackgroundAnimationComponent></BackgroundAnimationComponent> : <div></div>}
                <Outlet />
            </ThemeProvider>
        </div>;

    return (
        contents
    );
}