import { useLoginForm } from '@/hooks/auth/useLoginForm';

export default function Login() {
  const { redirect, errorMessage, submitError, hasChallenge, handleSubmit } = useLoginForm();
  const dsn = window.location.origin;
  console.log('DSN:', dsn);
  const loginUrl = `/api/login?dsn=${encodeURIComponent(dsn)}&redirect=${encodeURIComponent(redirect)}`;
  if (!hasChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">
            Sign in to your account
          </h2>
          <p className="text-gray-600 dark:text-slate-400">
            You will be redirected to the SSO provider to authenticate.
          </p>
          <button
            onClick={() => {
              if (loginUrl) {
                window.location.assign(loginUrl);
              }
            }}
            disabled={!loginUrl}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Continue with SSO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">
            Sign in to your account
          </h2>
          <p className="text-gray-600 dark:text-slate-400">
            Enter your credentials to continue.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-slate-900 dark:shadow-black/30"
        >
          {errorMessage ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-200">
              {errorMessage}
            </div>
          ) : null}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300" htmlFor="identifier">
              Email or username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Sign in
          </button>
          {submitError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-200">
              {submitError}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
