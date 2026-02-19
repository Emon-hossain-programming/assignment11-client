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
import MyIssues from "../DashBoard/MyIssues";
import PrivateRoutes from "./PrivateRoutes";
import ManageIssues from "../DashBoard/ManageIssues";
import AdminRoute from "./admineRoute";
import AllUser from "../DashBoard/AllUser";
import ReportIssue from "../DashBoard/ReportIssue";
import IssueTracking from "../DashBoard/IssueTracking";
import Subscription from "../DashBoard/Subscription";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allIssues",
        element: <AllIssues />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
        loader: () => fetch("/Districts.json").then((res) => res.json()),
      },
      {
        path: "addIssue",
        element: (
          <PrivateRoutes>
            <AddIssues />
          </PrivateRoutes>
        ),
      },
      {
        path: "/issue/:id",
        element: <IssueDetails></IssueDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: CitizenHome,
      },
      {
        path: "MyIssues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "ManageIssues",
        element: <AdminRoute>
            <ManageIssues></ManageIssues>
        </AdminRoute>,
      },
      {
        path:'allUser',
        element:<AdminRoute>
            <AllUser></AllUser>
        </AdminRoute>
      },
      {
        path:'ReportIssues',
        element:<ReportIssue></ReportIssue>
      },
      {
        path:'issue-details/:id',
        element:<IssueTracking></IssueTracking>
      },
      {
        path:'subcription',
        element:<Subscription></Subscription>
      }
    ]
  },
]);
