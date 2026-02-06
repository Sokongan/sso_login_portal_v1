import { useAuthGate } from "@/hooks/admin/authGate";
import type { ReactNode } from "react";


type AuthGateProps = {
  children: ReactNode;
  autoRedirect?: boolean;
  redirectPath?: string;
  title?: string;
  subtitle?: string;
};

export function AuthGate({
  children,
  autoRedirect = false,
  redirectPath,
  title = "Sign in required",
  subtitle = "Use your organization account to continue.",
}: AuthGateProps) {
  const { isAuthenticated, isLoading, handleLogin } = useAuthGate({
    autoRedirect,
    redirectPath,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-slate-100" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Login
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-500">
            Redirecting to SSO if available.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
