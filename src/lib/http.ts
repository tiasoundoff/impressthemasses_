// src/lib/http.ts

interface ErrorPayload {
  error?: string;
  code?: string;
}

export async function postJSON<TOut, TIn = unknown>(
  url: string,
  data: TIn,
  opts?: { signal?: AbortSignal; headers?: Record<string, string> }
): Promise<TOut> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(opts?.headers ?? {}) },
    body: JSON.stringify(data),
    // This ensures cookies are sent when crossing ports/origins
    credentials: 'include',
    signal: opts?.signal,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJSON = contentType.includes('application/json');

  if (!res.ok) {
    const payload: ErrorPayload = isJSON ? await res.json().catch(() => ({})) : {};
    const msg = payload.error || `Request failed (${res.status})`;
    const err = new Error(msg) as Error & { code?: string; status?: number };
    err.code = payload.code;
    err.status = res.status;
    throw err;
  }

  return (isJSON ? res.json() : ({} as TOut)) as TOut;
}