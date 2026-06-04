import {
    ArrowRight,
    Eye,
    EyeOff,
    KeyRound,
    LoaderCircle,
    GalleryVerticalEnd,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginForm } from '@/hooks/auth/use-login-form';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { AlertMessage } from '@/components/alertmessage';
import { useState } from 'react';


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        loginChallenge,
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
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Single Sign On</span>
                        </a>
                        <h1 className="text-xl font-bold">Department Of Justice</h1>
                        <FieldDescription>
                            Sign in with your corporate account to access internal tools and resources. Your credentials are securely handled by our identity provider.
                        </FieldDescription>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="identifier">Registered Email or DOJ ID</FieldLabel>
                        <Input
                            id="identifier"
                            name="identifier"
                            type="text"
                            autoComplete="username"
                            placeholder="Enter your user ID"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="pr-12"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-1 my-auto size-8 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                onClick={() => setShowPassword((value) => !value)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </Button>
                        </div>
                    </Field>
                    <Field className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2 font-medium text-slate-800">
                            <KeyRound className="size-4" />
                            Security check

                            <p className="mt-1">CAPTCHA placeholder for your verification step.</p>
                        </div>
                    </Field>
                    <Field>
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
                    </Field>
                    <Field>
                        {submitError ? <AlertMessage title="Error" description={submitError} variant="destructive" /> : null}
                    </Field>
                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>

    );
}
