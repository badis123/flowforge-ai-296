import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Sparkles, Users, Building2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const steps = [
  { k: "workspace", label: "Workspace", icon: Building2 },
  { k: "invite", label: "Invite team", icon: Users },
  { k: "plan", label: "Choose plan", icon: Sparkles },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [emails, setEmails] = useState(["", "", ""]);

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Logo className="mb-10 justify-center" />
        <ol className="mb-8 flex items-center justify-between">
          {steps.map((s, i) => (
            <li key={s.k} className="flex items-center gap-2">
              <div className={`grid h-9 w-9 place-items-center rounded-full border ${i <= step ? "gradient-primary border-transparent text-white shadow-glow" : "border-border text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              </div>
              <span className={`text-sm ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className="mx-3 h-px w-10 bg-border" />}
            </li>
          ))}
        </ol>
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8">
          {step === 0 && (
            <>
              <h2 className="font-display text-2xl font-semibold">Name your workspace</h2>
              <p className="mt-1 text-sm text-muted-foreground">You can change this later in settings.</p>
              <div className="mt-6 space-y-4">
                <div><Label>Workspace name</Label><Input defaultValue="Acme Studio" /></div>
                <div>
                  <Label>Logo</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-xl gradient-primary shadow-glow" />
                    <Button variant="outline">Upload</Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-semibold">Invite your team</h2>
              <p className="mt-1 text-sm text-muted-foreground">Add a few teammates — you can skip this step.</p>
              <div className="mt-6 space-y-3">
                {emails.map((e, i) => (
                  <Input key={i} placeholder={`teammate${i + 1}@company.com`} value={e}
                    onChange={(ev) => setEmails((arr) => arr.map((x, j) => j === i ? ev.target.value : x))} />
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-semibold">Choose a plan</h2>
              <p className="mt-1 text-sm text-muted-foreground">Start on Pro free for 14 days.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[{ n: "Free", p: "$0" }, { n: "Pro", p: "$19", best: true }, { n: "Enterprise", p: "Custom" }].map((p) => (
                  <div key={p.n} className={`rounded-xl border p-4 cursor-pointer ${p.best ? "border-primary/60 shadow-glow" : "border-border"}`}>
                    <div className="text-sm text-muted-foreground">{p.n}</div>
                    <div className="mt-1 font-display text-2xl">{p.p}</div>
                    {p.best && <div className="mt-2 inline-block rounded-full gradient-primary px-2 py-0.5 text-[10px] text-white">Recommended</div>}
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => step === 0 ? navigate({ to: "/" }) : setStep(step - 1)}>Back</Button>
            <Button className="gradient-primary text-white shadow-glow" onClick={() => {
              if (step < 2) setStep(step + 1);
              else { toast.success("Workspace ready"); navigate({ to: "/dashboard" }); }
            }}>{step < 2 ? "Continue" : "Enter workspace"}</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}