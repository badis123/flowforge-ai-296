export type Status = "Backlog" | "To Do" | "In Progress" | "Review" | "Done";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Member" | "Viewer";
  avatar: string;
  joined: string;
  projects: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assigneeId: string;
  projectId: string;
  due: string;
  labels: string[];
  comments: number;
  subtasks: { id: string; title: string; done: boolean }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "Active" | "Paused" | "Completed";
  progress: number;
  deadline: string;
  memberIds: string[];
  tags: string[];
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export const members: Member[] = [
  { id: "u1", name: "Ava Okonkwo", email: "ava@nexaflow.app", role: "Admin", avatar: avatar("Ava"), joined: "2024-02-11", projects: 6 },
  { id: "u2", name: "Mateo Rivera", email: "mateo@nexaflow.app", role: "Manager", avatar: avatar("Mateo"), joined: "2024-03-02", projects: 4 },
  { id: "u3", name: "Lin Wei", email: "lin@nexaflow.app", role: "Member", avatar: avatar("Lin"), joined: "2024-05-20", projects: 3 },
  { id: "u4", name: "Priya Sharma", email: "priya@nexaflow.app", role: "Member", avatar: avatar("Priya"), joined: "2024-07-14", projects: 5 },
  { id: "u5", name: "Noah Becker", email: "noah@nexaflow.app", role: "Viewer", avatar: avatar("Noah"), joined: "2024-09-01", projects: 2 },
  { id: "u6", name: "Zara Idris", email: "zara@nexaflow.app", role: "Member", avatar: avatar("Zara"), joined: "2025-01-08", projects: 3 },
];

export const projects: Project[] = [
  { id: "p1", name: "Orbit Mobile App", description: "Cross-platform mobile launch for Q3 — onboarding, billing and analytics.", color: "#8B5CF6", status: "Active", progress: 68, deadline: "2026-07-12", memberIds: ["u1", "u2", "u3", "u4"], tags: ["mobile", "launch"] },
  { id: "p2", name: "Atlas Design System", description: "Unified component library + tokens across all product surfaces.", color: "#6366F1", status: "Active", progress: 42, deadline: "2026-08-30", memberIds: ["u1", "u3", "u6"], tags: ["design", "internal"] },
  { id: "p3", name: "Pulse Marketing Site", description: "Refreshed marketing site with new positioning and pricing.", color: "#22D3EE", status: "Active", progress: 88, deadline: "2026-06-18", memberIds: ["u2", "u4"], tags: ["marketing"] },
  { id: "p4", name: "Compass Onboarding", description: "Reduce activation time with an opinionated 3-step setup.", color: "#F59E0B", status: "Paused", progress: 24, deadline: "2026-09-15", memberIds: ["u2", "u5"], tags: ["growth"] },
  { id: "p5", name: "Nimbus API v2", description: "Public API rewrite with versioning, rate limits, and SDKs.", color: "#10B981", status: "Active", progress: 55, deadline: "2026-10-05", memberIds: ["u1", "u3", "u4", "u6"], tags: ["platform", "api"] },
  { id: "p6", name: "Helios Reporting", description: "Real-time analytics warehouse + dashboard exports.", color: "#EC4899", status: "Completed", progress: 100, deadline: "2026-05-01", memberIds: ["u2", "u4", "u6"], tags: ["data"] },
];

const t = (
  id: string, title: string, status: Status, priority: Priority,
  assigneeId: string, projectId: string, due: string, labels: string[], comments = 0,
): Task => ({
  id, title, status, priority, assigneeId, projectId, due, labels, comments,
  description: "Coordinate the work, capture acceptance criteria and unblock the team.",
  subtasks: [
    { id: id + "-s1", title: "Draft spec", done: true },
    { id: id + "-s2", title: "Review with team", done: status !== "Backlog" && status !== "To Do" },
    { id: id + "-s3", title: "Ship to staging", done: status === "Done" },
  ],
});

