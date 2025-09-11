import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';

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
      // 1. Revisa si el usuario ya guardó una preferencia
      try {
        const { value: storedLang } = await Preferences.get({ key: 'language' });
        if (storedLang) {
          i18nInstance.changeLanguage(storedLang);
          setLanguage(storedLang);
          return;
        }
      } catch (e) {
        console.warn('Could not access storage for language preference.');
      }

      // 2. Si no, detecta el idioma del dispositivo
      try {
        const langInfo = await Device.getLanguageCode();
        const deviceLang = langInfo.value.split('-')[0]; // 'en-US' -> 'en'
        if (deviceLang === 'en') {
          i18nInstance.changeLanguage('en');
          setLanguage('en');
        } else {
          i18nInstance.changeLanguage('es');
          setLanguage('es');
        }
      } catch (e) {
        // Si falla (ej. en web), revisa el dominio como fallback
        console.warn('Could not detect device language, checking domain.');
        
        // Check if we're in the browser environment
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          
          // Set language based on domain
          if (hostname === 'voices-of-hope.com') {
            i18nInstance.changeLanguage('en');
            setLanguage('en');
          } else {
            i18nInstance.changeLanguage('es');
            setLanguage('es');
          }
        } else {
          // Default to Spanish if all else fails
          i18nInstance.changeLanguage('es');
          setLanguage('es');
        }
      }
    };

    initializeLanguage();
  }, [i18nInstance]);

  // Function to change language and save preference
  const changeLanguage = async (lng) => {
    try {
      await i18nInstance.changeLanguage(lng);
      setLanguage(lng);
      await Preferences.set({ key: 'language', value: lng });
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

export default LanguageProvider;
