import { createBrowserRouter } from "react-router-dom";

// components will be imported here 

import Dashboard from "./layout/Dashboard";
import Home from "./pages/Home";
import Admin from "./layout/Admin";
import Auth from "./layout/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddResult from "./pages/AddResult";
import Profile from "./pages/Profile";  
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import ResultHistory from "./pages/ResultHistory";



const router = createBrowserRouter(
    [
         {   path: "/",
             element: <Dashboard/>,
             children: [
                  {
                     path: "",
                     element: <Home />
                  },
                  {
                      path: "result-history",
                      element: <ResultHistory />
                  }
             ]
         },
         {
            path: "/admin",
            element: <Admin />,
            children: [
                {
                    path: "dashboard",
                    element: <AdminDashboard />
                },
                {
                    path: "add-result",
                    element: <AddResult />
                },
                {
                    path: "/admin/profile",
                    element: <Profile />
                },
                {
                    path: "/admin/change-password",
                    element: <ChangePassword/>
                },
                {
                    path: "/admin/change-email",
                    element: <ChangeEmail />
                }
                
            ]
         },
         {
            path: "/auth",
            element: <Auth />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                },
            ]
         }
    ]
)

export default router;