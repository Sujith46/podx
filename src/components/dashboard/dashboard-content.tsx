"use client";

import { OverviewView } from "./views/overview-view";
import { UploadView } from "./views/upload-view";
import { TranscriptionView } from "./views/transcription-view";
import { HighlightsView } from "./views/highlights-view";
import { VoiceTransferView } from "./views/voice-transfer-view";
import { AnalyticsView } from "./views/analytics-view";
import { SocialMediaView } from "./views/social-media-view";
import { VideoClipsView } from "./views/video-clips-view";
import { AudioClipsView } from "./views/audio-clips-view";
import { SettingsView } from "./views/settings-view";
import { HelpView } from "./views/help-view";
import { useDashboard } from "./dashboard-context";

// TODO: If you switch to route-based navigation, derive activeView from pathname
// and remove this switch.
export function DashboardContent() {
  const { activeView } = useDashboard();
  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <OverviewView />;
      case "upload":
        return <UploadView />;
      case "transcription":
        return <TranscriptionView />;
      case "highlights":
        return <HighlightsView />;
      case "voice-transfer":
        return <VoiceTransferView />;
      case "analytics":
        return <AnalyticsView />;
      case "social-media":
        return <SocialMediaView />;
      case "video-clips":
        return <VideoClipsView />;
      case "audio-clips":
        return <AudioClipsView />;
      case "settings":
        return <SettingsView />;
      case "help":
        return <HelpView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="w-full">
      {renderView()}
    </div>
  );
}
