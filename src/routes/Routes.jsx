import {
    createBrowserRouter
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
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
import AddNewProduct from "../pages/Dashboard/Normal/AddNewProduct";
import ManageProducts from "../pages/Dashboard/Normal/ManageProducts";
import EditProduct from "../pages/Dashboard/Normal/EditProduct";
import ReviewProducts from "../pages/Dashboard/Moderator/ReviewProducts";
import ReportedProducts from "../pages/Dashboard/Moderator/ReportedProducts";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
                element: <AllProducts></AllProducts>
            },
            {
                path: '/all-products/:id',
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
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
                    <AddNewProduct></AddNewProduct>
                </NormalRoute>
            },
            {
                path: 'manage-products',
                element: <NormalRoute>
                    <ManageProducts></ManageProducts>
                </NormalRoute>
            },
            {
                path: 'edit-product/:id',
                element: <NormalRoute>
                    <EditProduct></EditProduct>
                </NormalRoute>
            },
            // moderator routes
            {
                path: 'review-products',
                element: <ModeratorRoute>
                    <ReviewProducts></ReviewProducts>
                </ModeratorRoute>
            },
            {
                path: 'reported-content',
                element: <ModeratorRoute>
                    <ReportedProducts></ReportedProducts>
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