import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <Card className="grid w-full overflow-hidden md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-slate-900 to-slate-700 p-10 text-white md:block">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5" />
              Modern Portal
            </div>

            <div className="mt-10 space-y-3">
              <h1 className="text-3xl font-semibold leading-tight">
                Sign in to continue.
              </h1>
              <p className="text-white/80">
                Centralized access to payslip, leave, SALN, equipment, support, and internal links.
              </p>
            </div>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Tip: Use your official account. If you’re prompted for verification, complete it before continuing.
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-2 text-slate-900">
              <ShieldCheck className="h-5 w-5" />
              <div className="text-base font-semibold">myDOJ Portal</div>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Log in</h2>
            <p className="mt-1 text-sm text-slate-600">
              Enter your credentials to access the portal.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                window.location.assign("/");
              }}
            >
              <div>
                <label className="text-sm font-medium text-slate-700">User ID</label>
                <Input autoComplete="username" className="mt-1" placeholder="e.g. USERNAME" />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                  <Input
                    autoComplete="current-password"
                    type={show ? "text" : "password"}
                    className="h-8 border-none p-0 shadow-none focus-visible:ring-0"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Replace this with your real captcha component */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                CAPTCHA placeholder (integrate reCAPTCHA here)
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <div className="flex items-center justify-between text-sm">
                <a className="text-slate-600 hover:text-slate-900" href="#">
                  Forgot password?
                </a>
                <span className="text-slate-500">v1.0</span>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
