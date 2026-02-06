import { useCallback, useEffect, useState } from 'react';
import { checkTupleAccess, type Tuple } from '@/lib/api/keto';

type AdminStatus = 'idle' | 'loading' | 'success' | 'error';

type AdminAccessState = {
  status: AdminStatus;
  message: string;
  isAdmin: boolean;
  canCheck: boolean;
  recheck: () => void;
};

export function useAdminAccess(tuple: Tuple): AdminAccessState {
  const [status, setStatus] = useState<AdminStatus>('idle');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const canCheck = Boolean(tuple.subject_id);

  const recheck = useCallback(async () => {
    if (!canCheck) return;
    setStatus('loading');
    setMessage('');

    try {
      const result = await checkTupleAccess(tuple);
      if (!result.ok) {
        setStatus('error');
        setMessage('Unable to verify admin access.');
        setIsAdmin(false);
        return;
      }

      setIsAdmin(result.allowed);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setMessage('Unable to verify admin access.');
      setIsAdmin(false);
    }
  }, [canCheck, tuple]);

  useEffect(() => {
    if (!canCheck) return;
    void recheck();
  }, [canCheck, recheck]);

  return { status, message, isAdmin, canCheck, recheck };
}
