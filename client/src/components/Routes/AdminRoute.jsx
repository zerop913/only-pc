import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { verifyAdmin } from "../../utils/api";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const isUserAdmin = await verifyAdmin(token);
        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error("Error verifying admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      checkAdmin();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
