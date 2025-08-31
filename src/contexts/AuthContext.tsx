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

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { AuthUser, UserCredentials } from "../types";
// import { authService } from "../services/authService";

// interface AuthContextType {
//   user: AuthUser | null;
//   login: (credentials: UserCredentials) => Promise<boolean>;
//   register: (userData: any) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Check for existing session on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));

//       // Verify token is still valid
//       authService
//         .getCurrentUser()
//         .then((currentUser) => {
//           setUser(currentUser);
//         })
//         .catch(() => {
//           // Token is invalid, clear storage
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           setUser(null);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (credentials: UserCredentials): Promise<boolean> => {
//     setLoading(true);
//     try {
//       const { user: userData, token } = await authService.login(credentials);

//       setUser(userData);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userData));

//       return true;
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData: any): Promise<boolean> => {
//     setLoading(true);
//     try {
//       const { user: newUser, token } = await authService.register(userData);

//       setUser(newUser);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(newUser));

//       return true;
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await authService.logout();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setUser(null);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("meetings");
//       localStorage.removeItem("agendaItems");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         logout,
//         isAuthenticated: !!user,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
