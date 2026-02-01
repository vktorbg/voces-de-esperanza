import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import Layout from '../components/Layout';
import { useLanguage } from '../components/LanguageProvider';

export default function AjustesPage() {
  const { t, i18n } = useLanguage();
  const [settings, setSettings] = useState({
    daily_devotional: true,
    new_videos: true,
    special_resources: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      const { value } = await Preferences.get({ key: 'notification_topics' });
      if (value) {
        const parsed = JSON.parse(value);
        setSettings({
          daily_devotional: parsed.daily_devotional ?? true,
          new_videos: parsed.new_videos ?? true,
          special_resources: parsed.special_resources ?? true,
        });
      }
    };
    loadSettings();
  }, []);

  const handleToggle = async (key) => {
    // 1. Update UI state optimistically
    const newSettings = { ...settings, [key]: !settings[key] };
    const isSubscribing = newSettings[key];
    setSettings(newSettings);

    try {
      // 2. Save preferences
      const { value: topicsValue } = await Preferences.get({ key: 'notification_topics' });
      const topics = topicsValue ? JSON.parse(topicsValue) : {};
      await Preferences.set({
        key: 'notification_topics',
        value: JSON.stringify({ ...topics, ...newSettings })
      });

      // 3. Update Cloud Subscription
      const { value: token } = await Preferences.get({ key: 'fcm_token' });

      if (token) {
        const { functions } = await import('../services/firebase');
        const { httpsCallable } = await import('firebase/functions');

        const functionName = isSubscribing ? 'subscribeToTopic' : 'unsubscribeFromTopic';
        const manageSubscription = httpsCallable(functions, functionName);

        // Determine topic name based on language
        // Use i18n.language or a fallback. 
        // Note: Check if i18n is available from useLanguage, otherwise read preference
        let langCode = 'es';
        if (i18n && i18n.language) {
          langCode = i18n.language.startsWith('en') ? 'en' : 'es';
        } else {
          const { value: savedLang } = await Preferences.get({ key: 'language' });
          langCode = savedLang || 'es';
        }

        const topicName = `${key}_${langCode}`;

        await manageSubscription({ token, topic: topicName });
        console.log(`${isSubscribing ? 'Subscribed to' : 'Unsubscribed from'} ${topicName}`);
      } else {
        console.log('No token available. Preference saved locally.');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      // Ideally revert the toggle in UI here if critical
    }
  };

  if (!Capacitor.isNativePlatform()) {
    return (
      <Layout>
        <div className="p-4 max-w-2xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            Las notificaciones solo están disponibles en la aplicación móvil.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Configuración de Notificaciones
        </h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Devocional Diario
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recibe una notificación cada mañana a las 6:00 AM
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.daily_devotional}
              onChange={() => handleToggle('daily_devotional')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Nuevos Videos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notificaciones de videos nuevos
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.new_videos}
              onChange={() => handleToggle('new_videos')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recursos Especiales
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avisos de nuevos recursos
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.special_resources}
              onChange={() => handleToggle('special_resources')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Nota:</strong> Las notificaciones se enviarán en el idioma que tengas configurado en la aplicación.
          </p>
        </div>
      </div>
    </Layout>
  );
}
