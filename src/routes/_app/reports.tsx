import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { completionSeries, statusDistribution, workload, velocity } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_app/reports")({ component: ReportsPage });

const COLORS = ["#8B5CF6", "#F59E0B", "#10B981"];

function ReportsPage() {
  const summary = [
    { k: "Tasks completed", v: "248" }, { k: "Avg completion", v: "2.4d" },
    { k: "Overdue rate", v: "6%" }, { k: "Top performer", v: "Ava O." },
  ];
  return (
    <>
      <Topbar title="Reports & Analytics" />
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Last 30 days · All projects · All members</p>
          <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-1 h-4 w-4" />CSV</Button>
            <Button variant="outline"><Download className="mr-1 h-4 w-4" />PDF</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map(s => (
            <div key={s.k} className="glass rounded-2xl p-5">
              <div className="text-xs text-muted-foreground">{s.k}</div>
              <div className="mt-2 font-display text-3xl font-semibold">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <h3 className="mb-4 font-display text-lg font-semibold">Task completion</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={completionSeries}>
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.6} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} /><YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1f35", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Area type="monotone" dataKey="completed" stroke="#8B5CF6" fill="url(#g1)" />
                <Area type="monotone" dataKey="created" stroke="#6366F1" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-4 font-display text-lg font-semibold">Project status</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {statusDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1f35", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <h3 className="mb-4 font-display text-lg font-semibold">Team workload</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={workload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" stroke="#ffffff60" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="#ffffff60" fontSize={11} width={70} />
                <Tooltip contentStyle={{ background: "#1a1f35", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Bar dataKey="assigned" fill="#6366F1" radius={[0, 6, 6, 0]} />
                <Bar dataKey="completed" fill="#10B981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-4 font-display text-lg font-semibold">Velocity</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={velocity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="week" stroke="#ffffff60" fontSize={11} /><YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1f35", border: "1px solid #ffffff20", borderRadius: 8 }} />
                <Bar dataKey="points" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}