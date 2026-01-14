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
  CloudLightning
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
      <nav className="sticky top-0 z-[60] w-full border-b border-white/5 bg-brand-navy/70 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
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
              <NavLink label="Constellation" />
              <NavLink label="Coverage" />
            </nav>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] font-mono font-black text-brand-green uppercase tracking-widest">Uplink: Active</span>
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
                  <span className="text-[9px] font-mono font-black text-brand-blue uppercase tracking-[0.3em]">Early Warning System</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
                  Orbital <br />
                  <span className="text-brand-blue italic">Intelligence.</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-xl font-medium leading-relaxed">
                  Protecting Arctic communities through autonomous satellite observation and LoRa mesh networks.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/5">
                <HeroStat label="Active Sats" value="24" />
                <HeroStat label="Mesh Nodes" value="1,248" />
                <HeroStat label="Latency" value="12ms" />
                <HeroStat label="Uptime" value="99.9%" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 group">
                  Command Control <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md">
                  View Hardware
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
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">Node Login</h2>
                    </div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Secure Gateway ARC-V4
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-60">Terminal ID</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-brand-blue/50 transition-all font-mono"
                        placeholder="ADMIN_USER_01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-60">Cipher Key</label>
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
                      className="w-full h-14 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Synchronize <Zap className="w-4 h-4" /></>}
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
            <TickerData label="UPLINK_STRENGTH" value="-42dB" status="safe" />
            <TickerData label="GLACIER_DELTA" value="-0.04m" status="warning" />
            <TickerData label="SEISMIC_MAG" value="1.2" status="safe" />
            <TickerData label="LORA_HEALTH" value="98%" status="safe" />
            <TickerData label="TEMP_SURFACE" value="-31.4°C" status="warning" />
          </div>
        </section>

        {/* 4. COMPACT BENTO GRID */}
        <section className="container mx-auto px-6 py-20 space-y-12">
          <div ref={el => { revealRefs.current[2] = el }} className="space-y-3 text-center reveal">
            <h2 className="text-[10px] font-mono font-black text-brand-blue uppercase tracking-[0.4em]">Infrastructure</h2>
            <p className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">System Topology</p>
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
                    A network of 24 LEO satellites providing multi-spectral imagery and sub-millisecond sync capability.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8 relative z-10">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Mode</p>
                  <p className="text-xs font-black text-brand-blue uppercase">Thermal_Scan</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Sync</p>
                  <p className="text-xs font-black text-brand-blue uppercase">JAXA_T1</p>
                </div>
              </div>
            </div>

            <div ref={el => { revealRefs.current[4] = el }} className="md:col-span-2 glass-card p-8 flex flex-col justify-center gap-5 border-white/5 hover:border-brand-orange/30 transition-all duration-700 reveal rounded-[1.5rem]">
              <div className="bg-brand-orange/10 w-fit p-4 rounded-xl border border-brand-orange/20">
                <Radio className="w-6 h-6 text-brand-orange" />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">LoRa Mesh</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Autonomous 915MHz subnetworks for 100% reach during ISP failure.
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

        {/* 5. SLIM FOOTER */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/5 bg-brand-navy">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8 grayscale opacity-30 hover:grayscale-0 transition-all duration-700">
              <PartnerLogo name="JAXA" />
              <PartnerLogo name="NASA" />
              <PartnerLogo name="ESA" />
              <PartnerLogo name="UNDRR" />
            </div>
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <div className="flex items-center gap-2">
                <Satellite className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-black tracking-widest uppercase">NCRN Network</span>
              </div>
              <p className="text-[8px] font-mono text-slate-700 uppercase">© 2024 NORTHERN CLIMATE RESILIENCE NETWORK.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors group">
      {label}
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
