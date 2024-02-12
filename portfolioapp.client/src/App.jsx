import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarComponent from './components/app-bar.component.jsx';
import DisplayTilesComponent from './components/display-tiles.component';

function App() {

    const contents =
        <div>
            <CssBaseline />
            <AppBarComponent></AppBarComponent>
            <DisplayTilesComponent></DisplayTilesComponent>
            <hr></hr>
        </div>            ;

    return (
        contents
    );
}

export default App;