import { useMemo, useState, type FormEvent } from 'react';

type SubmitLoginResponse = {
  error?: string;
  redirect_to?: string;
};

type UseLoginFormState = {
  loginChallenge: string;
  errorMessage: string;
  submitError: string;
  isSubmitting: boolean;
  hasChallenge: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function useLoginForm(): UseLoginFormState {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const loginChallenge = searchParams.get('login_challenge') ?? '';
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

    if (!loginChallenge) {
      setSubmitError('Missing login challenge.');
      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const identifier = (form.elements.namedItem('identifier') as HTMLInputElement | null)
      ?.value ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)
      ?.value ?? '';

    try {
      const response = await fetch('/api/identity/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          identifier,
          password,
          login_challenge: loginChallenge,
        }),
      });

      const data = (await response.json().catch(() => null)) as SubmitLoginResponse | null;

      if (!response.ok) {
        setSubmitError(data?.error || 'Login failed.');
        return;
      }

      if (!data?.redirect_to) {
        setSubmitError('Missing redirect target.');
        return;
      }

      window.location.assign(data.redirect_to);
    } catch {
      setSubmitError('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loginChallenge,
    errorMessage,
    submitError,
    isSubmitting,
    hasChallenge,
    handleSubmit,
  };
}
