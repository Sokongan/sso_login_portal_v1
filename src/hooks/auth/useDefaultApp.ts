import { useEffect, useState } from 'react';
import { listApps } from '@/lib/api/apps';

type UseDefaultAppResult = {
  appDSN: string | null;
  isLoading: boolean;
  error: string | null;
};

export function useDefaultApp(): UseDefaultAppResult {
  const [appDSN, setAppDSN] = useState<string | null>(null);
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
        if (isMounted) {
          setAppDSN(firstApp.dsn);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setAppDSN(null);
          setError(err instanceof Error ? err.message : 'Unable to load apps.');
        }
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

  return { appDSN, isLoading, error };
}
