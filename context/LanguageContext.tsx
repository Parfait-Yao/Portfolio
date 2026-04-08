'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language, translations, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('app-language') as Language;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved);
      document.cookie = `app-language=${saved}; path=/; max-age=31536000`;
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguageState('en');
        document.cookie = `app-language=en; path=/; max-age=31536000`;
      } else {
        document.cookie = `app-language=fr; path=/; max-age=31536000`;
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    document.cookie = `app-language=${lang}; path=/; max-age=31536000`;
    router.refresh();
  };

  // Pendant le SSR, on utilise le français par défaut.
  const t = translations[language];

  // Optionnel: Empêcher le flash de texte non traduit si le client prend le dessus
  // Mais puisqu'on hydrate côté client, on peut juste rendre les enfants
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div style={{ opacity: mounted ? 1 : 0.99 }}>
        {children}
      </div>
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
