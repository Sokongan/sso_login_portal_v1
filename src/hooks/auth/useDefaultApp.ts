import { useEffect, useState } from 'react';
import { listApps, type AppRegistration } from '@/lib/api/apps';

type UseDefaultAppResult = {
  app: AppRegistration | null;
  appDSN: string | null;
  redirectPath: string | null;
  isLoading: boolean;
  error: string | null;
};

export function useDefaultApp(): UseDefaultAppResult {
  const [app, setApp] = useState<AppRegistration | null>(null);
  const [appDSN, setAppDSN] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    (async () => {
      try {
        const { response, data } = await listApps();
        if (!response.ok) {
          throw new Error('Unable to load apps.');
        }

        const firstApp = data?.apps?.[0];
        if (!firstApp?.dsn) {
          throw new Error('No apps configured.');
        }

        if (!isMounted) return;

        setApp(firstApp);
        setAppDSN(firstApp.dsn);
        setRedirectPath(firstApp.redirect_path || null);
        setError(null);
      } catch (err) {
        if (!isMounted) return;

        setApp(null);
        setAppDSN(null);
        setRedirectPath(null);
        setError(err instanceof Error ? err.message : 'Unable to load apps.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { app, appDSN, redirectPath, isLoading, error };
}
