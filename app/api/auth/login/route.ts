import { NextRequest, NextResponse } from 'next/server';
import { authenticate, cookieName, createSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await authenticate(String(email || ''), String(password || ''));
  if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  const response = NextResponse.json({ ok: true, portfolio: user.portfolio });
  response.cookies.set(cookieName, createSession(user), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}

