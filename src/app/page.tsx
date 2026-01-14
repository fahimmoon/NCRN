"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Satellite, Shield, Zap, Lock, Database, Signal } from "lucide-react";
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

    // Simulate auth delay
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/dashboard/hq");
      } else if (username === "village" && password === "village123") {
        router.push("/dashboard/village");
      } else {
        setError("Invalid credentials. Access Denied.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left Side: Info */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-brand-blue/20 rounded-xl border border-brand-blue/30 pulsate">
              <Satellite className="w-10 h-10 text-brand-blue" />
            </div>
            <div className="space-y-0">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                NCRN<span className="text-brand-blue">.</span>ARC
              </h1>
              <p className="text-xs font-mono tracking-[0.3em] text-brand-blue uppercase">Arctic Response Command</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-slate-200">
              Securing the North with <br />
              <span className="text-brand-blue italic font-bold">Autonomous Resilience.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Real-time glacier monitoring, seismic early warnings, and
              uninterrupted LoRa Mesh connectivity for off-grid settlements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Signal className="w-6 h-6" />}
              title="Satellite Uplink"
              desc="Active Starlink/Viasat Failover protocol for continuous HQ synchronization."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="LoRa Mesh"
              desc="Sub-GHz long-range fallback node network for local disaster response."
            />
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="glass-card p-10 w-full max-w-md space-y-8 relative overflow-hidden">
            {/* Inner card tech lines */}
            <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-brand-blue/20 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-brand-blue/20 rounded-bl-xl pointer-events-none" />

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Lock className="w-6 h-6 text-brand-blue" /> Terminal Access
              </h2>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                SERVER STATUS: SECURE
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">Node Identifier</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 transition-all font-mono"
                  placeholder="admin / village"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">Access Cipher</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-brand-red/10 border border-brand-red/20 rounded-md">
                  <p className="text-brand-red text-xs font-mono">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                {isLoading ? (
                  <>
                    <Database className="w-5 h-5 animate-spin" />
                    SYNCING...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    ESTABLISH LINK
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-40 font-mono text-[9px] uppercase tracking-widest">
              <span>System: 0x88F2-NCRN</span>
              <span>Enc: AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-card glass-card-hover p-6 space-y-4">
      <div className="text-brand-blue bg-brand-blue/10 w-fit p-3 rounded-lg border border-brand-blue/20">{icon}</div>
      <div className="space-y-1">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
