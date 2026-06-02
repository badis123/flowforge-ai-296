import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/app-shell/topbar";
import { tasks as seedTasks, STATUS_ORDER, memberById, projectById, PRIORITY_COLOR, type Task, type Status } from "@/lib/mock-data";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar, LayoutGrid, List as ListIcon, CalendarDays, GanttChart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/tasks")({ component: TasksPage });

function TasksPage() {
  const [view, setView] = useState<"kanban" | "list" | "calendar" | "timeline">("kanban");
  const [items, setItems] = useState<Task[]>(seedTasks);
  const [selected, setSelected] = useState<Task | null>(null);

  const onDragEnd = (r: DropResult) => {
    if (!r.destination) return;
    setItems(prev => prev.map(t => t.id === r.draggableId ? { ...t, status: r.destination!.droppableId as Status } : t));
    toast.success("Task moved");
  };

  return (
    <>
      <Topbar title="Tasks" />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-lg border border-border bg-card/40 p-1 text-xs">
            {[
              { k: "kanban", label: "Kanban", icon: LayoutGrid },
              { k: "list", label: "List", icon: ListIcon },
              { k: "calendar", label: "Calendar", icon: CalendarDays },
              { k: "timeline", label: "Timeline", icon: GanttChart },
            ].map(v => (
              <button key={v.k} onClick={() => setView(v.k as any)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${view === v.k ? "gradient-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>
                <v.icon className="h-3.5 w-3.5" />{v.label}
              </button>
            ))}
          </div>
          <Button className="gradient-primary text-white shadow-glow"><Plus className="mr-1 h-4 w-4" />New Task</Button>
        </div>

        {view === "kanban" && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 overflow-x-auto">
              {STATUS_ORDER.map(col => {
                const colTasks = items.filter(t => t.status === col);
                return (
                  <Droppable droppableId={col} key={col}>
                    {(provided, snap) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}
                        className={`glass rounded-2xl p-3 min-w-[260px] ${snap.isDraggingOver ? "ring-1 ring-primary/60" : ""}`}>
                        <div className="mb-3 flex items-center justify-between px-1">
                          <h3 className="text-sm font-semibold">{col}</h3>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{colTasks.length}</span>
                        </div>
                        <div className="space-y-2">
                          {colTasks.map((t, idx) => (
                            <Draggable draggableId={t.id} index={idx} key={t.id}>
                              {(p2, s2) => (
                                <div ref={p2.innerRef} {...p2.draggableProps} {...p2.dragHandleProps}
                                  onClick={() => setSelected(t)}
                                  className={`cursor-grab rounded-xl border border-border/60 bg-card/60 p-3 text-sm shadow-sm transition ${s2.isDragging ? "rotate-2 shadow-glow" : "hover:border-primary/40"}`}>
                                  <div className="mb-2 flex items-center justify-between text-[10px]">
                                    <span className="rounded-full px-2 py-0.5 font-medium text-white" style={{ background: PRIORITY_COLOR[t.priority] }}>{t.priority}</span>
                                    <span className="text-muted-foreground inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{t.due.slice(5)}</span>
                                  </div>
                                  <div className="font-medium leading-snug">{t.title}</div>
                                  <div className="mt-2 text-[10px] text-muted-foreground">{projectById(t.projectId).name}</div>
                                  <div className="mt-3 flex items-center justify-between">
                                    <div className="grid h-6 w-6 place-items-center rounded-full gradient-primary text-[9px] font-semibold text-white">{memberById(t.assigneeId).name[0]}</div>
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MessageSquare className="h-3 w-3" />{t.comments}</span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          <button className="w-full rounded-lg border border-dashed border-border/60 py-2 text-xs text-muted-foreground hover:bg-card/40">+ Add task</button>
                        </div>
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </DragDropContext>
        )}

        {view === "list" && (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-xs uppercase text-muted-foreground">
                <tr><th className="p-3 text-left">Title</th><th className="p-3 text-left">Assignee</th><th className="p-3 text-left">Priority</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Due</th><th className="p-3 text-left">Project</th></tr>
              </thead>
              <tbody>
                {items.map(t => (
                  <tr key={t.id} onClick={() => setSelected(t)} className="border-t border-border/50 hover:bg-card/40 cursor-pointer">
                    <td className="p-3 font-medium">{t.title}</td>
                    <td className="p-3 text-muted-foreground">{memberById(t.assigneeId).name}</td>
                    <td className="p-3"><span className="rounded-full px-2 py-0.5 text-[10px] text-white" style={{ background: PRIORITY_COLOR[t.priority] }}>{t.priority}</span></td>
                    <td className="p-3 text-muted-foreground">{t.status}</td>
                    <td className="p-3 text-muted-foreground">{t.due}</td>
                    <td className="p-3 text-muted-foreground">{projectById(t.projectId).name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "calendar" && (
          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-7 gap-2 text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d} className="p-2 text-muted-foreground">{d}</div>)}
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const onDay = items.filter(t => parseInt(t.due.slice(-2), 10) === day);
                return (
                  <div key={i} className="min-h-[100px] rounded-lg border border-border/40 bg-card/30 p-2">
                    <div className="mb-1 text-[11px] text-muted-foreground">{day}</div>
                    <div className="space-y-1">
                      {onDay.slice(0, 2).map(t => (
                        <div key={t.id} className="truncate rounded bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary">{t.title}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "timeline" && (
          <div className="glass rounded-2xl p-6 overflow-x-auto">
            <div className="min-w-[700px] space-y-3">
              {items.slice(0, 10).map(t => {
                const start = parseInt(t.due.slice(-2), 10);
                return (
                  <div key={t.id} className="grid grid-cols-12 items-center gap-3 text-xs">
                    <span className="col-span-3 truncate">{t.title}</span>
                    <div className="col-span-9 relative h-6 rounded-md bg-muted/40">
                      <div className="absolute top-0 h-6 rounded-md gradient-primary shadow-glow" style={{ left: `${(start * 2) % 60}%`, width: "20%" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <TaskDrawer task={selected} onOpenChange={(v) => !v && setSelected(null)} />
    </>
  );
}

function TaskDrawer({ task, onOpenChange }: { task: Task | null; onOpenChange: (v: boolean) => void }) {
  return (
    <Sheet open={!!task} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        {task && (
          <>
            <SheetHeader>
              <SheetTitle className="font-display text-xl">{task.title}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><div className="text-xs text-muted-foreground">Status</div><div>{task.status}</div></div>
                <div><div className="text-xs text-muted-foreground">Priority</div><span className="inline-block rounded-full px-2 py-0.5 text-[10px] text-white" style={{ background: PRIORITY_COLOR[task.priority] }}>{task.priority}</span></div>
                <div><div className="text-xs text-muted-foreground">Assignee</div><div>{memberById(task.assigneeId).name}</div></div>
                <div><div className="text-xs text-muted-foreground">Due</div><div>{task.due}</div></div>
                <div className="col-span-2"><div className="text-xs text-muted-foreground">Project</div><div>{projectById(task.projectId).name}</div></div>
              </div>
              <div>
                <div className="mb-2 text-xs text-muted-foreground">Description</div>
                <p className="text-sm leading-relaxed">{task.description}</p>
              </div>
              <div>
                <div className="mb-2 text-xs text-muted-foreground">Subtasks</div>
                <ul className="space-y-2">
                  {task.subtasks.map(s => (
                    <li key={s.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked={s.done} className="accent-primary" />
                      <span className={s.done ? "line-through text-muted-foreground" : ""}>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs text-muted-foreground">Comments</div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-card/50 p-3 text-sm">
                    <div className="mb-1 text-xs text-muted-foreground">Mateo · 2h ago</div>
                    Pushed an updated spec — let's review tomorrow.
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Add a comment… use @ to mention" />
                  <Button className="gradient-primary text-white">Send</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}