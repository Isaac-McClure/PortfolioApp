import './App.css';
import DisplayTilesComponent from './components/display-tiles.component';
import NoMatch from './components/no-match.component';
import DisplayDetailComponent from './components/display-detail.component';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from './components/layout.component.jsx';

const router = createBrowserRouter([
    {
        Component: LayoutComponent,
        children: [
            {
                path: '/',
                Component: DisplayTilesComponent
            },
            {
                path: '/appdisplay/:id',
                element: <DisplayDetailComponent></DisplayDetailComponent>
            },
            {
                path: '*',
                Component: NoMatch
            },
        ]
    },
]);
function App() {

    return (
        <RouterProvider router={router} />
    );
}

export default App;