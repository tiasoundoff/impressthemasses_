// src/app/api/sign-in/route.ts
import { NextRequest, NextResponse } from 'next/server';

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const urlOrigin = new URL(req.url).origin;
  const originHdr = req.headers.get('origin');
  const refererHdr = req.headers.get('referer');
  const csrfCookie = req.cookies.get('csrf_token')?.value ?? null;
  const csrfHeader = req.headers.get('x-csrf-token');

  // Bypass CSRF in development, but surface diagnostics in the response
  if (process.env.NODE_ENV !== 'production') {
    const { email, password } = await req.json().catch(() => ({ email: '', password: '' }));
    if (!email || !password) return json(400, { error: 'Missing email or password' });

    // Return debug info so you can see why it would have failed
    return json(200, {
      ok: true,
      _devDebug: {
        urlOrigin,
        originHdr,
        refererHdr,
        csrfCookiePresent: Boolean(csrfCookie),
        csrfHeaderPresent: Boolean(csrfHeader),
      },
    });
  }

  // Production CSRF enforcement
  const cookieToken = csrfCookie;
  const headerToken = csrfHeader;
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return json(403, { error: 'CSRF check failed', code: 'CSRF' });
  }

  const { email, password } = await req.json().catch(() => ({ email: '', password: '' }));
  if (!email || !password) return json(400, { error: 'Missing email or password' });

  const valid = email === 'john@doe.com' && password === 'letmein';
  if (!valid) return json(401, { error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' });

  return json(200, { ok: true });
}