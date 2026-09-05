"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, SESSION_SECONDS, passwordMatches, sessionToken } from "./auth";

export type LoginState = { error: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const candidate = String(formData.get("password") ?? "");
  if (!passwordMatches(candidate)) {
    return { error: "Incorrect password" };
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  revalidatePath("/admin/payment-links");
  return { error: "" };
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
  revalidatePath("/admin/payment-links");
}
