import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("thAccessToken");
  return accessToken === "@talukdarhomes2024" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
