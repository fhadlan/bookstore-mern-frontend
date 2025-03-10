import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useGetAdminQuery } from "../redux/features/admin/adminApi";

function AdminRoute() {
  const { data, error, isLoading } = useGetAdminQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error?.status === 401 || !data) {
    navigate("/login", { replace: true });
  }

  return data && <Outlet />;
}

export default AdminRoute;
