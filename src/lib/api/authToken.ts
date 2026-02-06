let authToken: string | null = null;

export function getAuthToken() {
  return authToken;
}

export function setAuthToken(token: string | null) {
  authToken = token && token.trim().length > 0 ? token : null;
}

export function setAuthTokenFromHeader(headerValue: string | null) {
  if (!headerValue) return;
  const match = headerValue.match(/^Bearer\s+(.+)$/i);
  if (!match) return;
  setAuthToken(match[1]);
}

export function clearAuthToken() {
  authToken = null;
}
