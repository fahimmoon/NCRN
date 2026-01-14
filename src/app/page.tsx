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
  Globe,
  Radio,
  ChevronRight,
  Loader2,
  Server,
  Wifi
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
    <div className="min-h-screen bg-brand-navy selection:bg-brand-blue/30 overflow-x-hidden text-white font-sans">
      {/* 1. STICKY NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-navy/60 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-blue p-2 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">NCRN</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-mono font-black text-brand-green uppercase tracking-widest">SAT_LINK: ONLINE</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* AURORA INTERFACE BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-brand-blue/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        {/* 2. HERO SECTION */}
        <section className="container mx-auto px-6 pt-16 lg:pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* LEFT: CONTENT (The Pitch) */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <p className="text-[11px] font-mono font-black text-brand-blue uppercase tracking-[0.5em] opacity-80">
                  NORTHERN HEMISPHERE RESILIENCE NETWORK
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white">
                  Real-time Glacial & <br />
                  <span className="text-brand-blue italic">Seismic Monitoring.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
                  Leveraging JAXA/NASA constellations to provide millisecond-latency alerts
                  to remote villages via LoRaWAN mesh networks.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 pt-4 border-t border-white/5 max-w-xl">
                <StatItem label="Active Nodes" value="124" />
                <StatItem label="Latency" value="12ms" />
                <StatItem label="Uptime" value="99.9%" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-2xl flex items-center justify-center gap-3 group">
                  Global Coverage <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md">
                  Whitepapers
                </button>
              </div>
            </div>

            {/* RIGHT: PORTAL (Login Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="group relative w-full max-w-md">
                <div className="absolute inset-0 bg-brand-blue/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 space-y-8 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 rounded-[3rem]">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Mission Control Login</h2>
                    <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Secure Gateway Access
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest active:tracking-normal cursor-default ml-1">Terminal ID</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all font-mono placeholder:text-slate-700"
                        placeholder="ADMIN_NODE_01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest cursor-default ml-1">Cipher Key</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all font-mono placeholder:text-slate-700"
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
                      className="w-full h-18 bg-white hover:bg-slate-100 text-brand-navy font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>Establish Sync Link <Zap className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE DATA STREAM TICKER */}
        <section className="bg-black/40 border-y border-white/5 py-5 overflow-hidden backdrop-blur-sm">
          <div className="flex animate-marquee whitespace-nowrap gap-16">
            <TickerItem label="GLOF_WARNING" value="INDEX 0.4 (SAFE)" status="safe" />
            <TickerItem label="SEISMIC_EVENT" value="MAG 1.2 (HOKKAIDO)" status="safe" />
            <TickerItem label="WEATHER_SAT" value="-12°C (GILGIT)" status="safe" />
            <TickerItem label="GRID_INTEGRITY" value="OPTIMAL (100%)" status="safe" />
            <TickerItem label="GLOF_WARNING" value="INDEX 0.4 (SAFE)" status="safe" />
            <TickerItem label="SEISMIC_EVENT" value="MAG 1.2 (HOKKAIDO)" status="safe" />
            <TickerItem label="WEATHER_SAT" value="-12°C (GILGIT)" status="safe" />
            <TickerItem label="GRID_INTEGRITY" value="OPTIMAL (100%)" status="safe" />
          </div>
        </section>

        {/* 4. FEATURE GRID (BENTO STYLE) */}
        <section className="container mx-auto px-6 py-32 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-[11px] font-mono font-black text-brand-blue uppercase tracking-[0.5em]">Global Infrastructure</h2>
            <p className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">System Architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-brand-blue" />}
              title="Orbital Imaging"
              description="Real-time multi-spectral imaging and sub-surface thermal sensors detecting glacier melt and motion with 2cm precision."
            />
            <FeatureCard
              icon={<Wifi className="w-8 h-8 text-brand-orange" />}
              title="Offline Fallback"
              description="When cellular and fiber grids fail, local 915MHz LoRa mesh relay takes over, ensuring emergency directives reach every node."
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8 text-brand-green" />}
              title="Mass Broadcast"
              description="Instant mobile push and audio-visual alarms deployed across the network within 200ms of seismic event detection."
            />
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="container mx-auto px-6 py-20 border-t border-white/5">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center max-w-md">
                Operational Partner of International Space Agencies <br />
                including JAXA, NASA, and the UNDRR.
              </p>
            </div>
            <div className="pt-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-brand-blue" />
                <span className="text-[11px] font-black tracking-widest">NCRN NETWORK</span>
              </div>
              <p className="text-[9px] font-mono text-slate-600">© 2024 NORTHERN CLIMATE RESILIENCE NETWORK // ALL TERMINALS ACTIVE.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-mono font-black text-white">{value}</p>
    </div>
  );
}

function TickerItem({ label, value, status }: { label: string, value: string, status: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-[0.2em]">{label}:</span>
      <span className="text-[11px] font-mono font-bold text-white tracking-tight">{value}</span>
      <div className="h-1 w-1 rounded-full bg-slate-800 mx-4" />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-8 hover:bg-white/[0.07] transition-all hover:-translate-y-2 group">
      <div className="bg-white/5 w-fit p-5 rounded-2xl group-hover:bg-brand-blue/10 transition-colors">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
