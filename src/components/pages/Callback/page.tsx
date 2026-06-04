import { useCallback, useEffect } from 'react';

function getCallbackParams(): { code: string | null; state: string | null } {
  if (typeof window === 'undefined') return { code: null, state: null };
  const params = new URLSearchParams(window.location.search);
  return {
    code: params.get('code'),
    state: params.get('state'),
  };
}

function redirectToCallbackError(message: string, id = 'callback_failed') {
  const error = encodeURIComponent(
    JSON.stringify({
      status: id,
      message,
    })
  );
  window.location.replace(`/error?id=${encodeURIComponent(id)}&error=${error}`);
}

export default function Callback() {
  // Memoize callback completion logic
  const completeCallback = useCallback(async () => {
    const { code, state } = getCallbackParams();

    if (!code || !state) {
      redirectToCallbackError('Missing callback parameters.', 'invalid_callback');
      return;
    }

    const callbackUrl = `/api/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
    window.location.href = callbackUrl;
  }, []);

  // Run callback completion on mount
  useEffect(() => {
    void completeCallback();
  }, [completeCallback]);

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
