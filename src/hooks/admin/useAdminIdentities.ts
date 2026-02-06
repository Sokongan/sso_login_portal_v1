import { useEffect, useMemo, useState } from 'react';
import { listAdminIdentities, type AdminIdentity } from '@/lib/api/adminIdentities';

type UseAdminIdentitiesState = {
  status: 'idle' | 'loading' | 'error' | 'success';
  message: string;
  identities: AdminIdentity[];
  totalCount: number;
  bffSession?: { subject: string; exp: string };
  refresh: () => Promise<void>;
};

export function useAdminIdentities(): UseAdminIdentitiesState {
  const [status, setStatus] = useState<UseAdminIdentitiesState['status']>('idle');
  const [message, setMessage] = useState('');
  const [identities, setIdentities] = useState<AdminIdentity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [bffSession, setBffSession] = useState<UseAdminIdentitiesState['bffSession']>();

  const refresh = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const { response, data } = await listAdminIdentities({
        per_page: 50,
        tuples_namespace: 'app',
        include_kratos_sessions: true,
      });
      if (!response.ok || !data) {
        setStatus('error');
        setMessage('Unable to load identities.');
        return;
      }
      const items = data.identities ?? [];
      setIdentities(items);
      setTotalCount(items.length);
      setBffSession(data.bff_session);
      setStatus('success');
    } catch (error) {
      console.error('[admin] failed to load identities', error);
      setStatus('error');
      setMessage('Unable to load identities.');
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return {
    status,
    message,
    identities,
    totalCount,
    bffSession,
    refresh,
  };
}
