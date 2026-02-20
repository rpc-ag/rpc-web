"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import SiteHeader from "@components/site-header";

const PROVIDERS = ["provider-1", "provider-2", "provider-3"] as const;
const LATENCIES: Record<string, number> = {
  "provider-1": 45,
  "provider-2": 120,
  "provider-3": 65,
};

type Strategy = "round-robin" | "parallel" | "smart";

type LogEntry = {
  id: string;
  time: string;
  message: string;
  colorClass: string;
};

export default function Home() {
  const [currentMethod, setCurrentMethod] = useState("getAccountInfo");
  const [currentStrategy, setCurrentStrategy] = useState<Strategy>("round-robin");
  const [totalRequests, setTotalRequests] = useState(0);
  const [avgLatency, setAvgLatency] = useState(0);
  const [isChartReady, setIsChartReady] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init-1",
      time: "",
      message: "// System Ready. RPC Gateway initialized.",
      colorClass: "text-[var(--color-muted)] opacity-50",
    },
    {
      id: "init-2",
      time: "",
      message: "// Connected to Postgres DB.",
      colorClass: "text-[var(--color-muted)] opacity-50",
    },
    {
      id: "init-3",
      time: "",
      message: "// Clickhouse Analytics stream active.",
      colorClass: "text-[var(--color-muted)] opacity-50",
    },
  ]);

  const providerIndexRef = useRef(0);
  const chartRef = useRef<any>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const lbNodeRef = useRef<HTMLDivElement>(null);
  const pathTopRef = useRef<SVGPathElement>(null);
  const pathMidRef = useRef<SVGPathElement>(null);
  const pathBotRef = useRef<SVGPathElement>(null);
  const provider1Ref = useRef<HTMLDivElement>(null);
  const provider2Ref = useRef<HTMLDivElement>(null);
  const provider3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isChartReady || chartRef.current || !chartCanvasRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ChartCtor = (window as any).Chart;
    if (!ChartCtor) return;

    const ctx = chartCanvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new ChartCtor(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 10 }, (_, i) => `${10 - i}s ago`),
        datasets: [
          {
            label: "Latency (ms)",
            data: [45, 50, 42, 120, 60, 45, 48, 55, 40, 43],
            borderColor: "#f57600",
            backgroundColor: "rgba(245, 118, 0, 0.08)",
            pointRadius: 0,
            fill: false,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(44, 63, 80, 0.95)",
            titleColor: "#ecf0f1",
            bodyColor: "#ecf0f1",
            borderColor: "#f57600",
            borderWidth: 2,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#2c3f50" },
            grid: { color: "rgba(44, 63, 80, 0.22)" },
          },
          x: {
            ticks: { color: "#2c3f50" },
            grid: { color: "rgba(44, 63, 80, 0.12)" },
          },
        },
      },
    });
  }, [isChartReady]);

  useEffect(() => {
    if (!logContainerRef.current) return;
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [logs]);

  const strategyDescription = useMemo(() => {
    if (currentStrategy === "round-robin") {
      return "Requests are distributed sequentially (A -> B -> C). Good for cost saving.";
    }

    if (currentStrategy === "parallel") {
      return "Requests sent to ALL providers. First response wins. Higher cost, lowest latency.";
    }

    if (currentMethod === "getAccountInfo") {
      return (
        <>
          <span className="text-[var(--color-info)] font-bold">Smart Logic:</span> Reading data uses Round Robin to save costs.
        </>
      );
    }

    return (
      <>
        <span className="text-[var(--color-info)] font-bold">Smart Logic:</span> Transactions use Parallel Broadcast for max speed &amp; inclusion.
      </>
    );
  }, [currentMethod, currentStrategy]);

  const addLog = useCallback((message: string, colorClass = "text-[#d7dfdf]") => {
    const time = new Date().toISOString().split("T")[1].split(".")[0];
    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        time,
        message,
        colorClass,
      },
    ]);
  }, []);

  const updateChart = useCallback((newLatency: number) => {
    if (!chartRef.current) return;
    const dataset = chartRef.current.data.datasets[0].data;
    dataset.shift();
    dataset.push(newLatency);
    chartRef.current.update("none");
  }, []);

  const animatePath = useCallback((providerId: string) => {
    let path: SVGPathElement | null = null;
    let card: HTMLDivElement | null = null;

    if (providerId === "provider-1") {
      path = pathTopRef.current;
      card = provider1Ref.current;
    }
    if (providerId === "provider-2") {
      path = pathMidRef.current;
      card = provider2Ref.current;
    }
    if (providerId === "provider-3") {
      path = pathBotRef.current;
      card = provider3Ref.current;
    }

    if (!path || !card) return;

    path.style.strokeDashoffset = "0";

    setTimeout(() => {
      card.classList.add("border-orange-500", "bg-[var(--color-panel-strong)]");
      setTimeout(() => {
        card?.classList.remove("border-orange-500", "bg-[var(--color-panel-strong)]");
        if (path) path.style.strokeDashoffset = "100";
      }, 500);
    }, 300);
  }, []);

  const completeRequest = useCallback(
    (providerId: string, latency: number, strategy: Strategy | "round-robin" | "parallel") => {
      setTotalRequests((prev) => {
        const nextTotal = prev + 1;
        setAvgLatency((prevAvg) => Math.floor((prevAvg * prev + latency) / nextTotal));
        return nextTotal;
      });

      const providerName =
        providerId === "provider-1" ? "Provider A" : providerId === "provider-2" ? "Provider B" : "Provider C";

      let msg = `✔ 200 OK via ${providerName} (${latency}ms)`;
      if (strategy === "parallel") msg += " [Winner of 3]";
      addLog(msg, "text-[#3cff00]");

      updateChart(latency);
    },
    [addLog, updateChart]
  );

  const simulateRequest = useCallback(() => {
    addLog(`> Incoming ${currentMethod} request from 192.168.1.X`);

    let effectiveStrategy: Strategy | "round-robin" | "parallel" = currentStrategy;
    if (effectiveStrategy === "smart") {
      effectiveStrategy = currentMethod === "getAccountInfo" ? "round-robin" : "parallel";
    }

    if (lbNodeRef.current) {
      lbNodeRef.current.classList.add("pulse-active");
      setTimeout(() => lbNodeRef.current?.classList.remove("pulse-active"), 500);
    }

    if (effectiveStrategy === "round-robin") {
      const target = PROVIDERS[providerIndexRef.current];
      providerIndexRef.current = (providerIndexRef.current + 1) % PROVIDERS.length;
      animatePath(target);

      setTimeout(() => {
        const latency = LATENCIES[target] + Math.floor(Math.random() * 20);
        completeRequest(target, latency, effectiveStrategy);
      }, 600);
    } else {
      PROVIDERS.forEach((provider) => animatePath(provider));
      setTimeout(() => {
        const winner = "provider-1";
        const latency = LATENCIES[winner] + Math.floor(Math.random() * 10);
        completeRequest(winner, latency, effectiveStrategy);
      }, 600);
    }
  }, [addLog, animatePath, completeRequest, currentMethod, currentStrategy]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
        onLoad={() => setIsChartReady(true)}
      />

      <div className="site-surface min-h-screen">
        <SiteHeader />

        <header id="vision" className="industrial-grid border-b-2 border-[var(--color-border)] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="brand-card p-8 md:p-10 text-center max-w-5xl mx-auto">
              <span className="brand-chip">Open Source Initiative</span>
              <h1 className="mt-6 text-4xl md:text-6xl font-black uppercase leading-[0.95]">
                Solana RPC
                <br />
                <span className="text-[var(--color-accent)]">Gateway Refinery</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
                Reliable RPC infrastructure is oxygen. rpc.ag is the open-source refinery: a high-performance gateway built on Rust, backed by
                Postgres, and analyzed through Clickhouse.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="brand-chip">Multi-provider aggregation</div>
                <div className="brand-chip">Intelligent load balancing</div>
                <div className="brand-chip">Deep packet analytics</div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">
          <section id="gateway-sim" className="scroll-mt-24">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">RPC Gateway Logic Engine</h2>
              <p className="mt-4 text-lg text-[var(--color-muted)] max-w-4xl">
                This interactive panel models method-based routing and failover behavior across providers. Use it to inspect request strategy,
                winning route, and latency behavior under changing traffic profiles.
              </p>
            </div>

            <div className="brand-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[var(--color-border)]">
                <div className="p-8 bg-[var(--color-panel-strong)]">
                  <h3 className="mb-6 flex items-center gap-2 font-black uppercase tracking-[0.08em] text-[var(--color-text)]">
                    <span>⚙</span> Configuration
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Simulation Mode</label>
                      <select
                        id="strategySelect"
                        value={currentStrategy}
                        onChange={(event) => setCurrentStrategy(event.target.value as Strategy)}
                        className="w-full border-2 border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 outline-none focus:border-[var(--color-accent)]"
                      >
                        <option value="round-robin">Round Robin (Sequential)</option>
                        <option value="parallel">Parallel (Fastest Wins)</option>
                        <option value="smart">Smart Routing (Method Based)</option>
                      </select>
                      <p id="strategyDesc" className="mt-2 text-xs text-[var(--color-muted)]">
                        {strategyDescription}
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Request Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCurrentMethod("getAccountInfo")}
                          id="btn-get"
                          className={`px-3 py-2 text-sm border-2 font-semibold text-center uppercase tracking-[0.05em] transition-none ${
                            currentMethod === "getAccountInfo"
                              ? "bg-[var(--color-panel)] text-[var(--color-accent)] border-[var(--color-accent)]"
                              : "bg-[var(--color-panel)] text-[var(--color-muted)] border-[var(--color-border)]"
                          }`}
                        >
                          getAccountInfo
                        </button>
                        <button
                          onClick={() => setCurrentMethod("sendTransaction")}
                          id="btn-send"
                          className={`px-3 py-2 text-sm border-2 font-semibold text-center uppercase tracking-[0.05em] transition-none ${
                            currentMethod === "sendTransaction"
                              ? "bg-[var(--color-panel)] text-[var(--color-accent)] border-[var(--color-accent)]"
                              : "bg-[var(--color-panel)] text-[var(--color-muted)] border-[var(--color-border)]"
                          }`}
                        >
                          sendTransaction
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={simulateRequest}
                      className="brand-btn brand-btn-primary w-full justify-center py-3"
                    >
                      Send Request
                    </button>

                    <div className="mt-8 border-2 border-[var(--color-border)] bg-[var(--color-panel)] p-4">
                      <h4 className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-[var(--color-rust)]">Live Stats</h4>
                      <div className="flex justify-between items-end">
                        <div className="text-center">
                          <div className="text-2xl font-black text-[var(--color-text)]" id="stat-requests">
                            {totalRequests.toLocaleString()}
                          </div>
                          <div className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Total Req</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-[var(--color-text)]" id="stat-latency">
                            {avgLatency}ms
                          </div>
                          <div className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Avg Latency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-[var(--color-success)]" id="stat-success">
                            100%
                          </div>
                          <div className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Success</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative bg-[var(--color-panel)] p-8 lg:col-span-2">
                  <div className="absolute right-4 top-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    Architecture Visualization
                  </div>

                  <div className="flex h-full flex-col justify-center">
                    <div className="relative mb-12 flex items-center justify-between">
                      <div className="z-10 flex w-20 flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-shell)] text-xl text-[var(--color-ink-inverse)]">
                          👤
                        </div>
                        <span className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-[var(--color-muted)]">Client</span>
                      </div>

                      <div className="relative mx-2 h-1 flex-1 overflow-hidden bg-[var(--color-panel-strong)]">
                        <div id="request-packet" className="hidden absolute left-0 top-0 h-full w-12 bg-[var(--color-info)]" />
                      </div>

                      <div className="z-10 flex w-24 flex-col items-center">
                        <div
                          id="lb-node"
                          ref={lbNodeRef}
                          className="flex h-16 w-16 items-center justify-center border-4 border-[var(--color-border)] bg-[var(--color-accent)] text-2xl text-[var(--color-ink-inverse)] transition-none duration-300"
                        >
                          ⚖
                        </div>
                        <span className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-[var(--color-accent)]">RPC Gateway</span>
                      </div>

                      <div className="relative mx-2 flex h-32 flex-1 items-center">
                        <svg className="absolute left-0 top-0 h-full w-full" style={{ pointerEvents: "none" }}>
                          <path d="M0,64 C50,64 50,16 100,16" fill="none" stroke="rgba(44, 63, 80, 0.35)" strokeWidth="2" />
                          <path
                            id="path-top"
                            ref={pathTopRef}
                            d="M0,64 C50,64 50,16 100,16"
                            fill="none"
                            stroke="#f57600"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-none duration-500"
                          />

                          <path d="M0,64 L100,64" fill="none" stroke="rgba(44, 63, 80, 0.35)" strokeWidth="2" />
                          <path
                            id="path-mid"
                            ref={pathMidRef}
                            d="M0,64 L100,64"
                            fill="none"
                            stroke="#f57600"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-none duration-500"
                          />

                          <path d="M0,64 C50,64 50,112 100,112" fill="none" stroke="rgba(44, 63, 80, 0.35)" strokeWidth="2" />
                          <path
                            id="path-bot"
                            ref={pathBotRef}
                            d="M0,64 C50,64 50,112 100,112"
                            fill="none"
                            stroke="#f57600"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-none duration-500"
                          />
                        </svg>
                      </div>

                      <div className="z-10 flex w-32 flex-col gap-4">
                        <div
                          id="provider-1"
                          ref={provider1Ref}
                          className="provider-card flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-panel)] p-3 transition-none duration-300"
                        >
                          <div className="h-2 w-2 bg-[var(--color-success)]" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.06em] text-[var(--color-text)]">Provider A</div>
                            <div className="text-[10px] text-[var(--color-muted)]">Helius</div>
                          </div>
                        </div>
                        <div
                          id="provider-2"
                          ref={provider2Ref}
                          className="provider-card flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-panel)] p-3 transition-none duration-300"
                        >
                          <div className="h-2 w-2 bg-[var(--color-success)]" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.06em] text-[var(--color-text)]">Provider B</div>
                            <div className="text-[10px] text-[var(--color-muted)]">Triton</div>
                          </div>
                        </div>
                        <div
                          id="provider-3"
                          ref={provider3Ref}
                          className="provider-card flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-panel)] p-3 transition-none duration-300"
                        >
                          <div className="h-2 w-2 bg-[var(--color-success)]" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.06em] text-[var(--color-text)]">Provider C</div>
                            <div className="text-[10px] text-[var(--color-muted)]">QuickNode</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-32 overflow-y-auto border-2 border-[var(--color-border)] bg-[var(--color-shell)] p-4 font-mono text-xs text-[#d7dfdf]"
                      id="console-logs"
                      ref={logContainerRef}
                    >
                      {logs.map((entry) => (
                        <div key={entry.id} className={`mb-1 font-mono ${entry.colorClass}`}>
                          {entry.time ? <span className="opacity-60">[{entry.time}]</span> : null} {entry.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="observability" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Deep Observability</h2>
                <p className="mt-4 text-[var(--color-muted)]">
                  Gateway exposes full request traces and latency behavior so operators can root-cause issues quickly under production load.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3 text-[var(--color-text)]">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-[10px] font-black">
                      +
                    </span>
                    <span>
                      <strong>Full Request Logging:</strong> Capture bodies, headers, and responses.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--color-text)]">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-[10px] font-black">
                      +
                    </span>
                    <span>
                      <strong>Security Fingerprinting:</strong> Log IP addresses and TLS fingerprints to block abuse.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--color-text)]">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-[10px] font-black">
                      +
                    </span>
                    <span>
                      <strong>Performance Metrics:</strong> Breakdown latency by provider, method, and region.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] p-6">
                  <h4 className="font-black uppercase tracking-[0.08em] text-[var(--color-rust)]">Why Clickhouse?</h4>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    Postgres is ideal for account state and configuration. Clickhouse handles millions of RPC log events for real-time analytics.
                  </p>
                </div>
              </div>

              <div className="brand-card p-6">
                <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[var(--color-rust)]">Global Request Latency (ms)</h3>
                <div className="chart-container">
                  <canvas id="observabilityChart" ref={chartCanvasRef}></canvas>
                </div>
              </div>
            </div>
          </section>

          <section id="stack" className="scroll-mt-24">
            <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-[var(--color-text)] mb-10">
              Architecture Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="brand-card p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-2xl">
                  ⚙
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Rust Server</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  Handles incoming traffic, TLS termination, and strategy execution with predictable low-level performance.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                  <li>Memory safe and fast</li>
                  <li>Async Tokio runtime</li>
                  <li>Custom load balancing logic</li>
                </ul>
              </div>

              <div className="brand-card p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-2xl">
                  🐘
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">PostgreSQL</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  Source of truth for users, API keys, and routing configuration.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                  <li>Relational data integrity</li>
                  <li>User accounts and projects</li>
                  <li>Provider configuration state</li>
                </ul>
              </div>

              <div className="brand-card p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-panel-strong)] text-2xl">
                  📊
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.02em] text-[var(--color-text)]">Clickhouse</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  High-cardinality analytics on production traffic for debugging and optimization.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                  <li>Columnar storage</li>
                  <li>Massive log ingest</li>
                  <li>Fast aggregate queries</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="brand-terminal p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-[0.02em] text-[var(--color-ink-inverse)]">Developer Experience First</h2>
                <p className="mt-4 text-[#d7dfdf]">Infrastructure is only useful when operators can reason about it quickly.</p>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-accent)] font-black text-[var(--color-ink-inverse)]">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.02em] text-[var(--color-ink-inverse)]">Integrated Playground</h3>
                      <p className="mt-1 text-sm text-[#d7dfdf]">
                        Build, save, and share RPC requests. Export to cURL or TypeScript without boilerplate.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-info)] font-black text-[var(--color-ink-inverse)]">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.02em] text-[var(--color-ink-inverse)]">Devnet Support</h3>
                      <p className="mt-1 text-sm text-[#d7dfdf]">
                        Run safe experiments with full support for devnet clusters and failure simulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-[var(--color-border)] bg-[rgba(0,0,0,0.2)] p-6 font-mono text-sm text-[var(--color-ink-inverse)]">
                <div className="mb-4 flex gap-2 border-b border-dashed border-[#d7dfdf] pb-2">
                  <div className="h-3 w-3 border border-[var(--color-border)] bg-[var(--color-danger)]" />
                  <div className="h-3 w-3 border border-[var(--color-border)] bg-[var(--color-accent)]" />
                  <div className="h-3 w-3 border border-[var(--color-border)] bg-[var(--color-success)]" />
                  <span className="ml-auto text-xs uppercase tracking-[0.08em]">playground.ts</span>
                </div>
                <div className="text-[var(--color-info)]">const</div> connection = <span className="text-[var(--color-success)]">new Connection</span>(
                <span className="text-[#ffffff]">"https://rpc.ag"</span>);
                <br />
                <br />
                <div className="text-[#d7dfdf]">// Smart Routing handles the rest</div>
                <span className="text-[var(--color-info)]">await</span> connection.getAccountInfo(publicKey);
                <br />
                <br />
                <div className="text-[#d7dfdf]">// Transactions broadcast on parallel strategy</div>
                <span className="text-[var(--color-info)]">await</span> connection.sendTransaction(tx);
                <br />
                <br />
                <div className="border-l-2 border-[var(--color-success)] bg-[rgba(0,0,0,0.24)] p-3">
                  <span className="text-[var(--color-success)]">Success:</span> 200 OK
                  <br />
                  <span className="text-[#d7dfdf]">Latency:</span> 45ms
                  <br />
                  <span className="text-[#d7dfdf]">Provider:</span> Helius (Fastest)
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-shell)] py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-panel)]">Built for the Open Source Community.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-panel-strong);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-rust);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-accent);
        }

        .chart-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
          height: 300px;
        }
        @media (min-width: 768px) {
          .chart-container {
            height: 350px;
          }
        }

        .pulse-active {
          animation: pulse 300ms steps(2, end);
          border-color: var(--color-accent);
          background-color: var(--color-panel-strong);
        }
        @keyframes pulse {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(2px, 2px);
          }
        }
      `}</style>
    </>
  );
}
