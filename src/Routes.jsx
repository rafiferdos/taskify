import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/Root";
import Home from "./pages/Home";
import Features from "./pages/Features";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/features",
                element: <Features />,
            },
            {
                path: "/contactus",
                element: <ContactUs />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
]);

export default router;