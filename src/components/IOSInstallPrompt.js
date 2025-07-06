// File: voces-de-esperanza/src/components/IOSInstallPrompt.js

import React, { useState, useEffect } from 'react';

// Se ha eliminado el componente SVG 'ShareIcon' de aquí.

const IOSInstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para detectar si es un dispositivo iOS
    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // Función para detectar si la app ya está en modo standalone (instalada)
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

    // Solo mostrar si es iOS y no está ya instalada
    if (isIOS() && !isInStandaloneMode()) {
        // Para no mostrarlo cada vez, usamos localStorage
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
        
        {/* --- TEXTO E ÍCONO MODIFICADOS --- */}
        <p className="text-sm opacity-90 leading-relaxed">
            Para una mejor experiencia, añade la app a tu pantalla de inicio. Toca el ícono de Compartir 
            <img 
                src="https://img.icons8.com/windows/32/share-rounded.png" 
                alt="Compartir"
                className="w-5 h-5 inline-block mx-1 align-middle dark:invert" 
            /> 
            y luego elige "Agregar al Inicio" 
            <img 
                src="https://img.icons8.com/material-outlined/24/plus-2-math--v1.png"
                alt="Agregar al Inicio"
                className="w-5 h-5 inline-block mx-1 align-middle dark:invert"
            /> 
            .
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