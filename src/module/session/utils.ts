import { Profile, Session } from "./type";

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
