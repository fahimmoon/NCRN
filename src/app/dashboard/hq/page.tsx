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
    Signal,
    Zap,
    ChevronRight,
    Shield,
    Monitor,
    Cpu,
    Satellite
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function HQDashboard() {
    const { transmitAlert, alerts } = useSatelliteSystem();
    const [region, setRegion] = useState("GLACIER-S7-ALPHA");
    const [severity, setSeverity] = useState<"Warning" | "Critical">("Warning");
    const [message, setMessage] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleTransmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) return;

        setIsTransmitting(true);
        setTimeout(() => {
            transmitAlert(region, severity, message);
            setMessage("");
            setIsTransmitting(false);
        }, 2000);
    };

    return (
        <div className="flex h-screen bg-brand-white text-brand-navy overflow-hidden font-sans">
            {/* 1. SIDEBAR (PRIMARY BASE: DEEP SPACE NAVY) */}
            <aside className="w-80 bg-brand-navy text-white flex flex-col p-8 space-y-12 z-20 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-brand-blue rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        <Satellite className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">NCRN<span className="text-brand-blue">.</span>ARC</span>
                        <span className="text-[9px] font-mono font-bold text-brand-blue tracking-[0.2em] uppercase opacity-80">Arctic Response Command</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-6 ml-2">Main Operations</p>
                    <NavItem icon={<Monitor className="w-4 h-4" />} label="Live Monitor" active />
                    <NavItem icon={<Signal className="w-4 h-4" />} label="Signal Hub" />
                    <NavItem icon={<MapIcon className="w-4 h-4" />} label="Geospatial" />
                    <NavItem icon={<Database className="w-4 h-4" />} label="Cloud Core" />

                    <div className="pt-8">
                        <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-6 ml-2">System Admin</p>
                        <NavItem icon={<Settings className="w-4 h-4" />} label="Configurations" />
                        <NavItem icon={<Shield className="w-4 h-4" />} label="Security" />
                    </div>
                </nav>

                <Link href="/" title="Terminate Session" className="bg-white/5 border border-white/10 flex items-center gap-4 p-5 rounded-2xl hover:bg-brand-red/20 hover:border-brand-red/30 hover:text-white transition-all transition-all duration-300 group">
                    <LogOut className="w-5 h-5 text-slate-500 group-hover:text-brand-red" />
                    <div className="flex flex-col -space-y-1">
                        <span className="text-[10px] uppercase font-black tracking-widest">Logout</span>
                        <span className="text-[8px] font-mono opacity-40">TERMINATE_SESSION</span>
                    </div>
                </Link>
            </aside>

            {/* MAIN CONTENT AREA (BACKGROUND: GLACIAL WHITE) */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

                {/* 2. HEADER (PRIMARY BASE: DEEP SPACE NAVY roles applied to accents) */}
                <header className="h-24 bg-white/80 border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md">
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Network Topology</span>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-xs font-black uppercase tracking-tight">Nodes Secure (14/14)</span>
                            </div>
                        </div>

                        <div className="h-10 w-[1px] bg-slate-200" />

                        <div className="flex gap-10">
                            <HeaderMetric label="Satellite Strength" value="98.2%" status="safe" />
                            <HeaderMetric label="Seismic Risk" value="Low" status="safe" />
                            <HeaderMetric label="Mesh Power" value="Optimal" status="safe" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right flex flex-col -space-y-1">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Mission Clock</span>
                            <span className="text-sm font-black tracking-widest font-mono uppercase">23:41:09 UTC</span>
                        </div>
                        <div className="bg-brand-navy/5 p-3 rounded-xl border border-brand-navy/5">
                            <Clock className="w-6 h-6 text-brand-navy/40" />
                        </div>
                    </div>
                </header>

                {/* WORKSPACE */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                        {/* LEFT: COMMAND MODULE */}
                        <div className="xl:col-span-4 space-y-8">
                            <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Send className="w-32 h-32 text-brand-blue" />
                                </div>

                                <div className="space-y-2 mb-10">
                                    <h3 className="text-2xl font-black flex items-center gap-4">
                                        <Zap className="w-6 h-6 text-brand-blue" /> Command Uplink
                                    </h3>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Broadcast Emergency Directive</p>
                                </div>

                                <form onSubmit={handleTransmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Destination Sector</label>
                                        <select
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-black focus:outline-none focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none"
                                        >
                                            <option>GLACIER-S7-ALPHA</option>
                                            <option>AURORA-SETTLEMENT</option>
                                            <option>TUNDRA-RELAY-09</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Threat Priority</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setSeverity("Warning")}
                                                className={cn(
                                                    "p-5 rounded-2xl border font-black text-xs transition-all flex items-center justify-center gap-3",
                                                    severity === "Warning"
                                                        ? "bg-brand-orange/10 border-brand-orange text-brand-orange shadow-lg shadow-brand-orange/10"
                                                        : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                                                )}
                                            >
                                                <AlertTriangle className="w-4 h-4" /> Warning
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSeverity("Critical")}
                                                className={cn(
                                                    "p-5 rounded-2xl border font-black text-xs transition-all flex items-center justify-center gap-3",
                                                    severity === "Critical"
                                                        ? "bg-brand-red/10 border-brand-red text-brand-red shadow-lg shadow-brand-red/10"
                                                        : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                                                )}
                                            >
                                                <Shield className="w-4 h-4" /> Critical
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Protocol Packet</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={5}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-blue/5 transition-all resize-none"
                                            placeholder="Input emergency directive details..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isTransmitting}
                                        className="w-full h-20 bg-brand-navy hover:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 disabled:opacity-50 overflow-hidden relative shadow-2xl"
                                    >
                                        {isTransmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                                Encrypting Data...
                                            </>
                                        ) : (
                                            <>Establish Satellite Sync <Send className="w-4 h-4 group-hover:translate-x-1" /></>
                                        )}
                                    </button>
                                </form>
                            </section>

                            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-4xl p-8 flex items-center gap-6">
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <Cpu className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-mono font-black text-brand-blue uppercase tracking-widest">Telemetry Node</p>
                                    <p className="text-sm font-bold opacity-70">A-Node Active // 0.04ms</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: MONITORING GRIDS */}
                        <div className="xl:col-span-8 space-y-10">

                            {/* ADVANCED RADAR MONITOR */}
                            <section className="bg-white border border-slate-200 rounded-[3rem] p-10 h-[500px] shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

                                <div className="flex items-center justify-between relative z-10 mb-10">
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                            <Globe className="w-6 h-6 text-brand-blue" /> Spectral Radar Feed
                                        </h3>
                                        <p className="text-[10px] font-mono font-bold text-slate-400">ARC-SAT-RELAY // N7_SECTOR</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-100 p-2 px-4 rounded-full border border-slate-200">
                                        <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                                        <span className="text-[9px] font-mono font-black uppercase opacity-60">Live Feed</span>
                                    </div>
                                </div>

                                <div className="h-full flex items-center justify-center relative">
                                    {/* Radar Rings */}
                                    <div className="absolute w-[600px] h-[600px] border border-slate-100 rounded-full" />
                                    <div className="absolute w-[450px] h-[450px] border border-slate-100 rounded-full" />
                                    <div className="absolute w-[300px] h-[300px] border border-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-brand-blue/5 animate-[pulse_4s_infinite]" />
                                    </div>

                                    {/* Interactive Globe Placeholder */}
                                    <Globe className="w-32 h-32 text-brand-navy/10 animate-[spin_60s_linear_infinite] z-0" />

                                    {/* Data markers */}
                                    <RadarMarker top="20%" left="60%" label="Hydra-09" status="safe" />
                                    <RadarMarker top="70%" left="30%" label="Tundra-01" status="alert" />
                                    <RadarMarker top="45%" left="80%" label="Perma-C" status="safe" />
                                </div>

                                <div className="absolute bottom-10 left-10 flex gap-8">
                                    <footer className="flex flex-col gap-1">
                                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Longitude</span>
                                        <span className="text-xs font-black font-mono">69.42&apos; N</span>
                                    </footer>
                                    <footer className="flex flex-col gap-1">
                                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Latitude</span>
                                        <span className="text-xs font-black font-mono">133.72&apos; W</span>
                                    </footer>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* ALERT LOGS */}
                                <section className="bg-white border border-slate-200 rounded-4xl p-8 h-80 flex flex-col shadow-lg">
                                    <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                        <Activity className="w-3 h-3" /> Historical Archive
                                    </h4>
                                    <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                                        {alerts.length === 0 ? (
                                            <div className="h-full flex items-center justify-center flex-col opacity-20 font-mono text-xs">
                                                <Database className="w-8 h-8 mb-4" /> NO DATA LOGGED
                                            </div>
                                        ) : (
                                            alerts.map((alert) => (
                                                <div key={alert.id} className="group flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 p-2 rounded-xl transition-all">
                                                    <div className={cn(
                                                        "w-1.5 h-10 rounded-full shrink-0",
                                                        alert.severity === 'Critical' ? "bg-brand-red" : "bg-brand-orange"
                                                    )} />
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[10px] font-black uppercase tracking-tight">{alert.region}</span>
                                                            <span className="text-[8px] font-mono opacity-50">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                                                        </div>
                                                        <p className="text-xs font-medium text-slate-500 leading-tight line-clamp-2">{alert.message}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>

                                {/* PERFORMANCE METRICS */}
                                <section className="bg-brand-navy text-white rounded-4xl p-8 h-80 flex flex-col shadow-lg shadow-brand-navy/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Cpu className="w-24 h-24" />
                                    </div>
                                    <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                        <Monitor className="w-3 h-3 text-brand-blue" /> Infrastructure Health
                                    </h4>

                                    <div className="space-y-8 flex-1 relative z-10">
                                        <BarMetric label="Core Temp" value={42} />
                                        <BarMetric label="Uplink Success" value={99} />
                                        <BarMetric label="Node Collision" value={8} invert />
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-widest font-bold">
                                        <span>CPU: 12%</span>
                                        <span>RAM: 4.2GB</span>
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
            "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2",
            active
                ? "bg-brand-blue border-brand-blue/30 text-white shadow-xl shadow-brand-blue/20"
                : "text-slate-500 border-transparent hover:bg-white/5 hover:text-white"
        )}>
            <div className={cn(
                "p-2 rounded-xl",
                active ? "bg-white/20" : "bg-white/5"
            )}>
                {icon}
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{label}</span>
        </div>
    );
}

