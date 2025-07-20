import { Navigate, Outlet } from "react-router";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

function PrivateRoutes() {
  const token = useAuthHeader();

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    // Check for token expiration
    if (decodedToken.exp * 1000 < Date.now()) {
      return <Navigate to="/login" />;
    }
      return <Outlet />;
  } catch (error) {
    toast.error("Invalid token.");
    return <Navigate to="/login" />;
  }
}

export default PrivateRoutes;
