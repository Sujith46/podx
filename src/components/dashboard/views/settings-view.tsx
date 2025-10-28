"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure workspace, branding, and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>Organization and project details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="org">Organization Name</Label>
              <Input id="org" placeholder="e.g., PodX Studios" />
            </div>
            <div>
              <Label htmlFor="project">Default Project</Label>
              <Input id="project" placeholder="e.g., Weekly Podcast" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Color</Label>
                <Input type="color" defaultValue="#111111" />
              </div>
              <div>
                <Label>Accent Color</Label>
                <Input type="color" defaultValue="#6b46c1" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect publishing platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Podcast Host</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select host" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spotify">Spotify for Podcasters</SelectItem>
                    <SelectItem value="buzzsprout">Buzzsprout</SelectItem>
                    <SelectItem value="rss">Custom RSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Storage</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s3">AWS S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="r2">Cloudflare R2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Webhook URL</Label>
              <Input placeholder="https://example.com/webhook" />
            </div>
            <div className="flex justify-end">
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage & Billing</CardTitle>
          <CardDescription>Plan, credits, and limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Current Plan</div>
              <div className="text-lg font-medium">Pro</div>
            </div>
            <Badge variant="secondary">120/200 credits</Badge>
            <div className="flex-1" />
            <Button variant="outline">Manage</Button>
            <Button>Upgrade</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
