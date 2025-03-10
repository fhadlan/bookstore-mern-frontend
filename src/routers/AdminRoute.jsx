import React from "react";
import { Navigate, Outlet } from "react-router";
import { useGetAdminQuery } from "../redux/features/admin/adminApi";

function AdminRoute() {
  const { data, error, isLoading } = useGetAdminQuery();

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error?.status === 401 || !data) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return data && <Outlet />;
}

export default AdminRoute;
