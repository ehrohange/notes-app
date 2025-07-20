import { Navigate } from "react-router";
import { useAuthHeader } from "react-auth-kit";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const RedirectHandler = () => {
  const authHeader = useAuthHeader();
  const token = authHeader.split(" ")[1];

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      toast.error("You need to login again.");
      return <Navigate to="/login" replace />;
    }
      return <Navigate to="/notes" replace />;
  } catch (error) {
    toast.error("Invalid token.");
    return <Navigate to="/login" replace />;
  }
};

export default RedirectHandler;
