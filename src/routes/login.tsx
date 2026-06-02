import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({ component: LoginPage });

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "", remember: true } });

  const onSubmit = async (data: FormValues) => {
    await new Promise(r => setTimeout(r, 600));
    toast.success(`Welcome back, ${data.email.split("@")[0]}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo />
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight">"NexaFlow saved our team 12 hours every week."</h2>
            <p className="mt-4 text-white/80">— Helena Park, VP Engineering at Linear-ish</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your workspace.</p>

          <Button variant="outline" className="mt-6 w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.5L19 3.6C17.1 1.9 14.7 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.4 2.6C6 7.1 8.7 5 12 5z"/><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.3H12v4.5h6.2c-.3 1.4-1.1 2.6-2.4 3.4l3.7 2.9c2.2-2 3.5-5 3.5-8.5z"/><path fill="#FBBC05" d="M5 14c-.3-.7-.4-1.4-.4-2s.1-1.3.4-2L1.6 7.4C.6 9.1 0 11 0 13s.6 3.9 1.6 5.6L5 16c-.3-.7-.4-1.3-.4-2z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.7-2.9c-1 .7-2.3 1.1-3.6 1.1-3.3 0-6-2.1-7-5L1.6 16C3.5 20.4 7.4 23 12 23z"/></svg>
            Continue with Google
          </Button>
          <div className="relative my-6 text-center text-xs text-muted-foreground">
            <span className="bg-background px-2">or sign in with email</span>
            <div className="absolute left-0 right-0 top-1/2 -z-0 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-violet hover:underline">Forgot?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox {...(register("remember") as any)} /> Remember me for 30 days
            </label>
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white shadow-glow">
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="font-medium text-foreground hover:text-violet">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}