import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { apiPost } from '@/lib/api/http';

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

function restartLoginFlow() {
  window.location.replace('/api/login');
}

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

  useEffect(() => {
    if (loginChallenge) {
      return;
    }

    restartLoginFlow();
  }, [loginChallenge]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (!loginChallenge) {
      restartLoginFlow();
      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const identifier = (form.elements.namedItem('identifier') as HTMLInputElement | null)
      ?.value ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)
      ?.value ?? '';

    try {
      const { response, data } = await apiPost<SubmitLoginResponse>(
        '/api/identity/login',
        {
          identifier,
          password,
          login_challenge: loginChallenge,
        }
      );

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
