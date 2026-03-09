import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Activity,
  Droplets,
  Bug,
  CloudRain,
  TrendingUp } from
'lucide-react';
interface LoadingScreenProps {
  onComplete: () => void;
}
const agents = [
{
  id: 'crop',
  name: 'Crop Monitoring',
  icon: Activity,
  color: 'text-emerald-400'
},
{
  id: 'irrigation',
  name: 'Smart Irrigation',
  icon: Droplets,
  color: 'text-blue-400'
},
{
  id: 'pest',
  name: 'Pest Detection',
  icon: Bug,
  color: 'text-red-400'
},
{
  id: 'weather',
  name: 'Weather Prediction',
  icon: CloudRain,
  color: 'text-cyan-400'
},
{
  id: 'market',
  name: 'Market Intelligence',
  icon: TrendingUp,
  color: 'text-yellow-400'
},
{
  id: 'advisor',
  name: 'Farm Advisor',
  icon: Cpu,
  color: 'text-purple-400'
}];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress === 10) setActiveAgents((prev) => [...prev, 'crop']);
      if (currentProgress === 25)
      setActiveAgents((prev) => [...prev, 'irrigation']);
      if (currentProgress === 40) setActiveAgents((prev) => [...prev, 'pest']);
      if (currentProgress === 55)
      setActiveAgents((prev) => [...prev, 'weather']);
      if (currentProgress === 70) setActiveAgents((prev) => [...prev, 'market']);
      if (currentProgress === 85)
      setActiveAgents((prev) => [...prev, 'advisor']);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6">

        <div className="w-20 h-20 mb-8 rounded-2xl bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 border-t-2 border-emerald-500 rounded-2xl" />

          <Cpu className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2 text-center tracking-tight">
          Initializing Autonomous Farm
        </h1>
        <p className="text-zinc-400 mb-12 text-center">
          Booting AI Agent Network...
        </p>

        {/* Agent Initialization Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-12">
          {agents.map((agent) => {
            const isActive = activeAgents.includes(agent.id);
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{
                  opacity: 0.3,
                  y: 10
                }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  y: isActive ? 0 : 10,
                  borderColor: isActive ?
                  'rgba(16, 185, 129, 0.5)' :
                  'rgba(39, 39, 42, 0.5)'
                }}
                className={`flex items-center p-3 rounded-lg border bg-zinc-900/50 transition-all duration-500`}>

                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${isActive ? 'bg-zinc-800' : 'bg-zinc-900'}`}>

                  <Icon
                    className={`w-4 h-4 ${isActive ? agent.color : 'text-zinc-600'}`} />

                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-medium ${isActive ? 'text-zinc-200' : 'text-zinc-600'}`}>

                    {agent.name}
                  </span>
                  <span
                    className={`text-[10px] ${isActive ? 'text-emerald-400' : 'text-zinc-700'}`}>

                    {isActive ? 'Online' : 'Pending...'}
                  </span>
                </div>
              </motion.div>);

          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md">
          <div className="flex justify-between text-xs text-zinc-500 mb-2 font-mono">
            <span>SYSTEM_STARTUP</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{
                width: 0
              }}
              animate={{
                width: `${progress}%`
              }}
              transition={{
                ease: 'linear',
                duration: 0.1
              }} />

          </div>
        </div>
      </motion.div>
    </div>);

}