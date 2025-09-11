// File: voces-de-esperanza/src/pages/index.js
// REPLACE THE ENTIRE CONTENTS OF YOUR FILE WITH THIS

import React, { useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link, graphql } from "gatsby";
import { useTranslation } from "react-i18next";
import { useAudioPlayer } from "../components/AudioPlayer";
import InstallPrompt from "../components/InstallPrompt";
import IOSInstallPrompt from "../components/IOSInstallPrompt";
import { Share } from '@capacitor/share';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

// --- Icons (No changes here) ---
const BookOpenIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> </svg> );
const WhatsAppIcon = (props) => ( <svg viewBox="0 0 32 32" fill="currentColor" width="1.5em" height="1.5em" {...props}> <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.09L4 29l7.18-2.32A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.87-.52-5.5-1.5l-.39-.23-4.28 1.39 1.4-4.16-.25-.4A9.93 9.93 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.53-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.57.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/> </svg> );
const SpeakerWaveIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /> </svg> );
const ReloadIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /> </svg> );

// --- Skeletons and Loaders (No changes here) ---
const DevotionalSkeleton = () => ( <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-pulse" style={{ maxWidth: '95vw' }}> <div className="flex items-start mb-6"> <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 bg-gray-200 dark:bg-gray-700"></div> <div className="flex-grow pt-2"> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div> <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div> </div> </div> <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div> <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"> <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2"></div> <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div> </div> <div className="space-y-6"> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div> </div> </div> );

const OfflineMessage = ({ t }) => (
  <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto px-2" style={{ maxWidth: '95vw' }}>
    <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-xl p-4 sm:p-6 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3">
          <span className="text-orange-600 dark:text-orange-400">📴</span>
        </div>
        <h3 className="font-semibold text-orange-800 dark:text-orange-200">{t('offline_mode') || 'Modo Sin Conexión'}</h3>
      </div>
      <p className="text-orange-700 dark:text-orange-300 text-sm">
        {t('offline_message') || 'Mostrando el último devocional guardado. Conéctate a internet para obtener contenido actualizado.'}
      </p>
    </div>
  </div>
);

const NoDevotionalMessage = ({ t }) => (
  <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto px-2" style={{ maxWidth: '95vw' }}>
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 sm:p-6">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3">
          <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
        </div>
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">{t('no_connection') || 'Sin Conexión'}</h3>
      </div>
      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
        {t('need_internet_first_time') || 'Necesitas conexión a internet la primera vez para descargar los devocionales.'}
      </p>
    </div>
  </div>
);

