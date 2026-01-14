"use client";

import { useState, useEffect } from "react";
import { useSatelliteSystem } from "@/hooks/useSatelliteSystem";
import {
    Satellite,
    Radio,
    Send,
    AlertTriangle,
    Activity,
    Map as MapIcon,
    Layers,
    Settings,
    LogOut,
    Clock,
    Shield,
    Menu,
    X,
    Database,
    Signal,
    Zap,
    Globe,
    ChevronRight,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function HQDashboard() {
    const { transmitAlert, alerts } = useSatelliteSystem();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [region, setRegion] = useState("Sector Alpha-7");
    const [severity, setSeverity] = useState<"Warning" | "Critical">("Warning");
    const [message, setMessage] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toUTCString().split(" ")[4]);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleTransmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) return;
        setIsTransmitting(true);
        setTimeout(() => {
            transmitAlert(region, severity, message);
            setMessage("");
            setIsTransmitting(false);
        }, 1200);
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-brand-navy">
            {/* MOBILE BACKDROP */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* COMPACT SIDEBAR (240px) */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-[240px] bg-brand-navy text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col p-6 space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-blue rounded-lg shadow-lg">
                            <Satellite className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-xl font-black tracking-tighter uppercase">NCRN<span className="text-brand-blue">.</span>HQ</span>
                            <span className="text-[8px] font-mono font-bold text-brand-blue tracking-widest uppercase opacity-60">Control</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-4 ml-2">Center</p>
                        <NavItem icon={<Activity className="w-3.5 h-3.5" />} label="Monitor" active />
                        <NavItem icon={<MapIcon className="w-3.5 h-3.5" />} label="Geospatial" />
                        <NavItem icon={<Signal className="w-3.5 h-3.5" />} label="Telemetry" />

                        <div className="pt-6">
                            <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-4 ml-2">Admin</p>
                            <NavItem icon={<Settings className="w-3.5 h-3.5" />} label="Security" />
                            <NavItem icon={<Layers className="w-3.5 h-3.5" />} label="Config" />
                        </div>
                    </nav>

                    <Link href="/" className="bg-white/5 border border-white/10 flex items-center gap-3 p-4 rounded-xl hover:bg-brand-red/10 transition-all text-slate-400 hover:text-white group">
                        <LogOut className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* MAIN LAYOUT */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-slate-100 rounded-lg lg:hidden">
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-tight">
                            Operational <ChevronRight className="w-3 h-3 text-slate-300" /> <span className="text-brand-blue">Interface</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 border-r border-slate-100 pr-6">
                            <HeaderMetric label="Sats" value="24/24" status="safe" />
                            <HeaderMetric label="Nodes" value="1,248" status="safe" />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 p-2 px-3 rounded-lg border border-slate-200">
                            <div className="text-right hidden xs:block">
                                <p className="text-[8px] text-slate-400 uppercase font-black leading-none mb-1">UTC</p>
                                <p className="text-xs font-mono font-black">{currentTime || "00:00"}</p>
                            </div>
                            <Clock className="w-4 h-4 text-brand-blue" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <TelemetryCard label="Satellites" value="24" trend="+2%" icon={<Satellite className="w-4 h-4" />} />
                        <TelemetryCard label="Nodes" value="1.2k" trend="Stable" icon={<Radio className="w-4 h-4" />} />
                        <TelemetryCard label="Seismic" value="2.4" trend="Low" unit="M" icon={<Activity className="w-4 h-4" />} />
                        <TelemetryCard label="Latency" value="12" trend="-4ms" unit="ms" icon={<Signal className="w-4 h-4" />} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                        <div className="lg:col-span-2 bg-brand-navy rounded-[2rem] p-6 relative overflow-hidden shadow-xl min-h-[340px]">
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <h3 className="text-white text-xs font-black uppercase tracking-tight flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-brand-blue" /> Satellite Feed
                                </h3>
                                <div className="bg-white/5 border border-white/10 p-1.5 px-3 rounded-full flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                                    <span className="text-[8px] font-mono text-white/50 uppercase">Scan Active</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                                <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full" />
                                <div className="absolute w-[50%] h-[50%] border border-white/5 rounded-full" />
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_340deg,rgba(59,130,246,0.2)_360deg)] animate-radar rounded-full" />
                            </div>
                            <RadarDot top="30%" left="40%" label="N-09" />
                            <RadarDot top="60%" left="70%" label="ARC-1" alert />
                        </div>

                        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-md flex flex-col justify-between">
                            <div className="space-y-1 mb-6">
                                <h3 className="text-lg font-black flex items-center gap-3">
                                    <AlertTriangle className="w-5 h-5 text-brand-red" /> Transmitter
                                </h3>
                                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase">Secure Uplink Protocol</p>
                            </div>
                            <form onSubmit={handleTransmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-mono font-black text-slate-400 uppercase ml-1">Sector</label>
                                        <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] font-black outline-none focus:ring-2 focus:ring-brand-blue/10">
                                            <option>Alpha-7</option>
                                            <option>Aurora</option>
                                            <option>Tundra</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-mono font-black text-slate-400 uppercase ml-1">Priority</label>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => setSeverity("Warning")} className={cn("flex-1 p-2.5 rounded-lg border text-[10px] font-black", severity === "Warning" ? "bg-brand-orange/10 border-brand-orange text-brand-orange" : "bg-slate-50 border-slate-200 text-slate-400")}>Warn</button>
                                            <button type="button" onClick={() => setSeverity("Critical")} className={cn("flex-1 p-2.5 rounded-lg border text-[10px] font-black", severity === "Critical" ? "bg-brand-red/10 border-brand-red text-brand-red" : "bg-slate-50 border-slate-200 text-slate-400")}>Crit</button>
                                        </div>
                                    </div>
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] font-medium outline-none resize-none" placeholder="Directive payload..." required />
                                <button type="submit" disabled={isTransmitting} className={cn("w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg text-white", isTransmitting ? "bg-brand-red animate-pulse" : "bg-brand-navy hover:bg-slate-800")}>
                                    {isTransmitting ? "Broadcasting..." : "Transmit directive"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <section className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="w-5 h-5 text-brand-blue" />
                            <h3 className="text-md font-black uppercase tracking-tight">Archive</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="px-4 py-3 text-left text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">UTC</th>
                                        <th className="px-4 py-3 text-left text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Sector</th>
                                        <th className="px-4 py-3 text-left text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Message</th>
                                        <th className="px-4 py-3 text-right text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alerts.map((alert) => (
                                        <tr key={alert.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-4 text-[10px] font-mono font-bold text-slate-400">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="px-4 py-4 text-[11px] font-black uppercase">{alert.region}</td>
                                            <td className="px-4 py-4 text-[11px] text-slate-500 font-medium truncate max-w-[200px]">{alert.message}</td>
                                            <td className="px-4 py-4 text-right">
                                                <span className="text-[9px] font-black text-brand-green uppercase flex items-center justify-end gap-1.5"><div className="w-1 h-1 rounded-full bg-brand-green" /> SENT</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={cn("flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border", active ? "bg-brand-blue border-brand-blue/20 text-white shadow-lg shadow-brand-blue/20" : "text-slate-500 border-transparent hover:bg-white/5 hover:text-white")}>
            {icon}
            <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
        </div>
    );
}

