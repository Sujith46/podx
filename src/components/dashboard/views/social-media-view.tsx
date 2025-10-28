"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Twitter, Instagram, Linkedin, Copy, Wand2, Send } from "lucide-react";

export function SocialMediaView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Generator</h1>
        <p className="text-muted-foreground">
          Create threads, posts, and captions from your episode automatically
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Content</CardTitle>
          <CardDescription>Choose format and tone, then generate</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="thread">
            <TabsList>
              <TabsTrigger value="thread">X Thread</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>

            <TabsContent value="thread" className="mt-4 space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">Tone</Badge>
                <div className="flex gap-2">
                  <Badge variant="outline">Professional</Badge>
                  <Badge variant="outline">Casual</Badge>
                  <Badge variant="outline">Energetic</Badge>
                </div>
              </div>
              <Textarea rows={8} placeholder="Your generated X thread will appear here..." defaultValue={`1/ AI is transforming business in 3 key ways: automation, predictive analytics, and personalization. Here's how to leverage each one effectively...\n\n2/ Automation: Free your team from repetitive tasks. Start with support workflows. AI chatbots can handle up to 80% of routine queries.`} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Wand2 className="w-4 h-4" /> Regenerate</Button>
                <Button variant="outline" className="gap-2"><Copy className="w-4 h-4" /> Copy</Button>
                <Button className="gap-2"><Send className="w-4 h-4" /> Publish</Button>
              </div>
            </TabsContent>

            <TabsContent value="instagram" className="mt-4 space-y-4">
              <Textarea rows={6} placeholder="Instagram caption..." defaultValue={`AI can automate 80% of routine support. That means happier teams and faster responses. Want to know how? 👇`}/>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Wand2 className="w-4 h-4" /> Regenerate</Button>
                <Button variant="outline" className="gap-2"><Copy className="w-4 h-4" /> Copy</Button>
                <Button className="gap-2"><Send className="w-4 h-4" /> Publish</Button>
              </div>
            </TabsContent>

            <TabsContent value="linkedin" className="mt-4 space-y-4">
              <Textarea rows={8} placeholder="LinkedIn post..." defaultValue={`AI adoption isn't about hype — it's about outcomes. The companies winning are: 1) Automating repetitive tasks, 2) Using predictive analytics for decisions, 3) Personalizing at scale.`}/>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Wand2 className="w-4 h-4" /> Regenerate</Button>
                <Button variant="outline" className="gap-2"><Copy className="w-4 h-4" /> Copy</Button>
                <Button className="gap-2"><Send className="w-4 h-4" /> Publish</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
