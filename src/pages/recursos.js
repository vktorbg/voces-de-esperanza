// File: voces-de-esperanza/src/pages/recursos.js

import React from "react";
import { Link } from "gatsby";

// --- Icon Components ---
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
const ArrowDownTrayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
// --- Fin Icon Components ---

const RecursosView = () => {
  return (
    <div className="font-sans w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
         style={{ maxWidth: '95vw' }}> {/* Ajustado a max-w-4xl, puedes cambiar a 98vw si prefieres */}
      {/* Banner superior */}
      <div className="relative h-48 sm:h-60 md:h-64"> {/* Aumentado un poco la altura del banner en pantallas medianas */}
        <img
          src="/banner-recursos.jpg"
          alt="Recursos banner background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <DocumentTextIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-2 sm:mb-3 opacity-90 drop-shadow-lg" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-md">Recursos para el Liderazgo</h2>
          <p className="text-sm sm:text-base text-gray-100 max-w-lg drop-shadow">
            Materiales y guías para fortalecer tu crecimiento espiritual y habilidades de liderazgo.
          </p>
        </div>
      </div>

      {/* Secciones de Contenido */}
      <div className="p-6 sm:p-8 space-y-8 md:space-y-10">
        {/* Sección: Discipulado */}
        <section className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-700 rounded-full">
              <BookOpenIcon className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center sm:text-left">
                Recursos para el Discipulado
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left max-w-md">
                Herramientas para el acompañamiento y formación de discípulos, enfocadas en el crecimiento integral.
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              to="/recursos/manual-del-estudiante-react-pdf/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:shadow-md transition-all text-base"
            >
              <EyeIcon className="w-5 h-5" />
              Leer Manual Estudiante
            </Link>
            <a
              href="/pdfs/Manual-del-Estudiante.pdf" // Asegúrate que este nombre es correcto
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:shadow-md transition-all text-base"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Descargar PDF
            </a>
          </div>
        </section>

        {/* Sección: Seminario */}
        <section className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
            <div className="flex-shrink-0 p-3 bg-indigo-100 dark:bg-indigo-700 rounded-full">
              <DocumentTextIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center sm:text-left">
                Recursos del Seminario
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left max-w-md">
                Materiales de apoyo y guías para maestros en el proceso de enseñanza y formación bíblica.
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              to="/recursos/manual-del-maestro-react-pdf/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:shadow-md transition-all text-base"
            >
              <EyeIcon className="w-5 h-5" />
              Leer Manual Maestro
            </Link>
            <a
              href="/pdfs/Manual-del-Maestro.pdf" // Asegúrate que este nombre es correcto
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:shadow-md transition-all text-base"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Descargar PDF
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

// Page component (sin cambios, ya estaba bien)
const RecursosPage = () => {
  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <RecursosView />
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

export default RecursosPage;