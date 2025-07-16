import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Import translation files
import esTranslation from '../locales/es/translation.json';
import enTranslation from '../locales/en/translation.json';

// Create Language Context
const LanguageContext = createContext();

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    lng: 'es', // Default language
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    },
  });

export const LanguageProvider = ({ children }) => {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Set language based on domain
      if (hostname === 'voices-of-hope.com') {
        i18nInstance.changeLanguage('en');
      } else {
        i18nInstance.changeLanguage('es');
      }
    }
  }, [i18nInstance]);

  return (
    <LanguageContext.Provider value={{ i18n: i18nInstance }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const { t, i18n: i18nInstance } = useTranslation();

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return {
    t, // Translation function
    i18n: i18nInstance,
    currentLanguage: i18nInstance.language,
    changeLanguage: (lng) => i18nInstance.changeLanguage(lng),
    isEnglish: i18nInstance.language === 'en',
    isSpanish: i18nInstance.language === 'es',
  };
};

export default LanguageProvider;
