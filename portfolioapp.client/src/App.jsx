import './App.css';
import DisplayTilesComponent from './components/display-tiles.component';
import NoMatch from './components/no-match.component';
import DisplayDetailComponent from './components/display-detail.component';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from './components/layout.component.jsx';
import LoginRegisterComponent from './components/login-register.component';
import AdminComponent from './components/admin.component';
import PrivateRouteComponent from './components/private-route.component';
import EditCreateDisplayComponent from './components/edit-create-display.component';

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
                path: '/login',
                element: <LoginRegisterComponent></LoginRegisterComponent>
            },
            {
                path: '/admin',
                element:<PrivateRouteComponent component={ AdminComponent }></PrivateRouteComponent> 
            },
            {
                path: '/editcreatedisplay/:id',
                element: <PrivateRouteComponent component={ EditCreateDisplayComponent }></PrivateRouteComponent> 
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