
import { apiGet, apiPost } from "@/lib/api/http";
import { Session } from "./type";

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