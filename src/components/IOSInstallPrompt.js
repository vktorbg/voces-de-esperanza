// File: voces-de-esperanza/src/components/IOSInstallPrompt.js

import React, { useState, useEffect } from 'react';

// Ícono de Compartir de iOS
const ShareIcon = (props) => (
  <svg viewBox="0 0 22 22" fill="currentColor" {...props}>
    <path d="M11.72,3.26C11.72,3.26,11.72,3.26,11.72,3.26L12,3.28C12.33,3.33,12.55,3.61,12.55,3.94v7.5c0,0.34-0.22,0.61-0.55,0.67l-0.28,0.02 c-0.33,0-0.61-0.22-0.67-0.55L11,11.3V3.94C11,3.61,11.28,3.33,11.61,3.28L11.72,3.26z M11.5,1.5c-0.12,0-0.24,0-0.35,0.02 l-0.28,0.05C9.4,1.8,8.25,3.25,8.25,4.88v6.25c0,1.62,1.15,3.08,2.62,3.3l0.28,0.05c0.12,0.02,0.24,0.02,0.35,0.02 c0.12,0,0.23,0,0.34-0.02l0.28-0.05c1.47-0.22,2.62-1.68,2.62-3.3V4.88c0-1.62-1.15-3.08-2.62-3.3L11.84,1.52 C11.73,1.5,11.62,1.5,11.5,1.5z M4,6.85C4,6.85,4,6.85,4,6.85l0.11-0.02c0.33-0.05,0.61,0.16,0.67,0.49l0.02,0.11v9.2 c0,0.33-0.22,0.61-0.55,0.67L4.15,17.4c-0.33,0-0.61-0.22-0.67-0.55L3.45,16.7V7.5c0-0.33,0.22-0.61,0.55-0.67L4,6.85z M4.5,5C4.38,5,4.27,5,4.16,5.02L3.88,5.08C2.4,5.3,1.25,6.75,1.25,8.38v6.25c0,1.62,1.15,3.08,2.62,3.3l0.28,0.05 c0.12,0.02,0.23,0.02,0.34,0.02c0.12,0,0.24,0,0.35-0.02l0.28-0.05c1.47-0.22,2.62-1.68,2.62-3.3V8.38 c0-1.62-1.15-3.08-2.62-3.3L4.85,5.02C4.74,5,4.62,5,4.5,5z M19,6.85C19,6.85,19,6.85,19,6.85l0.11-0.02 c0.33-0.05,0.61,0.16,0.67,0.49l0.02,0.11v9.2c0,0.33-0.22,0.61-0.55,0.67L19.15,17.4c-0.33,0-0.61-0.22-0.67-0.55 l-0.02-0.11V7.5c0-0.33,0.22-0.61,0.55-0.67L19,6.85z M18.5,5c0.12,0,0.23,0,0.34,0.02l0.28,0.05 c1.47,0.22,2.62,1.68,2.62,3.3v6.25c0,1.62-1.15,3.08-2.62,3.3l-0.28,0.05c-0.12,0.02-0.23,0.02-0.34,0.02 c-0.12,0-0.24,0-0.35-0.02l-0.28-0.05c-1.47-0.22-2.62-1.68-2.62-3.3V8.38c0-1.62,1.15-3.08,2.62-3.3l0.28-0.05 C18.27,5,18.38,5,18.5,5z"/>
  </svg>
);


const IOSInstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para detectar si es un dispositivo iOS
    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // Función para detectar si la app ya está en modo standalone (instalada)
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

    // Solo mostrar si es iOS y no está ya instalada
    if (isIOS() && !isInStandaloneMode()) {
        // Para no mostrarlo cada vez, podemos usar localStorage
        const lastShown = localStorage.getItem('iosInstallPrompt');
        const now = new Date().getTime();
        // Mostrar solo si no se ha mostrado antes o si ha pasado más de una semana
        if (!lastShown || now - parseInt(lastShown, 10) > 7 * 24 * 60 * 60 * 1000) {
             setIsVisible(true);
        }
    }
  }, []);

  const handleDismiss = () => {
    // Guardar la fecha actual en localStorage para no volver a mostrarlo pronto
    localStorage.setItem('iosInstallPrompt', new Date().getTime());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 w-[95vw] max-w-md z-[70] animate-fade-in-up">
      <div className="bg-blue-600 text-white rounded-xl shadow-2xl p-4 flex flex-col items-center gap-3 text-center">
        <p className="font-bold text-base">Instala Voces de Esperanza en tu iPhone</p>
        <p className="text-sm opacity-90">
            Para una mejor experiencia, añade la app a tu pantalla de inicio. Toca el ícono de Compartir 
            <ShareIcon className="w-5 h-5 inline-block mx-1" /> 
            y luego "Añadir a la pantalla de inicio".
        </p>
        <button
          onClick={handleDismiss}
          className="mt-2 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-1.5 rounded-md text-sm transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default IOSInstallPrompt;