import { apiGet } from './http';

export type AdminIdentity = {
  ID?: string;
  id?: string;
  Traits?: {
    email?: string;
    username?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  } & Record<string, unknown>;
  traits?: {
    email?: string;
    username?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  } & Record<string, unknown>;
  roles?: { object: string; role: string }[];
  kratos_sessions?: { ip_address?: string; user_agent?: string }[];
} & Record<string, unknown>;

export type AdminIdentitiesResponse = {
  identities?: AdminIdentity[];
  bff_session?: { subject: string; exp: string };
};

export function listAdminIdentities(params?: {
  page?: number;
  per_page?: number;
  page_size?: number;
  page_token?: string;
  credentials_identifier?: string;
  tuples_namespace?: string;
  tuples_object?: string;
  tuples_relation?: string;
  include_kratos_sessions?: boolean;
}) {
  const search = new URLSearchParams();
  if (params?.page !== undefined) search.set('page', String(params.page));
  if (params?.per_page !== undefined) search.set('per_page', String(params.per_page));
  if (params?.page_size !== undefined) search.set('page_size', String(params.page_size));
  if (params?.page_token) search.set('page_token', params.page_token);
  if (params?.credentials_identifier) {
    search.set('credentials_identifier', params.credentials_identifier);
  }
  if (params?.tuples_namespace) search.set('tuples_namespace', params.tuples_namespace);
  if (params?.tuples_object) search.set('tuples_object', params.tuples_object);
  if (params?.tuples_relation) search.set('tuples_relation', params.tuples_relation);
  if (params?.include_kratos_sessions !== undefined) {
    search.set('include_kratos_sessions', String(params.include_kratos_sessions));
  }
  const query = search.toString();
  const url = query.length > 0 ? `/api/admin/identities?${query}` : '/api/admin/identities';
  return apiGet<AdminIdentitiesResponse>(url);
}
