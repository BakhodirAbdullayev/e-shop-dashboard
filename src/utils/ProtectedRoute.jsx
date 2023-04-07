import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./state";

const ProtectedRoute = ({ children }) => {
  const user = useUser((s) => s.user);
  if (!user?.name && !user?.email) {
    return <Navigate to={"/signin"} />;
  }
  return children;
};

export default ProtectedRoute;
