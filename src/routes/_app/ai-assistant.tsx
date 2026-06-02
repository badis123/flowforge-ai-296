import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { Button } from "@/components/ui/button";
import { Bot, Send, Paperclip, Mic, Sparkles, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/ai-assistant")({ component: AI });

const suggested = [
  "Summarize my overdue tasks",
  "Generate a project plan for a mobile launch",
  "Draft a status update for this sprint",
  "What should I prioritize today?",
];

function AI() {
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "ai", text: `Here's a plan based on "${text}":\n\n1. Audit current backlog\n2. Identify top 3 risks\n3. Re-sequence by impact\n\nWant me to add these as tasks?` }]);
    }, 1100);
  };

  return (
    <>
      <Topbar title="AI Assistant" />
      <div className="flex h-[calc(100vh-4rem-4rem)] md:h-[calc(100vh-4rem)]">
        <aside className="hidden w-64 shrink-0 border-r border-border/60 p-4 md:block">
          <Button className="w-full gradient-primary text-white shadow-glow"><Plus className="mr-1 h-4 w-4" />New chat</Button>
          <div className="mt-4 space-y-1 text-sm">
            {["Sprint plan draft", "Standup summary", "Onboarding KPIs"].map(c => (
              <button key={c} className="block w-full truncate rounded-lg px-3 py-2 text-left text-muted-foreground hover:bg-card/50">{c}</button>
            ))}
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {msgs.length === 0 ? (
              <div className="mx-auto max-w-2xl text-center pt-16">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-primary shadow-glow grid place-items-center"><Sparkles className="h-7 w-7 text-white" /></div>
                <h2 className="font-display text-3xl font-semibold tracking-tight">How can I help you today?</h2>
                <p className="mt-2 text-sm text-muted-foreground">Powered by Claude AI</p>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {suggested.map(s => (
                    <button key={s} onClick={() => send(s)} className="glass rounded-xl p-4 text-left text-sm hover:border-primary/40">{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-4">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                    {m.role === "ai" && <div className="h-8 w-8 shrink-0 rounded-full gradient-primary grid place-items-center"><Bot className="h-4 w-4 text-white" /></div>}
                    <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "gradient-primary text-white shadow-glow" : "glass"}`}>{m.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full gradient-primary grid place-items-center"><Bot className="h-4 w-4 text-white" /></div>
                    <div className="glass rounded-2xl px-4 py-3"><div className="flex gap-1">{[0, 1, 2].map(i => <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${i * 0.15}s` }} />)}</div></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="border-t border-border/60 p-4">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl glass p-2">
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground"><Paperclip className="h-4 w-4" /></button>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground" />
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground"><Mic className="h-4 w-4" /></button>
              <Button type="submit" size="sm" className="gradient-primary text-white"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}