export const tasks: Task[] = [
  t("t1", "Define onboarding KPIs", "Backlog", "Medium", "u2", "p4", "2026-06-22", ["growth"]),
  t("t2", "Spec billing edge cases", "Backlog", "High", "u1", "p1", "2026-06-18", ["billing", "mobile"], 2),
  t("t3", "Token audit across surfaces", "To Do", "Medium", "u3", "p2", "2026-06-12", ["design"], 4),
  t("t4", "Pricing page hero copy", "To Do", "High", "u4", "p3", "2026-06-09", ["marketing", "copy"], 1),
  t("t5", "Rate-limit middleware", "In Progress", "Critical", "u6", "p5", "2026-06-08", ["api"], 3),
  t("t6", "Mobile push notifications", "In Progress", "High", "u1", "p1", "2026-06-14", ["mobile"], 5),
  t("t7", "Component a11y sweep", "In Progress", "Medium", "u3", "p2", "2026-06-19", ["design", "a11y"], 2),
  t("t8", "SDK code samples", "Review", "Medium", "u4", "p5", "2026-06-10", ["docs", "api"], 6),
  t("t9", "Testimonial section refactor", "Review", "Low", "u2", "p3", "2026-06-07", ["marketing"]),
  t("t10", "Realtime export pipeline", "Done", "High", "u6", "p6", "2026-05-30", ["data"], 8),
  t("t11", "Dashboard CSV exports", "Done", "Medium", "u4", "p6", "2026-05-28", ["data"], 3),
  t("t12", "Empty states polish", "Done", "Low", "u3", "p2", "2026-05-25", ["design"], 1),
];

export const activity = [
  { id: "a1", who: "u4", verb: "completed", what: "Pricing page hero copy", when: "2m ago" },
  { id: "a2", who: "u6", verb: "commented on", what: "Rate-limit middleware", when: "11m ago" },
  { id: "a3", who: "u1", verb: "created", what: "Mobile push notifications", when: "38m ago" },
  { id: "a4", who: "u3", verb: "moved", what: "Component a11y sweep → In Progress", when: "1h ago" },
  { id: "a5", who: "u2", verb: "invited", what: "noah@nexaflow.app", when: "3h ago" },
  { id: "a6", who: "u4", verb: "uploaded", what: "brand-guidelines-v4.pdf", when: "5h ago" },
];

export const notifications = [
  { id: "n1", title: "Ava mentioned you in Atlas Design System", time: "5m ago", group: "Today", unread: true, type: "Mentions" },
  { id: "n2", title: "Task 'Rate-limit middleware' is due tomorrow", time: "1h ago", group: "Today", unread: true, type: "Task Updates" },
  { id: "n3", title: "Project 'Pulse Marketing Site' moved to Review", time: "3h ago", group: "Today", unread: true, type: "Project Updates" },
  { id: "n4", title: "Mateo invited noah@nexaflow.app", time: "Yesterday", group: "Yesterday", unread: false, type: "System" },
  { id: "n5", title: "Weekly digest is ready", time: "Mon", group: "Earlier", unread: false, type: "System" },
];

export const memberById = (id: string) => members.find(m => m.id === id)!;
export const projectById = (id: string) => projects.find(p => p.id === id)!;

export const completionSeries = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  completed: Math.round(8 + Math.sin(i / 3) * 4 + Math.random() * 6),
  created: Math.round(10 + Math.cos(i / 4) * 3 + Math.random() * 5),
}));

export const statusDistribution = [
  { name: "Active", value: projects.filter(p => p.status === "Active").length },
  { name: "Paused", value: projects.filter(p => p.status === "Paused").length },
  { name: "Completed", value: projects.filter(p => p.status === "Completed").length },
];

export const workload = members.map(m => ({
  name: m.name.split(" ")[0],
  assigned: tasks.filter(t => t.assigneeId === m.id).length,
  completed: tasks.filter(t => t.assigneeId === m.id && t.status === "Done").length,
}));

export const velocity = Array.from({ length: 8 }, (_, i) => ({
  week: `W${i + 1}`,
  points: Math.round(20 + Math.sin(i) * 8 + Math.random() * 6),
}));

export const PRIORITY_COLOR: Record<Priority, string> = {
  Low: "oklch(0.70 0.05 250)",
  Medium: "oklch(0.75 0.15 200)",
  High: "oklch(0.75 0.17 75)",
  Critical: "oklch(0.65 0.24 25)",
};

export const STATUS_ORDER: Status[] = ["Backlog", "To Do", "In Progress", "Review", "Done"];