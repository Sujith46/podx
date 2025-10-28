"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type DashboardView =
  | "overview"
  | "upload"
  | "transcription"
  | "highlights"
  | "voice-transfer"
  | "analytics"
  | "social-media"
  | "video-clips"
  | "audio-clips"
  | "settings"
  | "help";

interface DashboardContextValue {
  activeView: DashboardView;
  setActiveView: (v: DashboardView) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  return (
    <DashboardContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
