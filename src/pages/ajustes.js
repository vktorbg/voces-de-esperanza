import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import Layout from '../components/Layout';
import { useLanguage } from '../components/LanguageProvider';

export default function AjustesPage() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    daily_devotional: true,
    new_videos: true,
    special_resources: true,
  });
  const [fcmToken, setFcmToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

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

      // Load FCM token
      const tokenResult = await Preferences.get({ key: 'fcm_token' });
      if (tokenResult.value) {
        setFcmToken(tokenResult.value);
      }
    };
    loadSettings();
  }, []);

  const handleToggle = async (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);

    const { value } = await Preferences.get({ key: 'notification_topics' });
    const topics = value ? JSON.parse(value) : {};
    await Preferences.set({
      key: 'notification_topics',
      value: JSON.stringify({ ...topics, ...newSettings })
    });
  };

  const copyTokenToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fcmToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fcmToken;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

        {/* DEBUG: Token FCM - Solo para testing */}
        {fcmToken && (
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              🔧 Token FCM (Para Testing)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Usa este token para enviar notificaciones de prueba desde Firebase Console
            </p>

            <div className="flex items-start gap-2">
              <button
                onClick={() => setShowToken(!showToken)}
                className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {showToken ? 'Ocultar Token' : 'Mostrar Token'}
              </button>

              {showToken && (
                <button
                  onClick={copyTokenToClipboard}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {copied ? '✓ Copiado!' : 'Copiar Token'}
                </button>
              )}
            </div>

            {showToken && (
              <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-yellow-300 dark:border-yellow-700">
                <p className="text-xs font-mono break-all text-gray-800 dark:text-gray-200">
                  {fcmToken}
                </p>
              </div>
            )}

            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
              ⚠️ Este botón es temporal para pruebas. Se eliminará en producción.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
