"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Satellite,
  Shield,
  Zap,
  Lock,
  Database,
  Signal,
  Activity,
  Home,
  ChevronRight,
  Globe,
  Radio
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
        setError("AUTHENTICATION_FAILED: ACCESS_DENIED");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-blue/30 overflow-x-hidden">
      {/* 1. COMMAND NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-navy/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-blue p-2 rounded-lg">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter text-white uppercase">NCRN</span>
              <span className="text-[10px] font-mono font-bold text-brand-blue tracking-[0.2em]">SATELLITE LINK</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">System Status: Operational</span>
            </div>
            <LinkText label="Infrastructure" />
            <LinkText label="Mission ARC" />
            <LinkText label="Partners" />
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* AURORA BACKGROUND MESH */}
        <div className="absolute inset-x-0 top-0 h-[1000px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue/20 rounded-full blur-[160px] opacity-40 animate-pulse" />
          <div className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[140px] opacity-30" />
          <div className="absolute bottom-0 left-[20%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] opacity-20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        {/* 2. HERO SECTION */}
        <section className="container mx-auto px-6 pt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* LEFT: CONTENT */}
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 bg-brand-blue/10 border border-brand-blue/20 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-mono font-black text-brand-blue uppercase tracking-[0.3em]">Mission: Climate Resilience</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                  Global Satellite <br />
                  <span className="text-brand-blue italic">Monitoring.</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-xl font-medium leading-relaxed">
                  Deploying JAXA/NASA telemetry to remote Northern villages via LoRa Mesh. Secure, autonomous, and uninterrupted.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button title="View Coverage Map" className="w-full sm:w-auto px-10 py-5 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_15px_30px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3">
                  Live Telemetry <ChevronRight className="w-4 h-4" />
                </button>
                <button title="Live Telemetry" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md">
                  Coverage Map
                </button>
              </div>
            </div>

            {/* RIGHT: LOGIN CARD */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="group relative w-full max-w-md">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-brand-blue/20 rounded-5xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="glass-card p-10 space-y-8 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 border-white/20 rounded-5xl">
                  <div className="absolute top-0 right-0 p-8">
                    <Lock className="w-20 h-20 text-white/5 -rotate-12 translate-x-4 -translate-y-4" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Authorized Access</h2>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> Encrypted Channel v4.2
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Terminal ID</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all font-mono placeholder:text-slate-700"
                        placeholder="ADMIN_NODE_01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Cipher Key</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all font-mono placeholder:text-slate-700"
                        placeholder="••••••••••••"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl">
                        <p className="text-brand-red text-[10px] font-mono font-bold tracking-widest">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      title="Establish Link"
                      className="w-full h-16 bg-white hover:bg-slate-100 text-brand-navy font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Database className="w-5 h-5 animate-spin" />
                      ) : (
                        <>Establish Link <Zap className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TELEMETRY TICKER (MARQUEE) */}
        <section className="border-y border-white/5 bg-black/20 backdrop-blur-md overflow-hidden h-14 flex items-center">
          <div className="flex animate-marquee whitespace-nowrap">
            <TickerItem icon={<Activity className="w-3 h-3 text-brand-green" />} label="GLACIER_M1" value="STABLE (-4°C)" />
            <TickerItem icon={<Signal className="w-3 h-3 text-brand-blue" />} label="SAT_LATENCY" value="12ms" />
            <TickerItem icon={<Database className="w-3 h-3 text-brand-orange" />} label="SEISMIC_JP" value="MAG 2.4" />
            <TickerItem icon={<Radio className="w-3 h-3 text-white" />} label="MESH_NODES" value="1,248 ACTIVE" />
            <TickerItem icon={<Activity className="w-3 h-3 text-brand-green" />} label="GLACIER_M1" value="STABLE (-4°C)" />
            <TickerItem icon={<Signal className="w-3 h-3 text-brand-blue" />} label="SAT_LATENCY" value="12ms" />
            <TickerItem icon={<Database className="w-3 h-3 text-brand-orange" />} label="SEISMIC_JP" value="MAG 2.4" />
            <TickerItem icon={<Radio className="w-3 h-3 text-white" />} label="MESH_NODES" value="1,248 ACTIVE" />
          </div>
        </section>

        {/* 4. MISSION ARCHITECTURE (BENTO GRID) */}
        <section className="container mx-auto px-6 py-32 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-mono font-black text-brand-blue uppercase tracking-[0.5em]">System Infrastructure</h2>
            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Mission Architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Card 1: Orbital Intelligence */}
            <div className="md:col-span-2 md:row-span-2 glass-card p-10 flex flex-col justify-between group overflow-hidden border-white/5 hover:border-brand-blue/30 transition-all duration-500 rounded-4xl">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
                <Globe className="w-64 h-64 text-brand-blue/5" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="bg-brand-blue/10 w-fit p-4 rounded-2xl border border-brand-blue/20">
                  <Satellite className="w-8 h-8 text-brand-blue" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">Orbital Intelligence</h3>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                    Real-time high-fidelity imaging and thermal telemetry synced via Starlink&apos;s low-earth orbit constellation.
                  </p>
                </div>
              </div>
              <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest pt-8 relative z-10">
                L-BAND SPECTRUM : 1525–1559 MHz
              </div>
            </div>

            {/* Card 2: LoRa Fallback */}
            <div className="md:col-span-2 glass-card p-8 flex items-center gap-8 border-white/5 hover:border-brand-orange/30 transition-all duration-500 rounded-2xl">
              <div className="bg-brand-orange/10 p-5 rounded-2xl border border-brand-orange/20">
                <Radio className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-white uppercase tracking-tight">LoRa Fallback</h4>
                <p className="text-xs text-slate-500 font-medium whitespace-pre-wrap">Zero-internet communication protocol for grid outages.</p>
              </div>
            </div>

            {/* Card 3: Seismic AI */}
            <div className="glass-card p-8 flex flex-col justify-between border-white/5 hover:border-brand-green/30 transition-all duration-500 rounded-2xl">
              <div className="bg-brand-green/10 w-fit p-4 rounded-xl border border-brand-green/20">
                <Activity className="w-5 h-5 text-brand-green" />
              </div>
              <div className="space-y-2 pt-6">
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Seismic AI</h4>
                <p className="text-[10px] text-slate-500 font-mono">Predictive analysis.</p>
              </div>
            </div>

            {/* Card 4: Village Network */}
            <div className="glass-card p-8 flex flex-col justify-between border-white/5 hover:border-brand-blue/30 transition-all duration-500 rounded-2xl">
              <div className="bg-brand-blue/10 w-fit p-4 rounded-xl border border-brand-blue/20">
                <Home className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="space-y-2 pt-6">
                <h4 className="text-lg font-black text-white uppercase tracking-tight">1,248 Nodes</h4>
                <p className="text-[10px] text-slate-500 font-mono">Active Village Grid.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TRUST INDICATORS (FOOTER AREA) */}
        <section className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="flex flex-col items-center gap-12">
            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.4em]">Trusted by International Partners</span>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-40 hover:grayscale-0 transition-all duration-500">
              <PartnerLogo name="JAXA" />
              <PartnerLogo name="NASA" />
              <PartnerLogo name="UNDRR" />
              <PartnerLogo name="ESA" />
              <PartnerLogo name="NOAA" />
            </div>

            <div className="pt-20 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Satellite className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">NCRN SATELLITE NETWORK</span>
              </div>
              <p className="text-[9px] font-mono text-slate-600">© 2026 NORTHERN CLIMATE RESILIENCE NETWORK // ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function LinkText({ label }: { label: string }) {
  return (
    <span className={cn("text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors")}>
      {label}
    </span>
  );
}

function TickerItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 px-12 border-r border-white/5">
      {icon}
      <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase tracking-widest">{label}:</span>
      <span className="text-[10px] font-mono font-black text-white italic">{value}</span>
    </div>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <span className="text-3xl font-black tracking-tighter text-white opacity-80 cursor-default hover:opacity-100 transition-opacity">
      {name}
    </span>
  );
}
