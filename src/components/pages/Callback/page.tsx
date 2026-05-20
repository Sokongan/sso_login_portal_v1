import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type CallbackResponse = {
  error?: string;
  redirect?: string;
  redirect_to?: string;
  token?: string;
};

export default function Callback() {
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function completeCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code || !state) {
        if (!cancelled) {
          setError('Missing callback parameters.');
        }
        return;
      }

      try {
        const callbackUrl = `/api/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
        const response = await fetch(callbackUrl, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.redirected) {
          window.location.assign(response.url);
          return;
        }

        const data = (await response.json().catch(() => null)) as CallbackResponse | null;
        const redirectTarget = data?.redirect_to || data?.redirect;

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to complete sign-in.');
        }

        if (!redirectTarget) {
          throw new Error('Missing redirect target.');
        }

        window.location.assign(redirectTarget);
      } catch (cause) {
        if (cancelled) {
          return;
        }

        setError(
          cause instanceof Error ? cause.message : 'Failed to complete sign-in.'
        );
      }
    }

    void completeCallback();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Authentication Error
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
          <div>
            <Link
              to="/login"
              className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Completing sign-in
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Finishing the authentication flow...
        </p>
      </div>
    </div>
  );
}
