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
    description:
      "The edge issues a public URL pattern (<id>.<base><path>) and immediately forwards inbound traffic to your local port.",
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
    description:
      "Stable JSON error envelopes (CONTROL_* codes). Strict idempotency enforcement on mutating endpoints ensures no zombie tunnels.",
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
    description:
      "Export Prometheus metrics, trace latency decomposition, and monitor live tunnel status with the built-in ratatui dashboard.",
  },
  {
    label: "SEC",
    title: "Security Foundation",
    description:
      "Heavily tested domain modules for RBAC templates, scoped token governance, workspace hierarchy, and endpoint collision policies.",
  },
  {
    label: "DEP",
    title: "Deployment Flexibility",
    description:
      "Run easily in Docker for dev loops, or map to systemd and Caddy for production-grade reverse proxying and TLS termination.",
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
    <div className="rounded-lg bg-gray-900 border border-gray-700 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FeatureCard({ label, title, description }: FeatureCardProps) {
  return (
    <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xs font-bold tracking-wider text-blue-700 mb-6 group-hover:scale-110 transition-transform">
        {label}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </article>
  );
}

export default function GripPage() {
  return (
    <>
      <div className="bg-stone-50 text-gray-800 font-sans leading-relaxed selection:bg-blue-100 selection:text-blue-900">
        <SiteHeader />

        <section className="relative overflow-hidden pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl animate-rise-up">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-100">
                  v1.0 is Live
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                  The Open-Source{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Local Sharing Proxy.
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-10">
                  Grip is built for developers who need to quickly share local apps. Run a single command, get a public
                  URL, and keep the option to self-host edge + control-plane when your team needs deeper control.
                </p>

                <a
                  href="https://github.com/rpc-ag/grip"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  View Source Code
                </a>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-rise-up-delayed">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                  <span className="ml-2 text-xs font-mono text-gray-500">operator@rpc-edge:~</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-4">
                  <div>
                    <span className="text-blue-600">❯</span> <span className="text-gray-900">export GRIP_SEED_TOKEN=&quot;sk_test_123&quot;</span>
                  </div>
                  <div>
                    <span className="text-blue-600">❯</span> <span className="text-gray-900">grip login --token $GRIP_SEED_TOKEN</span>
                    <p className="text-gray-500 mt-1">✓ Token validated and persisted to ~/.grip/token</p>
                  </div>
                  <div>
                    <span className="text-blue-600">❯</span> <span className="text-gray-900">grip http 8080</span>
                    <div className="mt-3 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700">
                      <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
                        <span className="text-blue-700 font-bold">Grip Tunnel Active</span>
                        <span className="text-gray-500">Ctrl+C to quit</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 mt-2">
                        <span className="text-gray-500">Session:</span> <span>online</span>
                        <span className="text-gray-500">Forwarding:</span>{" "}
                        <span className="text-blue-600">https://t-8f2a.rpc.ag/ -&gt; localhost:8080</span>
                        <span className="text-gray-500">Connections:</span> <span>0 active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-40">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          </div>
        </section>

        <section id="how-it-works" className="py-24 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">End-to-End Determinism</h2>
              <p className="text-gray-600 text-lg">
                Grip keeps local sharing simple for developers while separating CLI and edge for predictable behavior
                and transparent routing.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                {FLOW_STEPS.map((item, index) => (
                  <div key={item.step} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-blue-600 font-mono text-sm font-semibold group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors">
                        {item.step}
                      </div>
                      {index < FLOW_STEPS.length - 1 ? (
                        <div className="w-px h-full bg-gray-200 my-2 group-hover:bg-blue-200 transition-colors" />
                      ) : null}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-24 space-y-6">
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

        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Fast Local Proxying</h2>
              <p className="text-gray-600 text-lg">
                Optimized for quick local sharing during development, with reliability and observability primitives for
                teams that self-host.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CAPABILITIES.map((capability) => (
                <FeatureCard
                  key={capability.title}
                  label={capability.label}
                  title={capability.title}
                  description={capability.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-orange-200 bg-orange-50 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-sm font-bold flex items-center justify-center">
                  !
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Production Constraints (v1.0)</h2>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl leading-relaxed">
                We believe in transparent engineering. While Grip is built on robust, battle-tested domain modules, the
                current production wiring has specific behavioral constraints you should plan for:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-gray-700 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <span>Control-plane tunnel state is currently in-memory. Restarting grip-edge clears active tunnels.</span>
                </li>
                <li className="flex gap-3 text-gray-700 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <span>The shared wildcard endpoint flow is the primary routing path today.</span>
                </li>
                <li className="flex gap-3 text-gray-700 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <span>
                    While TCP tunnel lifecycles exist in the API, the current edge forwarding implementation is
                    optimized purely for HTTP proxying.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to share your localhost?</h2>
            <div className="flex justify-center mb-12">
              <a
                href="https://github.com/rpc-ag/grip"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Explore the Source Code
              </a>
            </div>
            <div className="pt-8 border-t border-gray-200 text-sm text-gray-500">
              <span className="font-mono bg-gray-100 border border-gray-200 px-2 py-1 rounded mr-2">rpc.ag</span>
              <span>© 2026. Open Source under MIT.</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .animate-rise-up {
          animation: riseUp 0.55s ease-out;
        }

        .animate-rise-up-delayed {
          animation: riseUp 0.72s ease-out;
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes riseUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </>
  );
}
