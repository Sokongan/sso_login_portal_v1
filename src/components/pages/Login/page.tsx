import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDefaultApp } from '@/hooks/auth/useDefaultApp';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import {
  ArrowRight,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

function getDisplayLabel(value: string | null | undefined) {
  if (!value) return 'Not configured';

  try {
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin ? `${url.pathname}${url.search}` || '/' : url.host;
  } catch {
    return value;
  }
}

function SecurityRail({
  identitySource,
  returnTarget,
}: {
  identitySource: string;
  returnTarget: string;
}) {
  return (
    <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/50 bg-[#13212a] p-8 text-white shadow-[0_30px_80px_rgba(19,33,42,0.35)] lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      <div className="relative space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/72">
          <ShieldCheck className="size-3.5" />
          Single Sign-On
        </div>

        <div className="space-y-4">
          <p className="font-serif text-4xl leading-tight text-white">
            One sign-in surface for every approved organization app.
          </p>
          <p className="max-w-md text-sm leading-6 text-slate-200/84">
            This page is dedicated to SSO entry only. Authentication is centralized here,
            then control returns to the requesting application.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Identity source</p>
            <p className="mt-2 text-lg font-medium text-white">{identitySource}</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Return target</p>
            <p className="mt-2 text-lg font-medium text-white">{returnTarget}</p>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 text-sm text-slate-200/84">
        <div className="flex items-start gap-3">
          <KeyRound className="mt-0.5 size-4 text-amber-300" />
          <div>
            <p className="font-medium text-white">Provider-driven flow</p>
            <p>Supports direct redirects and credential challenges from the identity layer.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Workflow className="mt-0.5 size-4 text-sky-300" />
          <div>
            <p className="font-medium text-white">Return to origin</p>
            <p>Users are sent back to the app that initiated the sign-in sequence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const { app, appDSN, isLoading: isAppLoading, error: appError } = useDefaultApp();
  const {
    redirect,
    errorMessage,
    submitError,
    isSubmitting,
    hasChallenge,
    handleSubmit,
  } = useLoginForm({
    defaultRedirect: app?.redirect_path || '/dashboard',
  });

  const dsn = appDSN ?? window.location.origin;
  const loginUrl = `/api/login?dsn=${encodeURIComponent(dsn)}&redirect=${encodeURIComponent(redirect)}`;
  const identitySource = getDisplayLabel(appDSN ?? window.location.origin);
  const returnTarget = getDisplayLabel(redirect);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4efe5] px-4 py-6 text-slate-950 dark:bg-[#0d1720] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SecurityRail identitySource={identitySource} returnTarget={returnTarget} />

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-900/10 bg-white/88 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 dark:shadow-[0_24px_70px_rgba(2,6,23,0.55)] sm:p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <LockKeyhole className="size-3.5" />
                  Secure Access
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-4xl leading-tight text-slate-950 dark:text-white sm:text-5xl">
                    {hasChallenge
                      ? 'Confirm your organization credentials'
                      : 'Sign in through your SSO provider'}
                  </h1>
                  <p className="max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {hasChallenge
                      ? 'A password challenge is required to complete this authentication flow.'
                      : 'Use this page as the dedicated SSO entry point for your application access.'}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Identity source</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{identitySource}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Return target</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{returnTarget}</span>
                </div>
              </div>

              {appError ? (
                <div className="rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-600/40 dark:bg-amber-500/10 dark:text-amber-100">
                  {appError}
                </div>
              ) : null}

              {hasChallenge ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-200">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="identifier">
                      Email or username
                    </label>
                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      required
                      className="h-11 rounded-xl border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-950"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="h-11 rounded-xl border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-950"
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-11 w-full rounded-xl text-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Signing in
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  {submitError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-200">
                      {submitError}
                    </div>
                  ) : null}
                </form>
              ) : (
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-xl text-sm"
                    disabled={isAppLoading}
                    onClick={() => {
                      if (loginUrl) {
                        window.location.assign(loginUrl);
                      }
                    }}
                  >
                    {isAppLoading ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Loading SSO configuration
                      </>
                    ) : (
                      <>
                        Continue with SSO
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    You will be redirected to your identity provider. After successful
                    authentication, access returns to the requesting application.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
