import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, AlertCircle, CheckCircle2, Info } from 'lucide-react';
interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  agent: string;
}
interface SystemLogsProps {
  logs: LogEntry[];
}
export function SystemLogs({ logs }: SystemLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);
  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };
  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'text-zinc-300';
      case 'success':
        return 'text-emerald-300';
      case 'warning':
        return 'text-yellow-300';
      case 'error':
        return 'text-red-300';
    }
  };
  return (
    <div className="flex flex-col h-[300px] rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden font-mono text-sm">
      <div className="flex items-center px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <Terminal className="w-4 h-4 mr-2 text-zinc-400" />
        <span className="text-zinc-300 font-medium">System Logs</span>
        <div className="ml-auto flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth">

        <AnimatePresence initial={false}>
          {logs.map((log) =>
          <motion.div
            key={log.id}
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0
            }}
            className="flex items-start space-x-3 text-xs md:text-sm">

              <span className="text-zinc-500 shrink-0">[{log.timestamp}]</span>
              <span className="shrink-0">{getLogIcon(log.level)}</span>
              <span className="text-zinc-400 font-semibold shrink-0">
                [{log.agent}]
              </span>
              <span className={`${getLogColor(log.level)} break-words`}>
                {log.message}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>);

}