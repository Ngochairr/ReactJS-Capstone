import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();
  return user || token ? children : <Navigate to="/login" replace state={{ from: location }} />;
}