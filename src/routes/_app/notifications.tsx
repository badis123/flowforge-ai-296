import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { notifications } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/_app/notifications")({ component: Page });

function Page() {
  const [filter, setFilter] = useState<"All" | "Mentions" | "Task Updates" | "Project Updates" | "System">("All");
  const items = notifications.filter(n => filter === "All" || n.type === filter);
  const groups = ["Today", "Yesterday", "Earlier"] as const;
  return (
    <>
      <Topbar title="Notifications" />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-lg border border-border bg-card/40 p-1 text-xs">
            {(["All", "Mentions", "Task Updates", "Project Updates", "System"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 ${filter === f ? "gradient-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
          <Button variant="outline">Mark all as read</Button>
        </div>
        <div className="space-y-6">
          {groups.map(g => {
            const list = items.filter(i => i.group === g);
            if (!list.length) return null;
            return (
              <div key={g}>
                <h3 className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{g}</h3>
                <div className="glass rounded-2xl overflow-hidden">
                  {list.map(n => (
                    <div key={n.id} className="flex items-start gap-3 border-b border-border/40 p-4 last:border-0">
                      {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse-ring" />}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.time} · {n.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}