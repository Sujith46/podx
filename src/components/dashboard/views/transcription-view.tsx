"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Download, 
  Copy, 
  Edit3, 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock
} from "lucide-react";
import { useState } from "react";

const transcripts = [
  {
    id: 1,
    title: "The Future of AI in Business",
    duration: "45:32",
    status: "Complete",
    accuracy: 98,
    wordCount: 6847,
    createdAt: "2 hours ago",
    content: "Welcome to today's episode where we dive deep into the transformative power of artificial intelligence in modern business landscapes. Today, we're exploring how companies are leveraging AI to revolutionize their operations, enhance customer experiences, and drive unprecedented growth..."
  },
  {
    id: 2,
    title: "Marketing Strategies for 2024",
    duration: "38:15",
    status: "Complete",
    accuracy: 96,
    wordCount: 5234,
    createdAt: "1 day ago",
    content: "In this episode, we're discussing the most effective marketing strategies that will dominate 2024. From personalized content marketing to AI-driven customer segmentation, we'll cover everything you need to know to stay ahead of the competition..."
  },
  {
    id: 3,
    title: "Remote Work Best Practices",
    duration: "52:08",
    status: "Processing",
    accuracy: null,
    wordCount: null,
    createdAt: "3 hours ago",
    content: null
  }
];

const sampleTranscript = `[00:00:00] Welcome to today's episode where we dive deep into the transformative power of artificial intelligence in modern business landscapes.

[00:00:12] Today, we're exploring how companies are leveraging AI to revolutionize their operations, enhance customer experiences, and drive unprecedented growth.

[00:00:28] I'm your host, and joining me today is Dr. Sarah Chen, a leading expert in AI implementation strategies for enterprise businesses.

[00:00:38] Dr. Chen, thank you for being here today. Let's start with the basics - what are the most significant ways AI is currently transforming business operations?

[00:00:48] Thank you for having me. That's a great question. We're seeing AI transform businesses in three primary areas: automation of routine tasks, predictive analytics for better decision-making, and personalized customer experiences.

[00:01:05] Let's dive deeper into automation. Can you give us some specific examples of how companies are using AI to automate their processes?

[00:01:15] Absolutely. One of the most common applications is in customer service with chatbots and virtual assistants. These AI systems can handle up to 80% of routine customer inquiries, freeing up human agents to focus on more complex issues.

[00:01:32] Another area is in supply chain management. AI algorithms can predict demand patterns, optimize inventory levels, and even identify potential disruptions before they occur.

[00:01:45] That's fascinating. What about the predictive analytics aspect? How are companies using AI to make better decisions?

[00:01:53] Predictive analytics is where AI really shines. Companies are using machine learning models to analyze vast amounts of historical data and identify patterns that humans might miss.

[00:02:05] For example, in retail, AI can predict which products will be popular in specific regions during certain seasons, allowing companies to optimize their inventory and marketing strategies.

[00:02:18] In finance, AI models can assess credit risk more accurately than traditional methods, leading to better lending decisions and reduced default rates.`;

export function TranscriptionView() {
  const [selectedTranscript, setSelectedTranscript] = useState(transcripts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transcription & Content</h1>
          <p className="text-muted-foreground">
            AI-powered transcription with content generation tools
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript List */}
        <Card>
          <CardHeader>
            <CardTitle>Transcripts</CardTitle>
            <CardDescription>Your podcast transcriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transcripts.map((transcript) => (
                <div
                  key={transcript.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTranscript.id === transcript.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedTranscript(transcript)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{transcript.title}</h4>
                    <Badge variant={transcript.status === 'Complete' ? 'default' : 'secondary'}>
                      {transcript.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{transcript.duration}</span>
                    </div>
                    {transcript.accuracy && (
                      <div>Accuracy: {transcript.accuracy}%</div>
                    )}
                    {transcript.wordCount && (
                      <div>Words: {transcript.wordCount.toLocaleString()}</div>
                    )}
                    <div>{transcript.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Audio Player */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{selectedTranscript.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {currentTime} / {selectedTranscript.duration}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size="sm" variant="outline">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline">
                  <SkipForward className="w-4 h-4" />
                </Button>
                <div className="flex-1 bg-muted rounded-full h-2 mx-4">
                  <div className="bg-primary h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcript Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transcript</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search transcript..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedTranscript.status === 'Complete' ? (
                <Tabs defaultValue="transcript" className="w-full">
                  <TabsList>
                    <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="highlights">Key Points</TabsTrigger>
                    <TabsTrigger value="chapters">Chapters</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transcript" className="mt-4">
                    <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                        {sampleTranscript}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="mt-4">
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Episode Summary</h4>
                        <p className="text-sm leading-relaxed">
                          This episode explores the transformative impact of artificial intelligence on modern business operations. 
                          Dr. Sarah Chen discusses three key areas where AI is making a significant difference: automation of routine tasks, 
                          predictive analytics for enhanced decision-making, and personalized customer experiences. The conversation covers 
                          practical examples including AI-powered customer service, supply chain optimization, retail demand prediction, 
                          and financial risk assessment.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="highlights" className="mt-4">
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">00:00:48</Badge>
                          <span className="text-sm font-medium">Key Insight</span>
                        </div>
                        <p className="text-sm">AI transforms businesses in three primary areas: automation, predictive analytics, and personalized experiences.</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">01:15</Badge>
                          <span className="text-sm font-medium">Statistic</span>
                        </div>
                        <p className="text-sm">AI chatbots can handle up to 80% of routine customer inquiries.</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">02:18</Badge>
                          <span className="text-sm font-medium">Use Case</span>
                        </div>
                        <p className="text-sm">AI models in finance can assess credit risk more accurately than traditional methods.</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="chapters" className="mt-4">
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Introduction</h4>
                          <Badge variant="outline">00:00 - 00:38</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Episode introduction and guest presentation</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">AI in Business Operations</h4>
                          <Badge variant="outline">00:38 - 01:45</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Overview of AI transformation in business</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Predictive Analytics</h4>
                          <Badge variant="outline">01:45 - 02:30</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">How AI enables better decision-making through data analysis</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Transcript Processing</h3>
                  <p className="text-muted-foreground">AI is currently processing this transcript. Please check back in a few minutes.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
