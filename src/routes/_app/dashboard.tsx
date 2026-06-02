import { createFileRoute, Link } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FolderKanban, CheckSquare, Users, Activity, ArrowUpRight, Plus, FileBarChart,
  UserPlus, Calendar,
} from "lucide-react";
import { activity, members, memberById, projects, tasks, STATUS_ORDER } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);
  return <span>{v}{suffix}</span>;
}

function Dashboard() {
  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderKanban, delta: "+3 this month" },
    { label: "Active Tasks", value: tasks.filter(t => t.status !== "Done").length, icon: CheckSquare, delta: "+12 this week" },
    { label: "Team Members", value: members.length, icon: Users, delta: "+1 invited" },
    { label: "Completion Rate", value: 87, suffix: "%", icon: Activity, delta: "+5% vs last sprint" },
  ];
  const myTasks = tasks.filter(t => t.assigneeId === "u1");

  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Welcome banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl glass-strong p-6 md:p-8 mb-6">
          <div className="absolute inset-0 gradient-glow opacity-60" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-violet">Tuesday, June 2</p>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-semibold tracking-tight">Welcome back, Ava 👋</h2>
              <p className="mt-1 text-sm text-muted-foreground">You have 4 tasks due this week. Let's ship something great.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="gradient-primary text-white shadow-glow"><Plus className="mr-1 h-4 w-4" />New Project</Button>
              <Button variant="outline"><CheckSquare className="mr-1 h-4 w-4" />New Task</Button>
              <Button variant="outline"><UserPlus className="mr-1 h-4 w-4" />Invite</Button>
              <Link to="/reports"><Button variant="ghost"><FileBarChart className="mr-1 h-4 w-4" />Reports</Button></Link>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{s.label}</span>
                <s.icon className="h-4 w-4 text-violet" />
              </div>
              <div className="mt-3 font-display text-3xl font-semibold">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="h-3 w-3" />{s.delta}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Tasks kanban mini */}
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">My tasks</h3>
              <Link to="/tasks" className="text-xs text-violet hover:underline">View all →</Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {(["To Do", "In Progress", "Done"] as const).map((col) => (
                <div key={col} className="rounded-xl border border-border/50 bg-card/40 p-3">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-medium">{col}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{myTasks.filter(t => t.status === col).length}</span>
                  </div>
                  <div className="space-y-2">
                    {myTasks.filter(t => t.status === col).slice(0, 3).map(t => (
                      <div key={t.id} className="rounded-lg bg-background/60 p-3 text-sm shadow-sm">
                        <div className="font-medium leading-tight">{t.title}</div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{t.due.slice(5)}</span>
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">{t.priority}</span>
                        </div>
                      </div>
                    ))}
                    {myTasks.filter(t => t.status === col).length === 0 && (
                      <div className="rounded-lg border border-dashed border-border/50 p-4 text-center text-xs text-muted-foreground">
                        Nothing here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <h3 className="mt-8 mb-3 font-display text-lg font-semibold">Project progress</h3>
            <div className="space-y-4">
              {projects.slice(0, 4).map(p => (
                <div key={p.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                      <span className="font-medium">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Due {p.deadline.slice(5)}</span>
                      <span className="text-foreground">{p.progress}%</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 0.8 }}
                      className="h-full gradient-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-4 font-display text-lg font-semibold">Activity</h3>
            <ul className="space-y-4">
              {activity.map((a) => {
                const m = memberById(a.who);
                return (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full gradient-primary grid place-items-center text-[11px] font-semibold text-white">
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p><span className="font-medium">{m.name}</span> <span className="text-muted-foreground">{a.verb}</span> {a.what}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.when}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}