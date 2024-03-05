import '../App.css';
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import AppBarComponent from './app-bar.component.jsx';
import DisplayServiceProvider from './display-service-provider';

export default function LayoutComponent() {
    const contents =
        <div>
            <CssBaseline />
            <AppBarComponent></AppBarComponent>
            <DisplayServiceProvider>
                <Outlet />
            </DisplayServiceProvider>
            <></>
            <hr></hr>
        </div>;

    return (
        contents
    );
}