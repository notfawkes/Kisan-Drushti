import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AgentCard } from '../components/AgentCard';
import { SystemLogs } from '../components/SystemLogs';
import { Chatbot } from '../components/Chatbot';
import { Button } from '../components/ui/Button';
import { LanguageToggle } from '../components/LanguageToggle';
import { Cpu, Bell, Settings, LogOut, RefreshCw } from 'lucide-react';
interface DashboardProps {
  onLogout: () => void;
}
export function Dashboard({ onLogout }: DashboardProps) {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    // Simulate initial logs
    const initialLogs = [
      {
        id: '1',
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        message: 'System initialized. Connecting to Message Broker...',
        agent: 'System'
      },
      {
        id: '2',
        timestamp: new Date().toLocaleTimeString(),
        level: 'success',
        message: 'gRPC connection established. 200 OK.',
        agent: 'Network'
      },
      {
        id: '3',
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        message: 'Fetching initial telemetry data...',
        agent: 'Crop Monitoring'
      }];

    setLogs(initialLogs);
    // Simulate real-time logs
    const interval = setInterval(() => {
      const newLog = generateRandomLog();
      setLogs((prev) => [...prev, newLog].slice(-50)); // Keep last 50 logs
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const generateRandomLog = () => {
    const agents = [
      'Crop Monitoring',
      'Irrigation Control',
      'Pest Control',
      'Weather Model',
      'Market Model'];

    const messages = [
      {
        level: 'info',
        msg: 'Analyzing satellite imagery sector 4.'
      },
      {
        level: 'success',
        msg: 'Soil moisture optimal. Irrigation paused.'
      },
      {
        level: 'warning',
        msg: 'Minor anomaly detected in leaf spectral signature. Monitoring.'
      },
      {
        level: 'info',
        msg: 'Updated 7-day precipitation forecast.'
      },
      {
        level: 'success',
        msg: 'Market price for soybeans increased by 2.4%.'
      },
      {
        level: 'error',
        msg: 'Sensor node 12 timeout. Retrying connection...'
      }];

    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    return {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      level: randomMsg.level as any,
      message: randomMsg.msg,
      agent: randomAgent
    };
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        message: t('dashboard.manualSync'),
        agent: 'System'
      }]
    );
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              {t('common.appName')}
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-xs font-medium ml-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              {t('common.networkActive')}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="text-zinc-400 hover:text-zinc-100">

              <RefreshCw
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />

            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-zinc-100 relative">

              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-zinc-100">

              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-zinc-800 mx-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-zinc-400 hover:text-red-400">

              <LogOut className="w-4 h-4 mr-2" />
              {t('common.disconnect')}
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
              {t('dashboard.title')}
            </h1>
            <p className="text-zinc-400 mt-1">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 text-sm text-zinc-500 font-mono">
            <span>{t('dashboard.protocol')}</span>
            <span>•</span>
            <span>{t('dashboard.latency')}</span>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgentCard
            title={t('agents.crop')}
            status="active"
            icon="crop"
            delay={0.1}
            metrics={[
              {
                label: 'NDVI Score',
                value: '0.82 (Healthy)'
              },
              {
                label: 'Growth Stage',
                value: 'Vegetative'
              },
              {
                label: 'Last Scan',
                value: '2 mins ago'
              },
              {
                label: 'Confidence',
                value: '98.5%'
              }]
            } />

          <AgentCard
            title={t('agents.irrigation')}
            status="processing"
            icon="irrigation"
            delay={0.2}
            metrics={[
              {
                label: 'Soil Moisture',
                value: '42% (Optimal)'
              },
              {
                label: 'Water Usage',
                value: '1.2k L/day'
              },
              {
                label: 'Next Cycle',
                value: 'Paused (Rain)'
              },
              {
                label: 'Valve Status',
                value: 'Closed'
              }]
            } />

          <AgentCard
            title={t('agents.pest')}
            status="active"
            icon="pest"
            delay={0.3}
            metrics={[
              {
                label: 'Threat Level',
                value: 'Low'
              },
              {
                label: 'Scanned Area',
                value: '142 Acres'
              },
              {
                label: 'Detections',
                value: '0 Critical'
              },
              {
                label: 'Drone Status',
                value: 'Charging'
              }]
            } />

          <AgentCard
            title={t('agents.weather')}
            status="active"
            icon="weather"
            delay={0.4}
            metrics={[
              {
                label: 'Current Temp',
                value: '24°C'
              },
              {
                label: 'Precipitation',
                value: '80% (Tomorrow)'
              },
              {
                label: 'Wind Speed',
                value: '12 km/h'
              },
              {
                label: 'Humidity',
                value: '65%'
              }]
            } />

          <AgentCard
            title={t('agents.market')}
            status="idle"
            icon="market"
            delay={0.5}
            metrics={[
              {
                label: 'Wheat Price',
                value: '$280/ton (↑)'
              },
              {
                label: 'Soybean Price',
                value: '$420/ton (↓)'
              },
              {
                label: 'Trend Analysis',
                value: 'Bullish'
              },
              {
                label: 'Last Update',
                value: '1 hr ago'
              }]
            } />

          <AgentCard
            title={t('agents.advisor')}
            status="active"
            icon="advisor"
            delay={0.6}
            metrics={[
              {
                label: 'Active Queries',
                value: '0'
              },
              {
                label: 'Recommendations',
                value: '2 Pending'
              },
              {
                label: 'Language',
                value: 'English (Auto)'
              },
              {
                label: 'Model',
                value: 'GPT-4 Optimized'
              }]
            } />

        </div>

        {/* System Logs Section */}
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
            delay: 0.8
          }}
          className="mt-8">

          <SystemLogs logs={logs} />
        </motion.div>
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>);

}