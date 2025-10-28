"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from "recharts";

const engagementData = [
  { name: 'Mon', listens: 1200, shares: 110, clicks: 980 },
  { name: 'Tue', listens: 1400, shares: 125, clicks: 1120 },
  { name: 'Wed', listens: 1800, shares: 160, clicks: 1500 },
  { name: 'Thu', listens: 1650, shares: 140, clicks: 1320 },
  { name: 'Fri', listens: 2200, shares: 190, clicks: 1850 },
  { name: 'Sat', listens: 2600, shares: 240, clicks: 2100 },
  { name: 'Sun', listens: 2000, shares: 170, clicks: 1600 },
];

const roiData = [
  { name: 'Jan', time_saved: 22, cost_savings: 3.2, output: 140 },
  { name: 'Feb', time_saved: 28, cost_savings: 4.1, output: 175 },
  { name: 'Mar', time_saved: 26, cost_savings: 3.8, output: 160 },
  { name: 'Apr', time_saved: 32, cost_savings: 4.6, output: 190 },
  { name: 'May', time_saved: 35, cost_savings: 5.0, output: 210 },
  { name: 'Jun', time_saved: 31, cost_savings: 4.4, output: 195 },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & ROI</h1>
          <p className="text-muted-foreground">
            Track performance across podcasts, clips, and social content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarDays className="w-4 h-4" />
            Last 30 days
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Listens</CardTitle>
            <CardDescription>Across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,480</div>
            <p className="text-xs text-green-600">+14% vs last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clip Views</CardTitle>
            <CardDescription>TikTok, Reels, Shorts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">86,320</div>
            <p className="text-xs text-green-600">+22% vs last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Engagement</CardTitle>
            <CardDescription>Likes, comments, shares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15,904</div>
            <p className="text-xs text-green-600">+18% vs last period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>Daily performance trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="listens" stroke="#8884d8" name="Listens" strokeWidth={2} />
              <Line type="monotone" dataKey="shares" stroke="#82ca9d" name="Shares" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#ffc658" name="Clicks" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI Dashboard</CardTitle>
          <CardDescription>Time saved, cost savings, and output</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="time">
            <TabsList>
              <TabsTrigger value="time">Time Saved (hrs)</TabsTrigger>
              <TabsTrigger value="cost">Cost Savings ($K)</TabsTrigger>
              <TabsTrigger value="output">Content Output</TabsTrigger>
            </TabsList>

            <TabsContent value="time" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={roiData}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="time_saved" stroke="#8884d8" fillOpacity={1} fill="url(#colorTime)" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="cost" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost_savings" fill="#82ca9d" name="Cost Savings ($K)" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="output" fill="#ffc658" name="Content Output" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
