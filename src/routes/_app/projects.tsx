import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { projects, members, memberById } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects")({ component: ProjectsPage });

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [status, setStatus] = useState<"All" | "Active" | "Paused" | "Completed">("All");

  const filtered = useMemo(() => projects.filter(p =>
    (status === "All" || p.status === status) &&
    p.name.toLowerCase().includes(q.toLowerCase())
  ), [q, status]);

  return (
    <>
      <Topbar title="Projects" />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="pl-9" />
          </div>
          <div className="flex gap-1 rounded-lg border border-border bg-card/40 p-1 text-xs">
            {(["All", "Active", "Paused", "Completed"] as const).map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`rounded-md px-3 py-1.5 transition ${status === s ? "gradient-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-lg border border-border bg-card/40 p-1">
            <button onClick={() => setView("grid")} className={`rounded-md p-1.5 ${view === "grid" ? "bg-muted" : ""}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`rounded-md p-1.5 ${view === "list" ? "bg-muted" : ""}`}><List className="h-4 w-4" /></button>
          </div>
          <NewProjectDialog />
        </div>

        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="group glass rounded-2xl p-5 hover:border-primary/40 cursor-pointer transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl shadow-glow" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}80)` }} />
                    <div>
                      <h3 className="font-display font-semibold">{p.name}</h3>
                      <span className={`text-[10px] uppercase tracking-wider ${p.status === "Active" ? "text-success" : p.status === "Paused" ? "text-warning" : "text-muted-foreground"}`}>{p.status}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span><span>{p.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full gradient-primary" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {p.memberIds.slice(0, 4).map(id => {
                      const m = memberById(id);
                      return <div key={id} title={m.name} className="grid h-7 w-7 place-items-center rounded-full border-2 border-card gradient-primary text-[10px] font-semibold text-white">{m.name[0]}</div>;
                    })}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />{p.deadline.slice(5)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-xs uppercase text-muted-foreground">
                <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Status</th><th className="text-left p-3">Progress</th><th className="text-left p-3">Members</th><th className="text-left p-3">Due</th></tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-t border-border/50 hover:bg-card/30">
                    <td className="p-3 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{p.status}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full gradient-primary" style={{ width: `${p.progress}%` }} /></div>
                        <span className="text-xs">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{p.memberIds.length}</td>
                    <td className="p-3 text-muted-foreground">{p.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="glass mt-8 rounded-2xl p-12 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-primary shadow-glow grid place-items-center"><Search className="h-6 w-6 text-white" /></div>
            <h3 className="font-display text-lg font-semibold">No projects match</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try a different filter or create a new project.</p>
          </div>
        )}
      </div>
    </>
  );
}

function NewProjectDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-white shadow-glow"><Plus className="mr-1 h-4 w-4" />New Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create new project</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Name</Label><Input placeholder="Quantum Mobile App" /></div>
          <div><Label>Description</Label><Input placeholder="Short summary" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Color</Label><div className="mt-1 flex gap-2">{["#8B5CF6", "#6366F1", "#22D3EE", "#F59E0B", "#10B981", "#EC4899"].map(c => <button key={c} className="h-7 w-7 rounded-md ring-1 ring-border" style={{ background: c }} />)}</div></div>
            <div><Label>Due date</Label><Input type="date" /></div>
          </div>
          <div>
            <Label>Assign members</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {members.slice(0, 4).map(m => (
                <button key={m.id} className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-1 text-xs hover:border-primary/60">
                  <span className="h-5 w-5 rounded-full gradient-primary" /> {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="gradient-primary text-white shadow-glow" onClick={() => { toast.success("Project created"); setOpen(false); }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}