import { useEffect } from 'react';
import { apiGet } from '@/lib/api/http';

type CallbackResponse = {
  error?: string;
  redirect?: string;
  redirect_to?: string;
  token?: string;
};

function restartLoginFlow() {
  window.location.replace('/api/login');
}

export default function Callback() {
  useEffect(() => {
    let cancelled = false;

    async function completeCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code || !state) {
        restartLoginFlow();
        return;
      }

      try {
        const callbackUrl = `/api/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
        const { response, data } = await apiGet<CallbackResponse>(callbackUrl);

        if (response.redirected) {
          window.location.assign(response.url);
          return;
        }

        const redirectTarget = data?.redirect_to || data?.redirect;

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to complete sign-in.');
        }

        if (!redirectTarget) {
          throw new Error('Missing redirect target.');
        }

        window.location.assign(redirectTarget);
      } catch {
        if (cancelled) {
          return;
        }

        restartLoginFlow();
      }
    }

    void completeCallback();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Completing sign-in
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Refreshing the authentication flow...
        </p>
      </div>
    </div>
  );
}
