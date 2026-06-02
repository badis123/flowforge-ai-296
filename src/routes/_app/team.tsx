import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { members } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/team")({ component: TeamPage });

function TeamPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Topbar title="Team" />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{members.length} members · 1 pending invite</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white shadow-glow"><UserPlus className="mr-1 h-4 w-4" />Invite member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Invite to workspace</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="teammate@company.com" />
                <Input placeholder="Optional personal message" />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button className="gradient-primary text-white shadow-glow" onClick={() => { toast.success("Invite sent"); setOpen(false); }}>Send invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(m => (
            <div key={m.id} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-white font-semibold">{m.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{m.name}</div>
                <div className="text-xs text-muted-foreground truncate inline-flex items-center gap-1"><Mail className="h-3 w-3" />{m.email}</div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary">{m.role}</span>
                  <span className="text-muted-foreground">{m.projects} projects</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}