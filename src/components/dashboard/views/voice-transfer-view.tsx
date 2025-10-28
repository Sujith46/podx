"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Play, Download, Settings } from "lucide-react";

export function VoiceTransferView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Voice Style Transfer</h1>
        <p className="text-muted-foreground">
          AI-powered voice enhancement and style transformation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Styles</CardTitle>
            <CardDescription>Available voice transformation options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Professional', 'Casual', 'Energetic', 'Calm'].map((style) => (
                <div key={style} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4" />
                    <span className="font-medium">{style}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-3 h-3" />
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>Your voice transformation history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Episode {i} - Professional</h4>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Complete</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
