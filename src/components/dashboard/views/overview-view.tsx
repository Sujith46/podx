"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Scissors, 
  Mic, 
  TrendingUp, 
  Clock, 
  Users, 
  Play,
  Download,
  Share2,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useDashboard } from "../dashboard-context";

const recentPodcasts = [
  {
    id: 1,
    title: "The Future of AI in Business",
    duration: "45:32",
    status: "Processing",
    progress: 75,
    uploadDate: "2 hours ago"
  },
  {
    id: 2,
    title: "Marketing Strategies for 2024",
    duration: "38:15",
    status: "Complete",
    progress: 100,
    uploadDate: "1 day ago"
  },
  {
    id: 3,
    title: "Remote Work Best Practices",
    duration: "52:08",
    status: "Complete",
    progress: 100,
    uploadDate: "3 days ago"
  }
];

const statsData = [
  { name: 'Jan', podcasts: 12, clips: 48, social: 96 },
  { name: 'Feb', podcasts: 19, clips: 76, social: 152 },
  { name: 'Mar', podcasts: 15, clips: 60, social: 120 },
  { name: 'Apr', podcasts: 22, clips: 88, social: 176 },
  { name: 'May', podcasts: 28, clips: 112, social: 224 },
  { name: 'Jun', podcasts: 25, clips: 100, social: 200 }
];

const contentTypeData = [
  { name: 'Blog Posts', value: 35, color: '#8884d8' },
  { name: 'Social Media', value: 40, color: '#82ca9d' },
  { name: 'Video Clips', value: 15, color: '#ffc658' },
  { name: 'Audio Clips', value: 10, color: '#ff7c7c' }
];

export function OverviewView() {
  const { setActiveView } = useDashboard();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Transform your podcasts into multiple content formats with AI
          </p>
        </div>
        {/* TODO: Replace setActiveView with router push to your upload route if you add routes */}
        <Button className="gap-2" onClick={() => setActiveView("upload")}
        >
          <Upload className="w-4 h-4" />
          Upload New Podcast
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Podcasts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">121</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clips Generated</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">484</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+25%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Transfers</CardTitle>
            <Mic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Podcasts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Podcasts</CardTitle>
            <CardDescription>Your latest uploaded episodes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPodcasts.map((podcast) => (
                <div key={podcast.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{podcast.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {podcast.duration}
                      </span>
                      <span>{podcast.uploadDate}</span>
                    </div>
                    {podcast.status === "Processing" && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Processing...</span>
                          <span>{podcast.progress}%</span>
                        </div>
                        <Progress value={podcast.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={podcast.status === "Complete" ? "default" : "secondary"}>
                      {podcast.status}
                    </Badge>
                    {podcast.status === "Complete" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Generation Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Content Generation</CardTitle>
            <CardDescription>Monthly content creation overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="podcasts" fill="#8884d8" name="Podcasts" />
                <Bar dataKey="clips" fill="#82ca9d" name="Clips" />
                <Bar dataKey="social" fill="#ffc658" name="Social Posts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Types of content generated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(d: any) => `${d.name} ${(d.percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* TODO: Replace with router push to Upload page */}
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveView("upload")}>
                <Upload className="w-6 h-6" />
                <span>Upload Podcast</span>
              </Button>
              {/* TODO: Replace with router push to Transcription page */}
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveView("transcription")}>
                <FileText className="w-6 h-6" />
                <span>View Transcripts</span>
              </Button>
              {/* TODO: Replace with router push to Highlights/Clips page */}
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveView("highlights")}>
                <Scissors className="w-6 h-6" />
                <span>Create Clips</span>
              </Button>
              {/* TODO: Replace with router push to Analytics page */}
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveView("analytics")}>
                <BarChart3 className="w-6 h-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
