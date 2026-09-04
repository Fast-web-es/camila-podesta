import { createHmac, timingSafeEqual, scryptSync } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { NextRequest } from 'next/server';

export type AuthUser = { email: string; passwordHash: string; portfolio: string };
const cookieName = 'portfolio_session';

async function users(): Promise<AuthUser[]> {
  const file = path.join(process.cwd(), 'content/auth/users.json');
  return JSON.parse(await readFile(file, 'utf8')) as AuthUser[];
}

export async function authenticate(email: string, password: string) {
  const user = (await users()).find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return user;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64).toString('hex');
  return derived.length === key.length && timingSafeEqual(Buffer.from(derived), Buffer.from(key));
}

export function createSession(user: AuthUser) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not configured');
  const payload = Buffer.from(JSON.stringify({ email: user.email, portfolio: user.portfolio, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function getSession(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value;
  const secret = process.env.AUTH_SECRET;
  if (!token || !secret) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email: string; portfolio: string; exp: number };
  return session.exp > Date.now() ? session : null;
}

export { cookieName };

