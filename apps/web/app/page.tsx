import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05010d] text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_65%)] blur-[120px]" />
        <div className="absolute top-1/2 left-[12%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,44,0.3),transparent_60%)] blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.4),transparent_55%)] blur-[140px]" />
      </div>

      <section className="relative flex min-h-screen items-center justify-center px-6 py-24 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Copy column */}
          <div className="flex flex-col justify-center gap-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/70 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#FF6B2C] shadow-[0_0_16px_rgba(255,107,44,0.7)]" />
              Ai Flow Studio
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                Flexible AI workflow automation
                <span className="block text-[#FF6B2C] drop-shadow-[0_8px_35px_rgba(255,107,44,0.35)]">
                  for technical teams
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Build with the precision of code or the speed of drag-n-drop. Host on-prem or in-cloud. Integrate apps faster than with any other tool.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href="/signup"
                className="group overflow-hidden border-none bg-[linear-gradient(120deg,#7C3AED_0%,#FF6B2C_45%,#FACC15_100%)] text-white shadow-magic transition-transform hover:scale-[1.03] hover:shadow-[0_28px_90px_-40px_rgba(255,107,44,0.95)] focus-visible:ring-brand-400"
              >
                <span className="relative">Get started for free</span>
              </Button>

              <Button href="#" variant="outline">
                Talk to sales
              </Button>
            </div>

            <div className="grid gap-6 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 shadow-[0_15px_45px_-30px_rgba(124,58,237,0.85)] transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                <p className="font-semibold text-white">Low-code + high-control</p>
                <p className="pt-1 text-xs leading-relaxed text-white/60">
                  Mix drag-n-drop canvases with inline code cells to keep velocity and precision.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 shadow-[0_15px_45px_-30px_rgba(14,165,233,0.75)] transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                <p className="font-semibold text-white">Deploy anywhere</p>
                <p className="pt-1 text-xs leading-relaxed text-white/60">
                  Ship to your private cloud, on-prem, or the managed runtime in a single click.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 shadow-[0_15px_45px_-30px_rgba(255,107,44,0.75)] transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                <p className="font-semibold text-white">Integrate faster</p>
                <p className="pt-1 text-xs leading-relaxed text-white/60">
                  250+ prebuilt connectors and an SDK for internal systems keep your agents in sync.
                </p>
              </div>
            </div>
          </div>

          {/* Visual column */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-16 left-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.35),transparent_60%)] blur-2xl" />
            <div className="absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.5),transparent_65%)] blur-3xl" />

            <div className="group relative w-full max-w-lg">
              <div className="absolute inset-0 rounded-[32px] bg-[conic-gradient(at_top_left,#7C3AED,#FF6B2C,#0EA5E9,#7C3AED)] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_45px_140px_-60px_rgba(124,58,237,0.85)] backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs uppercase text-white/40">
                  <span>Automation run</span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0a1f]/80 p-5 shadow-[0_24px_60px_-40px_rgba(79,70,229,0.6)]">
                    <div className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.4),transparent_70%)] blur-xl" />
                    <p className="text-sm font-semibold text-white">Trigger: New Github Issue</p>
                    <p className="pt-1 text-xs text-white/60">Repo: platform/main · Label: ai-agent</p>
                  </div>

                  <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0b0716]/90 p-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/40">
                      <span>Workflow graph</span>
                      <span>4 steps</span>
                    </div>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 text-sm text-white/70">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1f0b3d] to-[#4c1d95] text-base font-semibold text-white/80 shadow-[0_10px_30px_-14px_rgba(124,58,237,0.8)]">
                          1
                        </span>
                        <div>
                          <p className="font-semibold text-white/90">Parse Issue Context</p>
                          <p className="text-xs text-white/50">LLM classifies scope + urgency</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 text-sm text-white/70">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-base font-semibold text-white/80 shadow-[0_10px_30px_-14px_rgba(14,165,233,0.8)]">
                          2
                        </span>
                        <div>
                          <p className="font-semibold text-white/90">Retrieve Knowledge</p>
                          <p className="text-xs text-white/50">Vector search across design docs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 text-sm text-white/70">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1f2933] to-[#334155] text-base font-semibold text-white/80 shadow-[0_10px_30px_-14px_rgba(22,163,74,0.8)]">
                          3
                        </span>
                        <div>
                          <p className="font-semibold text-white/90">Draft Solution</p>
                          <p className="text-xs text-white/50">Generate PR plan + infrastructure notes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 text-sm text-white/70">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1f0b3d] to-[#4c1d95] text-base font-semibold text-white/80 shadow-[0_10px_30px_-14px_rgba(255,107,44,0.8)]">
                          4
                        </span>
                        <div>
                          <p className="font-semibold text-white/90">Notify Squad</p>
                          <p className="text-xs text-white/50">Sync to Slack &amp; Linear with context</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-white/60">
                  <div>
                    <p className="text-white/80">Avg deployment</p>
                    <p className="text-lg font-semibold text-white">3.2 min</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-white/80">Playbooks automated</p>
                    <p className="text-lg font-semibold text-white">42</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-white/80">API reliability</p>
                    <p className="text-lg font-semibold text-emerald-400">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
