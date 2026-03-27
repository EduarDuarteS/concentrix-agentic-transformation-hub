import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Ban, Activity, Users, DollarSign } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', value: 4000, metrics: 2400 },
  { name: 'Feb', value: 3000, metrics: 1398 },
  { name: 'Mar', value: 2000, metrics: 9800 },
  { name: 'Apr', value: 2780, metrics: 3908 },
  { name: 'May', value: 1890, metrics: 4800 },
  { name: 'Jun', value: 2390, metrics: 3800 },
  { name: 'Jul', value: 3490, metrics: 4300 },
];

export default function BusinessDashboard() {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Pre-sales & ROI
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Agentic transformation impact.
        </p>
      </div>

      {/* KPI Cards (Vertical Stack) */}
      <div className="flex flex-col gap-3">
        <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-[10px] text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card/40 backdrop-blur-xl border-border/50">
            <CardHeader className="flex flex-col items-start space-y-1 pb-1 p-3">
              <Activity className="h-3 w-3 text-blue-400" />
              <CardTitle className="text-xs font-medium text-muted-foreground">Nodes</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-lg font-bold">+2350</div>
            </CardContent>
          </Card>
          <Card className="bg-card/40 backdrop-blur-xl border-border/50">
            <CardHeader className="flex flex-col items-start space-y-1 pb-1 p-3">
              <Ban className="h-3 w-3 text-red-500" />
              <CardTitle className="text-xs font-medium text-muted-foreground">Collisions</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-lg font-bold">12</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chart Section */}
      <Card className="bg-card/30 backdrop-blur border-border/40">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm">Event Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="h-[180px] p-4 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Status Badges */}
      <Card className="bg-card/30 backdrop-blur border-border/40">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm">Node Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-xs">Antigravity Manager</span>
                <Badge variant="outline" className="text-[10px] text-green-400 border-green-400/20 bg-green-500/10">Active</Badge>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Claude Code CLI</span>
                <Badge variant="outline" className="text-[10px] text-yellow-400 border-yellow-400/20 bg-yellow-500/10">Suspended</Badge>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
