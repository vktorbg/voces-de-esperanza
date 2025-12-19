import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

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
  const [language, setLanguage] = useState('es'); // Español por defecto

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // 1. PRIMERA PRIORIDAD: Preferencia guardada del usuario
        const { value: storedLang } = await Preferences.get({ key: 'language' });
        if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
          i18nInstance.changeLanguage(storedLang);
          setLanguage(storedLang);
          return;
        }
      } catch (e) {
        console.warn('Could not access storage for language preference.');
      }

      // 2. SEGUNDA PRIORIDAD: Dominio web (solo en navegador)
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        
        if (hostname.includes('voices-of-hope')) {
          i18nInstance.changeLanguage('en');
          setLanguage('en');
          return;
        } else if (hostname.includes('voces-de-esperanza')) {
          i18nInstance.changeLanguage('es');
          setLanguage('es');
          return;
        }
      }

      // 3. TERCERA PRIORIDAD: Idioma del dispositivo (solo en móvil)
      if (Capacitor.isNativePlatform()) {
        try {
          const langInfo = await Device.getLanguageCode();
          const deviceLang = langInfo.value.split('-')[0]; // 'en-US' -> 'en'
          
          if (deviceLang === 'en') {
            i18nInstance.changeLanguage('en');
            setLanguage('en');
            return;
          }
        } catch (e) {
          console.warn('Could not detect device language.');
        }
      }

      // 4. FALLBACK: Español por defecto
      i18nInstance.changeLanguage('es');
      setLanguage('es');
    };

    initializeLanguage();
  }, [i18nInstance]);

  // Function to change language and save preference
  const changeLanguage = async (lng) => {
    try {
      await i18nInstance.changeLanguage(lng);
      setLanguage(lng);
      await Preferences.set({ key: 'language', value: lng });

      // Update notification topics when language changes
      if (Capacitor.isNativePlatform()) {
        const { value } = await Preferences.get({ key: 'notification_topics' });
        const topics = value ? JSON.parse(value) : {};
        topics.language = lng;
        await Preferences.set({
          key: 'notification_topics',
          value: JSON.stringify(topics)
        });
        console.log(`Notification language updated to: ${lng}`);
      }
    } catch (e) {
      console.error('Error changing language:', e);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      i18n: i18nInstance, 
      language, 
      changeLanguage 
    }}>
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
    currentLanguage: context.language,
    changeLanguage: context.changeLanguage, // Use the enhanced changeLanguage function
    isEnglish: context.language === 'en',
    isSpanish: context.language === 'es',
    language: context.language, // Add this for consistency
  };
};

// Centralized locale functions
export const getCurrentLocale = () => {
  // Get current language from localStorage (i18n stores it there)
  if (typeof window !== 'undefined') {
    const currentLang = localStorage.getItem('i18nextLng') || 'es';
    return currentLang === 'en' ? 'en-US' : 'es-MX';
  }
  return 'es-MX'; // Default for SSR
};

export const isEnglishSite = () => {
  if (typeof window !== 'undefined') {
    const currentLang = localStorage.getItem('i18nextLng') || 'es';
    return currentLang === 'en';
  }
  return false; // Default for SSR
};

export default LanguageProvider;
