import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { getErrorMessage } from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("lj_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  const persist = (token, userData) => {
    localStorage.setItem("lj_token", token);
    localStorage.setItem("lj_user", JSON.stringify(userData));
    setUser(userData);
  };

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem("lj_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      localStorage.setItem("lj_user", JSON.stringify(data.user));
    } catch (err) {
      localStorage.removeItem("lj_token");
      localStorage.removeItem("lj_user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    persist(data.token, data.user);

    return {
      success: true,
      user: data.user,
    };
  } catch (err) {
    return {
      success: false,
      message: getErrorMessage(err),
    };
  }
};

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      persist(data.token, data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // ignore network errors on logout
    }
    localStorage.removeItem("lj_token");
    localStorage.removeItem("lj_user");
    setUser(null);
  };

  const updateStoredUser = (userData) => {
    setUser(userData);
    localStorage.setItem("lj_user", JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
    login,
    register,
    logout,
    refreshMe,
    updateStoredUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
