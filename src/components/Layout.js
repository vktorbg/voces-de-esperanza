// src/components/Layout.js

import React from 'react';
import { Link } from 'gatsby';
import { useAudioPlayer, PlayerUI } from './AudioPlayer';
import { useLanguage } from './LanguageProvider';
import { useHasMounted } from './hooks/useHasMounted'; // <-- 1. IMPORT THE HOOK
import Seo from './Seo'; // <-- 2. IMPORT SEO COMPONENT
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';
import { FCM } from '@capacitor-community/fcm';

// Icons
const BookOpenIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> </svg>);
const PlayCircleIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /> </svg>);
const UsersIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> </svg>);
const DocumentTextIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> </svg>);


export default function Layout({ children }) {
  const { track } = useAudioPlayer();
  const { t } = useLanguage();
  const hasMounted = useHasMounted();
  const [isPWA, setIsPWA] = React.useState(false);
  const [isNativeApp, setIsNativeApp] = React.useState(false);

  // === 2. AÑADE ESTE useEffect PARA MANEJAR LA STATUS BAR ===
  React.useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const setStatusBarStyle = (isDark) => {
        // Cuando es oscuro, pedimos Style.Light para que el texto sea claro (blanco) sobre fondo oscuro
        // Cuando es claro, pedimos Style.Dark para que el texto sea oscuro sobre fondo claro
        if (isDark) {
          StatusBar.setStyle({ style: Style.Light }).catch(() => { });
          StatusBar.setBackgroundColor({ color: '#1f2937' }).catch(() => { }); // gray-800
        } else {
          StatusBar.setStyle({ style: Style.Dark }).catch(() => { });
          StatusBar.setBackgroundColor({ color: '#f3f4f6' }).catch(() => { }); // gray-100
        }
      };

      // Establece el estilo inicial basado en la clase 'dark' en <html>
      const isInitiallyDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      setStatusBarStyle(isInitiallyDark);

      // Observa cambios en la clase 'dark' del <html> para actualizar estilo en tiempo real
      if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const isNowDark = mutation.target.classList.contains('dark');
              setStatusBarStyle(isNowDark);
            }
          });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      setIsPWA(!!standalone);
      setIsNativeApp(Capacitor.isNativePlatform());
    }
    // Ocultar splash screen si el plugin está disponible (evita errores en web)
    if (Capacitor.isPluginAvailable && Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
  }, []);

  // Push Notifications Registration
  React.useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const setupPushNotifications = async () => {
        try {
          const permResult = await PushNotifications.checkPermissions();

          if (permResult.receive === 'prompt') {
            const requestResult = await PushNotifications.requestPermissions();
            if (requestResult.receive !== 'granted') {
              console.log('Push notification permission denied');
              return;
            }
          } else if (permResult.receive === 'denied') {
            console.log('Push notification permission denied');
            return;
          }

          await PushNotifications.register();

          // Get current language
        } catch (error) {
          console.error('Error setting up push notifications:', error);
        }
      };

      setupPushNotifications();

      // Registration success listener
      const registrationListener = PushNotifications.addListener(
        'registration',
        async (token) => {
          console.log('Push registration success, token (raw):', token.value);

          let tokenForFirebase = token.value;

          // On iOS, we need to convert the APNs token to an FCM token
          if (Capacitor.getPlatform() === 'ios') {
            try {
              const fcm = await FCM.getToken();
              tokenForFirebase = fcm.token;
              console.log('FCM token obtained for iOS:', tokenForFirebase);
            } catch (err) {
              console.error('Error getting FCM token on iOS:', err);
              // Fallback to raw token, though topic subscription might fail
            }
          }

          await Preferences.set({ key: 'fcm_token', value: tokenForFirebase });

          const { value } = await Preferences.get({ key: 'language' });
          const userLang = value || 'es';
          subscribeToTopics(userLang, tokenForFirebase);
        }
      );

      // Registration error listener
      const errorListener = PushNotifications.addListener(
        'registrationError',
        (error) => {
          console.error('Error on registration:', JSON.stringify(error));
        }
      );

      // Notification received (foreground)
      const receivedListener = PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log('Push notification received:', notification);
        }
      );

      // Notification tapped
      const actionListener = PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification) => {
          handleNotificationTap(notification);
        }
      );

      return () => {
        registrationListener.remove();
        errorListener.remove();
        receivedListener.remove();
        actionListener.remove();
      };
    }
  }, []);

  // Subscribe to notification topics based on language and token
  const subscribeToTopics = async (language, token) => {
    try {
      if (!token) {
        console.log('No token available for subscription');
        return;
      }

      // Save preferences locally
      await Preferences.set({
        key: 'notification_topics',
        value: JSON.stringify({
          daily_devotional: true,
          new_videos: true,
          special_resources: true,
          language: language
        })
      });

      // Call Cloud Function to subscribe to topics
      const { functions } = await import('../services/firebase');
      const { httpsCallable } = await import('firebase/functions');
      const subscribeToTopic = httpsCallable(functions, 'subscribeToTopic');

      const topics = [
        `daily_devotional_${language === 'es' ? 'es' : 'en'}`,
        `new_videos_${language === 'es' ? 'es' : 'en'}`,
        `special_resources_${language === 'es' ? 'es' : 'en'}`
      ];

      for (const topic of topics) {
        try {
          await subscribeToTopic({ token, topic });
          console.log(`Subscribed to ${topic}`);
        } catch (e) {
          console.error(`Failed to subscribe to ${topic}`, e);
        }
      }

      console.log(`Subscribed to topics for language: ${language}`);
    } catch (error) {
      console.error('Error subscribing to topics:', error);
    }
  };

  // Handle notification tap
  const handleNotificationTap = (notificationAction) => {
    const data = notificationAction.notification.data;

    if (data.type === 'daily_devotional' && data.date) {
      if (typeof window !== 'undefined') {
        window.location.href = `/?date=${data.date}`;
      }
    } else if (data.type === 'new_video' && data.videoId) {
      if (typeof window !== 'undefined') {
        window.location.href = `/videos/?highlight=${data.videoId}`;
      }
    } else if (data.type === 'special_resource' && data.url) {
      if (typeof window !== 'undefined') {
        window.location.href = data.url;
      }
    }
  };

  // ...previous code...

  if (!hasMounted) {
    return <div className="bg-gray-100 dark:bg-gray-900 min-h-screen" />;
  }

  const navItems = [
    { name: t('navigation.devotionals'), path: "/", icon: BookOpenIcon },
    { name: t('navigation.videos'), path: "/videos/", icon: PlayCircleIcon },
    { name: t('navigation.about'), path: "/quienes-somos/", icon: UsersIcon },
    { name: t('navigation.resources'), path: "/recursos/", icon: DocumentTextIcon }
  ];

  const navHeight = 'pb-[57px] sm:pb-[65px]';
  const playerHeight = 'pb-[145px] sm:pb-[153px]';

  // Safe area: use CSS environment variables on native apps instead of fixed values
  // Tailwind bracket notation keeps these classes safe from purging
  const nativeSafeArea = isNativeApp ? {
    paddingTop: "pt-[env(safe-area-inset-top)]",
    paddingBottom: "pb-[env(safe-area-inset-bottom)]",
    // playerPadding keeps the calculated space for the player + safe area
    playerPadding: track ? `pb-[177px] sm:pb-[185px] pb-[env(safe-area-inset-bottom)]` : `pb-[89px] sm:pb-[97px] pb-[env(safe-area-inset-bottom)]`
  } : {
    paddingTop: '',
    paddingBottom: '',
    playerPadding: track ? playerHeight : navHeight
  };

  // Padding para nav sólo si es PWA (no nativo)
  const navPadding = isPWA && !isNativeApp ? 'pb-6' : '';

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Add SEO component for metadata on all pages */}
      <Seo />

      <main className={`transition-all duration-300 ${nativeSafeArea.playerPadding}`}>
        {/* Header with Settings Icon for Native App */}
        {isNativeApp && (
          <div className={`fixed top-0 right-0 left-0 z-40 bg-transparent pointer-events-none ${nativeSafeArea.paddingTop}`}>
            <div className="max-w-4xl mx-auto relative h-14 sm:h-16 flex items-center justify-end px-4">
              <Link
                to="/ajustes"
                className="pointer-events-auto p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={t('navigation.settings') || "Ajustes"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        <div className={`pt-4 sm:pt-6 ${nativeSafeArea.paddingTop}`}>
          {children}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <PlayerUI />
        <nav className={`w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg ${isNativeApp ? 'pb-[env(safe-area-inset-bottom)]' : navPadding}`}>
          <div className="flex justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300" activeClassName="!text-blue-600 dark:!text-blue-400 scale-105" partiallyActive={item.path !== "/"}>
                  <Icon className={`w-6 h-6 mb-0.5 transition-transform duration-200 ease-in-out group-hover:scale-110`} />
                  <span className={`text-xs font-medium transition-opacity duration-200 ease-in-out opacity-90 group-hover:opacity-100`}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </footer>
    </div>
  );
}