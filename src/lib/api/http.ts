type ApiResult<T> = {
  response: Response;
  data: T | null;
};

function mergeHeaders(init?: RequestInit) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  return {
    ...headers,
    ...(init?.headers ?? {}),
  };
}

export async function apiRequest<T>(input: RequestInfo, init: RequestInit = {}) {
  const response = await fetch(input, {
    credentials: 'include',
    ...init,
    headers: mergeHeaders(init),
  });
  const data = (await response.json().catch(() => null)) as T | null;
  return { response, data } satisfies ApiResult<T>;
}

export function apiGet<T>(input: RequestInfo, init: RequestInit = {}) {
  return apiRequest<T>(input, { ...init, method: 'GET' });
}

export function apiPost<T>(input: RequestInfo, body?: unknown, init: RequestInit = {}) {
  return apiRequest<T>(input, {
    ...init,
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiPut<T>(input: RequestInfo, body?: unknown, init: RequestInit = {}) {
  return apiRequest<T>(input, {
    ...init,
    method: 'PUT',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiPatch<T>(input: RequestInfo, body?: unknown, init: RequestInit = {}) {
  return apiRequest<T>(input, {
    ...init,
    method: 'PATCH',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiDelete<T>(input: RequestInfo, init: RequestInit = {}) {
  return apiRequest<T>(input, { ...init, method: 'DELETE' });
}
