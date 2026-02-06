import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";

function formatJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function ErrorPage() {
  const [searchParams] = useSearchParams();

  const errorPayload = useMemo(() => {
    const raw = searchParams.get("error");
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return { message: raw };
    }
  }, [searchParams]);

  const errorId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Authentication Error</h1>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-200">
              {errorPayload?.status ?? "error"}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            We ran into a problem completing your sign-in. Use the details below to
            diagnose the issue, then try again.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Error Id
              </p>
              <p className="text-sm text-slate-800 dark:text-slate-200">
                {errorId ?? errorPayload?.data?.error?.id ?? "Unknown"}
              </p>
            </div>

            {errorPayload?.statusText ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {errorPayload.statusText}
                </p>
              </div>
            ) : null}

            {errorPayload?.url ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Request URL
                </p>
                <p className="break-all text-sm text-slate-800 dark:text-slate-200">
                  {errorPayload.url}
                </p>
              </div>
            ) : null}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Raw Details
              </p>
              <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-100 dark:bg-black/60">
{formatJson(errorPayload ?? { errorId })}
              </pre>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Back to login
            </Link>
            <Link
              to="/"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
