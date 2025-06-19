// File: voces-de-esperanza/src/pages/index.js

import React, { useState, useEffect, useRef } from "react"; // Añadido useRef
import { graphql, Link } from "gatsby";

// --- Icon Components (Heroicons - outline style) ---
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const PlayCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);
const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const DocumentTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width="1.5em" height="1.5em" {...props}>
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.09L4 29l7.18-2.32A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.87-.52-5.5-1.5l-.39-.23-4.28 1.39 1.4-4.16-.25-.4A9.93 9.93 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.53-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.57.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
  </svg>
);
const SpeakerWaveIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);
const PlayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);
const PauseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);
const ReloadIcon = (props) => ( // Cambiado a un ícono de recarga más estándar de Heroicons
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
// --- End Icon Components ---

export const query = graphql`
  query DevocionalDelDia {
    allGoogleSpreadsheetHoja1 {
      nodes {
        fecha
        titulo
        versiculo
        cita
        reflexion
        pregunta
        aplicacion
        copytext
        audioEspanolUrl
        audioNahuatlUrl
        audioEnglishUrl
      }
    }
  }
`;

// Devotional View Component
const DevotionalView = ({ devocional, onWhatsAppClick }) => {
  const [showAudioOptions, setShowAudioOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState({ espanol: false, nahuatl: false });
  const [currentAudioLang, setCurrentAudioLang] = useState(null); // 'espanol' o 'nahuatl'
  const audioRef = useRef(null);
  const audioButtonRef = useRef(null);

  const toggleAudioOptions = () => {
    setShowAudioOptions(prev => !prev);
    if (showAudioOptions && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying({ espanol: false, nahuatl: false });
      setCurrentAudioLang(null);
    }
  };

  const handleAudioPlay = (lang, url) => {
    // Now all languages (including 'english') play audio in-app
    if (audioRef.current) {
      if (currentAudioLang === lang && isPlaying[lang]) {
        audioRef.current.pause();
        setIsPlaying(prev => ({ ...prev, [lang]: false }));
        return;
      } else {
        audioRef.current.pause();
      }
    }

    if (currentAudioLang === lang && audioRef.current && audioRef.current.src === url && audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying({ espanol: false, nahuatl: false, english: false, [lang]: true }))
        .catch(error => console.error("Error al reanudar audio:", error));
    } else {
      const newAudio = new Audio(url);
      audioRef.current = newAudio;
      newAudio.play()
        .then(() => {
          setIsPlaying({ espanol: false, nahuatl: false, english: false, [lang]: true });
          setCurrentAudioLang(lang);
        })
        .catch(error => console.error("Error al reproducir audio:", error));

      newAudio.onended = () => {
        setIsPlaying(prev => ({ ...prev, [lang]: false }));
        if (currentAudioLang === lang) setCurrentAudioLang(null);
      };
      newAudio.onerror = () => {
        alert("Error al cargar el audio. Por favor, revisa la URL o tu conexión.");
        setIsPlaying(prev => ({ ...prev, [lang]: false }));
        if (currentAudioLang === lang) setCurrentAudioLang(null);
      };
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAudioOptions && audioButtonRef.current && !audioButtonRef.current.contains(event.target)) {
        setShowAudioOptions(false);
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying({ espanol: false, nahuatl: false });
          setCurrentAudioLang(null);
        }
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [showAudioOptions, devocional]);

  if (!devocional) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto">
        <BookOpenIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Sin devocional para hoy</h2>
        <p className="text-gray-500 dark:text-gray-400">Por favor, revisa más tarde.</p>
      </div>
    );
  }

  const hasAnyAudio = devocional.audioEspanolUrl || devocional.audioNahuatlUrl || devocional.audioEnglishUrl;

  return (
    <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
         style={{ maxWidth: '95vw' }}>
      <div className="flex items-start mb-6">
        <img src="/icon.jpg" alt="Logo Voces de Esperanza" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 shadow" />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider">VOCES DE ESPERANZA</span>
            <button
                onClick={() => typeof window !== 'undefined' && window.location.reload()}
                title="Recargar Devocional"
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Recargar Devocional"
            >
                <ReloadIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Devocional del día</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {(() => {
              const fechaStr = devocional.fecha.split("T")[0];
              const [y, m, d] = fechaStr.split("-");
              const fechaLocal = new Date(Number(y), Number(m) - 1, Number(d));
              return fechaLocal.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            })()}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex-grow pr-2">
            {devocional.titulo}
        </h1>
        {hasAnyAudio && (
            <div className="relative ml-2" ref={audioButtonRef}>
                <button
                    onClick={toggleAudioOptions}
                    className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${showAudioOptions ? 'bg-blue-100 dark:bg-blue-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    aria-haspopup="true"
                    aria-expanded={showAudioOptions}
                    aria-label="Escuchar devocional"
                    title="Escuchar devocional"
                >
                    <SpeakerWaveIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </button>
                {showAudioOptions && (
                    <div 
                        className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-700 rounded-md shadow-xl z-20 py-1 
                                   origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none
                                   transform transition-all duration-150 ease-out 
                                   opacity-100 scale-100"
                        role="menu" aria-orientation="vertical" aria-labelledby="audio-options-button"
                    >
                        {devocional.audioEspanolUrl && (
                            <button
                                onClick={() => handleAudioPlay('espanol', devocional.audioEspanolUrl)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between"
                                role="menuitem"
                            >
                                <span>Español</span>
                                {currentAudioLang === 'espanol' && isPlaying.espanol ? <PauseIcon className="w-5 h-5 text-blue-500" /> : <PlayIcon className="w-5 h-5 text-gray-400" />}
                            </button>
                        )}
                        {devocional.audioNahuatlUrl && (
                            <button
                                onClick={() => handleAudioPlay('nahuatl', devocional.audioNahuatlUrl)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between"
                                role="menuitem"
                            >
                                <span>Náhuatl</span>
                                {currentAudioLang === 'nahuatl' && isPlaying.nahuatl ? <PauseIcon className="w-5 h-5 text-blue-500" /> : <PlayIcon className="w-5 h-5 text-gray-400" />}
                            </button>
                        )}
                        {devocional.audioEnglishUrl && (
                            <button
                                onClick={() => handleAudioPlay('english', devocional.audioEnglishUrl)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between"
                                role="menuitem"
                            >
                                <span>English</span>
                                {currentAudioLang === 'english' && isPlaying.english
                                    ? <PauseIcon className="w-5 h-5 text-blue-500" />
                                    : <PlayIcon className="w-5 h-5 text-gray-400" />}
                            </button>
                        )}
                    </div>
                )}
            </div>
        )}
      </div>

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-1">
           <span role="img" aria-label="book emoji" className="mr-2">📖</span> Versículo Clave:
        </div>
        <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold text-md sm:text-lg">{devocional.versiculo}</div>
        <div className="text-gray-600 dark:text-gray-300 mt-1">{devocional.cita}</div>
      </div>

      <div className="space-y-6">
        {/* ... (Reflexión, Pregunta, Aplicación sin cambios) ... */}
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="pray emoji" className="mr-2">🙏</span> Reflexión:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.reflexion}</p>
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="thinking face emoji" className="mr-2">🤔</span> Pregunta:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.pregunta}</p>
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="fire emoji" className="mr-2">🔥</span> Aplicación:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.aplicacion}</p>
        </div>
      </div>

      {devocional.copytext && (
        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto"
            onClick={async () => {
              const textToShare = `${devocional.copytext}\n \n${typeof window !== 'undefined' ? window.location.href : ''}`;
              if (typeof navigator !== 'undefined' && navigator.share) {
                try {
                  await navigator.share({
                    title: devocional.titulo,
                    text: textToShare,
                  });
                } catch (err) { /* usuario canceló o error */ }
              } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                navigator.clipboard.writeText(textToShare).then(() =>
                  alert("¡Texto copiado! Puedes pegarlo en WhatsApp, Telegram, etc.")
                );
              } else {
                alert("No se pudo copiar o compartir el texto. Por favor, intente manualmente.");
              }
            }}
          >
            <img
              src="https://img.icons8.com/material-two-tone/96/share-3.png"
              alt="Compartir"
              className="w-5 h-5 mr-2"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            Compartir Devocional
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 inline-flex items-center gap-2 w-full sm:w-auto"
            onClick={onWhatsAppClick}
            type="button"
            aria-label="Escríbenos por WhatsApp"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">¿Tienes alguna duda? Escríbenos</span>
            <span className="inline sm:hidden">Escríbenos</span>
          </button>
          <div className="text-xs text-gray-400 mt-2">
            {typeof navigator !== 'undefined' && navigator.share
              ? "Puedes compartir en WhatsApp, Telegram, redes sociales, etc."
              : "Si no ves opciones de compartir, el texto se copiará al portapapeles."}
          </div>
        </div>
      )}
    </div>
  );
};


