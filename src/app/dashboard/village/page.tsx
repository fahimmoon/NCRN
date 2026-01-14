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
            // Small delay to avoid synchronous state cascade during render cycle
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
            <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none -z-10 overflow-hidden">
                <div className={cn(
                    "absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full blur-[140px] transition-all duration-1000",
                    isLoraMode ? "bg-brand-orange/10" : "bg-brand-blue/10"
                )} />
            </div>

            {/* VILLAGE HEADER */}
            <header className={cn(
                "px-10 h-24 flex items-center justify-between border-b transition-all duration-700 sticky top-0 z-40 backdrop-blur-xl",
                isLoraMode ? "bg-brand-navy/90 border-white/10 shadow-2xl" : "bg-white/80 border-slate-200"
            )}>
                <div className="flex items-center gap-5">
                    <div className={cn(
                        "p-3 rounded-2xl transition-all shadow-xl",
                        isLoraMode ? "bg-brand-orange/20 border border-brand-orange/30 shadow-brand-orange/10" : "bg-brand-navy text-white shadow-brand-navy/20"
                    )}>
                        <Navigation className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Aurora Frontier</h1>
                        <p className={cn(
                            "text-[10px] font-mono font-bold tracking-[0.3em] uppercase",
                            isLoraMode ? "text-brand-orange/60" : "text-slate-400"
                        )}>Node ID: ARC-N4-ALPHA</p>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-40">Network Domain</span>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                isLoraMode ? "bg-brand-orange animate-pulse" : "bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            )} />
                            <span className="text-xs font-black uppercase">{isLoraMode ? "LoRa Mesh Link" : "Satellite Prime"}</span>
                        </div>
                    </div>
                    <button title="User Profile" className={cn(
                        "p-4 rounded-2xl transition-all border shadow-sm",
                        isLoraMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"
                    )}>
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="p-8 md:p-16 max-w-7xl mx-auto space-y-16 pb-32">

                {/* RESILIENCE COMMAND SECTION */}
                <section className={cn(
                    "p-12 md:p-16 rounded-[3.5rem] border transition-all duration-700 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative",
                    isLoraMode
                        ? "bg-brand-orange/5 border-brand-orange/30 shadow-[0_30px_100px_-20px_rgba(245,158,11,0.2)]"
                        : "bg-white border-slate-200 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.05)]"
                )}>
                    <div className="space-y-6 text-center lg:text-left relative z-10">
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <div className={cn(
                                "p-3 rounded-xl",
                                isLoraMode ? "bg-brand-orange/20" : "bg-brand-blue/10"
                            )}>
                                {isLoraMode ? <Radio className="w-8 h-8" /> : <Wifi className="w-8 h-8 text-brand-blue" />}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Resilience Mode</h2>
                        </div>
                        <p className={cn(
                            "text-lg md:text-xl font-medium max-w-2xl leading-relaxed",
                            isLoraMode ? "text-slate-400" : "text-slate-500"
                        )}>
                            {isLoraMode
                                ? "SATELLITE DOWN. System engaged sub-GHz LoRa Mesh relay. Sub-surface telemetry restricted to text-only emergency directives."
                                : "Orbital link established via Arc-Relay-1. Real-time seismic early-warning and glacier motion telemetry are active."
                            }
                        </p>
                    </div>

                    <button
                        onClick={toggleLora}
                        title={isLoraMode ? "Restore Normal Operations" : "Simulate Network Failure"}
                        className={cn(
                            "px-12 py-8 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center gap-4 group z-10 shadow-2xl whitespace-nowrap",
                            isLoraMode
                                ? "bg-brand-orange text-brand-navy shadow-brand-orange/40 hover:brightness-110"
                                : "bg-brand-navy text-white hover:bg-slate-800"
                        )}
                    >
                        {isLoraMode ? (
                            <><Zap className="w-6 h-6 animate-bounce" /> Restore Prime Link</>
                        ) : (
                            <><WifiOff className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Disrupt Connectivity</>
                        )}
                    </button>
                </section>

                {/* TELEMETRY BENTO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <StatusCard
                        icon={<Wind className="w-8 h-8" />}
                        label="Wind Velocity"
                        value="54 km/h"
                        isLora={isLoraMode}
                        trend="+2.1"
                    />
                    <StatusCard
                        icon={<Thermometer className="w-8 h-8" />}
                        label="Surface Temp"
                        value="-31°C"
                        isLora={isLoraMode}
                        trend="-0.5"
                        danger
                    />
                    <StatusCard
                        icon={<Droplets className="w-8 h-8" />}
                        label="Vapor Core"
                        value="0.8 kPa"
                        isLora={isLoraMode}
                    />
                </div>

                {/* NODE TOPOLOGY */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className={cn(
                            "text-[10px] font-mono font-black uppercase tracking-[0.4em]",
                            isLoraMode ? "text-slate-500" : "text-slate-400"
                        )}>Local Mesh Nodes</h3>
                        <div className="h-[1px] flex-1 mx-10 bg-current opacity-10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <NodeItem label="Water-Gate-01" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="Sector-Alpha" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="Relay-North" status="STORM-IDLE" isLora={isLoraMode} warning />
                        <NodeItem label="Perma-Node-4" status="ONLINE" isLora={isLoraMode} />
                    </div>
                </section>

            </main>

            {/* EMERGENCY BROADCAST OVERLAY */}
            {showAlert && latestAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-navy/95 backdrop-blur-3xl animate-in fade-in duration-700">
                    <div className={cn(
                        "w-full max-w-3xl p-16 rounded-[4rem] border-[10px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500",
                        latestAlert.severity === 'Critical' ? "bg-brand-red text-white border-white/10" : "bg-brand-orange text-brand-navy border-black/5"
                    )}>
                        <button
                            onClick={() => setShowAlert(false)}
                            title="Close Notification"
                            className="absolute top-10 right-10 p-4 hover:bg-white/20 rounded-full transition-all hover:rotate-90"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="space-y-12 relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                                <div className="p-10 bg-white/10 rounded-[3rem] backdrop-blur-md shadow-inner border border-white/10">
                                    <AlertTriangle className="w-24 h-24 animate-bounce" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <Signal className="w-5 h-5 animate-pulse" />
                                        <span className="text-[14px] font-mono font-black uppercase tracking-[0.5em] opacity-60">Priority Satellite Downlink</span>
                                    </div>
                                    <h3 className="text-7xl md:text-8xl font-black italic tracking-tighter leading-none">
                                        {latestAlert.severity === 'Critical' ? "CRITICAL" : "ALERT"}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-black/10 p-5 px-8 rounded-2xl border border-white/10 w-fit mx-auto md:mx-0">
                                    <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] flex items-center gap-4">
                                        Target Area: <span className="opacity-100 italic">{latestAlert.region}</span>
                                    </p>
                                </div>
                                <p className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                                    {latestAlert.message}
                                </p>
                            </div>

                            <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-3xl border-2 border-white/30 flex items-center justify-center bg-white/10">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xl font-black uppercase tracking-widest leading-none">Acknowledged</p>
                                        <p className="text-xs opacity-50 font-mono font-bold uppercase">{new Date(latestAlert.timestamp).toUTCString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className="w-full md:w-auto px-16 py-8 bg-white text-brand-navy rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
                                >
                                    Confirm Directive <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusCard({ icon, label, value, isLora, trend, danger = false }: { icon: React.ReactNode, label: string, value: string, isLora: boolean, trend?: string, danger?: boolean }) {
    return (
        <div className={cn(
            "p-10 rounded-[3rem] border transition-all duration-700 space-y-8 relative overflow-hidden group",
            isLora
                ? "bg-white/5 border-white/10"
                : "bg-white border-slate-200 shadow-xl shadow-slate-100 hover:border-brand-blue/30"
        )}>
            <div className={cn(
                "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-lg",
                isLora
                    ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/20"
                    : cn("bg-brand-navy text-white shadow-brand-navy/20", danger && "bg-brand-red text-white shadow-brand-red/20")
            )}>
                {icon}
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <p className={cn(
                        "text-[10px] font-mono font-black uppercase tracking-[0.3em]",
                        isLora ? "text-slate-500" : "text-slate-400"
                    )}>{label}</p>
                    {trend && (
                        <span className={cn(
                            "text-[10px] font-mono font-black px-3 py-1 rounded-full",
                            trend.startsWith('+') ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"
                        )}>{trend}</span>
                    )}
                </div>
                <p className="text-5xl font-black tracking-tighter whitespace-nowrap">{value}</p>
            </div>
        </div>
    );
}

function NodeItem({ label, status, isLora, warning = false }: { label: string, status: string, isLora: boolean, warning?: boolean }) {
    return (
        <div className={cn(
            "p-8 rounded-3xl border transition-all duration-700 flex items-center justify-between group cursor-pointer",
            isLora
                ? "bg-white/5 border-white/5 hover:border-brand-orange/30 shadow-inner"
                : "bg-white border-slate-200 shadow-sm hover:border-brand-blue/30"
        )}>
            <span className="text-xs font-black uppercase tracking-wide opacity-80">{label}</span>
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-2.5 h-2.5 rounded-full shadow-lg",
                    warning ? "bg-brand-orange animate-pulse" : (status === 'ONLINE' ? "bg-brand-green" : "bg-brand-blue animate-ping")
                )} />
                <span className="text-[10px] font-mono font-black uppercase opacity-40">{status}</span>
            </div>
        </div>
    );
}
