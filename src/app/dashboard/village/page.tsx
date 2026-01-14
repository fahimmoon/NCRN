"use client";

import { useSatelliteSystem } from "@/hooks/useSatelliteSystem";
import {
    Wifi,
    WifiOff,
    Zap,
    AlertTriangle,
    Wind,
    Thermometer,
    Droplets,
    Navigation,
    CheckCircle,
    User,
    X,
    Signal,
    Radio,
    ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function VillageDashboard() {
    const { latestAlert, isLoraMode, toggleLora } = useSatelliteSystem();
    const [showAlert, setShowAlert] = useState(false);
    const [lastAlertId, setLastAlertId] = useState<string | null>(null);

    useEffect(() => {
        if (latestAlert && latestAlert.id !== lastAlertId) {
            setLastAlertId(latestAlert.id);
            const timer = setTimeout(() => setShowAlert(true), 10);
            return () => clearTimeout(timer);
        }
    }, [latestAlert, lastAlertId]);

    return (
        <div className={cn(
            "min-h-screen transition-all duration-1000 font-sans relative overflow-hidden",
            isLoraMode ? "bg-brand-navy text-brand-orange" : "bg-brand-white text-brand-navy"
        )}>
            {/* BACKGROUND DECO */}
            <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none -z-10 overflow-hidden opacity-50">
                <div className={cn(
                    "absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] transition-all",
                    isLoraMode ? "bg-brand-orange/10" : "bg-brand-blue/10"
                )} />
            </div>

            {/* COMPACT HEADER (h-16/h-20) */}
            <header className={cn(
                "px-6 lg:px-10 h-16 flex items-center justify-between border-b transition-all duration-700 sticky top-0 z-40 backdrop-blur-xl",
                isLoraMode ? "bg-brand-navy/90 border-white/10" : "bg-white/80 border-slate-100"
            )}>
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-2 rounded-lg transition-all shadow-sm",
                        isLoraMode ? "bg-brand-orange/20 text-brand-orange" : "bg-brand-navy text-white"
                    )}>
                        <Navigation className="w-5 h-5" />
                    </div>
                    <div className="space-y-0">
                        <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Aurora Frontier</h1>
                        <p className={cn("text-[8px] font-mono font-bold tracking-widest uppercase opacity-40")}>ARC-N4-ALPHA</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                        <div className="flex items-center gap-2">
                            <div className={cn("w-1.5 h-1.5 rounded-full", isLoraMode ? "bg-brand-orange animate-pulse" : "bg-brand-green")} />
                            <span className="text-[10px] font-black uppercase">{isLoraMode ? "LoRa Link" : "Sat Prime"}</span>
                        </div>
                    </div>
                    <button title="User" className={cn("p-2.5 rounded-xl border transition-all", isLoraMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}>
                        <User className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <main className="p-6 md:p-12 max-w-6xl mx-auto space-y-12 pb-24">

                {/* COMPACT RESILIENCE SECTION */}
                <section className={cn(
                    "p-8 lg:p-12 rounded-[2.5rem] border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative",
                    isLoraMode
                        ? "bg-brand-orange/5 border-brand-orange/20"
                        : "bg-white border-slate-100 shadow-sm"
                )}>
                    <div className="space-y-4 text-center md:text-left relative z-10">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className={cn("p-2 rounded-lg", isLoraMode ? "bg-brand-orange/20" : "bg-brand-blue/10")}>
                                {isLoraMode ? <Radio className="w-6 h-6" /> : <Wifi className="w-6 h-6 text-brand-blue" />}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">Resilience Mode</h2>
                        </div>
                        <p className={cn("text-md font-medium max-w-xl opacity-70 leading-relaxed")}>
                            {isLoraMode
                                ? "SATELLITE DOWN. Sub-GHz LoRa Mesh relay active. Emergency directives restricted to text-only payload."
                                : "Orbital link established via Arc-Relay-1. Real-time seismic and glacier motion telemetry active."
                            }
                        </p>
                    </div>

                    <button
                        onClick={toggleLora}
                        className={cn(
                            "px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl whitespace-nowrap",
                            isLoraMode ? "bg-brand-orange text-brand-navy" : "bg-brand-navy text-white hover:bg-slate-800"
                        )}
                    >
                        {isLoraMode ? "Restore Link" : "Simulate Failure"}
                    </button>
                </section>

                {/* COMPACT BENTO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatusCard icon={<Wind className="w-6 h-6" />} label="Wind" value="54" unit="km/h" isLora={isLoraMode} trend="+2.1" />
                    <StatusCard icon={<Thermometer className="w-6 h-6" />} label="Temp" value="-31" unit="°C" isLora={isLoraMode} trend="-0.5" danger />
                    <StatusCard icon={<Droplets className="w-6 h-6" />} label="Vapor" value="0.8" unit="kPa" isLora={isLoraMode} />
                </div>

                {/* COMPACT NODE GRID */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[9px] font-mono font-black uppercase tracking-widest opacity-40">Local Mesh Nodes</h3>
                        <div className="h-[1px] flex-1 mx-8 bg-current opacity-5" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <NodeItem label="WG-01" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="S-ALPHA" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="RELAY-9" status="IDLE" isLora={isLoraMode} warning />
                        <NodeItem label="NODE-4" status="ONLINE" isLora={isLoraMode} />
                    </div>
                </section>
            </main>

            {/* COMPACT ALERT OVERLAY */}
            {showAlert && latestAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/90 backdrop-blur-2xl animate-in fade-in duration-500">
                    <div className={cn(
                        "w-full max-w-2xl p-10 rounded-[3rem] border-8 shadow-2xl relative overflow-hidden",
                        latestAlert.severity === 'Critical' ? "bg-brand-red text-white border-white/5" : "bg-brand-orange text-brand-navy border-black/5"
                    )}>
                        <button onClick={() => setShowAlert(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-transform hover:rotate-90"><X className="w-6 h-6" /></button>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="p-6 bg-white/10 rounded-2xl"><AlertTriangle className="w-12 h-12" /></div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-60">Satellite Downlink</span>
                                    <h3 className="text-5xl font-black italic tracking-tighter leading-none">{latestAlert.severity === 'Critical' ? "CRITICAL" : "ALERT"}</h3>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[9px] font-mono font-black bg-black/10 px-3 py-1 rounded w-fit uppercase">Sector: {latestAlert.region}</p>
                                <p className="text-3xl md:text-4xl font-black leading-tight tracking-tight">{latestAlert.message}</p>
                            </div>
                            <button onClick={() => setShowAlert(false)} className="w-full py-5 bg-white text-brand-navy rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Acknowledge directive</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusCard({ icon, label, value, unit, isLora, trend, danger = false }: { icon: React.ReactNode, label: string, value: string, unit: string, isLora: boolean, trend?: string, danger?: boolean }) {
    return (
        <div className={cn(
            "p-8 rounded-[2rem] border transition-all duration-500 space-y-6 relative overflow-hidden group",
            isLora ? "bg-white/5 border-white/5" : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        )}>
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white", isLora ? "bg-brand-orange/20 text-brand-orange" : (danger ? "bg-brand-red" : "bg-brand-navy"))}>
                {icon}
            </div>
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <p className="text-[9px] font-mono font-black uppercase opacity-40">{label}</p>
                    {trend && <span className={cn("text-[8px] font-mono font-black px-1.5 py-0.5 rounded", trend.startsWith('+') ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red")}>{trend}</span>}
                </div>
                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black tracking-tighter">{value}</p>
                    <span className="text-xs font-bold opacity-30">{unit}</span>
                </div>
            </div>
        </div>
    );
}

function NodeItem({ label, status, isLora, warning = false }: { label: string, status: string, isLora: boolean, warning?: boolean }) {
    return (
        <div className={cn(
            "p-5 rounded-2xl border transition-all duration-500 flex items-center justify-between",
            isLora ? "bg-white/5 border-white/5" : "bg-white border-slate-50 shadow-sm"
        )}>
            <span className="text-[10px] font-black uppercase tracking-tight opacity-60">{label}</span>
            <div className={cn("w-1.5 h-1.5 rounded-full", warning ? "bg-brand-orange animate-pulse" : (status === 'ONLINE' ? "bg-brand-green" : "bg-brand-blue"))} />
        </div>
    );
}
