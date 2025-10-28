"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Pause, Scissors, Download, Settings } from "lucide-react";
import { useState, useMemo } from "react";

export function VideoClipsView() {
  const [ratio, setRatio] = useState<"9:16" | "1:1" | "16:9">("9:16");
  const previewClass = useMemo(() => {
    // Tailwind aspect-ratio utilities for preview box
    switch (ratio) {
      case "1:1":
        return "aspect-square";
      case "16:9":
        return "aspect-video";
      default:
        return "aspect-[9/16]"; // 9:16 vertical
    }
  }, [ratio]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Video Clips</h1>
        <p className="text-muted-foreground">
          Generate short, engaging video clips with captions and branding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <CardTitle>Clip Editor</CardTitle>
                <CardDescription>Preview and refine your clips</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {(["9:16","1:1","16:9"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRatio(r)}
                    className={`text-sm border rounded-md px-3 py-1.5 ${ratio === r ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`${previewClass} w-full bg-muted rounded-lg mb-4 flex items-center justify-center`}>
              <Video className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Button size="sm" className="gap-2"><Play className="w-4 h-4" /> Play</Button>
              <Button size="sm" variant="outline"><Pause className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" className="gap-2"><Scissors className="w-4 h-4" /> Split</Button>
              <Button size="sm" variant="outline" className="gap-2"><Settings className="w-4 h-4" /> Style</Button>
              <div className="flex-1" />
              <Button size="sm" variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
            </div>
            <div className="h-20 bg-muted/50 rounded-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Choose aspect ratio and style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {label: 'TikTok / Reels', ratio: '9:16'},
                {label: 'YouTube Shorts', ratio: '9:16'},
                {label: 'Square', ratio: '1:1'},
                {label: 'Landscape', ratio: '16:9'}
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.ratio}</div>
                  </div>
                  <Button size="sm" variant="outline">Select</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Clips</CardTitle>
          <CardDescription>Recently created clips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="border rounded-lg p-3">
                <div className="aspect-video bg-muted rounded mb-3" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Clip {i}</div>
                    <div className="text-xs text-muted-foreground">0:30 • Captions On</div>
                  </div>
                  <Badge variant="secondary">Ready</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
