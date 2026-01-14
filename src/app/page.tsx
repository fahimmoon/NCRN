"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Satellite,
  Shield,
  Zap,
  Lock,
  Database,
  Signal,
  Activity,
  Globe,
  Radio,
  ChevronRight,
  Loader2,
  Server,
  Wifi,
  Cpu,
  Terminal,
  ArrowUpRight,
  Map as MapIcon,
  HardDrive,
  CloudLightning,
  RefreshCw,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/dashboard/hq");
      } else if (username === "village" && password === "village123") {
        router.push("/dashboard/village");
      } else {
        setError("AUTH_FAILURE: ACCESS_DENIED");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-blue/30 overflow-x-hidden text-brand-white font-sans relative">
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05]">
        <div className="scanline" />
      </div>

      {/* 1. COMPACT NAVBAR */}
      <nav className="sticky top-0 z-[60] w-full border-b border-white/5 bg-brand-navy/70 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-brand-blue p-2 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg font-black tracking-tighter uppercase text-white">NCRN</span>
              <span className="text-[8px] font-mono font-bold text-brand-blue tracking-widest uppercase">Arctic.Link</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-6">
              <NavLink label="Architecture" />
              <NavLink label="Network" />
              <NavLink label="Hardware" />
              <NavLink label="Security" />
            </nav>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full group cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] font-mono font-black text-brand-green uppercase tracking-widest">SAT_UP: OK</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* 2. COMPACT HERO */}
        <section className="container mx-auto px-6 pt-16 lg:pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <div ref={el => { revealRefs.current[0] = el }} className="lg:col-span-7 space-y-8 reveal">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 bg-brand-blue/10 border border-brand-blue/20 px-4 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-[9px] font-mono font-black text-brand-blue uppercase tracking-[0.3em]">Operational Readiness Status: 100%</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
                  Orbital <br />
                  <span className="text-brand-blue italic relative">
                    Intelligence.
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-blue/30" />
                  </span>
                </h1>
                <p className="text-lg text-slate-400 max-w-xl font-medium leading-relaxed">
                  The Northern Climate Resilience Network deploys semi-autonomous JAXA/NASA telemetry to remote Arctic settlements via hardened LoRaWAN mesh layers.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/5">
                <HeroStat label="Active Constellation" value="24" />
                <HeroStat label="Mesh Node Index" value="1,248" />
                <HeroStat label="Sync Latency" value="12ms" />
                <HeroStat label="System Uptime" value="99.9%" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 group">
                  Terminal Access <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md">
                  Mission Archive
                </button>
              </div>
            </div>

            {/* COMPACT LOGIN CARD */}
            <div ref={el => { revealRefs.current[1] = el }} className="lg:col-span-5 flex justify-center lg:justify-end reveal">
              <div className="group relative w-full max-w-[380px]">
                <div className="glass-card p-8 space-y-8 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 rounded-[2.5rem] border-white/15">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-4 h-4 text-brand-blue" />
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">System Node Login</h2>
                    </div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Encrypted Link: ARC-SECURE
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-60 cursor-default">Terminal ID</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-brand-blue/50 transition-all font-mono"
                        placeholder="ADMIN_USER_88"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-60 cursor-default">Cipher Key</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-brand-blue/50 transition-all font-mono"
                        placeholder="••••••••••••"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-brand-red/10 border border-brand-red/20 rounded-lg">
                        <p className="text-brand-red text-[9px] font-mono font-black tracking-widest uppercase">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg group"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Synchronize <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" /></>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SLIM DATA MARQUEE */}
        <section className="bg-black/50 border-y border-white/5 py-4 overflow-hidden backdrop-blur-md">
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
            <TickerData label="GLACIER_DELTA" value="-0.04m" status="warning" />
            <TickerData label="SEISMIC_MAG" value="1.2" status="safe" />
            <TickerData label="LORA_HEALTH" value="98%" status="safe" />
            <TickerData label="TEMP_SURFACE" value="-31.4°C" status="warning" />
            <TickerData label="GRID_INTEGRITY" value="OPTIMAL" status="safe" />
            <TickerData label="UPLINK_STRENGTH" value="-42dB" status="safe" />
            <TickerData label="GLACIER_DELTA" value="-0.04m" status="warning" />
            <TickerData label="SEISMIC_MAG" value="1.2" status="safe" />
            <TickerData label="LORA_HEALTH" value="98%" status="safe" />
          </div>
        </section>

        {/* 4. COMPACT BENTO FEATURE GRID */}
        <section className="container mx-auto px-6 py-20 space-y-12">
          <div ref={el => { revealRefs.current[2] = el }} className="space-y-3 text-center reveal">
            <h2 className="text-[10px] font-mono font-black text-brand-blue uppercase tracking-[0.4em]">Infrastructure</h2>
            <p className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Mission Topology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-5 h-auto md:h-[500px]">
            <div ref={el => { revealRefs.current[3] = el }} className="md:col-span-4 md:row-span-2 glass-card p-8 flex flex-col justify-between group overflow-hidden border-white/5 hover:border-brand-blue/30 transition-all duration-700 reveal rounded-[2rem]">
              <div className="space-y-8 relative z-10">
                <div className="bg-brand-blue/10 w-fit p-4 rounded-xl border border-brand-blue/20">
                  <Satellite className="w-6 h-6 text-brand-blue" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">Orbital Constellation</h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                    A distributed network of 24 LEO satellites providing multi-spectral imagery and high-precision seismic telemetry.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8 relative z-10 border-t border-white/5 pt-6">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Scanning Mode</p>
                  <p className="text-xs font-black text-brand-blue uppercase">Thermal_Spectral</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Encryption</p>
                  <p className="text-xs font-black text-brand-blue uppercase">AES_256_GCM</p>
                </div>
              </div>
            </div>

            <div ref={el => { revealRefs.current[4] = el }} className="md:col-span-2 glass-card p-8 flex flex-col justify-center gap-5 border-white/5 hover:border-brand-orange/30 transition-all duration-700 reveal rounded-[1.5rem]">
              <div className="bg-brand-orange/10 w-fit p-4 rounded-xl border border-brand-orange/20">
                <Radio className="w-6 h-6 text-brand-orange" />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">LoRa Mesh Relay</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Autonomous 915MHz subnetworks deployed for 100% reach during satellite or fiber outages.
              </p>
            </div>

            <div ref={el => { revealRefs.current[5] = el }} className="md:col-span-1 glass-card p-6 flex flex-col items-center justify-center gap-4 border-white/5 hover:border-brand-green/40 duration-700 reveal rounded-[1.5rem] group">
              <Database className="w-6 h-6 text-brand-green group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-slate-500 uppercase font-black">Cloud Core</span>
            </div>

            <div ref={el => { revealRefs.current[6] = el }} className="md:col-span-1 glass-card p-6 flex flex-col items-center justify-center gap-4 border-white/5 hover:border-brand-blue/40 duration-700 reveal rounded-[1.5rem] group">
              <Signal className="w-6 h-6 text-brand-blue group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-slate-500 uppercase font-black">Signal Hub</span>
            </div>
          </div>
        </section>

        {/* 5. NEW: SELF-HEALING MESH PROTOCOL (ADDITIONAL CONTENT) */}
        <section className="container mx-auto px-6 py-20 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={el => { revealRefs.current[7] = el }} className="space-y-8 reveal">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Self-Healing <br /> Mesh Protocol</h2>
                <p className="text-lg text-slate-400 font-medium leading-relaxed">
                  The LoRaWAN resilient layer utilizes a multi-hop self-healing algorithm. If a primary relay is obstructed, the signal automatically reroutes through the highest-strength adjacent node.
                </p>
              </div>
              <div className="space-y-4">
                <MeshFeature icon={<RefreshCw className="w-4 h-4" />} title="Dynamic Rerouting" description="Signal path optimized in real-time based on atmospheric interference." />
                <MeshFeature icon={<Search className="w-4 h-4" />} title="Auto-Discovery" description="New nodes are integrated into the mesh within 60 seconds of activation." />
                <MeshFeature icon={<Shield className="w-4 h-4" />} title="Interference Shield" description="Sub-GHz frequency hopping bypasses local storm-induced noise." />
              </div>
            </div>
            <div ref={el => { revealRefs.current[8] = el }} className="relative reveal">
              <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-12 overflow-hidden flex items-center justify-center">
                {/* Visualizing the Mesh */}
                <div className="relative w-full h-full">
                  <MeshNode top="20%" left="50%" label="Gateway" active />
                  <MeshNode top="50%" left="20%" label="Node_01" active />
                  <MeshNode top="50%" left="80%" label="Node_02" active />
                  <MeshNode top="80%" left="50%" label="Node_03" warning />

                  <svg className="absolute inset-0 w-full h-full opacity-20" stroke="currentColor">
                    <line x1="50%" y1="20%" x2="20%" y2="50%" strokeDasharray="4" />
                    <line x1="50%" y1="20%" x2="80%" y2="50%" strokeDasharray="4" />
                    <line x1="20%" y1="50%" x2="50%" y2="80%" strokeDasharray="4" />
                    <line x1="80%" y1="50%" x2="50%" y2="80%" strokeDasharray="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. NEW: ARCTIC INTELLIGENCE EDGE (ADDITIONAL CONTENT) */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
              <Cpu className="w-64 h-64" />
            </div>
            <div ref={el => { revealRefs.current[9] = el }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal relative z-10">
              <div className="space-y-6">
                <div className="bg-brand-blue/10 w-fit p-3 rounded-xl border border-brand-blue/20">
                  <Cpu className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Arctic-Edge Hardware</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Every node is a localized AI engine. We process seismic data at the edge, reducing emergency response time from minutes to milliseconds.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Temperature Tolerance</p>
                    <p className="text-lg font-black">-60°C to +45°C</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Power Source</p>
                    <p className="text-lg font-black">Multi-Cell Solar + RTG</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <EdgeSpec icon={<Layers className="w-5 h-5" />} label="OS" value="NCRN-Kernel v2" />
                <EdgeSpec icon={<HardDrive className="w-5 h-5" />} label="Storage" value="512GB NVG" />
                <EdgeSpec icon={<CloudLightning className="w-5 h-5" />} label="Comms" value="LoRa / Iridium" />
                <EdgeSpec icon={<Signal className="w-5 h-5" />} label="Compute" value="4-Core RISC-V" />
              </div>
            </div>
          </div>
        </section>

        {/* 7. SLIM FOOTER */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/5 bg-brand-navy">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-8 grayscale opacity-30 hover:grayscale-0 transition-all duration-700">
              <PartnerLogo name="JAXA" />
              <PartnerLogo name="NASA" />
              <PartnerLogo name="ESA" />
              <PartnerLogo name="UNDRR" />
            </div>
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <div className="flex items-center gap-2">
                <Satellite className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-black tracking-widest uppercase">NCRN Satellite Network</span>
              </div>
              <p className="text-[8px] font-mono text-slate-700 uppercase tracking-widest font-bold">ARC_CORE_STATUS: ACTIVE // ALL TERMINALS OPERATIONAL</p>
            </div>
          </div>
          <p className="text-center text-[8px] font-mono text-slate-800 uppercase font-black">© 2024 NORTHERN CLIMATE RESILIENCE NETWORK // BUILT FOR THE FRONTIER.</p>
        </footer>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({ label }: { label: string }) {
  return (
    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors group relative">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full" />
    </span>
  );
}

function HeroStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[8px] font-mono font-black text-slate-600 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-mono font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}

function TickerData({ label, value, status }: { label: string, value: string, status: 'safe' | 'warning' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-[0.2em]">{label}:</span>
      <span className={cn(
        "text-[9px] font-mono font-black tracking-widest italic",
        status === 'warning' ? "text-brand-orange" : "text-brand-green"
      )}>{value}</span>
      <div className="h-0.5 w-0.5 rounded-full bg-white/10 mx-2" />
    </div>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <span className="text-xl font-black tracking-tighter text-white opacity-80 cursor-default hover:opacity-100 transition-opacity uppercase">
      {name}
    </span>
  );
}

function MeshFeature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="bg-brand-blue/10 p-2 h-fit rounded-lg border border-brand-blue/20 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <h5 className="text-sm font-black uppercase tracking-tight">{title}</h5>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}

function MeshNode({ top, left, label, active = false, warning = false }: { top: string, left: string, label: string, active?: boolean, warning?: boolean }) {
  return (
    <div className="absolute flex flex-col items-center gap-2" style={{ top, left, transform: 'translate(-50%, -50%)' }}>
      <div className={cn(
        "w-3 h-3 rounded-full border border-white shadow-lg relative",
        active ? "bg-brand-blue" : "bg-slate-800",
        warning && "bg-brand-orange animate-pulse shadow-brand-orange/50"
      )}>
        {active && <div className="absolute inset-0 bg-brand-blue rounded-full animate-ping opacity-20" />}
      </div>
      <span className="text-[7px] font-mono font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">{label}</span>
    </div>
  );
}

function EdgeSpec({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 hover:bg-white/10 transition-all border-collapse">
      <div className="text-brand-blue">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-white uppercase">{value}</p>
      </div>
    </div>
  );
}
