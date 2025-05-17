import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoaderPage from "../Adminpage/LoaderPage";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoaderPage />;
  }

  if (user && user?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace={true} state={{ from: location }} />;
};

export default PrivateRoute;