function HeaderMetric({ label, value, status }: { label: string, value: string, status: "safe" | "alert" | "critical" }) {
    const color = status === "safe" ? "text-brand-green" : status === "alert" ? "text-brand-orange" : "text-brand-red";
    return (
        <div className="space-y-0.5">
            <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">{label}</span>
            <p className={cn("text-[11px] font-black uppercase", color)}>{value}</p>
        </div>
    );
}

function TelemetryCard({ label, value, trend, unit = "", icon }: { label: string, value: string, trend: string, unit?: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-brand-navy text-white rounded-lg">{icon}</div>
                <span className={cn("text-[8px] font-mono font-black px-1.5 py-0.5 rounded", trend.startsWith('+') ? "bg-brand-green/10 text-brand-green" : "bg-slate-100 text-slate-400")}>{trend}</span>
            </div>
            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-black text-brand-navy">{value}</span>
                <span className="text-[10px] font-mono text-slate-300 font-bold">{unit}</span>
            </div>
        </div>
    );
}

function RadarDot({ top, left, label, active = false, alert = false }: { top: string, left: string, label: string, active?: boolean, alert?: boolean }) {
    const color = alert ? "bg-brand-red" : active ? "bg-brand-green" : "bg-brand-blue";
    return (
        <div className="absolute flex flex-col items-center gap-1" style={{ top, left }}>
            <div className={cn("w-2 h-2 rounded-full border border-white", color, alert && "animate-ping")} />
            <span className="text-[7px] font-mono font-black text-white/40 uppercase">{label}</span>
        </div>
    );
}