function HeaderMetric({ label, value, status }: { label: string, value: string, status: "safe" | "alert" | "critical" }) {
    const getColor = () => {
        if (status === "safe") return "text-brand-green";
        if (status === "alert") return "text-brand-orange";
        return "text-brand-red";
    };

    return (
        <div className="space-y-0.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            <p className={cn("text-xs font-black uppercase tracking-tight", getColor())}>{value}</p>
        </div>
    );
}

function RadarMarker({ top, left, label, status }: { top: string, left: string, label: string, status: "safe" | "alert" }) {
    return (
        <div className="absolute flex flex-col items-center gap-1.5" style={{ top, left }}>
            <div className={cn(
                "w-2.5 h-2.5 rounded-full border-2 border-white",
                status === 'safe' ? "bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-brand-red animate-ping"
            )} />
            <span className="text-[8px] font-mono font-black bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100 uppercase translate-y-1">{label}</span>
        </div>
    );
}

function BarMetric({ label, value, invert = false }: { label: string, value: number, invert?: boolean }) {
    const getBarColor = () => {
        if (invert) return value > 50 ? "bg-brand-red" : "bg-brand-blue";
        if (value > 80) return "bg-brand-green";
        if (value > 40) return "bg-brand-blue";
        return "bg-brand-red";
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">{label}</span>
                <span className="text-[10px] font-mono font-bold">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", getBarColor())}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
