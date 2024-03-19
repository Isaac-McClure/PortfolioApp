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
import ErrorComponent from './components/error.component';
import AppContextProvider from './components/app-context-provider';

const router = createBrowserRouter([
    {
        Component: LayoutComponent,
        children: [
            {
                path: '/',
                Component: DisplayTilesComponent,
                errorElement: <ErrorComponent></ErrorComponent>,
            },
            {
                path: '/appdisplay/:id',
                element: <DisplayDetailComponent></DisplayDetailComponent>,
                errorElement: <ErrorComponent></ErrorComponent>,
            },
            {
                path: '/login',
                element: <LoginRegisterComponent></LoginRegisterComponent>,
                errorElement: <ErrorComponent></ErrorComponent>,
            },
            {
                path: '/admin',
                element: <PrivateRouteComponent component={AdminComponent}></PrivateRouteComponent>,
                errorElement: <ErrorComponent></ErrorComponent>,
            },
            {
                path: '/editcreatedisplay/:id',
                element: <PrivateRouteComponent component={EditCreateDisplayComponent}></PrivateRouteComponent>,
                errorElement: <ErrorComponent></ErrorComponent>,
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
        <div>
            <AppContextProvider>
                <RouterProvider router={router} />
            </AppContextProvider>
        </div>
    );
}

export default App;