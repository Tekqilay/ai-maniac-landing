import Link from "next/link";
import Image from "next/image";
import {
  Mic,
  FileText,
  Inbox,
  Check,
  ArrowRight,
  Zap,
  Clock,
  TrendingDown,
  Users,
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/fade-in";
import { StepCard } from "@/components/step-card";
import { HeroAnimation } from "@/components/hero-animation";
import { DemoSection } from "@/components/demo-section";
import { AnimatedCounter } from "@/components/counter";
import { HeroHeadline } from "@/components/word-reveal";
import { TiltCard } from "@/components/tilt-card";
import { ConnectingLine } from "@/components/connecting-line";
import { GlowCard } from "@/components/glow-card";
import { ShimmerLink } from "@/components/shimmer-link";

const CALENDLY_URL = "https://calendly.com/tekinay1807/discovery-call-15-min";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <span className="text-lg font-bold tracking-tight">
          The <span className="text-blue-500">AI</span> Maniac
        </span>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Book a free call <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <HeroAnimation />
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Documentation
          </div>
        </FadeIn>

        <HeroHeadline />

        <FadeIn delay={0.35}>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop wasting 20–40 minutes after every call writing summaries and
            follow-ups. Record your call — your documents are ready within
            minutes, formatted exactly the way you need them.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ShimmerLink
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/40 cursor-pointer"
            >
              Book your free 15-min call <ArrowRight className="w-5 h-5" />
            </ShimmerLink>
            <span className="text-slate-500 text-sm">No commitment. No pitch deck.</span>
          </div>
        </FadeIn>
        </div>
      </section>

      {/* ── Demo ── */}
      <DemoSection />

      {/* ── About ── */}
      <section className="py-20 px-6 border-t border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-8">
              Who&apos;s Behind This
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="flex-shrink-0">
                <Image
                  src="/tekin.jpg"
                  alt="Tekinay — The AI Maniac"
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover w-40 h-40 sm:w-44 sm:h-44"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-3">
                  Built by someone who uses this every day.
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  I&apos;m Tekinay — I build AI automation systems for coaches,
                  consultants, sales teams, real estate agents, recruiters, and
                  anyone whose business runs on client calls. I started The AI
                  Maniac because I kept seeing the same problem: capable people
                  wasting hours every week on documentation that a well-built
                  system could handle automatically.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Every system I build is custom. There&apos;s no template you
                  fill in yourself, no generic tool to figure out. I build it for
                  you, test it with your actual workflow, and hand it over working.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              The Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6 max-w-2xl mx-auto leading-tight">
              Every week, your team loses{" "}
              <span className="text-blue-400">
                <AnimatedCounter target={8} suffix=" hours" />
              </span>{" "}
              to documentation nobody wants to write.
            </h2>
            <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
              After every sales call, onboarding session, or client meeting —
              someone has to sit down and write it all up. Manually. Every single
              time. That&apos;s not just annoying. It&apos;s a real business problem.
            </p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Clock className="w-5 h-5 text-red-400" />,
                title: "20–40 minutes wasted per call",
                desc: "Your team spends nearly half an hour after every call typing up notes, summaries, and follow-up documents from memory. That&apos;s hours per week — gone.",
              },
              {
                icon: <TrendingDown className="w-5 h-5 text-orange-400" />,
                title: "Details get lost",
                desc: "The longer you wait to write it up, the more gets forgotten. Key client details, agreed next steps, specific pain points — they slip through the cracks and cost you deals.",
              },
              {
                icon: <Users className="w-5 h-5 text-yellow-400" />,
                title: "You're paying people to do admin",
                desc: "If you have employees doing this manually, you&apos;re literally paying professional salaries for copy-pasting and reformatting. It&apos;s expensive, soul-crushing work that nobody should be doing in 2026.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <TiltCard className="h-full">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors duration-200 cursor-default h-full">
                    <div className="bg-slate-800 rounded-xl p-2.5 w-fit mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3">
                      {item.title}
                    </h3>
                    <p
                      className="text-slate-400 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto">
              <p className="text-slate-300 text-lg leading-relaxed text-center">
                The real cost isn&apos;t just the time. It&apos;s the{" "}
                <span className="text-white font-semibold">inconsistency</span> —
                every document looks slightly different, every summary has a
                different format. Clients notice. It makes you look less
                professional than you actually are.{" "}
                <span className="text-white font-semibold">
                  And none of it had to happen.
                </span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-24 px-6 border-t border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Three steps. Zero manual work.
            </h2>
            <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
              We build the system once, customized to your exact workflow. After
              that, you just record and everything happens automatically.
            </p>
          </FadeIn>

          <div className="relative">
            <ConnectingLine />
            <StaggerChildren className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-6 h-6 text-blue-400" />,
                step: "01",
                title: "Record your call",
                desc: "Open the desktop app, click record. Works with any call type — sales calls, onboarding sessions, client meetings, strategy calls. One click to start, one click to stop.",
              },
              {
                icon: <FileText className="w-6 h-6 text-blue-400" />,
                step: "02",
                title: "Auto-transcription & AI processing",
                desc: "Your audio is transcribed automatically with high accuracy and runs through your custom AI workflow. No uploads, no copy-pasting, no manual triggers.",
              },
              {
                icon: <Inbox className="w-6 h-6 text-blue-400" />,
                step: "03",
                title: "Documents arrive",
                desc: "Your custom documents land in your inbox or Drive within minutes — formatted exactly how you need them, with your terminology, your structure, ready to send or file.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <StepCard
                  step={item.step}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              </StaggerItem>
            ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              What&apos;s Included
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Everything set up. Nothing to figure out.
            </h2>
            <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
              We don&apos;t hand you a tool and wish you luck. We build your system
              end-to-end, test it with your actual calls, and make sure it runs
              perfectly before you ever use it.
            </p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-2 gap-8">
            <StaggerItem>
              <TiltCard className="h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                  One-time Setup
                </p>
                <h3 className="text-white text-xl font-bold mb-6">
                  We build it. You use it.
                </h3>
                <ul className="space-y-4">
                  {[
                    "Onboarding call to map your exact call types and document needs",
                    "Custom document templates built to your format and style",
                    "Full system setup — recording, transcription, AI workflows",
                    "Live testing with your real calls before handover",
                    "Training session so you're confident from day one",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard className="h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Monthly Retainer
                </p>
                <h3 className="text-white text-xl font-bold mb-6">
                  Runs. Every month. Without you touching it.
                </h3>
                <ul className="space-y-4">
                  {[
                    "System monitoring and maintenance — we catch issues before you notice them",
                    "Template adjustments as your workflow evolves",
                    "Direct support channel — fast responses, no ticket queues",
                    "Regular check-ins to make sure the system still fits your needs",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </TiltCard>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-24 px-6 border-t border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-12">
              Real Results
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/paul-arens.jpg"
                    alt="Paul Arens, SA Marketing GmbH"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-20 h-20"
                  />
                </div>
                <div>
                  <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-6">
                    &ldquo;I just record the call and the documents are there. I
                    don&apos;t think about it anymore.&rdquo;
                  </p>
                  <div className="mb-6">
                    <p className="text-white font-semibold">Paul Arens</p>
                    <p className="text-slate-500 text-sm">SA Marketing GmbH</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Paul runs a recruitment and sales consultancy. Before, his
                    team was manually writing up summaries after every sales call
                    and onboarding session. Now the system generates 3 different
                    document types automatically per call. Setup took one week.
                    It&apos;s been running for months without a single manual intervention.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerChildren className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "3", label: "Document types automated" },
              { value: "1 week", label: "Setup time" },
              { value: "0", label: "Manual work per call" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 cursor-default">
                  <p className="text-blue-400 text-2xl font-bold">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              One-time setup. Low monthly retainer.
            </h2>
            <p className="text-center text-slate-400 mb-8 max-w-xl mx-auto">
              We build your system once. You use it forever. No per-seat fees, no
              usage limits.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                "Fully custom — built for your exact workflow",
                "No generic templates",
                "No other provider does this at this price",
              ].map((badge) => (
                <span
                  key={badge}
                  className="bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-medium px-4 py-2 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                desc: "1–2 document types",
                setup: "€800",
                monthly: "€200",
                features: [
                  "Up to 2 custom document templates",
                  "Full system setup & testing",
                  "Onboarding call",
                  "Monthly maintenance & support",
                ],
                highlight: false,
              },
              {
                name: "Standard",
                desc: "3–4 document types",
                setup: "€1,200",
                monthly: "€250",
                features: [
                  "Up to 4 custom document templates",
                  "Full system setup & testing",
                  "Onboarding call",
                  "Monthly maintenance & support",
                  "Template adjustments included",
                ],
                highlight: true,
              },
              {
                name: "Custom",
                desc: "Complex workflows",
                setup: "from €1,500",
                monthly: "from €300",
                features: [
                  "Unlimited document types",
                  "Multi-workflow & multi-call-type setup",
                  "Full system setup & testing",
                  "Onboarding call",
                  "Priority support",
                ],
                highlight: false,
              },
            ].map((plan) => (
              <StaggerItem key={plan.name}>
                <GlowCard
                  glow={plan.highlight}
                  className={`relative rounded-2xl p-7 flex flex-col cursor-default transition-colors duration-200 h-full ${
                    plan.highlight
                      ? "bg-blue-600 border border-blue-500 shadow-xl shadow-blue-900/40"
                      : "bg-slate-900 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-1 text-white">{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                    {plan.desc}
                  </p>
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold text-white">{plan.setup}</span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                      setup
                    </span>
                  </div>
                  <div className="mb-8">
                    <span className={`text-lg font-semibold ${plan.highlight ? "text-blue-100" : "text-slate-300"}`}>
                      {plan.monthly}
                    </span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                      / month
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`} />
                        <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-slate-400"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors duration-200 cursor-pointer block ${
                      plan.highlight
                        ? "bg-white text-blue-700 hover:bg-blue-50"
                        : "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    Book a free call
                  </Link>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 border-t border-slate-800/60 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to stop writing docs manually?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Book a free 15-minute call. We&apos;ll look at your workflow and
              tell you exactly what we&apos;d build for you — no commitment, no
              pitch deck.
            </p>
            <ShimmerLink
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-semibold px-10 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/40 cursor-pointer"
            >
              Book your free call <ArrowRight className="w-5 h-5" />
            </ShimmerLink>
            <p className="text-slate-600 text-sm mt-4">No commitment. No pitch deck.</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm font-semibold">
            The <span className="text-blue-500">AI</span> Maniac
          </span>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} The AI Maniac. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
