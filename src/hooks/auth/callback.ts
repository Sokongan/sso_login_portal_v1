import { redirectError } from "../redirects/redirects";

export function getCallbackParams(): {
  code: string | null;
  state: string | null;
} {
  if (typeof window === "undefined") {
    return { code: null, state: null };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    code: params.get("code"),
    state: params.get("state"),
  };
}

export async function redirectCallback(): Promise<void> {
  const { code, state } = getCallbackParams();

  if (!code || !state) {
    redirectError({
      id: "invalid_callback",
      status: "invalid_callback",
      message: "Missing callback parameters.",
    });
    return;
  }

  const callbackUrl =
    `/api/callback?code=${encodeURIComponent(code)}` +
    `&state=${encodeURIComponent(state)}`;

  window.location.replace(callbackUrl);
}