"use client";

import { useState, useEffect, useCallback } from "react";

export interface Alert {
    id: string;
    region: string;
    severity: "Warning" | "Critical";
    message: string;
    timestamp: string;
}

const STORAGE_KEY = "ncrn_satellite_alerts";
const LORA_STORAGE_KEY = "ncrn_lora_mode";

export const useSatelliteSystem = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoraMode, setIsLoraMode] = useState(false);

    // Load and listen for changes
    useEffect(() => {
        const loadData = () => {
            if (typeof window === "undefined") return;

            const storedAlerts = localStorage.getItem(STORAGE_KEY);
            if (storedAlerts) {
                setAlerts(JSON.parse(storedAlerts));
            }
            const storedLora = localStorage.getItem(LORA_STORAGE_KEY);
            setIsLoraMode(storedLora === "true");
        };

        loadData();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setAlerts(e.newValue ? JSON.parse(e.newValue) : []);
            }
            if (e.key === LORA_STORAGE_KEY) {
                setIsLoraMode(e.newValue === "true");
            }
        };

        const handleCustomUpdate = () => {
            loadData();
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("satellite-update", handleCustomUpdate);

        // Polling every 2s as requested
        const interval = setInterval(loadData, 2000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("satellite-update", handleCustomUpdate);
            clearInterval(interval);
        };
    }, []);

    const transmitAlert = useCallback((region: string, severity: "Warning" | "Critical", message: string) => {
        const newAlert: Alert = {
            id: Math.random().toString(36).substring(2, 9),
            region,
            severity,
            message,
            timestamp: new Date().toISOString(),
        };

        const currentAlerts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const updatedAlerts = [newAlert, ...currentAlerts].slice(0, 50);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlerts));
        setAlerts(updatedAlerts);

        window.dispatchEvent(new Event("satellite-update"));
    }, []);

    const toggleLora = useCallback(() => {
        setIsLoraMode((prev) => {
            const next = !prev;
            localStorage.setItem(LORA_STORAGE_KEY, String(next));
            window.dispatchEvent(new Event("satellite-update"));
            return next;
        });
    }, []);

    return {
        alerts,
        isLoraMode,
        transmitAlert,
        toggleLora,
        latestAlert: alerts[0] || null,
    };
};
