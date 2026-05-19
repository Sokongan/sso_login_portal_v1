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
  const {
    app,
    appDSN,
    redirectPath: appRedirectPath,
    isLoading: isAppLoading,
  } =
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
    const appId = app?.id;
    const dsn = appDSN ?? window.location.origin;
    const entryUrl = isAuthenticated
      ? appId
        ? `/api/launch?app=${encodeURIComponent(appId)}&path=${encodeURIComponent(redirectTarget)}`
        : `/api/launch?dsn=${encodeURIComponent(dsn)}&path=${encodeURIComponent(redirectTarget)}`
      : appId
      ? `/api/login?app=${encodeURIComponent(appId)}&redirect=${encodeURIComponent(redirectTarget)}`
      : `/api/login?dsn=${encodeURIComponent(dsn)}&redirect=${encodeURIComponent(redirectTarget)}`;

    window.location.assign(entryUrl);
  }, [app?.id, appDSN, isAuthenticated, redirectTarget]);

  useEffect(() => {
    if (!isLoading && !isAppLoading && !isAuthenticated && autoRedirect) {
      handleLogin();
    }
  }, [autoRedirect, isAuthenticated, isLoading, isAppLoading, handleLogin]);

  return { isAuthenticated, isLoading: isLoading || isAppLoading, handleLogin };
}
