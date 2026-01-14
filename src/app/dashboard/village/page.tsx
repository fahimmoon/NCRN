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
    Bell,
    Navigation,
    CheckCircle,
    Menu,
    User,
    X,
    Signal,
    Radio
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

    // Auto-show alert overlay when new alert arrives
    useEffect(() => {
        if (latestAlert && latestAlert.id !== lastAlertId) {
            setShowAlert(true);
            setLastAlertId(latestAlert.id);
        }
    }, [latestAlert, lastAlertId]);

    return (
        <div className={cn(
            "min-h-screen transition-all duration-1000 font-sans relative",
            isLoraMode ? "bg-slate-900 text-brand-orange" : "bg-white text-slate-900"
        )}>
            {/* Background Decor for LoRa Mode */}
            {isLoraMode && (
                <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.05)_0%,_transparent_70%)]" />
                    <div className="absolute top-10 right-10 w-96 h-96 border-2 border-brand-orange/10 rounded-full animate-ping" />
                </div>
            )}

            {/* Village Header */}
            <header className={cn(
                "px-8 h-24 flex items-center justify-between border-b transition-all duration-700 sticky top-0 z-40 backdrop-blur-xl",
                isLoraMode ? "bg-slate-950/90 border-brand-orange/20" : "bg-white/80 border-slate-200"
            )}>
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-xl transition-all shadow-lg",
                        isLoraMode ? "bg-brand-orange/20 border border-brand-orange/30" : "bg-brand-blue/10 border border-brand-blue/20"
                    )}>
                        <Navigation className={cn(
                            "w-6 h-6",
                            isLoraMode ? "text-brand-orange" : "text-brand-blue"
                        )} />
                    </div>
                    <div className="space-y-0">
                        <span className="font-black tracking-tighter text-2xl uppercase block leading-none">Aurora Settlement</span>
                        <span className={cn(
                            "text-[10px] font-mono font-bold tracking-[0.3em] uppercase",
                            isLoraMode ? "text-brand-orange/60" : "text-slate-500"
                        )}>Sector: ARC-NORTH-04</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden lg:flex flex-col items-end">
                        <span className={cn("text-[10px] uppercase font-bold tracking-widest", isLoraMode ? "text-slate-500" : "text-slate-400")}>Network Topology</span>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-full",
                                isLoraMode ? "bg-brand-orange animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            )} />
                            <span className="text-xs font-black uppercase tracking-tight">
                                {isLoraMode ? "LORA MESH (SUB-915 MHz)" : "STARLINK-B ACTIVE"}
                            </span>
                        </div>
                    </div>

                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/5 hidden md:block" />

                    <button className={cn(
                        "p-3 rounded-2xl transition-all border",
                        isLoraMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                    )}>
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="p-8 md:p-12 max-w-6xl mx-auto space-y-12 pb-32">

                {/* RESILIENCE TOGGLE SECTION */}
                <section className={cn(
                    "p-10 rounded-[2.5rem] border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative",
                    isLoraMode
                        ? "bg-slate-900 border-brand-orange/40 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)]"
                        : "bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]"
                )}>
                    {/* Decorative elements for LoRa */}
                    {isLoraMode && (
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl" />
                    )}

                    <div className="space-y-4 text-center md:text-left z-10">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            {isLoraMode ? <Radio className="w-8 h-8" /> : <Wifi className="w-8 h-8 text-brand-blue" />}
                            <h2 className="text-3xl font-black uppercase tracking-tighter">Resilience Mode</h2>
                        </div>
                        <p className={cn(
                            "text-base font-medium max-w-xl transition-colors",
                            isLoraMode ? "text-slate-400" : "text-slate-600"
                        )}>
                            {isLoraMode
                                ? "SATELLITE DOWN. Terminal is currently operating on LoRa Mesh fallback protocol. Only low-bandwidth emergency directives are being synced."
                                : "Global connectivity established. Real-time seismic telemetry and high-definition observation feeds are active."
                            }
                        </p>
                    </div>

                    <button
                        onClick={toggleLora}
                        className={cn(
                            "px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-4 group z-10 shadow-2xl",
                            isLoraMode
                                ? "bg-brand-orange border border-white/20 text-white shadow-[0_15px_35px_rgba(245,158,11,0.4)] hover:brightness-110"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                    >
                        {isLoraMode ? (
                            <><Zap className="w-5 h-5 animate-bounce" /> RESTORE NORMAL OPS</>
                        ) : (
                            <><WifiOff className="w-5 h-5 group-hover:animate-shake" /> SIMULATE DISRUPTION</>
                        )}
                    </button>
                </section>

                {/* STATUS BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatusCard
                        icon={<Wind className="w-7 h-7" />}
                        label="Anemometer"
                        value="54 km/h"
                        isLora={isLoraMode}
                        trend="+2.1"
                    />
                    <StatusCard
                        icon={<Thermometer className="w-7 h-7" />}
                        label="Temp Sensor"
                        value="-31°C"
                        isLora={isLoraMode}
                        trend="-0.5"
                        danger
                    />
                    <StatusCard
                        icon={<Droplets className="w-7 h-7" />}
                        label="Vapor Pressure"
                        value="0.8 kPa"
                        isLora={isLoraMode}
                    />
                </div>

                {/* ACTIVE NODES MANAGEMENT */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className={cn("text-[10px] font-black uppercase tracking-[0.4em] px-2", isLoraMode ? "text-slate-500" : "text-slate-400")}>
                            Local Mesh Topology (Hop Count: 0)
                        </h3>
                        <div className="h-[1px] flex-1 mx-6 bg-slate-200 dark:bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <NodeItem label="Hydration-01" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="Shelter-Alpha" status="ONLINE" isLora={isLoraMode} />
                        <NodeItem label="Med-Bay-02" status="LOW-POWER" isLora={isLoraMode} warning />
                        <NodeItem label="Perma-Node-4" status="ONLINE" isLora={isLoraMode} />
                    </div>
                </section>

            </main>

            {/* EMERGENCY SATELLITE BROADCAST OVERLAY */}
            {showAlert && latestAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-700">
                    <div className={cn(
                        "w-full max-w-2xl p-12 rounded-[3.5rem] border-[6px] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden animate-in zoom-in-90 duration-500",
                        latestAlert.severity === 'Critical' ? "bg-brand-red text-white border-white/20" : "bg-brand-orange text-white border-white/20"
                    )}>
                        {/* Danger Stripes Decor */}
                        <div className="absolute top-0 left-0 w-full h-4 bg-black/20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }} />
                        <div className="absolute bottom-0 left-0 w-full h-4 bg-black/20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }} />

                        <button
                            onClick={() => setShowAlert(false)}
                            className="absolute top-8 right-8 p-3 hover:bg-white/20 rounded-full transition-all hover:rotate-90"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="space-y-10 relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="p-7 bg-white/20 rounded-[2.5rem] backdrop-blur-md shadow-inner">
                                    <AlertTriangle className="w-20 h-20 animate-bounce" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 justify-center md:justify-start">
                                        <Signal className="w-4 h-4 animate-pulse" />
                                        <h2 className="text-[14px] font-black uppercase tracking-[0.5em] opacity-80 font-mono">Satellite Uplink</h2>
                                    </div>
                                    <h3 className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none">
                                        {latestAlert.severity === 'Critical' ? "CRITICAL" : "WARNING"}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-black/10 p-4 rounded-xl border border-white/10 w-fit mx-auto md:mx-0">
                                    <p className="text-xs font-black uppercase tracking-widest flex items-center gap-3">
                                        <Navigation className="w-4 h-4 text-white/70" /> SECTOR ACCESS: {latestAlert.region}
                                    </p>
                                </div>
                                <p className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                                    {latestAlert.message}
                                </p>
                            </div>

                            <div className="pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl border-2 border-white/30 flex items-center justify-center bg-white/10">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base font-black uppercase tracking-widest leading-none">Directive Received</p>
                                        <p className="text-xs opacity-70 font-mono font-bold">{new Date(latestAlert.timestamp).toUTCString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className="w-full md:w-auto px-12 py-6 bg-white text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    Ack Directive
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
            "p-8 rounded-[2rem] border transition-all duration-700 space-y-6 relative overflow-hidden group",
            isLora
                ? "bg-slate-950/40 border-white/5 shadow-inner"
                : "bg-white border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]"
        )}>
            <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg",
                isLora
                    ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/20"
                    : cn("bg-brand-blue/10 text-brand-blue border border-brand-blue/10", danger && "bg-brand-red/10 text-brand-red border-brand-red/10")
            )}>
                {icon}
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className={cn(
                        "text-[10px] uppercase font-black tracking-widest",
                        isLora ? "text-slate-500" : "text-slate-400"
                    )}>{label}</p>
                    {trend && (
                        <span className={cn(
                            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full",
                            trend.startsWith('+') ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"
                        )}>{trend}</span>
                    )}
                </div>
                <p className="text-4xl font-black tracking-tighter">{value}</p>
            </div>
        </div>
    );
}

function NodeItem({ label, status, isLora, warning = false }: { label: string, status: string, isLora: boolean, warning?: boolean }) {
    return (
        <div className={cn(
            "p-6 rounded-2xl border transition-all duration-700 flex items-center justify-between group cursor-pointer",
            isLora
                ? "bg-slate-950/40 border-white/5 hover:border-brand-orange/20"
                : "bg-white border-slate-50 shadow-sm hover:border-brand-blue/20"
        )}>
            <span className="text-xs font-black uppercase tracking-wide opacity-80">{label}</span>
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    warning ? "bg-brand-orange animate-pulse" : (status === 'ONLINE' ? "bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-brand-blue animate-ping")
                )} />
                <span className="text-[10px] font-black font-mono tracking-tighter opacity-50">{status}</span>
            </div>
        </div>
    );
}
