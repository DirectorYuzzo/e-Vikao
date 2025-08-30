import api from "./api";
import { UserCredentials, AuthUser } from "../types";

export const authService = {
  // Login
  login: async (
    credentials: UserCredentials
  ): Promise<{ user: AuthUser; token: string }> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Register
  register: async (
    userData: any
  ): Promise<{ user: AuthUser; token: string }> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
