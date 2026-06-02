import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Bot, BarChart3, ShieldCheck, Sparkles, Users, Workflow,
  Check, Zap, Star,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "@/components/landing/dashboard-mockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaFlow — Ship faster. Stay aligned." },
      { name: "description", content: "AI-powered project & team management for ambitious teams." },
      { property: "og:title", content: "NexaFlow — Ship faster. Stay aligned." },
      { property: "og:description", content: "AI-powered project & team management for ambitious teams." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Workflow, title: "Task Management", text: "Kanban, list, calendar and timeline. Drag, drop, ship — your workflow stays in flow." },
  { icon: Users, title: "Team Collaboration", text: "Threaded comments, @mentions, presence and real-time updates across every surface." },
  { icon: Bot, title: "AI-Powered Insights", text: "Summarize standups, draft plans and prioritize work with an assistant trained on your context." },
  { icon: Zap, title: "Real-time Updates", text: "Sub-100ms sync. Everyone sees the same truth, the moment it changes." },
  { icon: BarChart3, title: "Advanced Analytics", text: "Velocity, workload, overdue trends and executive-ready exports." },
  { icon: ShieldCheck, title: "Secure & Scalable", text: "SOC2-aligned, role-based access, audit logs and enterprise SSO." },
];

const plans = [
  { name: "Free", price: "$0", cadence: "forever", features: ["Up to 5 members", "3 projects", "Kanban + List views", "Community support"], cta: "Start free", featured: false },
  { name: "Pro", price: "$19", cadence: "per user / month", features: ["Unlimited projects", "Timeline + Calendar", "AI assistant (500 msg/mo)", "Advanced analytics", "Priority support"], cta: "Start 14-day trial", featured: true },
  { name: "Enterprise", price: "Custom", cadence: "talk to sales", features: ["SSO + SCIM", "Audit logs + DLP", "Unlimited AI", "Dedicated CSM", "99.99% SLA"], cta: "Contact sales", featured: false },
];

const testimonials = [
  { quote: "We replaced four tools with NexaFlow and shipped our biggest release ever in half the time.", name: "Helena Park", role: "VP Engineering", company: "Linear-ish" },
  { quote: "The AI assistant feels like a senior PM that never sleeps. Our standups are 8 minutes flat.", name: "Diego Ferraz", role: "Head of Product", company: "Orbit" },
  { quote: "Finally a tool the design team and engineering both actually open every morning.", name: "Yui Tanaka", role: "Design Director", company: "Atlas" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition">Customers</a>
            <Link to="/dashboard" className="hover:text-foreground transition">Live demo</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">Log in</Link>
            <Link to="/register">
              <Button className="gradient-primary text-white shadow-glow hover:opacity-95">Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet" /> New — AI Assistant powered by Claude
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            Ship faster.{" "}
            <span className="gradient-text">Stay aligned.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            NexaFlow is the AI-native project platform that replaces your tabs. Plan,
            execute, and report — without the meeting marathon.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-white shadow-glow hover:opacity-95">
                Start free <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-border/60 bg-card/40 backdrop-blur">
                Watch demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="mx-auto mt-16 max-w-6xl"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet">Everything you need</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">One platform, end-to-end.</h2>
            <p className="mt-4 text-muted-foreground">Replace the patchwork. NexaFlow is opinionated where it matters and flexible everywhere else.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass rounded-2xl p-6 hover:border-primary/40 transition"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet">Pricing</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Simple, scales with you.</h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 ${p.featured ? "glass-strong shadow-glow ring-1 ring-primary/40" : "glass"}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-3 py-1 text-xs font-medium text-white shadow-glow">Most popular</span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/ {p.cadence}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 text-success" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8 block">
                  <Button className={`w-full ${p.featured ? "gradient-primary text-white shadow-glow" : ""}`} variant={p.featured ? "default" : "outline"}>
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet">Loved by builders</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Teams shipping with NexaFlow.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6">
                <div className="flex gap-1 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-primary" />
                  <div className="text-sm">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center shadow-glow">
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <div className="absolute inset-0 gradient-glow" />
            <div className="relative">
              <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Your next release starts here.</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/85">Join thousands of teams already shipping faster with NexaFlow.</p>
              <Link to="/register" className="mt-8 inline-block">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get started free <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <Logo />
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/login" className="hover:text-foreground">Log in</Link>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 NexaFlow, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
