// import React, { createContext, useContext, useState, useEffect } from "react";
// import { User } from "../types";

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   isLoading: boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Load user from localStorage on mount
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const updateUser = (newUser: User | null) => {
//     setUser(newUser);
//     if (newUser) {
//       localStorage.setItem("user", JSON.stringify(newUser));
//     } else {
//       localStorage.removeItem("user");
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser: updateUser, isLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };
