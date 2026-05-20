'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getDisplayName,
  getIdentityId,
  getProfile,
  isAdmin,
  loadSession,
  logoutSession,
  refreshSession as requestSessionRefresh,

} from './session';
import { Session, SessionContextValue } from './types';

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    const data = await loadSession();

    setSession(data);
  }, []);

  const refreshSession = useCallback(async () => {
    const data = await requestSessionRefresh();
    setSession(data);
  }, []);

  const logout = useCallback(async () => {
    await logoutSession();

    setSession(null);
  }, []);

  const initialize = useCallback(async () => {
    try {
      await checkSession();
    } finally {
      setIsLoading(false);
    }
  }, [checkSession]);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      if (!mounted) {
        return;
      }

      await initialize();
    }

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, [initialize]);

  const profile = getProfile(session);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      identityId: getIdentityId(session),
      profile,
      displayName: getDisplayName(profile),
      roles: session?.roles ?? [],
      isAdmin: isAdmin(session),
      isAuthenticated: session?.authenticated === true,
      isLoading,
      checkSession,
      refreshSession,
      logout,
    }),
    [
      session,
      profile,
      isLoading,
      checkSession,
      refreshSession,
      logout,
    ]
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      'useSession must be used within SessionProvider'
    );
  }

  return context;
}
