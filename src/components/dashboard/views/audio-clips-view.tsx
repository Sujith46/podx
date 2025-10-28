"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioLines, Play, Pause, Scissors, Download, Volume2 } from "lucide-react";

export function AudioClipsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audio Highlights</h1>
        <p className="text-muted-foreground">
          Generate short audio teasers and highlight reels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Highlight Editor</CardTitle>
            <CardDescription>Preview and fine-tune audio cuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
              <AudioLines className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Button size="sm" className="gap-2"><Play className="w-4 h-4" /> Play</Button>
              <Button size="sm" variant="outline"><Pause className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" className="gap-2"><Scissors className="w-4 h-4" /> Split</Button>
              <div className="flex-1" />
              <Button size="sm" variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
            </div>
            <div className="h-16 bg-muted/50 rounded-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output Options</CardTitle>
            <CardDescription>Quality, format, and loudness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["MP3 128kbps", "MP3 192kbps", "WAV", "AAC"].map((opt) => (
                <div key={opt} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{opt}</div>
                    <div className="text-xs text-muted-foreground">Stereo • Normalized</div>
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
          <CardTitle>Generated Highlights</CardTitle>
          <CardDescription>Recently created audio cuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="border rounded-lg p-3">
                <div className="h-16 bg-muted rounded mb-3" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Highlight {i}</div>
                    <div className="text-xs text-muted-foreground">0:30 • Cleaned</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Play className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline"><Volume2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
