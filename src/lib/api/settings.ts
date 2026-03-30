import type { SettingsFlow, UpdateSettingsFlowBody } from '@ory/client-fetch';
import { apiGet, apiPost } from './http';

export type { SettingsFlow, UpdateSettingsFlowBody };

export async function getSettingsFlow() {
  return apiGet<SettingsFlow>('/api/identity/settings');
}

export async function submitSettingsFlow(
  flowId: string | undefined,
  payload: UpdateSettingsFlowBody
) {
  const query = flowId ? `?flow=${encodeURIComponent(flowId)}` : '';
  return apiPost<SettingsFlow>(`/api/identity/settings${query}`, payload);
}