// DevotionalView Component - Simplified to be more "dumb"
const DevotionalView = ({ devocional, onWhatsAppClick, isClient }) => {
  const { t, i18n } = useTranslation();
  const { playTrack } = useAudioPlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // This logic is now safe because the `isClient` prop guards it.
  const isIOS = isClient && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = isClient && (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone);
  const iconSrc = isClient && window.location.hostname.includes("voices-of-hope") ? "/icon2.jpg" : "/icon.jpg";

  const handleSubscribeClick = () => {
    if (window.OneSignal) {
      window.OneSignal.showSlidedownPrompt();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!devocional) {
    return <DevotionalSkeleton />;
  }

  const availableAudios = [
    { lang: t('language_spanish'), url: devocional.audioEspanolUrl },
    { lang: t('language_nahuatl'), url: devocional.audioNahuatlUrl },
    { lang: t('language_english'), url: devocional.audioEnglishUrl },
  ].filter(audio => audio.url);

  const handlePlay = (audio) => {
    playTrack({ url: audio.url, title: `${audio.lang} - ${devocional.titulo}`, image: iconSrc });
    setMenuOpen(false);
  };
  
  function getShareText(devocional, t, i18n) {
    const isSpanish = i18n.language === 'es';
    const url = isSpanish ? 'https://voces-de-esperanza.com' : 'https://voices-of-hope.com';
    const fechaObj = new Date(devocional.fecha);
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const fechaFormateada = fechaObj.toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', opcionesFecha);
    let reflexionTexto = '';
    if (devocional.reflexion && typeof devocional.reflexion.content === 'object') {
      reflexionTexto = devocional.reflexion.content.map(c => c.content?.map(cc => cc.value).join(' ')).join('\n');
    } else {
      reflexionTexto = devocional.reflexion;
    }
    const citaItalica = devocional.cita ? `\n${devocional.cita}` : '';
    return ( isSpanish ? `¡Buenos días!\n\n${fechaFormateada}\n\n🌟 ${devocional.titulo}\n\n📖 Versículo Clave:\n${devocional.versiculo}${citaItalica}\n\n🙏 Reflexión:\n${reflexionTexto}\n\n🤔 Pregunta:\n${devocional.pregunta || ''}\n\n🔥 Aplicación:\n${devocional.aplicacion || ''}\n\nTe invitamos a visitar nuestra página: ${url}` : `Good morning!\n\n${fechaFormateada}\n\n🌟 ${devocional.titulo}\n\n📖 Key Verse:\n${devocional.versiculo}${citaItalica}\n\n🙏 Reflection:\n${reflexionTexto}\n\n🤔 Question:\n${devocional.pregunta || ''}\n\n🔥 Application:\n${devocional.aplicacion || ''}\n\nWe invite you to visit our website: ${url}` );
  }

  let fechaFormateada = '';
  if (devocional.fecha) {
    const fecha = new Date(devocional.fecha);
    if (!isNaN(fecha.getTime())) {
  // Choose locale based on current language/domain so English site shows English dates
  const isEnglishSite = isClient && typeof window !== 'undefined' && window.location.hostname.includes('voices-of-hope');
  const localeForDate = (i18n.language === 'en' || isEnglishSite) ? 'en-US' : 'es-ES';
  fechaFormateada = fecha.toLocaleDateString(localeForDate, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    }
  }

  return (
    <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto px-2" style={{ maxWidth: '95vw' }}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-start mb-6">
          <img src={iconSrc} alt={t('logo_alt')} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 shadow flex-shrink-0" />
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider">{t('app_name')}</span>
              <button onClick={() => window.location.reload()} title={t('reload_devotional')} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex-shrink-0" aria-label={t('reload_devotional')}>
                <ReloadIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{t('daily_devotional')}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{fechaFormateada}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-start gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 break-words"> 🌟 {devocional.titulo} </h1>
          {availableAudios.length > 0 && (
            <div className="relative flex-shrink-0" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 ${menuOpen ? 'bg-blue-100 dark:bg-blue-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} aria-label={t('listen_devotional')} title={t('listen_devotional')}>
                <SpeakerWaveIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {availableAudios.map(audio => ( <button key={audio.lang} onClick={() => handlePlay(audio)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"> {audio.lang} </button> ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-1"><span role="img" aria-label="book emoji" className="mr-2">📖</span> {t('key_verse')}:</div>
          <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold text-md sm:text-lg">{devocional.versiculo}</div>
          <div className="text-gray-600 dark:text-gray-300 mt-1">{devocional.cita}</div>
        </div>
        
        <div className="space-y-6">
          {devocional.reflexion && ( <div> <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"> <span role="img" aria-label="pray emoji" className="mr-2">🙏</span> {t('reflection')}: </div> <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"> {devocional.reflexion && typeof devocional.reflexion === 'object' ? documentToReactComponents(devocional.reflexion) : devocional.reflexion} </div> </div> )}
          {devocional.pregunta && <div><div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"><span role="img" aria-label="thinking face emoji" className="mr-2">🤔</span> {t('question')}:</div><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{devocional.pregunta}</p></div>}
          {devocional.aplicacion && <div><div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"><span role="img" aria-label="fire emoji" className="mr-2">🔥</span> {t('application')}:</div><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{devocional.aplicacion}</p></div>}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto" onClick={async () => { 
            const textToShare = getShareText(devocional, t, i18n); 
            
            // Intenta usar el Share nativo primero
            try {
              await Share.share({
                title: devocional.titulo,
                text: textToShare,
                dialogTitle: t('share_devotional'),
              });
            } catch (error) {
              // Si falla (ej. en web sin soporte), usa el método antiguo
              if (isClient && navigator.share) { 
                try { 
                  await navigator.share({ title: devocional.titulo, text: textToShare }); 
                } catch (err) {} 
              } else if (isClient) { 
                navigator.clipboard.writeText(textToShare).then(() => alert(t('text_copied'))); 
              }
            }
          }}>
            <img src="/icons/share.png" alt={t('share')} className="w-5 h-5 mr-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
            {t('share_devotional')}
          </button>

          <Link to="/historial/" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto">
            <img src="/icons/calendar.png" alt={t('history')} className="w-5 h-5 mr-1 dark:invert" style={{ display: "inline-block", verticalAlign: "middle" }} />
            {t('view_previous_devotionals')}
          </Link>

          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto" onClick={onWhatsAppClick} type="button" aria-label={t('whatsapp_contact')}>
            <WhatsAppIcon />
            <span className="hidden sm:inline">{t('whatsapp_long')}</span>
            <span className="inline sm:hidden">{t('whatsapp_short')}</span>
          </button>

          {/* Botón de Suscribir para Android/Desktop */}
          {isClient && !isIOS && (
            <button onClick={handleSubscribeClick} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto">
              <img src="/icons/bell.png" alt={t('subscribe')} className="w-5 h-5 mr-1" />
              {t('subscribe_to_notifications')}
            </button>
          )}

          {/* Mensaje para iOS al final */}
          {isClient && isIOS && !isStandalone && (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-full sm:w-auto mt-2">
              <p className="font-semibold text-gray-800 dark:text-gray-100">{t('get_the_app')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('add_to_home_screen_prompt')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// Main Page Component - Now with a single, robust client-side check
const IndexPage = ({ data }) => {
  const { t } = useTranslation();
  const [showWhatsAppBox, setShowWhatsAppBox] = useState(false);
  const [devocional, setDevocional] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // THIS IS THE SINGLE SOURCE OF TRUTH FOR HYDRATION
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Función para construir el devocional desde los datos de GraphQL
  const buildDevotionalFromData = (data) => {
    const getLocale = () => {
      return typeof window !== 'undefined' && window.location.hostname.includes("voices-of-hope") ? "en-US" : "es-MX";
    };

    const locale = getLocale();
    const today = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const todayLocalStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    let devotionalTextNode = data.allContentfulDevotional.nodes.find(
      (node) => {
        if (node.node_locale !== locale) return false;
        if (!node.date) return false;
        const [year, month, day] = node.date.split('-');
        return `${year}-${month}-${day}` === todayLocalStr;
      }
    );

    if (!devotionalTextNode) {
      devotionalTextNode = data.allContentfulDevotional.nodes.find(
        (node) => node.node_locale === locale
      );
    }

    const todayNodes = data.allContentfulDevotional.nodes.filter(
      (node) => {
        if (!node.date) return false;
        const [year, month, day] = node.date.split('-');
        return `${year}-${month}-${day}` === todayLocalStr;
      }
    );

    const audioEspanolUrl = todayNodes.map(n => n.audioEspanol?.file?.url).find(Boolean) || null;
    const audioNahuatlUrl = todayNodes.map(n => n.audioNahuatl?.file?.url).find(Boolean) || null;
    const audioEnglishUrl = todayNodes.map(n => n.audioEnglish?.file?.url).find(Boolean) || null;
    
    return devotionalTextNode
      ? {
          titulo: devotionalTextNode.title.replace(/^\d{4}-\d{2}-\d{2}\s*-\s*/, ''),
          fecha: devotionalTextNode.date,
          versiculo: devotionalTextNode.bibleVerse,
          cita: devotionalTextNode.quote,
          reflexion: devotionalTextNode.reflection?.raw ? JSON.parse(devotionalTextNode.reflection.raw) : devotionalTextNode.reflection,
          pregunta: devotionalTextNode.question?.question,
          aplicacion: devotionalTextNode.application?.application,
          audioEspanolUrl,
          audioNahuatlUrl,
          audioEnglishUrl,
        }
      : null;
  };

  // Efecto principal para cargar el devocional
  useEffect(() => {
    const loadDevotional = async () => {
      if (!isClient || !data) return;

      setLoading(true);

      try {
        // La detección de red solo funciona en plataformas nativas
        if (Capacitor.isNativePlatform()) {
          const status = await Network.getStatus();

          if (status.connected) {
            // --- MODO ONLINE ---
            setIsOffline(false);
            // Carga desde GraphQL y guarda en caché
            const latestDevotional = buildDevotionalFromData(data);
            setDevocional(latestDevotional);

            if (latestDevotional) {
              // Guarda en Preferences para uso offline
              await Preferences.set({
                key: 'latestDevotional',
                value: JSON.stringify(latestDevotional),
              });
              
              // También guarda la fecha para saber cuándo fue guardado
              await Preferences.set({
                key: 'devotionalCacheDate',
                value: new Date().toISOString(),
              });
            }
          } else {
            // --- MODO OFFLINE ---
            setIsOffline(true);
            // Carga desde Preferences
            const { value } = await Preferences.get({ key: 'latestDevotional' });
            if (value) {
              setDevocional(JSON.parse(value));
            } else {
              // Si no hay nada en caché, devocional seguirá siendo null
              setDevocional(null);
            }
          }
        } else {
          // --- MODO WEB (navegador) ---
          // Simplemente carga los datos como normalmente
          setIsOffline(false);
          const latestDevotional = buildDevotionalFromData(data);
          setDevocional(latestDevotional);
        }
      } catch (error) {
        console.error('Error loading devotional:', error);
        // En caso de error, intenta cargar desde cache
        try {
          const { value } = await Preferences.get({ key: 'latestDevotional' });
          if (value) {
            setDevocional(JSON.parse(value));
            setIsOffline(true);
          }
        } catch (cacheError) {
          console.error('Error loading from cache:', cacheError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDevotional();
  }, [isClient, data]); // Depende de isClient y data para recargar si los datos de GraphQL cambian

  // If we're on the server or during the first client render, show the skeleton.
  // This guarantees the server and client match, fixing all hydration errors.
  if (!isClient || loading) {
    return <DevotionalSkeleton />;
  }

  // --- All logic below this point only runs on the client ---
  
  const contacts = [
    { name: "Christopher", phone: "522462945809", photo: "/chris.png" },
    { name: "Felipe", phone: "522223614495", photo: "/phil.png" },
    { name: "Bernabé", phone: "522331181457" }
  ];

  // The component now renders the real UI, guaranteed to be on the client
  return (
    <>
      <InstallPrompt />
      <IOSInstallPrompt />
      {isOffline && devocional && <OfflineMessage t={t} />}
      {!devocional && isOffline && <NoDevotionalMessage t={t} />}
      {devocional ? (
        <DevotionalView
          devocional={devocional}
          onWhatsAppClick={() => setShowWhatsAppBox(true)}
          isClient={true} // Pass the client status down
        />
      ) : (
        !isOffline && <DevotionalSkeleton />
      )}
      {showWhatsAppBox && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center" onClick={() => setShowWhatsAppBox(false)}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-5 w-[90vw] max-w-xs animate-fade-in flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 text-center font-semibold text-gray-800 dark:text-gray-100">{t("whatsapp_modal_title")}<br /><span className="text-sm text-gray-600 dark:text-gray-300">{t("whatsapp_modal_subtitle")}</span></div>
            <div className="flex flex-col gap-3 w-full">
              {contacts.map((c) => (
                <a key={c.name} href={`https://wa.me/${c.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/70 rounded-lg px-3 py-2 transition w-full">
                  <span className="font-medium text-gray-800 dark:text-gray-100">{c.name}</span>
                  <WhatsAppIcon className="w-6 h-6 text-green-600 ml-auto" />
                </a>
              ))}
            </div>
            <button className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition" onClick={() => setShowWhatsAppBox(false)}>{t("close")}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;

// --- GraphQL Query (No changes here) ---
export const query = graphql`
  query LatestDevotionalQuery {
    allContentfulDevotional(
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        title
        date
        bibleVerse
        quote
        reflection {
          raw
        }
        question {
          question
        }
        application {
          application
        }
        audioEspanol {
          file {
            url
          }
        }
        audioNahuatl {
          file {
            url
          }
        }
        audioEnglish {
          file {
            url
          }
        }
        node_locale
      }
    }
  }
`;