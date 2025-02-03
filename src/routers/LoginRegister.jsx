import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginRegister() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default LoginRegister;
