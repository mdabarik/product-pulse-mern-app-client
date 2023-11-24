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
import PrivateRoute from "./PrivateRoute";
import NormalRoute from "./NormalRoute";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import Profile from "../pages/Dashboard/Profile/Profile";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import CouponDetails from "../pages/Dashboard/Admin/ManageCoupons/CouponDetails";
import EditCoupon from "../pages/Dashboard/Admin/ManageCoupons/EditCoupon";

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
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '',
                element: <h1>Dashboard Home</h1>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            // normaluser routes
            {
                path: 'add-product',
                element: <NormalRoute>
                    <h2>Add Product</h2>
                </NormalRoute>
            },
            {
                path: 'manage-products',
                element: <NormalRoute>
                    <h1>Manage Products</h1>
                </NormalRoute>
            },
            // moderator routes
            {
                path: 'review-products',
                element: <ModeratorRoute>
                    <h1>Review products</h1>
                </ModeratorRoute>
            },
            {
                path: 'reported-content',
                element: <ModeratorRoute>
                    <h1>Reported content</h1>
                </ModeratorRoute>
            },
            // admin routes
            {
                path: 'statistics',
                element: <AdminRoute>
                    <h1>Statistics</h1>
                </AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute>
                    <ManageCoupons></ManageCoupons>
                </AdminRoute>
            },
            {
                path: '/dashboard/manage-coupons/view/:id',
                element: <AdminRoute>
                    <CouponDetails />
                </AdminRoute>
            },
            {
                path: '/dashboard/manage-coupons/edit/:id',
                element: <AdminRoute>
                    <EditCoupon />
                </AdminRoute>
            }
        ]
    }
])

export default routes;