"use client";

import { useState } from "react";
import { useSatelliteSystem } from "@/hooks/useSatelliteSystem";
import {
    Radio,
    Send,
    AlertTriangle,
    Activity,
    Map as MapIcon,
    Layers,
    Settings,
    LogOut,
    Clock,
    Globe,
    Database,
    Wifi,
    Zap
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function HQDashboard() {
    const { transmitAlert, alerts } = useSatelliteSystem();
    const [region, setRegion] = useState("Glacier-Sector-7");
    const [severity, setSeverity] = useState<"Warning" | "Critical">("Warning");
    const [message, setMessage] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleTransmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) return;

        setIsTransmitting(true);

        // Simulate satellite uplink delay
        setTimeout(() => {
            transmitAlert(region, severity, message);
            setMessage("");
            setIsTransmitting(false);
        }, 2000);
    };

    return (
        <div className="flex h-screen bg-brand-navy text-slate-200 overflow-hidden font-sans">
            {/* Sidebar - ISA Style */}
            <aside className="w-72 border-r border-white/5 bg-slate-950/40 backdrop-blur-2xl flex flex-col p-8 space-y-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-brand-blue/20 rounded border border-brand-blue/30">
                        <Radio className="w-6 h-6 text-brand-blue pulsate" />
                    </div>
                    <div className="space-y-0">
                        <span className="font-bold tracking-tighter text-2xl block leading-none">NCRN<span className="text-brand-blue">.</span>HQ</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">Operations Command</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <h3 className="text-[10px] uppercase font-bold text-slate-600 tracking-[0.2em] mb-4 ml-2">Mission Control</h3>
                    <NavItem icon={<Activity className="w-4 h-4" />} label="Live Monitor" active />
                    <NavItem icon={<MapIcon className="w-4 h-4" />} label="Geospatial Hub" />
                    <NavItem icon={<Database className="w-4 h-4" />} label="Node Clusters" />
                    <NavItem icon={<Layers className="w-4 h-4" />} label="Resilience Grid" />

                    <div className="pt-6">
                        <h3 className="text-[10px] uppercase font-bold text-slate-600 tracking-[0.2em] mb-4 ml-2">Infrastructure</h3>
                        <NavItem icon={<Settings className="w-4 h-4" />} label="System Config" />
                    </div>
                </nav>

                <Link href="/" className="flex items-center gap-3 p-4 rounded-xl text-slate-500 hover:bg-brand-red/10 hover:text-brand-red transition-all mt-auto group border border-transparent hover:border-brand-red/20 font-mono text-xs uppercase tracking-widest">
                    <LogOut className="w-4 h-4" />
                    <span>TERMINATE SESSION</span>
                </Link>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">

                {/* Upper Dashboard Header */}
                <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-slate-950/20 backdrop-blur-md">
                    <div className="flex items-center gap-12">
                        <div className="space-y-1.5">
                            <h2 className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em]">Network Integrity</h2>
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                <span className="text-xs font-bold font-mono tracking-tight">NODES SECURE (14/14)</span>
                            </div>
                        </div>

                        <HeaderMetric label="Signal Strength" value="98.2%" icon={<Signal className="w-3 h-3 text-brand-blue" />} />
                        <HeaderMetric label="Mesh Failover" value="READY" icon={<Zap className="w-3 h-3 text-brand-orange" />} />
                    </div>

                    <div className="flex items-center gap-8 bg-white/5 p-3 px-5 rounded-lg border border-white/10 font-mono">
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase">Mission Clock</p>
                            <p className="text-sm font-bold tracking-widest">23:41:09 UTC</p>
                        </div>
                        <Clock className="w-5 h-5 text-brand-blue opacity-50" />
                    </div>
                </header>

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 pb-20">

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                        {/* ALERT TRANSMISSION FORM (Left 4 cols) */}
                        <div className="xl:col-span-4 space-y-6">
                            <div className="glass-card p-8 space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <Send className="w-5 h-5 text-brand-blue" /> UPLINK TRANSMITTER
                                    </h3>
                                    <p className="text-[10px] text-slate-500 font-mono">DECRYPTED PAYLOAD MODULE</p>
                                </div>

                                <form onSubmit={handleTransmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Destination Sector</label>
                                        <select
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-mono"
                                        >
                                            <option>GLACIER-S7-ALPHA</option>
                                            <option>AURORA-SETTLEMENT</option>
                                            <option>TUNDRA-RELAY-09</option>
                                            <option>NORTH-RIDGE-CORE</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Threat Assessment</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setSeverity("Warning")}
                                                className={`p-4 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-2 ${severity === "Warning" ? "bg-brand-orange/20 border-brand-orange text-brand-orange shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}
                                            >
                                                <AlertTriangle className="w-3.5 h-3.5" />
                                                WARNING
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSeverity("Critical")}
                                                className={`p-4 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-2 ${severity === "Critical" ? "bg-brand-red/20 border-brand-red text-brand-red shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}
                                            >
                                                <Shield className="w-3.5 h-3.5" />
                                                CRITICAL
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Command Summary</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={5}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-brand-blue transition-all resize-none font-mono"
                                            placeholder="Input emergency directive..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isTransmitting}
                                        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden relative"
                                    >
                                        {isTransmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                                ENCRYPTING & SENDING...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                BROADCAST TO SATELLITE
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* LIVE DATA & LOGS (Right 8 cols) */}
                        <div className="xl:col-span-8 space-y-8">

                            {/* Dynamic Heatmap Visualizer */}
                            <div className="glass-card h-[420px] relative overflow-hidden group">
                                {/* Background Radar Effect */}
                                <div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center">
                                    <div className="absolute w-[800px] h-[800px] border border-brand-blue/5 rounded-full" />
                                    <div className="absolute w-[600px] h-[600px] border border-brand-blue/5 rounded-full" />
                                    <div className="absolute w-[400px] h-[400px] border border-brand-blue/5 rounded-full" />
                                    <div className="absolute w-[200px] h-[200px] border border-brand-blue/10 rounded-full" />

                                    {/* Radial Pulse */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-blue)_0%,_transparent_55%)] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700" />

                                    {/* Simulated Blips */}
                                    <Blip top="30%" left="40%" label="N-09" active />
                                    <Blip top="60%" left="75%" label="S-12" active />
                                    <Blip top="45%" left="20%" label="W-04" warning />

                                    <div className="text-center z-20 space-y-4">
                                        <Globe className="w-24 h-24 text-brand-blue/20 mx-auto animate-[spin_20s_linear_infinite]" />
                                        <div className="space-y-1">
                                            <h4 className="text-2xl font-black italic tracking-tighter text-slate-300">NORTH RIDGE CLIMATE GRID</h4>
                                            <p className="text-[10px] font-mono text-brand-blue uppercase tracking-[0.4em]">Sub-Surface Seismic Monitoring Active</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Overlay UI elements */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 px-4 rounded-full border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-300">LIVE SPECTRAL FEED</span>
                                </div>

                                <div className="absolute bottom-6 right-6 font-mono text-[9px] text-brand-blue/50 flex gap-4">
                                    <span>LONG: 69.42' N</span>
                                    <span>LAT: 133.72' W</span>
                                </div>
                            </div>

                            {/* Lower grid for logs and health */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <section className="glass-card p-6 flex flex-col h-64">
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Clock className="w-3 h-3" /> Historical Log
                                    </h4>
                                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                        {alerts.length === 0 ? (
                                            <div className="h-full flex items-center justify-center flex-col opacity-20 italic font-mono text-sm">
                                                <Database className="w-8 h-8 mb-2" />
                                                No records found
                                            </div>
                                        ) : (
                                            alerts.map((alert) => (
                                                <div key={alert.id} className="group border-l-2 border-white/5 pl-4 pb-1 hover:border-brand-blue/30 transition-colors">
                                                    <div className="flex justify-between items-start">
                                                        <span className={cn(
                                                            "text-[10px] font-black tracking-tight",
                                                            alert.severity === 'Critical' ? 'text-brand-red' : 'text-brand-orange'
                                                        )}>
                                                            {alert.severity} PRECEPT
                                                        </span>
                                                        <span className="text-[9px] font-mono text-slate-600">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-200 transition-colors">{alert.message}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>

                                <section className="glass-card p-6 flex flex-col h-64 justify-between">
                                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-6 flex items-center gap-2">
                                        <Shield className="w-3 h-3" /> System Integrity
                                    </h4>
                                    <div className="space-y-6">
                                        <ProgressMetric label="Cryo-Storage Cooling" percent={87} />
                                        <ProgressMetric label="Mesh Gateway Node-01" percent={99} status="optimal" />
                                        <ProgressMetric label="Packet Loss Ratio" percent={2} status="warning" invert />
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-600">
                                        <span>MTTR: 2.1m</span>
                                        <span>LOAD: 12%</span>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border",
            active
                ? "bg-brand-blue/10 text-brand-blue border-brand-blue/20 shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                : "text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300"
        )}>
            <div className={cn(
                "p-1.5 rounded-md",
                active ? "bg-brand-blue/20" : "bg-white/5"
            )}>
                {icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
        </div>
    );
}

function HeaderMetric({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <h2 className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em]">{label}</h2>
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-xs font-bold font-mono">{value}</span>
            </div>
        </div>
    );
}

function Blip({ top, left, label, active = false, warning = false }: { top: string, left: string, label: string, active?: boolean, warning?: boolean }) {
    return (
        <div className="absolute flex flex-col items-center gap-1" style={{ top, left }}>
            <div className={cn(
                "w-3 h-3 rounded-full border-2 border-white/20",
                active && "bg-brand-green animate-pulse",
                warning && "bg-brand-red animate-ping"
            )} />
            <span className="text-[8px] font-mono font-bold bg-black/60 px-1.5 rounded border border-white/10 uppercase">{label}</span>
        </div>
    );
}

function ProgressMetric({ label, percent, status = "default", invert = false }: { label: string, percent: number, status?: "optimal" | "warning" | "default", invert?: boolean }) {
    const getBarColor = () => {
        if (invert) {
            return percent > 50 ? "bg-brand-red" : "bg-brand-blue";
        }
        if (status === "optimal") return "bg-brand-green";
        if (status === "warning") return "bg-brand-orange";
        return "bg-brand-blue";
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
                <span className="text-[10px] font-mono text-slate-300">{percent}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", getBarColor())}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
