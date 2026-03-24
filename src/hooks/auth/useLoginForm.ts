import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseLoginFormState = {
  loginChallenge: string;
  redirect: string;
  errorMessage: string;
  submitError: string;
  isSubmitting: boolean;
  hasChallenge: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

type UseLoginFormOptions = {
  defaultRedirect?: string;
};

export function useLoginForm(options: UseLoginFormOptions = {}): UseLoginFormState {
  const [searchParams] = useSearchParams();
  const loginChallenge = searchParams.get('login_challenge') ?? '';
  const redirect =
    searchParams.get('redirect') ?? options.defaultRedirect ?? '/dashboard';
  const error = searchParams.get('error') ?? '';
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasChallenge = useMemo(() => loginChallenge.length > 0, [loginChallenge]);
  const errorMessage = useMemo(() => {
    if (!error) return '';
    if (error === 'invalid_credentials') {
      return 'The provided credentials are invalid. Check your username/email and password.';
    }
    return 'Unable to sign in. Please try again.';
  }, [error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const form = event.currentTarget;
    const identifier = (form.elements.namedItem('identifier') as HTMLInputElement | null)
      ?.value ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)
      ?.value ?? '';

    try {
      const response = await fetch('/api/kratos/login/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          login_challenge: loginChallenge,
          identifier,
          password,
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (data?.error) {
          setSubmitError(String(data.error));
          return;
        }
        if (data?.redirect_to) {
          window.location.assign(String(data.redirect_to));
          return;
        }
      }

      if (!response.ok) {
        setSubmitError('Unable to sign in. Please try again.');
      }
    } catch {
      setSubmitError('Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loginChallenge,
    redirect,
    errorMessage,
    submitError,
    isSubmitting,
    hasChallenge,
    handleSubmit,
  };
}
