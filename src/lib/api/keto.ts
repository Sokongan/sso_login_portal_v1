import { apiGet, apiPost } from './http';

export type Tuple = {
  namespace: string;
  object: string;
  relation: string;
  subject_id: string;
};

type AdminCheckResponse = {
  allowed?: boolean;
  is_admin?: boolean;
  result?: boolean;
  ok?: boolean;
};

export async function checkTupleAccess(tuple: Tuple) {
  const params = new URLSearchParams({
    namespace: tuple.namespace,
    object: tuple.object,
    relation: tuple.relation,
    subject_id: tuple.subject_id,
  });

  const { response, data } = await apiGet<AdminCheckResponse>(
    `/api/keto/check?${params.toString()}`
  );

  const allowed = Boolean(
    data?.allowed ?? data?.is_admin ?? data?.result ?? data?.ok ?? false
  );

  return { ok: response.ok, allowed };
}

export async function writeTuple(tuple: Tuple) {
  const { response } = await apiPost<unknown>('/api/keto/tuples', tuple);

  return response.ok;
}
