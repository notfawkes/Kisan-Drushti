import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';

export function AiSuggestion() {
    const { t } = useTranslation();

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                <h2 className="text-zinc-100 font-semibold text-lg">{t('dashboard.aiInsightTitle')}</h2>
            </div>
            <div className="p-6">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex flex-shrink-0 items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-emerald-400 font-semibold text-base mb-2">{t('dashboard.aiSuggestion')}</h3>
                        <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                            {t('dashboard.aiSuggestionText')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
