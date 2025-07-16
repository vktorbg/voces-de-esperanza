// File: voces-de-esperanza/src/pages/index.js

import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby"; // Importación necesaria para el nuevo botón
import { useTranslation } from "react-i18next";
import { useAudioPlayer } from "../components/AudioPlayer";
import InstallPrompt from "../components/InstallPrompt";
import IOSInstallPrompt from "../components/IOSInstallPrompt"; 

// --- Iconos ---
const BookOpenIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> </svg> );
const WhatsAppIcon = (props) => ( <svg viewBox="0 0 32 32" fill="currentColor" width="1.5em" height="1.5em" {...props}> <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.09L4 29l7.18-2.32A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.87-.52-5.5-1.5l-.39-.23-4.28 1.39 1.4-4.16-.25-.4A9.93 9.93 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.53-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.57.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/> </svg> );
const SpeakerWaveIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /> </svg> );
const ReloadIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /> </svg> );
// Se elimina CalendarDaysIcon porque ya no se usa aquí.

const LoadingBar = () => ( <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-800 z-50 overflow-hidden"> <div className="absolute top-0 left-0 h-full w-full bg-blue-500 animate-shimmer"></div> </div> );
const DevotionalSkeleton = () => ( <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-pulse" style={{ maxWidth: '95vw' }}> <div className="flex items-start mb-6"> <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 bg-gray-200 dark:bg-gray-700"></div> <div className="flex-grow pt-2"> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div> <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div> </div> </div> <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div> <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"> <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2"></div> <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div> </div> <div className="space-y-6"> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div> <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div> </div> </div> );

const DevotionalView = ({ devocional, onWhatsAppClick }) => {
  const { t } = useTranslation();
  const { playTrack } = useAudioPlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!devocional) {
    return ( <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto"> <BookOpenIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" /> <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('no_devotional_title')}</h2> <p className="text-gray-500 dark:text-gray-400">{t('no_devotional_message')}</p> </div> );
  }

  const availableAudios = [
    { lang: t('language_spanish'), url: devocional.audioEspanolUrl },
    { lang: t('language_nahuatl'), url: devocional.audioNahuatlUrl },
    { lang: t('language_english'), url: devocional.audioEnglishUrl },
  ].filter(audio => audio.url);

  const handlePlay = (audio) => {
    playTrack({ url: audio.url, title: `${audio.lang} - ${devocional.titulo}`, image: '/icon.jpg' });
    setMenuOpen(false);
  };
  
  return (
    <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto px-2" style={{ maxWidth: '95vw' }}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-start mb-6">
          <img src="/icon.jpg" alt={t('logo_alt')} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 shadow flex-shrink-0" />
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider">{t('app_name')}</span>
              {/* --- SE ELIMINA EL BOTÓN DE HISTORIAL DE AQUÍ --- */}
              <button onClick={() => window.location.reload()} title={t('reload_devotional')} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex-shrink-0" aria-label={t('reload_devotional')}>
                <ReloadIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{t('daily_devotional')}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400"> {new Date(devocional.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })} </div>
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
          {devocional.reflexion && <div><div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"><span role="img" aria-label="pray emoji" className="mr-2">🙏</span> {t('reflection')}:</div><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{devocional.reflexion}</p></div>}
          {devocional.pregunta && <div><div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"><span role="img" aria-label="thinking face emoji" className="mr-2">🤔</span> {t('question')}:</div><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{devocional.pregunta}</p></div>}
          {devocional.aplicacion && <div><div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2"><span role="img" aria-label="fire emoji" className="mr-2">🔥</span> {t('application')}:</div><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{devocional.aplicacion}</p></div>}
        </div>

        {devocional.copytext && (
          // --- SECCIÓN DE BOTONES MODIFICADA ---
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto" onClick={async () => { const textToShare = `${devocional.copytext}\n \n${window.location.href}`; if (navigator.share) { try { await navigator.share({ title: devocional.titulo, text: textToShare }); } catch (err) {} } else { navigator.clipboard.writeText(textToShare).then(() => alert(t('text_copied'))); }}}>
              <img src="https://img.icons8.com/material-outlined/48/FFFFFF/share.png" alt={t('share')} className="w-5 h-5 mr-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
              {t('share_devotional')}
            </button>
            {/* --- NUEVO BOTÓN DE HISTORIAL --- */}
            <Link to="/historial/" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto">
                <img src="https://img.icons8.com/color/96/calendar--v1.png" alt={t('history')} className="w-5 h-5 mr-1 dark:invert" style={{ display: "inline-block", verticalAlign: "middle" }} />
                {t('view_previous_devotionals')}
            </Link>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto" onClick={onWhatsAppClick} type="button" aria-label={t('whatsapp_contact')}>
              <WhatsAppIcon />
              <span className="hidden sm:inline">{t('whatsapp_long')}</span>
              <span className="inline sm:hidden">{t('whatsapp_short')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const IndexPage = () => {
  const { t } = useTranslation();
  const [devocional, setDevocional] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsAppBox, setShowWhatsAppBox] = useState(false);
  const contacts = [ { name: "Christopher", phone: "522462945809", photo: "/chris.png" }, { name: "Felipe", phone: "522223614495", photo: "/phil.png" } ];

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        const response = await fetch('/api/get-devotional');
        if (response.ok) {
          const data = await response.json();
          const formattedData = { ...data, audioEspanolUrl: data.audioespanolurl, audioNahuatlUrl: data.audionahuatlurl, audioEnglishUrl: data.audioenglishurl };
          setDevocional(formattedData);
        }
      } catch (error) {
        console.error("Error al obtener el devocional:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevotional();
  }, []);

  return (
    <>
      {/* 
        Ambos componentes de prompt se renderizan aquí.
        Su lógica interna se encarga de decidir si deben mostrarse o no.
        InstallPrompt -> Para Chrome/Android
        IOSInstallPrompt -> Para Safari en iPhone/iPad
      */}
      <InstallPrompt />
      <IOSInstallPrompt />
      
      {isLoading && <LoadingBar />}

      {isLoading ? ( 
        <DevotionalSkeleton /> 
      ) : ( 
        <DevotionalView 
          devocional={devocional} 
          onWhatsAppClick={() => setShowWhatsAppBox(v => !v)} 
        /> 
      )}
      
      {showWhatsAppBox && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center" onClick={() => setShowWhatsAppBox(false)}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-5 w-[90vw] max-w-xs animate-fade-in flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 text-center font-semibold text-gray-800 dark:text-gray-100">{t('whatsapp_modal_title')}<br /><span className="text-sm text-gray-600 dark:text-gray-300">{t('whatsapp_modal_subtitle')}</span></div>
            <div className="flex flex-col gap-3 w-full">
              {contacts.map((c) => ( 
                <a key={c.name} href={`https://wa.me/${c.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/70 rounded-lg px-3 py-2 transition w-full"> 
                  <span className="font-medium text-gray-800 dark:text-gray-100">{c.name}</span> 
                  <WhatsAppIcon className="w-6 h-6 text-green-600 ml-auto" /> 
                </a> 
              ))}
            </div>
            <button className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition" onClick={() => setShowWhatsAppBox(false)}>{t('close')}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;