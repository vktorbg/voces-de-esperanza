// File: voces-de-esperanza/src/pages/index.js

import React from "react";
import { graphql, Link } from "gatsby"; // Import Link from Gatsby

// --- Icon Components (Heroicons - outline style) ---
// These are kept as they are used by DevotionalView or the Navigation
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
      }
    }
  }
`;

// Devocional View Component
const DevotionalView = ({ devocional }) => {
  if (!devocional) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto">
        <BookOpenIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Sin devocional para hoy</h2>
        <p className="text-gray-500 dark:text-gray-400">Por favor, revisa más tarde.</p>
      </div>
    );
  }

  return (
    <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
         style={{ maxWidth: '95vw' }}>
      <div className="flex items-center mb-6">
        <img src="/icon.jpg" alt="Logo Voces de Esperanza" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 shadow" />
        <div>
          <div className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider">VOCES DE ESPERANZA</div>
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

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
         {/* Consider if emoji should be static or dynamic based on content */}
         {/* <span role="img" aria-label="star emoji" className="mr-2">✨</span> */}
         {devocional.titulo}
      </h1>

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-1">
           <span role="img" aria-label="book emoji" className="mr-2">📖</span> Versículo Clave:
        </div>
        <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold text-md sm:text-lg">{devocional.versiculo}</div>
        <div className="text-gray-600 dark:text-gray-300 mt-1">{devocional.cita}</div>
      </div>

      <div className="space-y-6">
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
        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center gap-2"
            onClick={async () => {
              const textToShare = `${devocional.copytext}\n \n${typeof window !== 'undefined' ? window.location.href : ''}`;
              if (typeof navigator !== 'undefined' && navigator.share) {
                try {
                  await navigator.share({
                    title: devocional.titulo,
                    text: textToShare,
                  });
                } catch (err) {
                  // usuario canceló o error
                }
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


// IndexPage now only renders DevotionalView and the navigation
const IndexPage = ({ data }) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0');
  const day = String(todayDate.getDate()).padStart(2, '0');
  const hoy = `${year}-${month}-${day}`;

  const devocional = data.allGoogleSpreadsheetHoja1.nodes.find(d => {
    if (!d.fecha) {
        return false;
    }
    // Ensure date comparison is robust, handle potential 'YYYY-MM-DD HH:MM:SS' from sheets
    const fechaSheet = String(d.fecha).split(" ")[0].split("T")[0];
    return fechaSheet === hoy;
  });
  
  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        {/* Directly render DevotionalView */}
        <DevotionalView devocional={devocional} />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-50">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon; 
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                activeClassName="!text-blue-600 dark:!text-blue-400 scale-105" // Added ! for higher specificity
                partiallyActive={item.path !== "/"} // Devocionales (path: "/") should only be active on exact match
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
}

export default IndexPage;