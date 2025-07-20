import { Navigate, Outlet } from "react-router";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function HideLoginAndHomeRoutes() {
  const token = useAuthHeader();

  if (!token) {
    return <Outlet />;
  } else {
    try {
      const decodedToken = jwtDecode(token);
      // Check for token expiration
      if (decodedToken.exp * 1000 < Date.now()) {
        return <Outlet />;
      }
      return <Navigate to={"/notes"} />;
    } catch (error) {
      toast.error("Invalid token.");
      return <Navigate to="/login" />;
    }
    return <Navigate to={"/notes"} />;
  }
}

export default HideLoginAndHomeRoutes;
