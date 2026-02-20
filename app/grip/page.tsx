"use client";

import { useState } from "react";
import SiteHeader from "@components/site-header";

type CodeBlockProps = {
  code: string;
  language?: string;
};

type FeatureCardProps = {
  label: string;
  title: string;
  description: string;
};

const FLOW_STEPS = [
  {
    step: "01",
    title: "Start grip-edge",
    description:
      "Deploy the edge control-plane via Docker, systemd, or native binary. This handles routing and tunnel lifecycles.",
  },
  {
    step: "02",
    title: "Seed Authentication",
    description: "Configure your initial root token via the GRIP_SEED_TOKEN environment variable on the edge.",
  },
  {
    step: "03",
    title: "Login via CLI",
    description: "Run grip login to validate your token against GET /v1/tokens/validate and persist it locally.",
  },
  {
    step: "04",
    title: "Initiate Tunnel",
    description: "Run grip http <PORT>. The CLI creates the tunnel via POST /v1/tunnels.",
  },
  {
    step: "05",
    title: "Edge Routing",
    description: "The edge issues a public URL pattern (<id>.<base><path>) and immediately forwards inbound traffic to your local port.",
  },
];

const CAPABILITIES: FeatureCardProps[] = [
  {
    label: "CLI",
    title: "Developer-First CLI",
    description:
      "Share localhost in seconds with login, http, tcp, status, and logout commands. Actionable diagnostics help developers move fast.",
  },
  {
    label: "API",
    title: "Deterministic Control API",
    description: "Stable JSON error envelopes (CONTROL_* codes). Strict idempotency enforcement on mutating endpoints ensures no zombie tunnels.",
  },
  {
    label: "OPS",
    title: "Reliability Guardrails",
    description:
      "Actor model architecture with mailbox capacity profiles, fairness limiters, saturation guardrails, and jittered reconnect backoffs.",
  },
  {
    label: "OBS",
    title: "Debug-Friendly Observability",
    description: "Export Prometheus metrics, trace latency decomposition, and monitor live tunnel status with the built-in ratatui dashboard.",
  },
  {
    label: "SEC",
    title: "Security Foundation",
    description: "Heavily tested domain modules for RBAC templates, scoped token governance, workspace hierarchy, and endpoint collision policies.",
  },
  {
    label: "DEP",
    title: "Deployment Flexibility",
    description: "Run easily in Docker for dev loops, or map to systemd and Caddy for production-grade reverse proxying and TLS termination.",
  },
];

