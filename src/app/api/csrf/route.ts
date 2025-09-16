// src/app/api/csrf/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const token = Math.random().toString(36).slice(2);
  const res = NextResponse.json({ ok: true });
  // Non-HTTPOnly so the client can read it for the header; SameSite=Lax allows same-site POSTs
  res.cookies.set('csrf_token', token, {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/',
  });
  return res;
}