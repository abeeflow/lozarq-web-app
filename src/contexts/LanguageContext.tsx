import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../i18n/translations';
import type { Language, Translations } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lozarq-lang');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lozarq-lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
