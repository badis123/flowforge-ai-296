import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { projects, members, tasks } from "@/lib/mock-data";
import { useRouter } from "@tanstack/react-router";
import { FolderKanban, User, CheckSquare } from "lucide-react";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const go = (path: string) => {
    onOpenChange(false);
    router.navigate({ to: path });
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search projects, tasks, members…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem key={p.id} onSelect={() => go("/projects")}>
              <FolderKanban className="mr-2 h-4 w-4 text-violet" />{p.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Tasks">
          {tasks.slice(0, 6).map((t) => (
            <CommandItem key={t.id} onSelect={() => go("/tasks")}>
              <CheckSquare className="mr-2 h-4 w-4 text-indigo" />{t.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Members">
          {members.map((m) => (
            <CommandItem key={m.id} onSelect={() => go("/team")}>
              <User className="mr-2 h-4 w-4 text-success" />{m.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}