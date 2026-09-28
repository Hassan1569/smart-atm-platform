import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, logout as apiLogout, getSession } from '../services/authService.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Rehydrate session on boot
  useEffect(() => {
    const s = getSession();
    if (s?.user && s?.token) {
      setUser(s.user);
      setToken(s.token);
    }
    setInitializing(false);
  }, []);

  const signIn = useCallback(async (email, password) => {
    const session = await apiLogin(email, password);
    setUser(session.user);
    setToken(session.token);
    return session.user;
  }, []);

  const signOut = useCallback(() => {
    apiLogout();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      initializing,
      signIn,
      signOut,
    }),
    [user, token, initializing, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}