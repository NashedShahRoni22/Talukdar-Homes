import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser(JSON.parse(accessToken));
    }
    setLoading(false);
  }, []);

  const authInfo = { user, setUser, loading, setLoading };

  return (
    <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
  );
}
