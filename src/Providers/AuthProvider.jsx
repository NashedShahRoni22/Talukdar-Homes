import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const parsedUser = JSON.parse(accessToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse accessToken from localStorage:", error);
        localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  }, []);

  const authInfo = { user, setUser, loading, setLoading };

  return (
    <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
  );
}
