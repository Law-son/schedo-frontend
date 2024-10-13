// src/components/auth/RequireAuth.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; // Correct import path

const RequireAuth = ({ redirectTo = "/signin" }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default RequireAuth;
