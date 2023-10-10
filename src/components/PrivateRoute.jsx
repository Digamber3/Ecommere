import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ element, isAuthenticated, redirectTo }) {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
