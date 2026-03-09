import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import {
  ArrowRight,
  Cpu,
  Activity,
  Droplets,
  Bug,
  CloudRain,
  TrendingUp,
  ShieldCheck } from
'lucide-react';
interface LandingPageProps {
  onLoginClick: () => void;
}
const features = [
{
  icon: Activity,
  title: 'Crop Monitoring',
  desc: 'Real-time health tracking via satellite and drone imagery.'
},
{
  icon: Droplets,
  title: 'Smart Irrigation',
  desc: 'Optimize water usage based on soil moisture and weather.'
},
{
  icon: Bug,
  title: 'Pest Detection',
  desc: 'Early warning system for diseases and pest infestations.'
},
{
  icon: CloudRain,
  title: 'Weather Prediction',
  desc: 'Hyper-local climate risk forecasting.'
},
{
  icon: TrendingUp,
  title: 'Market Intelligence',
  desc: 'Analyze price trends for optimal selling times.'
},
{
  icon: Cpu,
  title: 'Farm Advisor',
  desc: 'Voice and mobile guidance for data-driven decisions.'
}];

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-emerald-500" />
            <span className="font-bold text-lg tracking-tight">
              AgriAgent AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-zinc-300 hover:text-white">

              Features
            </Button>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-zinc-300 hover:text-white">

              How it Works
            </Button>
            <Button
              onClick={onLoginClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-none">

              Access Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
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
                duration: 0.5
              }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-sm font-medium mb-8">

              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online: 6 Agents Active</span>
            </motion.div>

            <motion.h1
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
                delay: 0.1
              }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">

              The Future of Farming is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Autonomous
              </span>
            </motion.h1>

            <motion.p
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
                delay: 0.2
              }}
              className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">

              A collaborative network of 6 specialized AI agents continuously
              monitoring, analyzing, and optimizing your farm's operations in
              real-time.
            </motion.p>

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
                delay: 0.3
              }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">

              <Button
                size="lg"
                onClick={onLoginClick}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 text-lg">

                Start Monitoring <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12 px-8 text-lg">

                View Demo
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7,
              delay: 0.5
            }}
            className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-colors group">

                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-emerald-900/30 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>);

            })}
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 1,
              delay: 0.8
            }}
            className="mt-24 flex items-center justify-center space-x-2 text-zinc-500 text-sm">

            <ShieldCheck className="w-4 h-4" />
            <span>End-to-end encrypted • gRPC optimized • 99.9% Uptime</span>
          </motion.div>
        </div>
      </main>
    </div>);

}