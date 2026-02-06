import { apiDelete, apiGet, apiPost, apiPut } from './http';

export type AppRegistration = {
  id: string;
  dsn: string;
  redirect_path: string;
  created_at?: string;
  updated_at?: string;
};

export type AppsResponse = {
  apps?: AppRegistration[];
};

export function listApps() {
  return apiGet<AppsResponse>('/api/apps');
}

export function createApp(payload: { dsn: string; redirect_path: string }) {
  return apiPost<AppRegistration>('/api/apps', payload);
}

export function getApp(id: string) {
  return apiGet<AppRegistration>(`/api/apps/${id}`);
}

export function updateApp(id: string, payload: { dsn: string; redirect_path: string }) {
  return apiPut<AppRegistration>(`/api/apps/${id}`, payload);
}

export function deleteApp(id: string) {
  return apiDelete<null>(`/api/apps/${id}`);
}
