import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { apiPost } from '@/lib/api/http';
import { useSearchParams } from 'react-router-dom';
import { redirectError } from '../redirects/redirects';

type UseLoginFormState = {
  loginChallenge: string;
  submitError: string;
  isSubmitting: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};


type SubmitLoginResponse = {
  error?: string;
  redirect_to?: string;
};


export function useLoginForm(): UseLoginFormState {
  const searchParams = useSearchParams(new URLSearchParams(window.location.search))[0];
  const loginChallenge = searchParams.get('login_challenge') ?? '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!loginChallenge) {
      redirectError({
        id: 'invalid_entry',
        status: 'invalid_entry',
        message: 'This SSO login page must be opened from a requesting application.',
      });
    }
  }, [loginChallenge]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const form = event.currentTarget;
    const identifier = (form.elements.namedItem('identifier') as HTMLInputElement | null)
      ?.value ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)
      ?.value ?? '';

    try {
      const { data, response } = await apiPost<SubmitLoginResponse>(
        '/api/identity/login',
        {
          identifier,
          password,
          login_challenge: loginChallenge,
        }
      );
      
      if (!response.ok) {
        setSubmitError('Login failed. Please check your credentials and try again.');
      }

      if (!data?.redirect_to) {
        setSubmitError('Missing redirect target.');
        return;
      }

      window.location.replace(data.redirect_to);
    } catch {
      setSubmitError('Identity provider is unreachable. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loginChallenge,
    submitError,
    isSubmitting,
    handleSubmit,
  };
}
