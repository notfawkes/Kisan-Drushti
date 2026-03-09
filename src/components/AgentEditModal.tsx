import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

export interface Metric {
    label: string;
    value: string;
}

interface AgentEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (metrics: Metric[]) => void;
    title: string;
    initialMetrics: Metric[];
}

export function AgentEditModal({ isOpen, onClose, onSave, title, initialMetrics }: AgentEditModalProps) {
    const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);

    useEffect(() => {
        if (isOpen) {
            setMetrics(initialMetrics);
        }
    }, [isOpen, initialMetrics]);

    const handleMetricChange = (index: number, newValue: string) => {
        const updated = [...metrics];
        updated[index] = { ...updated[index], value: newValue };
        setMetrics(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(metrics);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden cursor-default"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                                <h2 className="text-zinc-100 font-semibold text-lg">Edit {title}</h2>
                                <Button onClick={onClose} variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {metrics.map((metric, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 block">{metric.label}</label>
                                        <input
                                            type="text"
                                            value={metric.value}
                                            onChange={(e) => handleMetricChange(idx, e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-sm"
                                        />
                                    </div>
                                ))}

                                <div className="pt-4 flex justify-end space-x-3">
                                    <Button type="button" variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-zinc-100">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-900/20">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
