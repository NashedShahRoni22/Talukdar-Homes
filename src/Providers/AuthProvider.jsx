import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setUser(JSON.parse(accessToken));
  }, []);

  const authInfo = { user, setUser };

  return (
    <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
  );
}
