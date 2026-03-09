import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import {
  Activity,
  Droplets,
  Bug,
  CloudRain,
  TrendingUp,
  Cpu } from
'lucide-react';
interface AgentCardProps {
  title: string;
  status: 'active' | 'idle' | 'processing';
  icon: 'crop' | 'irrigation' | 'pest' | 'weather' | 'market' | 'advisor';
  metrics: {
    label: string;
    value: string;
  }[];
  delay?: number;
}
export function AgentCard({
  title,
  status,
  icon,
  metrics,
  delay = 0
}: AgentCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'crop':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'irrigation':
        return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'pest':
        return <Bug className="w-5 h-5 text-red-400" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-cyan-400" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'advisor':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-400" />;
    }
  };
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500';
      case 'processing':
        return 'bg-yellow-500 animate-pulse';
      case 'idle':
        return 'bg-zinc-500';
      default:
        return 'bg-zinc-500';
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        delay
      }}>

      <Card className="h-full border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-zinc-800/50 rounded-md">{getIcon()}</div>
            <CardTitle className="text-sm font-medium text-zinc-200">
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-400 capitalize">{status}</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {metrics.map((metric, idx) =>
            <div key={idx} className="flex flex-col space-y-1">
                <span className="text-xs text-zinc-500">{metric.label}</span>
                <span className="text-sm font-medium text-zinc-300">
                  {metric.value}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>);

}