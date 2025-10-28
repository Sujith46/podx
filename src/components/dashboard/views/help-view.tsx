"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Mail, MessageSquare, BookOpen } from "lucide-react";

export function HelpView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, read docs, or contact support
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Getting Started</CardTitle>
            <CardDescription>Learn how to use PodX AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Upload your first episode</li>
              <li>Generate transcript and summary</li>
              <li>Create clips and social posts</li>
              <li>Publish to platforms</li>
            </ul>
            <Button variant="outline" size="sm" className="mt-2">Open Docs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> FAQs</CardTitle>
            <CardDescription>Common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="font-medium">What audio formats are supported?</div>
              <div className="text-muted-foreground">MP3, WAV, M4A, AAC, OGG, FLAC up to 500MB each.</div>
            </div>
            <div>
              <div className="font-medium">How long does processing take?</div>
              <div className="text-muted-foreground">Most episodes complete within a few minutes depending on length.</div>
            </div>
            <div>
              <div className="font-medium">Can I customize branding?</div>
              <div className="text-muted-foreground">Yes—logos, colors, captions, and templates can be customized.</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contact</CardTitle>
            <CardDescription>Reach our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Your email" />
            <Textarea rows={4} placeholder="Describe your issue or question" />
            <div className="flex justify-end">
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>System and API health</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Badge variant="secondary">API: Operational</Badge>
          <Badge variant="secondary">Processing: Operational</Badge>
          <Badge variant="secondary">Storage: Operational</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
