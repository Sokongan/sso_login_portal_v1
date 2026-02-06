import { useMemo } from 'react';
import { useSession } from '@/context/SessionContext';

import type { Tuple } from '@/lib/api/keto';
import { useAdminAccess } from '@/hooks/admin/useAdminAccess';
import { useAdminIdentities } from '@/hooks/admin/useAdminIdentities';
import AdminIdentitiesTable from './AdminIdentitiesTable';
import AdminSummaryCards from './AdminSummaryCards';

const defaultAdminTuple: Omit<Tuple, 'subject_id'> = {
  namespace: 'app',
  object: 'sso-portal',
  relation: 'admin',
};

export default function AdminPanel() {
  const { identityId } = useSession();
  const adminCheckTuple = useMemo<Tuple>(
    () => ({
      ...defaultAdminTuple,
      subject_id: identityId ?? '',
    }),
    [identityId]
  );

  const { isAdmin } = useAdminAccess(adminCheckTuple);
  const {
    status: identitiesStatus,
    message: identitiesMessage,
    identities,
    totalCount,
    bffSession,
  } = useAdminIdentities();
  const adminCount = useMemo(() => {
    return identities.filter((identity) =>
      (identity.roles ?? []).some((role) => role.role === 'admin')
    ).length;
  }, [identities]);
  const activeCount = useMemo(() => {
    if (!bffSession) return 0;
    const expRaw = bffSession.exp;
    const expNum = Number(expRaw);
    const expMs = Number.isFinite(expNum)
      ? expNum < 1_000_000_000_000
        ? expNum * 1000
        : expNum
      : Date.parse(expRaw);
    if (!Number.isFinite(expMs) || expMs - Date.now() <= 0) return 0;
    return identities.some(
      (identity) => (identity.ID ?? identity.id) === bffSession.subject
    )
      ? 1
      : 0;
  }, [bffSession, identities]);

  return (
    <section className="space-y-6">
      {isAdmin ? (
        <div className="space-y-6">
          <AdminSummaryCards total={totalCount} admins={adminCount} active={activeCount} />
          {identitiesStatus === 'error' ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
              {identitiesMessage || 'Unable to load identities.'}
            </div>
          ) : (
            <AdminIdentitiesTable identities={identities} bffSession={bffSession} />
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          Admin data is only visible to users with admin access.
        </div>
      )}
    </section>
  );
}