// IndexPage (sin cambios en su lógica principal, solo pasa las props)
const IndexPage = ({ data }) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0');
  const day = String(todayDate.getDate()).padStart(2, '0');
  const hoy = `${year}-${month}-${day}`;

  const devocional = data.allGoogleSpreadsheetHoja1.nodes.find(d => {
    if (!d.fecha) { return false; }
    const fechaSheet = String(d.fecha).split(" ")[0].split("T")[0];
    return fechaSheet === hoy;
  });
  
  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  const [showWhatsAppBox, setShowWhatsAppBox] = useState(false);
  // El useEffect para showWhatsAppButton se elimina ya que el botón de WhatsApp ahora está siempre en DevotionalView
  
  const contacts = [
    { name: "Christopher", phone: "522462945809", photo: "/chris.png" },
    { name: "Felipe", phone: "522223614495", photo: "/phil.png" },
  ];

  // Cerrar el dropdown de audio si se hace clic fuera
  // Esta lógica se podría mover a DevotionalView si se hace un componente separado para el dropdown
  // Por ahora, asumimos que DevotionalView es la única con este dropdown
  // Si showAudioOptions y audioRef estuvieran en IndexPage, se manejaría aquí.
  // Como están en DevotionalView, DevotionalView debe manejar su propio cierre de dropdown.

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <DevotionalView devocional={devocional} onWhatsAppClick={() => setShowWhatsAppBox(v => !v)} />
      </main>

      {showWhatsAppBox && (
        <div className="fixed left-0 right-0 bottom-[64px] sm:bottom-[72px] z-30 flex justify-center"> {/* Ajustado z-index */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-5 w-[90vw] max-w-xs animate-fade-in flex flex-col items-center">
            <div className="mb-3 text-center font-semibold text-gray-800 dark:text-gray-100">
              ¿Tienes alguna duda?<br />
              <span className="text-sm text-gray-600 dark:text-gray-300">¡Contáctanos por WhatsApp!</span>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {contacts.map((c) => (
                <a
                  key={c.name}
                  href={`https://wa.me/${c.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/70 rounded-lg px-3 py-2 transition w-full"
                >
                  {/* <img src={c.photo} alt={c.name} className="w-8 h-8 rounded-full object-cover" /> */}
                  <span className="font-medium text-gray-800 dark:text-gray-100">{c.name}</span>
                  <WhatsAppIcon className="w-6 h-6 text-green-600 ml-auto" />
                </a>
              ))}
            </div>
            <button
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
              onClick={() => setShowWhatsAppBox(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-40"> {/* z-index consistente */}
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                activeClassName="!text-blue-600 dark:!text-blue-400 scale-105"
                partiallyActive={item.path !== "/"}
              >
                <Icon className={`w-6 h-6 mb-0.5 transition-transform duration-200 ease-in-out group-hover:scale-110`} /> 
                <span className={`text-xs font-medium transition-opacity duration-200 ease-in-out opacity-90 group-hover:opacity-100`}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default IndexPage;