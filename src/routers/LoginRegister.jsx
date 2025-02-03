import React from "react";
import { useNavigate, Outlet } from "react-router";
import { auth } from "../firebase/firebase.config";

function LoginRegister() {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return <Outlet />;
}

export default LoginRegister;
