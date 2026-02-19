import React from "react";

import { Navigate, useLocation } from "react-router";

import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default AdminRoute;
