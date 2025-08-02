import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayouts from "../layouts/HomeLayouts/HomeLayouts";
import Home from "../pages/Home/Home";
import LoginLayouts from "../layouts/LoginLayouts/LoginLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "../provider/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Loading from "../components/Loading/Loading";
import Dashboard from "../pages/Dashboard/Dashboard";

import DashboardLayout from "../layouts/DashboardLayouts/DashboardLayout";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import Payment from "../pages/Dashboard/Buyer/Payment";
import Checkout from "../pages/Dashboard/Buyer/Checkout";
import StripeProvider from "../pages/Dashboard/Buyer/StripeProvider";
import BuyerPaymentHistory from "../pages/Dashboard/Buyer/BuyerPaymentHistory";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails";
import MySubmission from "../pages/Dashboard/Worker/MySubmission";
import Withdrawal from "../pages/Dashboard/Worker/Withdrawal";
import WithdrawalsHistory from "../pages/Dashboard/Worker/WithdrawalsHistory";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import WithdrawalApprovedHistory from "../pages/Dashboard/Admin/WithdrawalApprovedHistory";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome";
import Forbidden from "../components/Forbidden";
import AdminRoute from "../provider/AdminRoute";
import BuyerRoute from "../provider/BuyerRoute";
import WorkerRoute from "../provider/WorkerRoute";
import TaskListCards from "../pages/Home/TaskListCards";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayouts,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                Component: Home,
                errorElement: <ErrorPage />,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: 'allTasks',
                element: <TaskListCards></TaskListCards>
            },
            {
                path: '/editProfile',
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>
            }
        ]
    },
    {
        path: "login",
        Component: LoginLayouts,
        children: [
            {
                index: true,
                Component: Login,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "/login/register",
                Component: Register
            },
            {
                path: "/login/forgotPassword",
                Component: ForgotPassword
            }
        ]
    },
    {
        path: "/*",
        hydrateFallbackElement: <Loading></Loading>,
        element: <ErrorPage />
    },
    {
        path: "/dashboard",
        element:
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>,
                errorElement: <ErrorPage />,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "home",
                element: <BuyerHome></BuyerHome>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "buyer-home",
                element:
                    <BuyerRoute>
                        <BuyerHome></BuyerHome>
                    </BuyerRoute>
            },
            {
                path: "add-task",
                element:
                    <BuyerRoute>
                        <AddTask></AddTask>
                    </BuyerRoute>
            },
            {
                path: "my-tasks",
                element:
                    <BuyerRoute>
                        <MyTasks></MyTasks>
                    </BuyerRoute>
            },
            {
                path: "purchase-coin",
                element:
                    <BuyerRoute>
                        <Payment></Payment>
                    </BuyerRoute>
            },
            {
                path: "checkout",
                element:
                    <BuyerRoute>
                        <StripeProvider>
                            <Checkout></Checkout>
                        </StripeProvider>
                    </BuyerRoute>
            },
            {
                path: "payment-history",
                element:
                    <BuyerRoute>
                        <BuyerPaymentHistory></BuyerPaymentHistory>
                    </BuyerRoute>
            },
            {
                path: "worker-home",
                element:
                    <WorkerRoute>
                        <WorkerHome></WorkerHome>
                    </WorkerRoute>
            },
            {
                path: "task-list",
                element:
                    <WorkerRoute>
                        <TaskList></TaskList>
                    </WorkerRoute>
            },
            {
                path: "task-details/:id",
                element: <TaskDetails></TaskDetails>,
                loader: ({ params }) => fetch(`https://coinleaf-server.vercel.app/tasks/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "my-submissions",
                element:
                    <WorkerRoute>
                        <MySubmission></MySubmission>
                    </WorkerRoute>
            },
            {
                path: "withdrawals",
                element:
                    <WorkerRoute>
                        <Withdrawal></Withdrawal>
                    </WorkerRoute>
            },
            {
                path: "withdrawals-history",
                element:
                    <WorkerRoute>
                        <WithdrawalsHistory></WithdrawalsHistory>
                    </WorkerRoute>
            },
            {
                path: "approve-submission",

            },
            {
                path: "admin-home",
                element:
                    <AdminRoute>
                        <AdminHome></AdminHome>
                    </AdminRoute>
            },
            {
                path: "Success-history",
                element:
                    <AdminRoute>
                        <WithdrawalApprovedHistory></WithdrawalApprovedHistory>
                    </AdminRoute>
            },
            {
                path: "manage-users",
                element:
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
            },
            {
                path: "manage-task",
                element:
                    <AdminRoute>
                        <ManageTasks></ManageTasks>
                    </AdminRoute>
            }
        ]
    }
]);