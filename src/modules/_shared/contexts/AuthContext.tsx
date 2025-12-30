"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  LoginFormData,
  RegisterFormData,
  ApiError,
} from "@/modules/_shared/types";
import API from "@/router/index";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { trigger: loginTrigger, data: loginData } = API.auth.useLogin();
  const { trigger: registerTrigger } = API.auth.useRegister();
  const { mutate: logoutMutate } = API.auth.useLogout();
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = API.auth.useGetCurrentUser();

  const isAuthenticated = !!user;

  // Check if user is authenticated on mount
  useEffect(() => {
    if (userData !== undefined && userData !== null) {
      // Handle successful response - response structure may vary
      // The request interceptor returns response.data, so userData is already the parsed response
      const user = userData?.user;
      setUser(user);
    } else if (userError) {
      // Handle error case (401 is expected when not authenticated)
      const errorStatus =
        (userError as any)?.response?.status || (userError as any)?.status;
      if (errorStatus !== 401 && errorStatus !== undefined) {
        console.error("Auth check failed:", userError);
      }
      // Set user to null if there's an error (including 401)
      setUser(null);
    }
  }, [userData, userError]);

  // Handle loading state
  useEffect(() => {
    if (userLoading !== undefined) {
      setLoading(userLoading);
    }
  }, [userLoading]);

  const login = async (data: LoginFormData) => {
    try {
      const response = await loginTrigger(data);
      setUser(response?.user || null);
      // Redirect to home page after successful login
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      const registerData: RegisterFormData = {
        username: data.username,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
        confirmPassword: data.confirmPassword,
      };

      const response = await registerTrigger(registerData);
      setUser(response?.user || null);
      // Redirect to home page after successful registration
      window.location.href = "/";
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutate();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
