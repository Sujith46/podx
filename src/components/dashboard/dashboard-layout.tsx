"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardContent } from "./dashboard-content";
import { DashboardProvider } from "./dashboard-context";

// TODO: If you add auth or workspace switching later, wrap DashboardProvider
// with your AuthProvider and pass initial route/view from URL or user prefs.
export function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardProvider>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6 bg-muted/20">
              <DashboardContent />
            </main>
          </div>
        </div>
      </DashboardProvider>
    </SidebarProvider>
  );
}
