import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: RegisterPage });

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
  confirm: z.string(),
  role: z.enum(["Admin", "Member", "Viewer"]),
}).refine(d => d.password === d.confirm, { path: ["confirm"], message: "Passwords don't match" });

type FormValues = z.infer<typeof schema>;

function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { role: "Admin" } });

  const onSubmit = async (d: FormValues) => {
    await new Promise(r => setTimeout(r, 600));
    toast.success(`Welcome to NexaFlow, ${d.name.split(" ")[0]}`);
    navigate({ to: "/onboarding" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-background px-6 py-12 order-2 lg:order-1">
        <div className="w-full max-w-sm">
          <div className="mb-8"><Logo /></div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Create your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">14-day Pro trial. No credit card.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div><Label>Name</Label><Input {...register("name")} placeholder="Ada Lovelace" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div><Label>Work email</Label><Input type="email" {...register("email")} placeholder="ada@company.com" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Password</Label><Input type="password" {...register("password")} />
                {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <div><Label>Confirm</Label><Input type="password" {...register("confirm")} />
                {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message}</p>}
              </div>
            </div>
            <div>
              <Label>Role</Label>
              <Controller control={control} name="role" render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              )} />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white shadow-glow">
              {isSubmitting ? "Creating…" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-foreground hover:text-violet">Sign in</Link>
          </p>
        </div>
      </div>
      <div className="relative hidden overflow-hidden lg:order-2 lg:block">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <h2 className="font-display text-4xl font-semibold leading-tight">Join 8,000+ teams shipping faster.</h2>
        </div>
      </div>
    </div>
  );
}