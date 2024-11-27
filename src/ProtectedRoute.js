import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  return true ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
