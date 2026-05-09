"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loginUser,
  loginWithGoogle,
  logoutUser,
  refreshAccessToken as refreshTokenRequest,
  registerUser,
} from "@/src/lib/auth/api";
import {
  clearStoredSession,
  readStoredSession,
  writeStoredSession,
} from "@/src/lib/auth/storage";
import type {
  AuthContextValue,
  AuthSession,
  LoginRequest,
  RegisterRequest,
} from "@/src/types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const commitSession = useCallback((session: AuthSession) => {
    setSession(session);
    writeStoredSession(session);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setSession(readStoredSession());
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const session = await loginUser(payload);
      commitSession(session);
      return session;
    },
    [commitSession],
  );

  const register = useCallback(async (payload: RegisterRequest) => {
    return registerUser(payload);
  }, []);

  const googleLogin = useCallback(
    async (idToken: string) => {
      const session = await loginWithGoogle({ id_token: idToken });
      commitSession(session);
      return session;
    },
    [commitSession],
  );

  const refreshAccessToken = useCallback(async () => {
    if (!session?.refresh_token || !session.user) {
      return null;
    }

    try {
      const tokenData = await refreshTokenRequest(session.refresh_token);
      const nextSession: AuthSession = {
        user: session.user,
        refresh_token: session.refresh_token,
        access_token: tokenData.access_token,
        expires_in: tokenData.expires_in,
      };

      commitSession(nextSession);
      return tokenData.access_token;
    } catch {
      setSession(null);
      clearStoredSession();
      return null;
    }
  }, [commitSession, session]);

  const logout = useCallback(async () => {
    const currentAccessToken = session?.access_token;
    const currentRefreshToken = session?.refresh_token;

    setSession(null);
    clearStoredSession();

    if (currentAccessToken) {
      try {
        await logoutUser(currentAccessToken, currentRefreshToken || undefined);
      } catch {
        // Local logout still succeeds even if the server token is already invalid.
      }
    }
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user || null,
      accessToken: session?.access_token || null,
      refreshToken: session?.refresh_token || null,
      isAuthenticated: Boolean(session?.user && session.access_token),
      isLoading,
      login,
      register,
      googleLogin,
      logout,
      refreshAccessToken,
    }),
    [
      session,
      isLoading,
      login,
      register,
      googleLogin,
      logout,
      refreshAccessToken,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
