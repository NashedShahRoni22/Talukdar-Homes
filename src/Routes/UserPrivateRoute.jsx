import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

export default function UserPrivateRoute({ children }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const adminAccessToken = localStorage.getItem("thAccessToken");

  if (user || adminAccessToken) {
    return children;
  }

  return <Navigate to="/login" replace={true} state={{ from: location }} />;
}
