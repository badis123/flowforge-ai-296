import { CheckCircle2, Clock, Users, TrendingUp } from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="relative rounded-2xl glass-strong p-3 shadow-elegant">
      <div className="rounded-xl bg-background/70 p-5">
        {/* Fake top bar */}
        <div className="mb-5 flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 text-xs text-muted-foreground">app.nexaflow.com / dashboard</span>
          </div>
          <div className="hidden gap-2 sm:flex">
            <div className="h-7 w-32 rounded-md bg-card/80" />
            <div className="h-7 w-7 rounded-md bg-card/80" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { k: "Projects", v: "24", icon: TrendingUp, d: "+12%" },
            { k: "Active tasks", v: "186", icon: Clock, d: "+8%" },
            { k: "Members", v: "42", icon: Users, d: "+3" },
            { k: "Completion", v: "87%", icon: CheckCircle2, d: "+5%" },
          ].map((s) => (
            <div key={s.k} className="rounded-lg border border-border/40 bg-card/40 p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{s.k}</span>
                <s.icon className="h-3.5 w-3.5 text-violet" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl font-semibold">{s.v}</span>
                <span className="text-xs text-success">{s.d}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2 rounded-lg border border-border/40 bg-card/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">Project progress</span>
              <span className="text-xs text-muted-foreground">This sprint</span>
            </div>
            {["Orbit Mobile App", "Atlas Design System", "Pulse Marketing Site", "Nimbus API v2"].map((p, i) => {
              const w = [68, 42, 88, 55][i];
              return (
                <div key={p} className="mb-3 last:mb-0">
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{p}</span><span className="text-muted-foreground">{w}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full gradient-primary" style={{ width: `${w}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg border border-border/40 bg-card/40 p-4">
            <div className="mb-3 text-sm font-medium">My tasks</div>
            <div className="space-y-2">
              {["Spec billing edge cases", "Rate-limit middleware", "Component a11y sweep"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 rounded-md bg-background/60 p-2 text-xs">
                  <div className={`h-2 w-2 rounded-full ${["bg-warning", "bg-destructive", "bg-indigo"][i]}`} />
                  <span className="truncate">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}