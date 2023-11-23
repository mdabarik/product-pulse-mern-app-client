import {
    createBrowserRouter
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-products',
                element: <Products></Products>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
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
            },
            {
                path: 'profile',
                element: <h1>Profile</h1>
            },
            // normaluser routes
            {
                path: 'add-product',
                element: <h1>Add Product</h1>
            },
            {
                path: 'manage-products',
                element: <h1>Manage Products</h1>
            },
            // moderator routes
            {
                path: 'review-products',
                element: <h1>Review products</h1>
            },
            {
                path: 'reported-content',
                element: <h1>Reported content</h1>
            },
            // admin routes
            {
                path: 'statistics',
                element: <h1>Statistics</h1>
            },
            {
                path: 'manage-users',
                element: <h1>Manage users</h1>
            },
            {
                path: 'manage-coupons',
                element: <h1>Manage coupons</h1>
            }
        ]
    }
])

export default routes;