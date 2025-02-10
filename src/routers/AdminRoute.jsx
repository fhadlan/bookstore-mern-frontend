import React from "react";
import { Navigate, Outlet } from "react-router";

function AdminRoute() {
  const isTokenExpired = (token) => {
    if (!token) {
      return <Navigate to="/dashboard/login" />;
    } // No token means expired or not logged in

    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const expiry = payload.exp * 1000; // Convert to milliseconds

    return Date.now() >= expiry; // Compare with current time
  };

  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    localStorage.removeItem("token"); // Remove expired token
    return <Navigate to="/dashboard/login" />;
  }

  return <Outlet />;
}

export default AdminRoute;
