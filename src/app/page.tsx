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

  // Intersection Observer for reveal animations
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
        setError("AUTH_FAILURE: INVALID_CREDENTIALS");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-blue/30 overflow-x-hidden text-brand-white font-sans relative">
      {/* SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-10">
        <div className="scanline" />
      </div>

      {/* 1. STICKY COMMAND NAVBAR */}
      <nav className="sticky top-0 z-[60] w-full border-b border-white/5 bg-brand-navy/60 backdrop-blur-xl transition-all duration-500">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-brand-blue p-2.5 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter uppercase text-white">NCRN</span>
              <span className="text-[9px] font-mono font-bold text-brand-blue tracking-[0.3em] uppercase">Arctic.Link</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              <NavLink label="Architecture" />
              <NavLink label="Constellation" />
              <NavLink label="Coverage" />
            </nav>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-inner">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
              <span className="text-[10px] font-mono font-black text-brand-green uppercase tracking-[0.2em]">Uplink: Active</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-5%] right-[-10%] w-[70%] h-[70%] bg-brand-blue/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px]" />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:6rem_6rem]" />
        </div>

        {/* 2. HERO SECTION */}
        <section className="container mx-auto px-6 pt-24 lg:pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* LEFT: MISSION PITCH */}
            <div ref={el => { revealRefs.current[0] = el }} className="lg:col-span-7 space-y-12 reveal">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-brand-blue/10 border border-brand-blue/20 px-5 py-2.5 rounded-full shadow-xl">
                  <Zap className="w-4 h-4 text-brand-blue animate-pulse" />
                  <span className="text-[11px] font-mono font-black text-brand-blue uppercase tracking-[0.4em]">Next-Gen Early Warning System</span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                  Orbital <br />
                  <span className="text-brand-blue italic relative">
                    Intelligence.
                    <div className="absolute -bottom-4 left-0 w-full h-2 bg-brand-blue/20 blur-sm" />
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed">
                  Protecting remote Arctic communities through autonomous JAXA/NASA satellite observation and 915MHz LoRa fallback mesh networks.
                </p>
              </div>

              {/* Technical Stats Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6 border-t border-white/5">
                <HeroStat label="Active Sats" value="24" />
                <HeroStat label="Mesh Nodes" value="1,248" />
                <HeroStat label="Latency" value="12ms" />
                <HeroStat label="Data/Sec" value="4.2gb" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button className="w-full sm:w-auto px-12 py-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all shadow-[0_20px_50px_rgba(59,130,246,0.4)] flex items-center justify-center gap-4 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                  Enter Command Control <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all backdrop-blur-md flex items-center gap-3">
                  View Architecture <Server className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>

            {/* RIGHT: PORTAL INTERFACE */}
            <div ref={el => { revealRefs.current[1] = el }} className="lg:col-span-5 flex justify-center lg:justify-end reveal">
              <div className="group relative w-full max-w-md animate-float">
                <div className="absolute inset-0 bg-brand-blue/30 rounded-[3.5rem] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                <div className="glass-card p-12 space-y-10 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-4 rounded-[3.5rem] border-white/20 shadow-2xl">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-2xl -translate-y-1/2 translate-x-1/2" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-brand-blue" />
                      <h2 className="text-3xl font-black text-white uppercase tracking-tight">System Node Login</h2>
                    </div>
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Secure Gateway: ARC-V4.2
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-70">Terminal ID</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all font-mono placeholder:text-slate-800"
                        placeholder="ADMIN_USER_07"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1 opacity-70">Cipher Payload</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all font-mono placeholder:text-slate-800"
                        placeholder="••••••••••••••••"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl animate-shake">
                        <p className="text-brand-red text-[10px] font-mono font-black tracking-widest uppercase">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-20 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl relative overflow-hidden group/btn"
                    >
                      {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>Synchronize Link <Zap className="w-5 h-5 fill-current" /></>
                      )}
                    </button>
                  </form>

                  <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Protocol: RSA_4096</span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Region: ARCTIC_A7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DYNAMIC DATA MARQUEE */}
        <section className="bg-black/60 border-y border-white/5 py-6 overflow-hidden backdrop-blur-md relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-navy to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-navy to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap gap-24 items-center">
            <TickerData label="GLACIER_DELTA" value="-0.04m" status="warning" />
            <TickerData label="SEISMIC_MAG" value="1.2" status="safe" />
            <TickerData label="LORA_HEALTH" value="98%" status="safe" />
            <TickerData label="TEMP_SURFACE" value="-31.4°C" status="warning" />
            <TickerData label="UPLINK_STRENGTH" value="-42dB" status="safe" />
            <TickerData label="WIND_VELOCITY" value="54km/h" status="safe" />
            <TickerData label="GLACIER_DELTA" value="-0.04m" status="warning" />
            <TickerData label="SEISMIC_MAG" value="1.2" status="safe" />
            <TickerData label="LORA_HEALTH" value="98%" status="safe" />
            <TickerData label="TEMP_SURFACE" value="-31.4°C" status="warning" />
          </div>
        </section>

        {/* 4. MISSION INFRASTRUCTURE: BENTO GRID */}
        <section className="container mx-auto px-6 py-32 space-y-20">
          <div ref={el => { revealRefs.current[2] = el }} className="space-y-6 text-center reveal">
            <h2 className="text-[11px] font-mono font-black text-brand-blue uppercase tracking-[0.6em]">System Topology</h2>
            <p className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">Global Architecture</p>
            <div className="h-1 w-24 bg-brand-blue mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-8 h-auto md:h-[700px]">
            {/* LARGE CARD: Orbital Intelligence */}
            <div ref={el => { revealRefs.current[3] = el }} className="md:col-span-4 md:row-span-2 glass-card p-12 flex flex-col justify-between group overflow-hidden border-white/5 hover:border-brand-blue/30 transition-all duration-700 reveal rounded-[3rem]">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] group-hover:bg-brand-blue/10 transition-all duration-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                <Globe className="w-[500px] h-[500px] animate-[spin_100s_linear_infinite]" />
              </div>

              <div className="space-y-10 relative z-10">
                <div className="bg-brand-blue/10 w-fit p-6 rounded-[2rem] border border-brand-blue/20 shadow-2xl">
                  <Satellite className="w-10 h-10 text-brand-blue" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">Orbital Constellation</h3>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                    A distributed network of 24 LEO satellites providing multi-spectral imagery and LIDAR glacier monitoring with sub-millisecond sync capability.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12 relative z-10 pt-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Scanning Mode</p>
                  <p className="text-sm font-black text-brand-blue">ACTIVE_THERMAL</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Sync Protocol</p>
                  <p className="text-sm font-black text-brand-blue">JAXA_T1_HYDRA</p>
                </div>
              </div>
            </div>

            {/* MEDIUM CARD: LoRaWAN Tech */}
            <div ref={el => { revealRefs.current[4] = el }} className="md:col-span-2 glass-card p-10 flex flex-col justify-center gap-6 border-white/5 hover:border-brand-orange/30 transition-all duration-700 reveal rounded-[2.5rem]">
              <div className="bg-brand-orange/10 w-fit p-5 rounded-2xl border border-brand-orange/20">
                <Radio className="w-8 h-8 text-brand-orange" />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight">LoRa Mesh Relay</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Autonomous 915MHz subnetworks deployed in villages to ensure 100% notification reach even during complete ISP failures.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[10px] font-mono font-black text-brand-orange uppercase tracking-widest">RF_LINK: 100%</span>
              </div>
            </div>

            {/* SMALL CARD: Cloud Core */}
            <div ref={el => { revealRefs.current[5] = el }} className="md:col-span-1 glass-card p-8 flex flex-col items-center justify-center gap-6 border-white/5 hover:border-brand-green/40 transition-all duration-700 reveal rounded-[2.5rem] group">
              <div className="bg-brand-green/10 p-6 rounded-2xl border border-brand-green/20 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7 text-brand-green" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-white uppercase tracking-tight whitespace-nowrap">Cloud Core</h4>
                <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest leading-none">Distributed AI</p>
              </div>
            </div>

            {/* SMALL CARD: Signal Intelligence */}
            <div ref={el => { revealRefs.current[6] = el }} className="md:col-span-1 glass-card p-8 flex flex-col items-center justify-center gap-6 border-white/5 hover:border-brand-blue/40 transition-all duration-700 reveal rounded-[2.5rem] group">
              <div className="bg-brand-blue/10 p-6 rounded-2xl border border-brand-blue/20 group-hover:scale-110 transition-transform">
                <Signal className="w-7 h-7 text-brand-blue" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-white uppercase tracking-tight whitespace-nowrap">SIG_INTEL</h4>
                <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest leading-none">Telemetry Logic</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COVERAGE MAP CONCEPT SECTION */}
        <section className="container mx-auto px-6 py-24 mb-32 overflow-hidden relative">
          <div className="bg-white/5 border border-white/10 rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10 relative z-10">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">Arctic Wide <br /> Connectivity.</h2>
                <p className="text-xl text-slate-400 font-medium max-w-xl">
                  Our hardware is built to withstand -60°C conditions, providing the first reliable high-speed data link to the most remote settlements on the planet.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex-1">
                  <CloudLightning className="w-8 h-8 text-brand-blue mb-4" />
                  <h5 className="text-lg font-black uppercase mb-1">Storm Resistance</h5>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Grade-4 Seismic Hardening</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex-1">
                  <MapIcon className="w-8 h-8 text-brand-green mb-4" />
                  <h5 className="text-lg font-black uppercase mb-1">Auto-Mapping</h5>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Real-time Terrain Sync</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl relative animate-float">
              <div className="aspect-square bg-brand-navy rounded-full border-2 border-brand-blue/20 relative shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden">
                {/* Radar Effect in the circle */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(59,130,246,0.15)_360deg)] animate-radar" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Globe className="w-full h-full p-20" />
                </div>
                {/* Beating dots */}
                <div className="absolute top-[30%] left-[40%] w-3 h-3 bg-brand-green rounded-full shadow-[0_0_15px_brand-green] animate-pulse" />
                <div className="absolute top-[60%] left-[65%] w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_15px_brand-blue] animate-pulse" />
                <div className="absolute top-[45%] left-[20%] w-3 h-3 bg-brand-orange rounded-full shadow-[0_0_15px_brand-orange] animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. SYSTEM FOOTER */}
        <footer className="container mx-auto px-6 py-24 border-t border-white/5 relative bg-brand-navy">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 text-center md:text-left">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="bg-brand-blue p-2 rounded-lg">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">NCRN ARC Network</span>
              </div>
              <p className="text-sm text-slate-500 font-medium max-w-sm">
                A multi-agency initiative providing climate resilience infrastructure for the northern hemisphere.
                JAXA-J-12 Mission Participant.
              </p>
            </div>
            <div className="space-y-6">
              <h6 className="text-[10px] font-mono font-black text-white/50 uppercase tracking-[0.3em]">Network Segments</h6>
              <div className="flex flex-col gap-4">
                <FooterLink label="Satellite Ops" />
                <FooterLink label="LoRa Mesh Tech" />
                <FooterLink label="Polar Telemetry" />
              </div>
            </div>
            <div className="space-y-6">
              <h6 className="text-[10px] font-mono font-black text-white/50 uppercase tracking-[0.3em]">Resources</h6>
              <div className="flex flex-col gap-4">
                <FooterLink label="Mission Archive" />
                <FooterLink label="API Endpoints" />
                <FooterLink label="Security Policy" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-16 border-t border-white/5">
            <div className="flex items-center gap-12 grayscale opacity-40 hover:grayscale-0 transition-all duration-700">
              <PartnerLogo name="JAXA" />
              <PartnerLogo name="NASA" />
              <PartnerLogo name="ESA" />
              <PartnerLogo name="UNDRR" />
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-[9px] font-mono font-black text-slate-500 tracking-[0.2em] uppercase">SYSTEM_STATE: OPERATIONAL // ARC_HQ_ALPHA</p>
              <p className="text-[9px] font-mono font-bold text-slate-700 uppercase">© 2024 NORTHERN CLIMATE RESILIENCE NETWORK. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors relative group">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full" />
    </span>
  );
}

function HeroStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">{label}</p>
      <p className="text-2xl font-mono font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}

function TickerData({ label, value, status }: { label: string, value: string, status: 'safe' | 'warning' }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.2em]">{label}:</span>
      <span className={cn(
        "text-[10px] font-mono font-black tracking-widest italic",
        status === 'warning' ? "text-brand-orange" : "text-brand-green"
      )}>{value}</span>
      <div className="h-1 w-1 rounded-full bg-white/10 mx-4" />
    </div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <span className="text-xs font-black text-slate-500 hover:text-white transition-colors cursor-pointer uppercase tracking-tight">
      {label}
    </span>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <span className="text-2xl font-black tracking-tighter text-white opacity-80 cursor-default hover:opacity-100 transition-opacity whitespace-nowrap">
      {name}
    </span>
  );
}
