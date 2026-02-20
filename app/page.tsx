import SiteHeader from "@components/site-header";

const PRODUCTS = [
  {
    name: "Gateway",
    href: "/gateway",
    badge: "RPC Gateway",
    description:
      "High-performance Solana RPC gateway with multi-provider routing, simulation tooling, and deep observability.",
    points: ["Smart load balancing", "Provider failover and routing control", "Request analytics and latency insight"],
    cta: "Open Gateway",
  },
  {
    name: "Grip",
    href: "/grip",
    badge: "Tunneling",
    description:
      "Developer-first quick proxy for sharing localhost services in seconds, with optional self-hosted edge control.",
    points: ["Share localhost instantly", "Public URLs for demos and webhooks", "Self-host when your team needs control"],
    cta: "Open Grip",
  },
] as const;

const METRICS = [
  { label: "Role", value: "RPC Aggregator" },
  { label: "Routing", value: "Multi-provider" },
  { label: "Focus", value: "Low latency + uptime" },
  { label: "Observability", value: "Grafana + Prometheus" },
] as const;

export default function Home() {
  return (
    <div className="site-surface min-h-screen">
      <SiteHeader />

      <header className="industrial-grid border-b-2 border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 md:gap-10 items-stretch">
            <div className="brand-card p-8 md:p-10">
              <span className="brand-chip">Homepage of DApp Infrastructure</span>
              <h1 className="mt-6 text-4xl md:text-6xl font-black uppercase leading-[0.94] tracking-[0.01em]">
                Load-Bearing
                <br />
                <span className="text-[var(--color-accent)]">Web3 Infrastructure</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-[var(--color-muted)] max-w-3xl">
                rpc.ag builds open-source Solana infrastructure: gateway routing, proxy flows, and operator-grade observability for teams that
                need deterministic behavior under load.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/gateway" className="brand-btn brand-btn-primary">
                  Explore Gateway
                </a>
                <a href="/grip" className="brand-btn brand-btn-secondary">
                  Explore Grip
                </a>
              </div>
            </div>

            <aside className="brand-terminal p-6 md:p-8 flex flex-col">
              <p className="text-xs uppercase tracking-[0.14em] text-[#d9dfdf]">System Snapshot</p>
              <div className="mt-5 space-y-3 text-sm">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-[120px_1fr] items-start gap-4 border-b border-[#95a1a8] border-dashed pb-3"
                  >
                    <span className="font-mono text-[#d9dfdf]">{metric.label}</span>
                    <span className="font-semibold text-[var(--color-success)]">{metric.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-xs text-[#d9dfdf]">
                status <span className="text-[var(--color-success)]">ONLINE</span> • region us-east • mode production
              </p>
            </aside>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Infrastructure Products</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-3xl">
            Gateway and Grip are focused tools in the same direction: dependable, observable, and transparent Solana infrastructure.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <article key={product.name} className="brand-card p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="brand-chip">{product.badge}</span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-rust)]">Module</span>
              </div>
              <h3 className="mt-4 text-2xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">{product.name}</h3>
              <p className="mt-3 text-[var(--color-muted)]">{product.description}</p>
              <ul className="mt-6 space-y-2">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[var(--color-text)]">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-[10px] font-bold">
                      +
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href={product.href} className="brand-btn brand-btn-primary">
                  {product.cta}
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-shell)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-panel)]">
            Built in open source for Solana developers, infrastructure operators, and teams.
          </p>
        </div>
      </footer>
    </div>
  );
}
