import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { apiGet, apiPost } from '@/lib/api/http';

type Profile = {
  email?: string;
  username?: string;
  name?: {
    first_name?: string;
    last_name?: string;
  };
};

type KratosIdentity = {
  id?: string;
  traits?: Profile;
};

type Session = {
  authenticated?: boolean;
  sub?: string;
  exp?: string;
  profile?: Profile;
  roles?: { object: string; role: string }[];
  identity?: KratosIdentity;
} & Record<string, unknown>;

type SessionContextValue = {
  session: Session | null;
  identityId: string | null;
  profile: Profile | null;
  displayName: string | null;
  roles: { object: string; role: string }[];
  isPortalAdmin: boolean;
  isAuthenticated: boolean;
  authError: string | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProcessedCallback, setHasProcessedCallback] = useState(false);
  const hasHandledCallbackRef = useRef(false);

  const checkSession = useCallback(async () => {
    const sessionUnavailableMessage =
      'Unable to verify your session right now. Please try again.';

    try {
      const { response, data } = await apiGet<Session>(
        '/api/session?include_tuples=true&tuples_namespace=app'
      );
      if (response.ok && data && data.authenticated !== false) {
        setSession(data);
        setAuthError(null);
        return;
      }

      if (response.status === 401 || !data || data.authenticated === false) {
        setSession(null);
        setAuthError(null);
        return;
      }

      console.warn(
        '[session] enriched session lookup failed, retrying without tuples',
        response.status
      );
    } catch (error) {
      console.warn('[session] enriched session lookup failed, retrying without tuples', error);
    }

    try {
      const { response, data } = await apiGet<Session>('/api/session');
      if (response.ok && data && data.authenticated !== false) {
        setSession(data);
        setAuthError(null);
        return;
      }

      if (response.status === 401 || !data || data.authenticated === false) {
        setSession(null);
        setAuthError(null);
        return;
      }

      console.error('[session] plain session lookup failed', response.status);
      setAuthError(sessionUnavailableMessage);
    } catch (error) {
      console.error('[session] failed to fetch session', error);
      setAuthError(sessionUnavailableMessage);
    }
  }, []);

  const handleOAuthCallback = useCallback(async () => {
    if (hasProcessedCallback || hasHandledCallbackRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (!code || !state) {
      hasHandledCallbackRef.current = true;
      setHasProcessedCallback(true);
      return;
    }

    try {
      hasHandledCallbackRef.current = true;
      const callbackUrl = `/api/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
      const response = await fetch(callbackUrl, {
        method: 'GET',
        credentials: 'include',
      });
      const data = (await response.json().catch(() => null)) as
        | { redirect?: string; token?: string }
        | null;
      if (data?.redirect && typeof data.redirect === 'string') {
        const redirectUrl = new URL(data.redirect, window.location.origin);
        if (redirectUrl.origin === window.location.origin) {
          const nextPath = `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
          window.history.replaceState({}, '', nextPath);
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          window.location.assign(data.redirect);
        }
        return;
      }
    } catch (error) {
      console.error('[session] failed to complete oauth callback', error);
    } finally {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete('code');
      nextUrl.searchParams.delete('state');
      window.history.replaceState({}, '', nextUrl.toString());
      setHasProcessedCallback(true);
    }
  }, [hasProcessedCallback]);

  const refreshSession = useCallback(async () => {
    try {
      await apiPost('/api/session/refresh');
    } catch (error) {
      console.error('[session] failed to refresh session', error);
    } finally {
      await checkSession();
    }
  }, [checkSession]);

  const logout = useCallback(async () => {
    try {
      await apiPost('/api/logout');
    } catch (error) {
      console.error('[session] failed to logout', error);
    } finally {
      setSession(null);
      setAuthError(null);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    (async () => {
      await handleOAuthCallback();
      await checkSession();
    })().finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [checkSession, handleOAuthCallback]);

  const identityId = useMemo(() => {
    if (!session) return null;
    const identityId = session.identity?.id;
    if (typeof identityId === 'string') return identityId;
    const sub = session.sub;
    if (typeof sub === 'string') return sub;
    return null;
  }, [session]);

  const profile = useMemo(() => {
    if (!session) return null;
    return (session.profile as Profile) ?? null;
  }, [session]);


  const displayName = useMemo(() => {
    if (!profile) return null;
    const firstName = profile.name?.first_name?.trim() ?? '';
    const lastName = profile.name?.last_name?.trim() ?? '';
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    return fullName || null;
  }, [profile]);

  const email = useMemo(() => {
    if (!profile) return null;
    if (profile.email && profile.email.trim().length > 0) return profile.email;
    if (profile.username && profile.username.trim().length > 0) return profile.username;
    return null;
  }, [profile]);

  const isPortalAdmin = useMemo(() => {
    return (session?.roles ?? []).some(
      (role) => role.object === 'sso-portal' && role.role === 'admin'
    );
  }, [session?.roles]);

  const value = useMemo(
    () => ({
      session,
      identityId,
      profile,
      displayName,
      roles: session?.roles ?? [],
      isPortalAdmin,
      isAuthenticated: session?.authenticated === true,
      authError,
      isLoading,
      checkSession,
      refreshSession,
      logout,
    }),
    [
      session,
      identityId,
      profile,
      displayName,
      isPortalAdmin,
      authError,
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

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
