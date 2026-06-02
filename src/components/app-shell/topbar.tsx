import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/app-shell/command-palette";

export function Topbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <h1 className="font-display text-lg font-semibold tracking-tight">{title}</h1>
      <button
        onClick={() => setOpen(true)}
        className="ml-auto hidden h-9 items-center gap-2 rounded-lg border border-border bg-card/50 px-3 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground md:flex md:w-[320px]"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search projects, tasks, people…</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
      </button>
      <button onClick={() => setOpen(true)} className="ml-auto md:hidden">
        <Search className="h-5 w-5 text-muted-foreground" />
      </button>
      <Link to="/notifications" className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/50 hover:border-primary/50">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full gradient-primary text-[10px] font-semibold text-white animate-pulse-ring">3</span>
      </Link>
      <Button size="sm" className="hidden md:inline-flex gradient-primary text-white shadow-glow">
        <Plus className="mr-1 h-4 w-4" /> New
      </Button>
      <div className="h-9 w-9 rounded-full gradient-primary" />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </header>
  );
}