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

    // Update clock every second
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
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* --- SIDEBAR COMPONENTS --- */}

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Off-canvas Drawer */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-[280px] bg-brand-navy text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col p-8 space-y-12">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-brand-blue rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Satellite className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">NCRN<span className="text-brand-blue">.</span>HQ</span>
                            <span className="text-[10px] font-mono font-bold text-brand-blue tracking-[0.2em] uppercase opacity-70">Mission Control</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-6 ml-2">Command Center</p>
                        <NavItem icon={<Activity className="w-4 h-4" />} label="Live Monitor" active />
                        <NavItem icon={<MapIcon className="w-4 h-4" />} label="Geospatial" />
                        <NavItem icon={<Database className="w-4 h-4" />} label="Node Clusters" />
                        <NavItem icon={<Signal className="w-4 h-4" />} label="Telemetry" />

                        <div className="pt-8">
                            <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-6 ml-2">System Admin</p>
                            <NavItem icon={<Settings className="w-4 h-4" />} label="Security" />
                            <NavItem icon={<Layers className="w-4 h-4" />} label="Architecture" />
                        </div>
                    </nav>

                    {/* User Section / Logout */}
                    <Link href="/" title="Terminate Session" className="bg-white/5 border border-white/10 flex items-center gap-4 p-5 rounded-2xl hover:bg-brand-red/20 hover:border-brand-red/30 hover:text-white transition-all duration-300 group">
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-brand-red" />
                        <div className="flex flex-col -space-y-1">
                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-300">Logout</span>
                            <span className="text-[8px] font-mono opacity-40">TERMINATE_LINK</span>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
                            title="Menu"
                        >
                            <Menu className="w-6 h-6 text-brand-navy" />
                        </button>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-black text-brand-navy uppercase tracking-tight flex items-center gap-3">
                                Operations <ChevronRight className="w-4 h-4 text-slate-300" /> <span className="text-brand-blue">Dashboard</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-8 border-r border-slate-200 pr-8">
                            <HeaderMetric label="Satellites" value="24/24" status="safe" />
                            <HeaderMetric label="Village Nodes" value="1,248" status="safe" />
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-2.5 px-4 rounded-xl border border-slate-200 font-mono">
                            <div className="text-right hidden xs:block">
                                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">Global UTC</p>
                                <p className="text-xs font-black text-brand-navy">{currentTime || "00:00:00"}</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Dashboard Workspace */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {/* A. Top Row: Telemetry Cards */}
                        <TelemetryCard label="Active Satellites" value="24" trend="+2%" icon={<Satellite className="w-5 h-5" />} />
                        <TelemetryCard label="Village Nodes" value="1,248" trend="Stable" icon={<Radio className="w-5 h-5" />} />
                        <TelemetryCard label="Seismic Activity" value="2.4" trend="Low" unit="Mag" icon={<Activity className="w-5 h-5" />} />
                        <TelemetryCard label="Avg Latency" value="12" trend="-4ms" unit="ms" icon={<Signal className="w-5 h-5" />} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-8 mb-10 h-auto">
                        {/* B. Main Map (Radar Visual) */}
                        <div className="lg:col-span-2 lg:row-span-2 bg-brand-navy rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl min-h-[400px]">
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-white font-black uppercase tracking-tight flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-brand-blue" /> Live Satellite Feed
                                    </h3>
                                    <p className="text-[9px] font-mono text-brand-blue uppercase tracking-widest font-bold">ARC-GEO-SENSORS // ENABLED</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-2 px-3 rounded-full flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                                    <span className="text-[10px] font-mono text-white/60">SCAN ACTIVE</span>
                                </div>
                            </div>

                            {/* CSS Radar Scan Animation */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {/* Radar Circles */}
                                <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full" />
                                <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full" />
                                <div className="absolute w-[40%] h-[40%] border border-white/5 rounded-full" />
                                <div className="absolute w-[20%] h-[20%] border border-white/10 rounded-full" />

                                {/* The Scanning Beam */}
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(59,130,246,0.25)_360deg)] animate-radar rounded-full" />
                                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5" />
                                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/5" />
                            </div>

                            {/* Pulsing Dots (Active Nodes) */}
                            <RadarDot top="30%" left="40%" label="N-09" />
                            <RadarDot top="60%" left="70%" label="ARC-S1" alert />
                            <RadarDot top="45%" left="25%" label="BASE" active />

                            <div className="absolute bottom-8 left-8 space-y-2 relative z-10">
                                <p className="text-[12px] font-mono text-white/40 flex gap-4 uppercase font-bold">
                                    <span>Lat: 69.42° N</span>
                                    <span>Long: 133.72° W</span>
                                </p>
                            </div>
                        </div>

                        {/* C. Emergency Broadcast Terminal */}
                        <div className="lg:col-span-2 lg:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between">
                            <div className="space-y-2 mb-8">
                                <h3 className="text-2xl font-black text-brand-navy flex items-center gap-4">
                                    <AlertTriangle className="w-7 h-7 text-brand-red" /> HQ Transmitter
                                </h3>
                                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">Interface for direct satellite uplink</p>
                            </div>

                            <form onSubmit={handleTransmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Destination Sector</label>
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-black focus:outline-none focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none"
                                    >
                                        <option>Sector Alpha-7</option>
                                        <option>Aurora Settlement</option>
                                        <option>Tundra Relay-09</option>
                                        <option>Perma-Base Gamma</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Threat Priority</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setSeverity("Warning")}
                                            className={cn(
                                                "p-4 rounded-xl border font-black text-xs transition-all flex items-center justify-center gap-3",
                                                severity === "Warning" ? "bg-brand-orange/10 border-brand-orange text-brand-orange" : "bg-slate-50 border-slate-200 text-slate-400"
                                            )}
                                        >
                                            <Zap className="w-4 h-4" /> Warning
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSeverity("Critical")}
                                            className={cn(
                                                "p-4 rounded-xl border font-black text-xs transition-all flex items-center justify-center gap-3",
                                                severity === "Critical" ? "bg-brand-red/10 border-brand-red text-brand-red" : "bg-slate-50 border-slate-200 text-slate-400"
                                            )}
                                        >
                                            <Shield className="w-4 h-4" /> Critical
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-1">Directive Details</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-blue/5 transition-all resize-none outline-none"
                                        placeholder="Input mission payload pack..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isTransmitting}
                                    className={cn(
                                        "w-full h-16 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl",
                                        isTransmitting ? "bg-brand-red text-white animate-pulse" : "bg-brand-navy hover:bg-slate-800 text-white"
                                    )}
                                >
                                    {isTransmitting ? (
                                        <>Encrypting Uplink...</>
                                    ) : (
                                        <>Transmit Alert <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* D. Recent Activity Log (Full Width Table) */}
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-brand-navy flex items-center gap-4 uppercase tracking-tight">
                                    <Database className="w-6 h-6 text-brand-blue" /> Archive Log
                                </h3>
                                <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em]">Live transmission database</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto -mx-2">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 italic">
                                        <th className="px-6 py-4 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Time (UTC)</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Sector</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Directive Message</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Priority</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alerts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-mono text-xs opacity-50 italic">
                                                No directives archived. System ready for transmission.
                                            </td>
                                        </tr>
                                    ) : (
                                        alerts.map((alert, idx) => (
                                            <tr key={alert.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 border-collapse">
                                                <td className="px-6 py-5 text-xs font-mono font-bold text-slate-400">{new Date(alert.timestamp).toISOString().split('T')[1].split('.')[0]}</td>
                                                <td className="px-6 py-5 text-sm font-black text-brand-navy uppercase tracking-tight">{alert.region}</td>
                                                <td className="px-6 py-5 text-sm text-slate-500 font-medium max-w-md truncate">{alert.message}</td>
                                                <td className="px-6 py-5">
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase px-2 py-1 rounded-md",
                                                        alert.severity === 'Critical' ? "bg-brand-red/10 text-brand-red" : "bg-brand-orange/10 text-brand-orange"
                                                    )}>
                                                        {alert.severity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className="flex items-center justify-end gap-2 text-[10px] font-black text-brand-green uppercase tracking-widest">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" /> SENT
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2",
            active
                ? "bg-brand-blue border-brand-blue/30 text-white shadow-xl shadow-brand-blue/30"
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

function TelemetryCard({ label, value, trend, unit = "", icon }: { label: string, value: string, trend: string, unit?: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-brand-navy text-white rounded-2xl shadow-lg group-hover:bg-brand-blue transition-colors duration-500">
                    {icon}
                </div>
                <div className={cn(
                    "text-[9px] font-mono font-black px-2 py-1 rounded-md flex items-center gap-1",
                    trend.startsWith('+') ? "bg-brand-green/10 text-brand-green" : trend === "Stable" ? "bg-slate-100 text-slate-400" : "bg-brand-red/10 text-brand-red"
                )}>
                    {trend.startsWith('+') && <TrendingUp className="w-2.5 h-2.5" />} {trend}
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-black tracking-tighter text-brand-navy">{value}</span>
                    {unit && <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-tighter">{unit}</span>}
                </div>
            </div>
        </div>
    );
}

function RadarDot({ top, left, label, active = false, alert = false }: { top: string, left: string, label: string, active?: boolean, alert?: boolean }) {
    return (
        <div className="absolute flex flex-col items-center gap-1.5" style={{ top, left }}>
            <div className={cn(
                "w-2.5 h-2.5 rounded-full border-2 border-white relative",
                alert ? "bg-brand-red animate-ping" : (active ? "bg-brand-green shadow-[0_0_10px_brand-green]" : "bg-brand-blue")
            )}>
                <div className={cn(
                    "absolute inset-0 rounded-full animate-pulse",
                    alert ? "bg-brand-red" : (active ? "bg-brand-green" : "bg-brand-blue")
                )} />
            </div>
            <span className="text-[8px] font-mono font-black bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/5 text-white/60 uppercase">{label}</span>
        </div>
    );
}
