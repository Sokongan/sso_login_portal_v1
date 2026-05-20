import { apiGet, apiPost } from '@/lib/api/http';
import type { Profile, Session } from './types';

export async function loadSession(): Promise<Session | null> {
  const { response, data } = await apiGet<Session>(
    '/api/session?include_tuples=true&tuples_namespace=app'
  );

  if (!response.ok || !data || data.authenticated === false) {
    return null;
  }

  return data;
}

export async function refreshSession(): Promise<Session | null> {
  try {
    await apiPost('/api/session/refresh');
  } catch (error) {
    console.error('[session] refresh session request failed', error);
  }

  return loadSession();
}

export async function logoutSession(): Promise<void> {
  await apiPost('/api/logout');
}

export function getIdentityId(session: Session | null): string | null {
  if (!session) return null;

  const identityId = session.identity?.id;
  if (typeof identityId === 'string') return identityId;

  const sub = session.sub;
  if (typeof sub === 'string') return sub;

  return null;
}

export function getProfile(session: Session | null): Profile | null {
  return session?.profile ?? null;
}

export function getDisplayName(profile: Profile | null): string | null {
  if (!profile) {
    return null;
  }

  const firstName = profile.name?.first_name?.trim() ?? '';
  const lastName = profile.name?.last_name?.trim() ?? '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return fullName || null;
}

export function isAdmin(session: Session | null): boolean {
  return (session?.roles ?? []).some(
    (role) => role.object === 'sso-portal' && role.role === 'admin'
  );
}
