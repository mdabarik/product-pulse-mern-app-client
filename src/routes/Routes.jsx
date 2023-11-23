import {
    createBrowserRouter
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '',
                element: <h1>Dashboard Home</h1>
            }
        ]
    }
])

export default routes;