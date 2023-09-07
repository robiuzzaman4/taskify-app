import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hero from "../components/Hero";
import ManageTasks from "../pages/ManageTasks";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivetRoute from "./PrivetRoute";
import MyProfile from "../pages/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Hero/>
            },
            {
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                path: "/sign-up",
                element: <SignUp/>
            },
            {
                path: "/my-profile",
                element: <PrivetRoute> <MyProfile/> </PrivetRoute>
            },
            {
                path: "/manage-tasks",
                element: <PrivetRoute> <ManageTasks/> </PrivetRoute>
            },
            {
                path: "/dashboard",
                element: <PrivetRoute> <Dashboard/> </PrivetRoute>
            }
        ]
    },
]);

export default router;