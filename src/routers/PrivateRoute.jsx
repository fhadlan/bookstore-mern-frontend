import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
//import { auth } from "../firebase/firebase.config";
import { Outlet, useNavigate } from "react-router";

function PrivateRoute() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !loading) {
      window.location.href = "/login";
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return <Outlet />;
}

export default PrivateRoute;
