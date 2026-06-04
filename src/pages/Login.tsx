import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLoginForm } from '@/hooks/auth/use-login-form';

function Notice({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'warning';
  children: ReactNode;
}) {
  const toneClasses =
    tone === 'warning'
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : 'border-rose-200 bg-rose-50 text-rose-700';

  return (
    <div
      role="alert"
      className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${toneClasses}`}
    >
      {children}
    </div>
  );
}

const accessPoints = [
  'Session automatically returns you to the requesting application.',
  'Sign-in uses a secure, centralized identity flow.',
  'Designed for internal tools, dashboards, and employee services.',
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    loginChallenge,
    errorMessage,
    submitError,
    isSubmitting,
    handleSubmit,
  } = useLoginForm();

  if (!loginChallenge) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.08),_transparent_30%)]" />
        <div className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 text-sm text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <LoaderCircle className="size-4 animate-spin text-slate-900" />
          Validating sign-in request...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.08),_transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <Card className="grid w-full overflow-hidden border-slate-200 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden flex-col justify-between bg-slate-950 px-8 py-10 text-white md:flex lg:px-10">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/55">
                    Secure access
                  </p>
                  <p className="text-lg font-semibold">Modern Portal</p>
                </div>
              </div>

              <div className="max-w-md space-y-5">
                <Badge className="border-white/10 bg-white/10 text-white hover:bg-white/15">
                  <Sparkles className="size-3.5" />
                  Single sign-on
                </Badge>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Sign in once.
                  <span className="block text-white/70">Access everything.</span>
                </h1>
                <p className="text-base leading-7 text-white/72 sm:text-lg">
                  A focused, secure entry point for internal applications, built for a
                  clean SSO handoff and a faster return to work.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {accessPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-white/72">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col">
            <CardHeader className="space-y-3 px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="flex items-center gap-2 text-slate-500 md:hidden">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Secure access
                  </p>
                  <p className="font-semibold text-slate-950">Modern Portal</p>
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                  <Building2 className="size-3.5" />
                  Organization account
                </Badge>
                <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Log in to continue
                </CardTitle>
                <CardDescription className="max-w-md text-base leading-7">
                  Use your official credentials to access the requested application and
                  complete the sign-in flow.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 sm:px-8">
              {errorMessage ? <Notice tone="warning">{errorMessage}</Notice> : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier">User ID</Label>
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your user ID"
                    required
                    className="h-11 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-shadow focus-visible:border-slate-400 focus-visible:ring-slate-300/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="h-11 rounded-xl border-slate-200 bg-white px-4 pr-12 shadow-sm transition-shadow focus-visible:border-slate-400 focus-visible:ring-slate-300/60"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-1 my-auto size-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <KeyRound className="size-4" />
                    Security check
                  </div>
                  <p className="mt-1">CAPTCHA placeholder for your verification step.</p>
                </div>

                {submitError ? <Notice>{submitError}</Notice> : null}

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full rounded-xl bg-slate-950 text-base font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)] hover:bg-slate-800"
                  disabled={isSubmitting}
                >
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
              </form>
            </CardContent>

            <Separator className="bg-slate-200" />

            <CardFooter className="flex flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-2">
                <LockKeyhole className="size-4" />
                <span>Protected sign-in flow</span>
              </div>
              <span>SSO-ready</span>
            </CardFooter>
          </section>
        </Card>
      </div>
    </div>
  );
}
