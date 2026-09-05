"use client";

import { useActionState } from "react";
import { Lock } from "@phosphor-icons/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, { error: "" });

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="bg-card border-foreground/10 w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4">
            <Lock weight="duotone" className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-mono">Admin Access</h1>
          <p className="text-foreground/60 text-sm">Enter password to continue</p>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <label htmlFor="admin-password" className="sr-only">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              autoFocus
              className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-none text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
            />
            {state.error && (
              <p role="alert" className="text-red-400 text-sm">
                {state.error}
              </p>
            )}
            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-primary hover:bg-primary/85 text-foreground py-6 rounded-none"
            >
              {pending ? "Checking…" : "Access Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
