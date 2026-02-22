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
import PaymentSuccess from "../DashBoard/PaymentSuccess";
import AdminHome from "../DashBoard/AdminHome";
import DashBoardIndex from "../Pages/DashBoardIndex";
import BoostIssuesPaymetPage from "../DashBoard/BoostIssuesPaymetPage";
import PaymentSuccessBoost from "../DashBoard/PaymentSuccessBoost";
import TotalIncome from "../DashBoard/TotalIncome";
import PaymentCancel from "../DashBoard/PaymentCancel";
import PaymentCancelForBoost from "../DashBoard/PaymentCancelForBoost";

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
        element: <DashBoardIndex></DashBoardIndex>,
      },
      {
        path: "citizenHome",
        element: <CitizenHome></CitizenHome>,
      },
      {
        path: "MyIssues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "ManageIssues",
        element: (
          <AdminRoute>
            <ManageIssues></ManageIssues>
          </AdminRoute>
        ),
      },
      {
        path: "allUser",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "ReportIssues",
        element: <ReportIssue></ReportIssue>,
      },
      {
        path: "issue-details/:id",
        element: <IssueTracking></IssueTracking>,
      },
      {
        path: "subcription",
        element: <Subscription></Subscription>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "payment/:id",
        element: <BoostIssuesPaymetPage></BoostIssuesPaymetPage>,
      },
      {
        path: "payment-success-boost",
        element: <PaymentSuccessBoost></PaymentSuccessBoost>,
      },
      {
        path:'totalIncome',
        element:<TotalIncome></TotalIncome>
      },
      {
        path:'payment-cancelled',
        element:<PaymentCancel></PaymentCancel>
      },
      {
        path:'payment-cancelledd',
        element:<PaymentCancelForBoost></PaymentCancelForBoost>
      }
    ],
  },
]);
