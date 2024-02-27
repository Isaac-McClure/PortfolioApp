import './App.css';
import { Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import AppBarComponent from './components/app-bar.component.jsx';
import DisplayTilesComponent from './components/display-tiles.component';
import NoMatch from './components/no-match.component';
import DisplayServiceProvider from './components/display-service-provider';

function App() {

    const contents =
        <div>
            <CssBaseline />
            <AppBarComponent></AppBarComponent>
            <DisplayServiceProvider>
                <Routes>
                    <Route path="/" element={<DisplayTilesComponent />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </DisplayServiceProvider>
            <></>
            <hr></hr>
        </div>;

    return (
        contents
    );
}

export default App;