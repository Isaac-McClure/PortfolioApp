import '../App.css';
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import AppBarComponent from './app-bar.component.jsx';
import AppContextProvider from './app-context-provider';

export default function LayoutComponent() {
    const contents =
        <div>
            <CssBaseline />
            <AppContextProvider>
                <AppBarComponent></AppBarComponent>
                <Outlet />
            </AppContextProvider>
        </div>;

    return (
        contents
    );
}