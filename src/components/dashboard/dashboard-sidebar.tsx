"use client";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Scissors, 
  Mic, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Zap,
  Video,
  AudioLines
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard, type DashboardView } from "./dashboard-context";

const mainNavItems: Array<{ id: DashboardView; title: string; icon: any; description: string }> = [
  {
    id: "overview",
    title: "Overview",
    icon: LayoutDashboard,
    description: "Dashboard overview"
  },
  {
    id: "upload",
    title: "Upload Podcast",
    icon: Upload,
    description: "Upload new episodes"
  },
  {
    id: "transcription",
    title: "Transcription",
    icon: FileText,
    description: "AI transcription & content"
  },
  {
    id: "highlights",
    title: "Highlights & Clips",
    icon: Scissors,
    description: "Create engaging clips"
  },
  {
    id: "voice-transfer",
    title: "Voice Transfer",
    icon: Mic,
    description: "AI voice enhancement"
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    description: "Performance insights"
  }
];

const contentItems: Array<{ id: DashboardView; title: string; icon: any; description: string }> = [
  {
    id: "social-media",
    title: "Social Media",
    icon: Zap,
    description: "Social content generation"
  },
  {
    id: "video-clips",
    title: "Video Clips",
    icon: Video,
    description: "Short video creation"
  },
  {
    id: "audio-clips",
    title: "Audio Clips",
    icon: AudioLines,
    description: "Audio highlight reels"
  }
];

const settingsItems: Array<{ id: DashboardView; title: string; icon: any; description: string }> = [
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    description: "App preferences"
  },
  {
    id: "help",
    title: "Help & Support",
    icon: HelpCircle,
    description: "Get assistance"
  }
];

// TODO: If you move to file-based routing, replace setActiveView with next/navigation push()
export function DashboardSidebar() {
  const { activeView, setActiveView } = useDashboard();
  return (
    <Sidebar className="border-r">
      {/* bg-[linear-gradient(to_right,_#7E2EF2_15%,_#6124C8_100%)] */}
      <SidebarHeader className="p-6 ">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <AudioLines className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">PodX AI</h1>
            <p className="text-xs text-muted-foreground">Podcast Transformation</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content Creation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          {settingsItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.id)}
                isActive={activeView === item.id}
                className="w-full justify-start"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
