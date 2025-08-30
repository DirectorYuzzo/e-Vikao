import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, UserCredentials } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: UserCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in real app, verify against backend
      if (
        credentials.email === "admin@evikao.com" &&
        credentials.password === "password"
      ) {
        const userData: AuthUser = {
          id: "1",
          name: "Admin User",
          email: credentials.email,
          role: "admin",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }

      if (
        credentials.email === "user@evikao.com" &&
        credentials.password === "password"
      ) {
        const userData: AuthUser = {
          id: "2",
          name: "Regular User",
          email: credentials.email,
          role: "user",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("meetings");
    localStorage.removeItem("agendaItems");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
