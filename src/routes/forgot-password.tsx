import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="glass rounded-2xl p-8">
          {!sent ? (
            <>
              <h1 className="font-display text-2xl font-semibold tracking-tight">Reset your password</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
                <div><Label>Email</Label><Input type="email" required placeholder="you@company.com" /></div>
                <Button type="submit" className="w-full gradient-primary text-white shadow-glow">Send reset link</Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
              <h1 className="mt-4 font-display text-2xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm text-muted-foreground">We sent a reset link. It expires in 30 minutes.</p>
            </div>
          )}
          <Link to="/login" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}