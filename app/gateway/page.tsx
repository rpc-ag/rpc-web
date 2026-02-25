"use client";

/* eslint-disable @next/next/no-img-element */
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
      colorClass: "text-gray-500 opacity-50",
    },
    {
      id: "init-2",
      time: "",
      message: "// Connected to Postgres DB.",
      colorClass: "text-gray-500 opacity-50",
    },
    {
      id: "init-3",
      time: "",
      message: "// Clickhouse Analytics stream active.",
      colorClass: "text-gray-500 opacity-50",
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
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
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
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1f2937",
            bodyColor: "#1f2937",
            borderColor: "#e5e7eb",
            borderWidth: 1,
          },
        },
        scales: {
          y: { beginAtZero: true, grid: { color: "#f3f4f6" } },
          x: { grid: { display: false } },
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
          <span className="text-blue-600 font-bold">Smart Logic:</span> Reading data uses Round Robin to save costs.
        </>
      );
    }

    return (
      <>
        <span className="text-blue-600 font-bold">Smart Logic:</span> Transactions use Parallel Broadcast for max speed &amp; inclusion.
      </>
    );
  }, [currentMethod, currentStrategy]);

  const addLog = useCallback((message: string, colorClass = "text-gray-300") => {
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
      card.classList.add("border-blue-500", "bg-blue-50");
      setTimeout(() => {
        card?.classList.remove("border-blue-500", "bg-blue-50");
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
      addLog(msg, "text-green-400");

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

      <div className="bg-stone-50 text-gray-800 font-sans leading-relaxed selection:bg-blue-100 selection:text-blue-900">
        <SiteHeader />

        <header id="vision" className="relative overflow-hidden pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-100">
                Open Source Initiative
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                Democratizing the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Solana Gateway
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10">
                "Reliable RPC infrastructure is oxygen." <strong>rpc.ag</strong> is the open-source refinery. A
                high-performance gateway built on <strong>Rust</strong>, powered by <strong>Postgres</strong>, and
                analyzed via <strong>Clickhouse</strong>.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-gray-700">Multi-Provider Aggregation</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="text-sm font-medium text-gray-700">Intelligent Load Balancing</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-sm font-medium text-gray-700">Deep Packet Analytics</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-40">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <section id="gateway-sim" className="scroll-mt-24">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">RPC Gateway Logic Engine</h2>
              <p className="text-lg text-gray-600 max-w-4xl">
                The core of <strong>rpc.ag</strong> is the <strong>Rust-based Load Balancer</strong>. It abstracts the
                complexity of managing multiple RPC providers (Helius, Triton, QuickNode, etc.). Below is an
                interactive simulation of how our "Method-Based Routing" functions compared to standard Failover
                strategies.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                <div className="p-8 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span>⚙️</span> Configuration
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Simulation Mode</label>
                      <select
                        id="strategySelect"
                        value={currentStrategy}
                        onChange={(event) => setCurrentStrategy(event.target.value as Strategy)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      >
                        <option value="round-robin">Round Robin (Sequential)</option>
                        <option value="parallel">Parallel (Fastest Wins)</option>
                        <option value="smart">Smart Routing (Method Based)</option>
                      </select>
                      <p id="strategyDesc" className="text-xs text-gray-500 mt-2">
                        {strategyDescription}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Request Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCurrentMethod("getAccountInfo")}
                          id="btn-get"
                          className={`method-btn px-3 py-2 text-sm border rounded-md font-medium text-center hover:bg-blue-200 transition-all ${
                            currentMethod === "getAccountInfo"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          getAccountInfo
                        </button>
                        <button
                          onClick={() => setCurrentMethod("sendTransaction")}
                          id="btn-send"
                          className={`method-btn px-3 py-2 text-sm border rounded-md font-medium text-center transition-all ${
                            currentMethod === "sendTransaction"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          sendTransaction
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={simulateRequest}
                      className="w-full mt-4 bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-bold shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span>🚀</span> Send Request
                    </button>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Live Stats</h4>
                      <div className="flex justify-between items-end">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-900" id="stat-requests">
                            {totalRequests.toLocaleString()}
                          </div>
                          <div className="text-xs text-blue-600">Total Req</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-900" id="stat-latency">
                            {avgLatency}ms
                          </div>
                          <div className="text-xs text-blue-600">Avg Latency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-700" id="stat-success">
                            100%
                          </div>
                          <div className="text-xs text-green-600">Success Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:col-span-2 relative bg-white">
                  <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono">Architecture Visualization</div>

                  <div className="h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-12 relative">
                      <div className="flex flex-col items-center z-10 w-20">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                          👤
                        </div>
                        <span className="text-xs font-bold text-gray-600 mt-2">Client</span>
                      </div>

                      <div className="flex-1 h-1 bg-gray-200 mx-2 relative overflow-hidden rounded-full">
                        <div id="request-packet" className="absolute top-0 left-0 h-full w-12 bg-blue-500 rounded-full hidden"></div>
                      </div>

                      <div className="flex flex-col items-center z-10 w-24">
                        <div
                          id="lb-node"
                          ref={lbNodeRef}
                          className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-xl border-4 border-blue-100 transition-all duration-300"
                        >
                          ⚖️
                        </div>
                        <span className="text-xs font-bold text-blue-700 mt-2">RPC Gateway</span>
                      </div>

                      <div className="flex-1 flex relative mx-2 h-32 items-center">
                        <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: "none" }}>
                          <path d="M0,64 C50,64 50,16 100,16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                          <path
                            id="path-top"
                            ref={pathTopRef}
                            d="M0,64 C50,64 50,16 100,16"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-all duration-500"
                          />

                          <path d="M0,64 L100,64" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                          <path
                            id="path-mid"
                            ref={pathMidRef}
                            d="M0,64 L100,64"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-all duration-500"
                          />

                          <path d="M0,64 C50,64 50,112 100,112" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                          <path
                            id="path-bot"
                            ref={pathBotRef}
                            d="M0,64 C50,64 50,112 100,112"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="transition-all duration-500"
                          />
                        </svg>
                      </div>

                      <div className="flex flex-col gap-4 z-10 w-32">
                        <div
                          id="provider-1"
                          ref={provider1Ref}
                          className="provider-card p-3 bg-white border-2 border-gray-100 rounded-lg shadow-sm flex items-center gap-3 transition-all duration-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div>
                            <div className="text-xs font-bold text-gray-800">Provider A</div>
                            <div className="text-[10px] text-gray-500">Helius</div>
                          </div>
                        </div>
                        <div
                          id="provider-2"
                          ref={provider2Ref}
                          className="provider-card p-3 bg-white border-2 border-gray-100 rounded-lg shadow-sm flex items-center gap-3 transition-all duration-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div>
                            <div className="text-xs font-bold text-gray-800">Provider B</div>
                            <div className="text-[10px] text-gray-500">Triton</div>
                          </div>
                        </div>
                        <div
                          id="provider-3"
                          ref={provider3Ref}
                          className="provider-card p-3 bg-white border-2 border-gray-100 rounded-lg shadow-sm flex items-center gap-3 transition-all duration-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div>
                            <div className="text-xs font-bold text-gray-800">Provider C</div>
                            <div className="text-[10px] text-gray-500">QuickNode</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 h-32 overflow-y-auto shadow-inner border border-gray-700"
                      id="console-logs"
                      ref={logContainerRef}
                    >
                      {logs.map((entry) => (
                        <div key={entry.id} className={`font-mono mb-1 ${entry.colorClass}`}>
                          {entry.time ? <span className="opacity-50">[{entry.time}]</span> : null} {entry.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="observability" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Deep Observability</h2>
                <p className="text-gray-600 mb-6">
                  We prioritize giving developers total visibility. We use <strong>Clickhouse</strong> to store
                  high-cardinality data for instant analytics on every single request.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Full Request Logging:</strong> Capture bodies, headers, and responses.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Security Fingerprinting:</strong> Log IP addresses and TLS fingerprints to block abuse.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Performance Metrics:</strong> Breakdown latency by provider, method, and region.
                    </span>
                  </li>
                </ul>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <h4 className="font-bold text-purple-900 mb-2">Why Clickhouse?</h4>
                  <p className="text-sm text-purple-800">
                    Postgres is great for user data (Accounts, Keys), but Clickhouse is essential for the sheer volume
                    of logs (Millions of RPC calls) required for real-time analytics without slowing down the gateway.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Global Request Latency (ms)</h3>
                <div className="chart-container">
                  <canvas id="observabilityChart" ref={chartCanvasRef}></canvas>
                </div>
              </div>
            </div>
          </section>

          <section id="stack" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">The Architecture Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-orange-200 transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rust Server</h3>
                <p className="text-gray-600 text-sm mb-4">
                  The "Gateway". Handles incoming traffic, TLS termination, and strategy execution.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Memory safe &amp; blazing fast</li>
                  <li>• Async Tokio runtime</li>
                  <li>• Custom Load Balancing logic</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  🐘
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">PostgreSQL</h3>
                <p className="text-gray-600 text-sm mb-4">
                  The "Source of Truth". Stores user configurations, API keys, and persistent state.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Relational data integrity</li>
                  <li>• User Accounts &amp; Projects</li>
                  <li>• Provider configurations</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-yellow-200 transition-all group">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clickhouse</h3>
                <p className="text-gray-600 text-sm mb-4">
                  The "Analyst". Ingests massive streams of logs for real-time querying.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Columnar storage for speed</li>
                  <li>• Peta-byte scale logging</li>
                  <li>• Instant aggregate queries</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Developer Experience First</h2>
                <p className="text-gray-400 mb-8">We aren't just building infrastructure; we are building tools.</p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-lg">Integrated Playground</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Build, save, and share RPC requests. Export to cURL or TypeScript instantly. No more boilerplate.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-lg">Devnet Support</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Test without fear. Full support for Devnet clusters with integrated faucets, allowing teams to
                        simulate production environments for free.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 font-mono text-sm shadow-2xl">
                <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-auto text-xs text-gray-500">Playground.ts</span>
                </div>
                <div className="text-blue-300">const</div> <div className="inline text-yellow-300">connection</div> ={" "}
                <div className="inline text-blue-300">new</div> <div className="inline text-green-300">Connection</div>(
                <span className="text-white">"https://rpc.ag"</span>);<br />
                <br />
                <div className="text-gray-500">// Smart Routing handles the rest</div>
                <div className="text-blue-300">await</div> <div className="inline text-yellow-300">connection</div>.
                <div className="inline text-purple-300">getAccountInfo</div>(publicKey);<br />
                <br />
                <div className="text-gray-500">// Sending TX broadcasts to all providers</div>
                <div className="text-blue-300">await</div> <div className="inline text-yellow-300">connection</div>.
                <div className="inline text-purple-300">sendTransaction</div>(tx);<br />
                <br />
                <div className="p-3 bg-black/50 rounded mt-4 border-l-2 border-green-500">
                  <span className="text-green-400">➜ Success:</span> 200 OK<br />
                  <span className="text-gray-400">Latency:</span> 45ms<br />
                  <span className="text-gray-400">Provider:</span> Helius (Fastest)
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
          </section>
        </main>

        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm mb-4">Built for the Open Source Community.</p>
            <div className="flex justify-center gap-6 opacity-60">
              <span className="text-2xl">🦀</span>
              <span className="text-2xl">⚡</span>
              <span className="text-2xl">🐘</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
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

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pulse-active {
          animation: pulse 1.5s infinite;
          border-color: #3b82f6;
          background-color: #eff6ff;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
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

        body {
          background: #fafaf9;
          line-height: 1.625;
        }
      `}</style>
    </>
  );
}
