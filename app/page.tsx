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

export default function Home() {
  return (
    <div className="bg-stone-50 text-gray-800 font-sans leading-relaxed selection:bg-blue-100 selection:text-blue-900 min-h-screen">
      <SiteHeader />

      <header className="relative overflow-hidden pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-100">
              Open Source Solana Infrastructure
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              We Build Open-Source Tools for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Better Solana Infra</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              rpc.ag builds open-source infrastructure products focused on Solana: RPC gateways, proxies, and load balancers,
              with developer-first workflows and operator-grade reliability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/gateway"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Explore Gateway
              </a>
              <a
                href="/grip"
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-semibold border border-gray-300 transition-all shadow-sm"
              >
                Explore Grip
              </a>
            </div>
          </div>
        </div>

          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-40">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Gateway and Grip are focused tools in the same direction: dependable open-source infrastructure for Solana developers and operators.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all"
            >
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide mb-4">
                {product.badge}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <ul className="space-y-3 mb-8">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={product.href}
                className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-md font-semibold transition-colors"
              >
                {product.cta}
              </a>
            </article>
          ))}
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">Built in open source for Solana developers, infrastructure operators, and teams.</p>
        </div>
      </footer>

    </div>
  );
}
