import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Server-only helpers for the admin gate. Never import this from a client
// component: it reads the admin password.

export const ADMIN_COOKIE = "jts_admin";
export const SESSION_SECONDS = 8 * 60 * 60;

// ADMIN_PASSWORD wins; NEXT_PUBLIC_ADMIN_PASSWORD keeps the existing Vercel
// variable working. Nothing in the browser references either name any more,
// so neither is inlined into the client bundle.
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function passwordMatches(candidate: string): boolean {
  const expected = adminPassword();
  return expected.length > 0 && safeEqual(candidate, expected);
}

// The session token is derived from the password, so rotating the password
// logs every browser out.
export function sessionToken(): string {
  return createHmac("sha256", adminPassword()).update("jts-admin-session-v1").digest("hex");
}

export async function isAdminSession(): Promise<boolean> {
  if (!adminPassword()) return false;
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value ?? "";
  return value.length > 0 && safeEqual(value, sessionToken());
}
