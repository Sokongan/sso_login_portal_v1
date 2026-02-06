import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseLoginFormState = {
  loginChallenge: string;
  redirect: string;
  errorMessage: string;
  submitError: string;
  hasChallenge: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function useLoginForm(): UseLoginFormState {
  const [searchParams] = useSearchParams();
  const loginChallenge = searchParams.get('login_challenge') ?? '';
  const redirect = searchParams.get('redirect') ?? '/dashboard';
  const error = searchParams.get('error') ?? '';
  const [submitError, setSubmitError] = useState('');

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
    } catch (submitError) {
      setSubmitError('Unable to sign in. Please try again.');
    }
  };

  return {
    loginChallenge,
    redirect,
    errorMessage,
    submitError,
    hasChallenge,
    handleSubmit,
  };
}
