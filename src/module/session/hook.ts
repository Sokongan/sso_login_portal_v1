import { useCallback } from "react";
import {
  loadSession,
  logoutSession,
  refreshSession as refreshSessionService
} from "./service";
import { Session } from "./type";


export function useSessionActions(
    setSession: (session: Session | null) => void,
    setIsLoading?: (isLoading: boolean) => void
) {
  const checkSession = useCallback(async () => {
    setIsLoading?.(true);
    const data = await loadSession();
    setSession(data);
    setIsLoading?.(false);
  }, [setSession, setIsLoading]);

  const refreshSession = useCallback(async () => {
    const data = await refreshSessionService();
    setSession(data);
    setIsLoading?.(false);
  }, [setSession, setIsLoading]);

  const logout = useCallback(async () => {
    await logoutSession();
    setSession(null);
    setIsLoading?.(false);
  }, [setSession, setIsLoading]);

  return { checkSession, refreshSession, logout };
}