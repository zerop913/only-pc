import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
