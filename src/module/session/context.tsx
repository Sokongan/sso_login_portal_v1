'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';


import { Session, SessionContextValue } from './type';
import { useSessionActions } from './hook';
import { selectDisplayName, selectIdentityId, selectIsAdmin, selectProfile } from './selector';


const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null > (null);
  const [isLoading, setIsLoading] = useState(true);
  const {checkSession, refreshSession, logout} = useSessionActions(setSession, setIsLoading);

  useEffect(() => {
     checkSession();
  }, [checkSession]);

  const profile = selectProfile(session);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      identityId: selectIdentityId(session),
      profile,
      displayName: selectDisplayName(profile),
      roles: session?.roles ?? [],
      isAdmin: selectIsAdmin(session),
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
