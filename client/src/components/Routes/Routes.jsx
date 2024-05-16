import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App/App";
import Registration from "../Profile/Registration";
import Login from "../Profile/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import { ROUTES } from "../../utils/routes";
import Profile from "../Profile/Profile";
import AdminPanel from "../Admin/AdminPanel";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<App />} />
    <Route path={ROUTES.REGISTRATION} element={<Registration />} />
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route
      path={ROUTES.PROFILE}
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminPanel />
        </AdminRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
