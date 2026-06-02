import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Users, BarChart3,
  Bot, Bell, Settings, ChevronsLeft, ChevronsRight, LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useState } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/team", label: "Team", icon: Users },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "hidden md:flex sticky top-0 h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300",
        collapsed ? "w-[72px]" : "w-[248px]",
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
        <Logo withText={!collapsed} />
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        {!collapsed && <div className="mb-2 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">Workspace</div>}
        <ul className="space-y-1">
          {items.map((it) => {
            const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    active
                      ? "gradient-primary text-white shadow-glow"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <it.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{it.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mb-2 flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
        <div className={cn("flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2", collapsed && "justify-center")}>
          <div className="h-8 w-8 shrink-0 rounded-full gradient-primary" />
          {!collapsed && (
            <div className="flex-1 overflow-hidden text-sm">
              <div className="truncate font-medium">Ava Okonkwo</div>
              <div className="truncate text-xs text-muted-foreground">Admin</div>
            </div>
          )}
          {!collapsed && (
            <Link to="/" className="text-muted-foreground hover:text-foreground" title="Sign out">
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

export function MobileTabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const mobItems = items.slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-5">
        {mobItems.map((it) => {
          const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
          return (
            <li key={it.to}>
              <Link to={it.to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[10px]",
                active ? "text-primary" : "text-muted-foreground")}>
                <it.icon className="h-5 w-5" />
                <span>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}