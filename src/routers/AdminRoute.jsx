import React from "react";
import { Navigate, Outlet } from "react-router";

function AdminRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/dashboard/login" />;
  }
  return <Outlet />;
}

export default AdminRoute;
