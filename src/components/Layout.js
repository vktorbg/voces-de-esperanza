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

// Icons
const BookOpenIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> </svg> );
const PlayCircleIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /> </svg> );
const UsersIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> </svg> );
const DocumentTextIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> </svg> );


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
        StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark }).catch(() => {});
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

  // TODO: REACTIVAR CUANDO FIREBASE ESTÉ CONFIGURADO
  // Push Notifications Registration - TEMPORALMENTE DESHABILITADO
  // Para reactivar: descomentar este bloque después de añadir google-services.json
  /*
  React.useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Solicita permiso para notificaciones
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Si el permiso es otorgado, registra el dispositivo
          PushNotifications.register();
        }
      });

      // Cuando el registro es exitoso, obtienes un token
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        // ¡IMPORTANTE! Envía este token a OneSignal
        // Puedes usar el SDK de OneSignal para asociar este token a un usuario
        // window.OneSignal.setExternalUserId(...) o similar
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });
    }
  }, []);
  */

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