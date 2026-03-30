import { useEffect, useMemo, useCallback } from "react";
import { useSession } from "@/context/SessionContext";
import { useDefaultApp } from "@/hooks/auth/useDefaultApp";

type UseAuthGate = {
  autoRedirect?: boolean;
  redirectPath?: string;
};

export function useAuthGate({
  autoRedirect = false,
  redirectPath,
}: UseAuthGate) {
  const { isAuthenticated, isLoading, checkSession } = useSession();
  const { appDSN, redirectPath: appRedirectPath, isLoading: isAppLoading } =
    useDefaultApp();

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  const redirectTarget = useMemo(() => {
    if (redirectPath) return redirectPath;
    if (appRedirectPath) return appRedirectPath;
    return "/dashboard";
  }, [appRedirectPath, redirectPath]);

  const handleLogin = useCallback(() => {
    const dsn = appDSN ?? window.location.origin;
    window.location.assign(
      `/api/login?dsn=${encodeURIComponent(dsn)}&redirect=${encodeURIComponent(redirectTarget)}`
    );
  }, [appDSN, redirectTarget]);

  useEffect(() => {
    if (!isLoading && !isAppLoading && !isAuthenticated && autoRedirect) {
      handleLogin();
    }
  }, [autoRedirect, isAuthenticated, isLoading, isAppLoading, handleLogin]);

  return { isAuthenticated, isLoading: isLoading || isAppLoading, handleLogin };
}
