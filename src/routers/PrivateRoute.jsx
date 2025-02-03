import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
