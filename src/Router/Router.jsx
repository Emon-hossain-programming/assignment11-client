import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllIssues from "../Pages/AllIssues/AllIssues";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'allIssues',
                Component:AllIssues
            },
            {
                path:'register',
                Component:Register
            },
            {
                path:'login',
                Component:Login
            },
            {
                path:'about',
                Component:AboutUs
            },
            {
                path:'contact',
                Component:ContactUs,
                loader:()=>fetch('/Districts.json').then(res=>res.json())
            }
        ]
    },
    
])