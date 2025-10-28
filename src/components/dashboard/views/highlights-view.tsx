"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Play, Download, Share2, Edit3 } from "lucide-react";

export function HighlightsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Highlights & Clips</h1>
        <p className="text-muted-foreground">
          AI-generated highlights and short clips for social media
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Video Clip</Badge>
                <span className="text-sm text-muted-foreground">0:45</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-32 mb-4 flex items-center justify-center">
                <Play className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="font-medium mb-2">AI Business Transformation</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Key insights about AI automation in customer service
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
