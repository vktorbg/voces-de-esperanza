// File: voces-de-esperanza/src/components/InstallPrompt.js

import React, { useState, useEffect } from 'react';

// Icono para "Añadir a Inicio"
const ArrowDownOnSquareIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevenir que el navegador muestre su propio prompt
      event.preventDefault();
      // Guardar el evento para poder llamarlo después
      setInstallPrompt(event);
      // Mostrar nuestro banner personalizado
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Mostrar el prompt de instalación del navegador
    const result = await installPrompt.prompt();
    
    // El prompt ya no es necesario
    setInstallPrompt(null);
    // Ocultar nuestro banner
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 w-[95vw] max-w-md z-[70] animate-fade-in-up">
      <div className="bg-blue-600 text-white rounded-xl shadow-2xl p-4 flex items-center gap-4">
        <img src="/images/icon.jpg" alt="Logo" className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-grow">
          <p className="font-bold text-base">Instala Voces de Esperanza</p>
          <p className="text-sm opacity-90">Acceso rápido y notificaciones diarias.</p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-700 font-bold px-4 py-1.5 rounded-md text-sm shadow hover:bg-blue-50 transition"
          >
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs text-white/70 hover:text-white"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;