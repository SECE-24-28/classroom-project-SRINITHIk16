import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mr_user")) || null;
    } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem("mr_user", JSON.stringify(user));
  }, [user]);

  const login = (email) => setUser({ email });
  const signup = (email) => setUser({ email });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
