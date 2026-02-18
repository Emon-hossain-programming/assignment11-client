import { createBrowserRouter } from "react-router-dom"; 
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllIssues from "../Pages/AllIssues/AllIssues";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Error from "../Pages/Error/Error";
import AddIssues from "../Pages/AddIssues/AddIssues";
import IssueDetails from "../Pages/Home/IssueDetails";
import DashBoardLayout from "../Layout/DashBoardLayout";
import CitizenHome from "../DashBoard/CitizenHome";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />, 
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'allIssues',
                element: <AllIssues />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'about',
                element: <AboutUs />
            },
            {
                path: 'contact',
                element: <ContactUs />,
                loader: () => fetch('/Districts.json').then(res => res.json())
            },
            {
                path:'addIssue',
                Component:AddIssues
            },
            {
                path:'/issue/:id',
                element:<IssueDetails></IssueDetails>
            }
        ]
    },
    {
     path:'dashboard',
     element:<DashBoardLayout></DashBoardLayout>,
     children:[
        {
            index:true,
            Component:CitizenHome
        },
        {
            path:'dashboard',
            element:<DashBoardLayout></DashBoardLayout>
        }
     ]
     
    }
]);