import { type ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSession } from '@/context/SessionContext';
import { useDefaultApp } from '@/hooks/auth/useDefaultApp';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Shield,
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

function toTitleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function getPortalLabel(value: string | null | undefined, fallback: string) {
  if (!value) return fallback;

  try {
    const url = new URL(value, window.location.origin);
    const host = url.host || url.pathname || fallback;
    const base = host
      .replace(/^www\./i, '')
      .split('.')[0]
      ?.replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim();

    if (!base) return fallback;
    return `${toTitleCase(base)} Portal`;
  } catch {
    return fallback;
  }
}

function Notice({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'warning';
  children: ReactNode;
}) {
  return (
    <div
      className={
        tone === 'warning'
          ? 'rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900'
          : 'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
      }
    >
      {children}
    </div>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="text-sm text-slate-700">{value}</p>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, isLoading: isSessionLoading } = useSession();
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

  useEffect(() => {
    if (isSessionLoading || hasChallenge || !isAuthenticated) return;

    try {
      const target = new URL(redirect, window.location.origin);
      if (target.origin === window.location.origin) {
        navigate(`${target.pathname}${target.search}${target.hash}`, { replace: true });
        return;
      }
      window.location.assign(target.toString());
    } catch {
      navigate(redirect || '/dashboard', { replace: true });
    }
  }, [hasChallenge, isAuthenticated, isSessionLoading, navigate, redirect]);

  if (isSessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-8">
        <LoaderCircle className="size-6 animate-spin text-[#2f56d3]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <Card className="w-full max-w-5xl overflow-hidden rounded-[24px] border border-slate-200 bg-white py-0 shadow-[0_14px_36px_rgba(15,23,42,0.08)] md:grid md:grid-cols-[1.02fr_0.98fr] md:gap-0">
          <section className="hidden min-h-[620px] flex-col justify-between bg-[#1f2a44] px-8 py-10 text-white md:flex lg:px-12">
            <div className="space-y-10">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <Shield className="size-4.5" />
                <span>Modern Portal</span>
              </div>

              <div className="max-w-md space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-[2.65rem]">
                  Sign in to continue.
                </h1>
                <p className="text-lg leading-8 text-slate-200">
                  Centralized access to payslip, leave, SALN, equipment, support, and
                  internal links.
                </p>
              </div>

              <div className="max-w-md rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm leading-7 text-slate-200">
                Tip: Use your official account. If you&apos;re prompted for verification,
                complete it before continuing.
              </div>
            </div>
          </section>

          <section className="flex min-h-[620px] flex-col justify-between px-8 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Log in</h2>
                <p className="max-w-sm text-base leading-7 text-slate-600">
                  {hasChallenge
                    ? 'Enter your credentials to complete access to the portal.'
                    : 'Continue with your identity provider to access the portal.'}
                </p>
              </div>

              {appError ? <Notice tone="warning">{appError}</Notice> : null}
              {errorMessage ? <Notice>{errorMessage}</Notice> : null}

              {hasChallenge ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="identifier">
                      User ID
                    </label>
                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your USER ID e.g DOJ******"
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm focus-visible:ring-[#2f56d3]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        required
                        className="h-12 rounded-xl border-slate-200 bg-white px-4 pr-12 shadow-sm focus-visible:ring-[#2f56d3]/20"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-700"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    CAPTCHA placeholder (integrate reCAPTCHA here)
                  </div>

                  {submitError ? <Notice>{submitError}</Notice> : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-xl bg-[#2f56d3] text-base font-medium text-white shadow-sm hover:bg-[#294cc0]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Signing in
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
                    Authentication will continue on your configured identity provider. Once
                    approved, you will be returned to the requesting application.
                  </div>

                  <Button
                    size="lg"
                    className="h-12 w-full rounded-xl bg-[#2f56d3] text-base font-medium text-white shadow-sm hover:bg-[#294cc0]"
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
                        Loading configuration
                      </>
                    ) : (
                      <>
                        Continue with SSO
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Password recovery and secondary verification are handled by your identity
                    provider.
                  </div>
                </div>
              )}
            </div>

            <div className="mx-auto flex w-full max-w-md items-center justify-between gap-4 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <LockKeyhole className="size-4" />
                <span>Protected sign-in flow</span>
              </div>
              <span>SSO</span>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
