import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Bell, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
    const { t } = useTranslation();

    const mockNotifications = [
        {
            id: 1,
            type: 'info',
            text: t('notifications.item1'),
            time: '10m ago'
        },
        {
            id: 2,
            type: 'success',
            text: t('notifications.item2'),
            time: '1h ago'
        },
        {
            id: 3,
            type: 'warning',
            text: t('notifications.item3'),
            time: '3h ago'
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'info':
                return <Info className="w-5 h-5 text-blue-400" />;
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-400" />;
            default:
                return <Bell className="w-5 h-5 text-zinc-400" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[25vw] min-w-[300px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                            <div className="flex items-center space-x-3">
                                <Bell className="w-5 h-5 text-zinc-100" />
                                <h2 className="text-zinc-100 font-semibold text-lg">{t('notifications.title')}</h2>
                            </div>
                            <Button onClick={onClose} variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {mockNotifications.map((notif) => (
                                <div key={notif.id} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-0.5">{getIcon(notif.type)}</div>
                                        <div className="flex-1">
                                            <p className="text-sm text-zinc-200">{notif.text}</p>
                                            <p className="text-xs text-zinc-500 mt-2">{notif.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-zinc-800">
                            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none">
                                {t('notifications.markAllRead')}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
