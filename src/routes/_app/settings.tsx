import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Github, Slack, HardDrive, Workflow, Zap, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({ component: Page });

const tabs = ["Profile", "Security", "Notifications", "Workspace", "Billing", "Integrations", "API Keys"] as const;
type Tab = typeof tabs[number];

function Page() {
  const [tab, setTab] = useState<Tab>("Profile");
  return (
    <>
      <Topbar title="Settings" />
      <div className="p-4 md:p-6 lg:p-8 grid gap-6 lg:grid-cols-[200px_1fr]">
        <aside>
          <nav className="space-y-1 text-sm">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`block w-full rounded-lg px-3 py-2 text-left ${tab === t ? "gradient-primary text-white shadow-glow" : "text-muted-foreground hover:bg-card/50"}`}>{t}</button>
            ))}
          </nav>
        </aside>
        <div className="glass rounded-2xl p-6">
          {tab === "Profile" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-display text-xl font-semibold">Profile</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full gradient-primary shadow-glow" />
                <Button variant="outline">Upload avatar</Button>
              </div>
              <div><Label>Name</Label><Input defaultValue="Ava Okonkwo" /></div>
              <div><Label>Email</Label><Input defaultValue="ava@nexaflow.app" /></div>
              <div><Label>Bio</Label><Input defaultValue="Building things at Acme Studio." /></div>
              <Button className="gradient-primary text-white shadow-glow" onClick={() => toast.success("Saved")}>Save changes</Button>
            </div>
          )}
          {tab === "Security" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-display text-xl font-semibold">Security</h2>
              <div><Label>Current password</Label><Input type="password" /></div>
              <div><Label>New password</Label><Input type="password" /></div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div><div className="font-medium">Two-factor auth</div><div className="text-xs text-muted-foreground">Extra security for sign-in</div></div>
                <Switch />
              </div>
              <h3 className="mt-6 font-medium">Active sessions</h3>
              {["MacBook Pro · Berlin", "iPhone 16 · Berlin"].map(s => (
                <div key={s} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm">
                  {s}<Button size="sm" variant="outline">Revoke</Button>
                </div>
              ))}
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-3 max-w-lg">
              <h2 className="font-display text-xl font-semibold">Notifications</h2>
              {["Email", "In-app", "Push"].map(n => (
                <div key={n} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <span>{n}</span><Switch defaultChecked={n !== "Push"} />
                </div>
              ))}
            </div>
          )}
          {tab === "Workspace" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-display text-xl font-semibold">Workspace</h2>
              <div><Label>Name</Label><Input defaultValue="Acme Studio" /></div>
              <div><Label>Slug</Label><Input defaultValue="acme" /></div>
              <div className="rounded-xl border border-destructive/40 p-4">
                <div className="font-medium text-destructive">Danger zone</div>
                <p className="mt-1 text-xs text-muted-foreground">Permanently delete this workspace and all data.</p>
                <Button variant="destructive" size="sm" className="mt-3"><Trash2 className="mr-1 h-4 w-4" />Delete workspace</Button>
              </div>
            </div>
          )}
          {tab === "Billing" && (
            <div className="space-y-4 max-w-2xl">
              <h2 className="font-display text-xl font-semibold">Billing</h2>
              <div className="rounded-2xl glass-strong p-5 shadow-glow">
                <div className="flex items-center justify-between">
                  <div><div className="text-sm text-muted-foreground">Current plan</div><div className="font-display text-2xl">Pro</div></div>
                  <Button className="gradient-primary text-white shadow-glow">Upgrade</Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="text-xs"><div className="mb-1 flex justify-between"><span>Seats</span><span>8 / 25</span></div><div className="h-1.5 rounded-full bg-muted"><div className="h-full w-1/3 rounded-full gradient-primary" /></div></div>
                  <div className="text-xs"><div className="mb-1 flex justify-between"><span>AI messages</span><span>240 / 500</span></div><div className="h-1.5 rounded-full bg-muted"><div className="h-full w-1/2 rounded-full gradient-primary" /></div></div>
                </div>
              </div>
              <h3 className="mt-6 font-medium">Invoice history</h3>
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground"><tr><th className="text-left p-2">Date</th><th className="text-left p-2">Amount</th><th className="text-left p-2">Status</th></tr></thead>
                <tbody>{["May 2026", "Apr 2026", "Mar 2026"].map(d => (
                  <tr key={d} className="border-t border-border/40"><td className="p-2">{d}</td><td className="p-2">$152.00</td><td className="p-2 text-success">Paid</td></tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {tab === "Integrations" && (
            <div>
              <h2 className="mb-4 font-display text-xl font-semibold">Integrations</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { n: "GitHub", icon: Github, on: true }, { n: "Slack", icon: Slack, on: true },
                  { n: "Google Drive", icon: HardDrive, on: false }, { n: "Jira", icon: Workflow, on: false },
                  { n: "Zapier", icon: Zap, on: false },
                ].map(i => (
                  <div key={i.n} className="glass rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3"><i.icon className="h-5 w-5" /><span className="font-medium">{i.n}</span></div>
                      <span className={`text-xs ${i.on ? "text-success" : "text-muted-foreground"}`}>{i.on ? "Connected" : "Not connected"}</span>
                    </div>
                    <Button variant={i.on ? "outline" : "default"} size="sm" className={`mt-4 w-full ${!i.on ? "gradient-primary text-white shadow-glow" : ""}`}>{i.on ? "Disconnect" : "Connect"}</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "API Keys" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">API Keys</h2>
                <Button className="gradient-primary text-white shadow-glow">Generate key</Button>
              </div>
              <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-card/40 text-xs uppercase text-muted-foreground"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Key</th><th className="text-left p-3">Created</th><th className="p-3"></th></tr></thead>
                  <tbody>{[{ n: "Production", k: "nxf_live_••••••••e2a4" }, { n: "Staging", k: "nxf_test_••••••••44b1" }].map(r => (
                    <tr key={r.n} className="border-t border-border/40">
                      <td className="p-3 font-medium">{r.n}</td><td className="p-3 font-mono text-xs">{r.k}</td><td className="p-3 text-muted-foreground">2 weeks ago</td>
                      <td className="p-3 text-right"><button className="text-muted-foreground hover:text-foreground" onClick={() => toast.success("Copied")}><Copy className="h-4 w-4" /></button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}