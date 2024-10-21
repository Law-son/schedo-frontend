// src/components/auth/RequireAuth.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RequireAuth = ({ redirectTo = "/signin" }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log(isAuthenticated);

  // Show a loading state if authentication is still being determined
  if (loading) {
    return <div>Loading...</div>; // Replace with your own loading spinner if needed
  }

  // Only render the Outlet (protected content) if the user is authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default RequireAuth;