function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="brand-terminal overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] bg-[rgba(0,0,0,0.14)] px-4 py-2">
        <span className="text-xs uppercase tracking-[0.08em] text-[#d8dfdf]">{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-xs font-semibold uppercase tracking-[0.08em] text-[#d8dfdf] hover:text-[var(--color-accent)] transition-none"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-[var(--color-ink-inverse)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FeatureCard({ label, title, description }: FeatureCardProps) {
  return (
    <article className="brand-card p-8">
      <div className="mb-6 inline-flex h-11 min-w-11 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] px-3 text-xs font-black tracking-[0.12em] text-[var(--color-rust)]">
        {label}
      </div>
      <h3 className="text-xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
    </article>
  );
}

export default function GripPage() {
  return (
    <div className="site-surface min-h-screen">
      <SiteHeader />

      <section className="industrial-grid border-b-2 border-[var(--color-border)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            <div className="brand-card p-8 md:p-10">
              <span className="brand-chip">Grip v1.0</span>
              <h1 className="mt-6 text-4xl md:text-6xl font-black uppercase leading-[0.95]">
                Local Sharing
                <br />
                <span className="text-[var(--color-accent)]">Proxy, Not Hype</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--color-muted)]">
                Grip is built for developers who need to share local apps quickly. One command gives you a public URL, with a clear path to
                self-hosted control when your team scales.
              </p>
              <div className="mt-8">
                <a href="https://github.com/rpc-ag/grip" target="_blank" rel="noreferrer" className="brand-btn brand-btn-primary">
                  View Source Code
                </a>
              </div>
            </div>

            <div className="brand-terminal overflow-hidden">
              <div className="flex items-center gap-2 border-b-2 border-[var(--color-border)] bg-[rgba(0,0,0,0.16)] px-4 py-3">
                <div className="h-3 w-3 border-2 border-[var(--color-border)] bg-[var(--color-danger)]" />
                <div className="h-3 w-3 border-2 border-[var(--color-border)] bg-[var(--color-accent)]" />
                <div className="h-3 w-3 border-2 border-[var(--color-border)] bg-[var(--color-success)]" />
                <span className="ml-2 text-xs uppercase tracking-[0.08em] text-[#d8dfdf]">operator@rpc-edge</span>
              </div>
              <div className="space-y-4 p-6 text-sm">
                <div>
                  <span className="text-[var(--color-accent)]">❯</span> export GRIP_SEED_TOKEN=&quot;sk_test_123&quot;
                </div>
                <div>
                  <span className="text-[var(--color-accent)]">❯</span> grip login --token $GRIP_SEED_TOKEN
                  <p className="mt-1 text-[#d8dfdf]">✓ Token validated and persisted to ~/.grip/token</p>
                </div>
                <div>
                  <span className="text-[var(--color-accent)]">❯</span> grip http 8080
                  <div className="mt-3 border-2 border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] p-4 text-[#d8dfdf]">
                    <div className="mb-2 flex justify-between border-b border-dashed border-[#d8dfdf] pb-2">
                      <span className="font-bold text-[var(--color-success)]">Grip Tunnel Active</span>
                      <span>Ctrl+C to quit</span>
                    </div>
                    <div className="mt-2 grid grid-cols-[100px_1fr] gap-2">
                      <span>Session:</span> <span>online</span>
                      <span>Forwarding:</span> <span className="text-[var(--color-info)]">https://t-8f2a.rpc.ag/ -&gt; localhost:8080</span>
                      <span>Connections:</span> <span>0 active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b-2 border-[var(--color-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">End-to-End Determinism</h2>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              Grip keeps local sharing simple while separating CLI and edge for predictable behavior and transparent routing.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-8">
              {FLOW_STEPS.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] font-mono text-sm font-semibold text-[var(--color-rust)]">
                      {item.step}
                    </div>
                    {index < FLOW_STEPS.length - 1 ? (
                      <div className="my-2 h-full w-px border-l-2 border-dashed border-[var(--color-border)]" />
                    ) : null}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">{item.title}</h3>
                    <p className="mt-2 text-[var(--color-muted)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <CodeBlock
                language="bash (Server)"
                code={`# 1. Start edge
$ docker run -p 80:80 -p 443:443 \\
    -e GRIP_SEED_TOKEN="sk_live_xyz" \\
    rpc-ag/grip-edge:latest`}
              />
              <CodeBlock
                language="bash (Local Operator)"
                code={`# 2. Authenticate
$ grip login --token sk_live_xyz
✓ Login successful

# 3. Expose local port 3000
$ grip http 3000
Tunnel created: https://app-123.rpc.ag/`}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Built for Fast Proxying</h2>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              Optimized for quick local sharing during development, with reliability and observability primitives for teams that self-host.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <FeatureCard key={capability.title} label={capability.label} title={capability.title} description={capability.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-accent)] text-[var(--color-ink-inverse)] text-sm font-black">
              !
            </span>
            <h2 className="text-2xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Production Constraints (v1.0)</h2>
          </div>
          <p className="mb-6 max-w-2xl text-[var(--color-muted)]">
            While Grip is built on robust domain modules, the current production wiring has specific behavioral constraints you should plan for.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-[var(--color-text)]">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel)] text-[10px] font-black">
                +
              </span>
              <span>Control-plane tunnel state is currently in-memory. Restarting grip-edge clears active tunnels.</span>
            </li>
            <li className="flex items-start gap-3 text-[var(--color-text)]">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel)] text-[10px] font-black">
                +
              </span>
              <span>The shared wildcard endpoint flow is the primary routing path today.</span>
            </li>
            <li className="flex items-start gap-3 text-[var(--color-text)]">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel)] text-[10px] font-black">
                +
              </span>
              <span>While TCP tunnel lifecycles exist in the API, edge forwarding is currently optimized purely for HTTP proxying.</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-shell)] py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black uppercase tracking-[0.02em] text-[var(--color-ink-inverse)]">Ready to share your localhost?</h2>
          <div className="mt-8 flex justify-center">
            <a href="https://github.com/rpc-ag/grip" target="_blank" rel="noreferrer" className="brand-btn brand-btn-primary">
              Explore the Source Code
            </a>
          </div>
          <div className="mt-8 border-t border-dashed border-[#d8dfdf] pt-6 text-xs uppercase tracking-[0.08em] text-[#d8dfdf]">
            <span className="brand-kbd mr-2">rpc.ag</span>
            <span>© 2026. Open Source under MIT.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
