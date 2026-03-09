import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from './ui/Button';

export function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-zinc-300 hover:text-white border border-zinc-700 hover:bg-zinc-800 transition-colors ml-4 mr-2"
            title={i18n.language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        >
            <Languages className="w-4 h-4 mr-2" />
            {i18n.language === 'en' ? 'HI' : 'EN'}
        </Button>
    );
}
