import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { authApi } from "../features/auth/services/authApi";
import { STORAGE_KEYS } from "../features/auth/auth.types";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.TOKEN)
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await authApi.getMe();
        setUser(data);
      } catch {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [token]);

  const login = useCallback(async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    const userData = { email: data.email, name: data.name };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
    return data;
  }, []);

  const register = useCallback(async (userData) => {
    const { data } = await authApi.register(userData);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    const userMapped = { email: data.email, name: data.name };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userMapped));
    setToken(data.token);
    setUser(userMapped);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}