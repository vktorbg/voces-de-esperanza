// gatsby-ssr.js
import React from 'react';
import { AudioPlayerProvider } from './src/components/AudioPlayer';
import LanguageProvider from './src/components/LanguageProvider';
import Layout from './src/components/Layout';

// Wraps the entire app with the Audio Context
export const wrapRootElement = ({ element }) => {
  return (
    <LanguageProvider>
      <AudioPlayerProvider>{element}</AudioPlayerProvider>
    </LanguageProvider>
  );
};

// Wraps every page with the Layout component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};


export const onRenderBody = ({ setHeadComponents }) => {
  // ¡MUY IMPORTANTE! Reemplaza 'TU_ONESIGNAL_APP_ID' con tu App ID real de OneSignal.
  const ONE_SIGNAL_APP_ID = '0b657e8d-2a51-41a7-9dce-9c201cf9f180';

  if (!ONE_SIGNAL_APP_ID || ONE_SIGNAL_APP_ID === 'TU_ONESIGNAL_APP_ID') {
    // No hace nada si el App ID no está configurado para evitar errores.
    console.warn("OneSignal App ID no está configurado en gatsby-ssr.js. Las notificaciones no funcionarán.");
    return;
  }

  setHeadComponents([
    // 1. Carga el script SDK de OneSignal
    <script
      key="onesignal-sdk"
      src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
      async=""
    />,
    // 2. Inicializa OneSignal con tu App ID
    <script
      key="onesignal-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.OneSignal = window.OneSignal || [];
          OneSignal.push(function() {
            OneSignal.init({
              appId: "${ONE_SIGNAL_APP_ID}",
            });
          });
        `,
      }}
    />,
  ]);
};